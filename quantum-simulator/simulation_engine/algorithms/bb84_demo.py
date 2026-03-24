"""
BB84 Single-Qubit Demo -- "The Physics Proof"
=============================================
Step-by-step simulation of ONE qubit's journey through the BB84
protocol, designed for Bloch sphere visualization.

Shows the exact quantum mechanics behind eavesdropping detection:
    1. Alice prepares |0>
    2. Alice encodes her bit (X gate if bit=1)
    3. Alice chooses a basis (H gate if basis=X)
    4. (Optional) Eve intercepts -- measures in her basis, collapses
       the state, then re-prepares based on her result
    5. Bob measures in his chosen basis

The 25% error rate emerges naturally from the linear algebra --
when Eve measures in a mismatched basis, she irreversibly
disturbs the state, and Bob's measurement disagrees with Alice's.
"""

from typing import Dict, Optional
import numpy as np

from ..quantum_state import QuantumState
from ..measurement import measure_in_basis


def run(
    alice_bit: int = 0,
    alice_basis: str = 'X',
    eve_present: bool = True,
    eve_basis: str = 'Z',
    bob_basis: str = 'X',
    seed: Optional[int] = None,
) -> Dict:
    """Execute a single-qubit BB84 exchange with full state history.

    Args:
        alice_bit: Alice's secret bit (0 or 1).
        alice_basis: Alice's encoding basis ('Z' or 'X').
        eve_present: Whether Eve intercepts the qubit.
        eve_basis: Eve's measurement basis ('Z' or 'X').
        bob_basis: Bob's measurement basis ('Z' or 'X').
        seed: Random seed for reproducible demos.

    Returns:
        Dict with state_history (for Bloch sphere stepping),
        circuit steps, result summary, and narrative explanation.
    """
    rng = np.random.default_rng(seed)

    alice_basis = alice_basis.upper()
    eve_basis = eve_basis.upper()
    bob_basis = bob_basis.upper()
    alice_bit = int(alice_bit)

    state = QuantumState(1)
    state_history = [state.to_dict()]
    circuit = []
    steps_narrative = []

    # ------------------------------------------------------------------
    # Step 1: Alice encodes her bit
    # ------------------------------------------------------------------
    if alice_bit == 1:
        state.apply_gate('X', [0])
        circuit.append({
            'gate': 'X', 'targets': [0],
            'label': f'Alice encodes bit={alice_bit}: X flips to |1>',
        })
        state_history.append(state.to_dict())
        steps_narrative.append(f'Alice flips qubit to |1> (X gate)')
    else:
        steps_narrative.append(f'Alice keeps qubit as |0>')

    # ------------------------------------------------------------------
    # Step 2: Alice chooses her basis
    # ------------------------------------------------------------------
    if alice_basis == 'X':
        state.apply_gate('H', [0])
        basis_state = '|+>' if alice_bit == 0 else '|->'
        circuit.append({
            'gate': 'H', 'targets': [0],
            'label': f'Alice: X-basis (H gate) -> {basis_state}',
        })
        state_history.append(state.to_dict())
        steps_narrative.append(f'Alice rotates to X-basis with H gate -> {basis_state}')
    else:
        basis_state = '|0>' if alice_bit == 0 else '|1>'
        circuit.append({
            'gate': 'I', 'targets': [0],
            'label': f'Alice: Z-basis (no rotation) -> {basis_state}',
        })
        state_history.append(state.to_dict())
        steps_narrative.append(f'Alice uses Z-basis (no rotation needed) -> {basis_state}')

    # ------------------------------------------------------------------
    # Step 3 (optional): Eve intercepts
    # ------------------------------------------------------------------
    eve_bit = None
    eve_disturbed = False
    if eve_present:
        # Eve measures -- this COLLAPSES the state
        eve_bit, state = measure_in_basis(state, 0, eve_basis, rng)
        circuit.append({
            'gate': 'M', 'targets': [0],
            'label': f'Eve intercepts in {eve_basis}-basis -> got {eve_bit}',
        })
        state_history.append(state.to_dict())

        # Did Eve use the wrong basis? If so, she disturbed the state.
        eve_disturbed = (eve_basis != alice_basis)
        steps_narrative.append(
            f'Eve intercepts! Measures in {eve_basis}-basis -> bit={eve_bit}'
            + (' [DISTURBED STATE]' if eve_disturbed else ' [Correct basis -- no disturbance]')
        )

        # Eve must re-send: prepare a fresh qubit matching her result
        state = QuantumState(1)
        if eve_bit == 1:
            state.apply_gate('X', [0])
        if eve_basis == 'X':
            state.apply_gate('H', [0])

        circuit.append({
            'gate': 'H' if eve_basis == 'X' else 'I', 'targets': [0],
            'label': f'Eve resends: her qubit in {eve_basis}-basis (bit={eve_bit})',
        })
        state_history.append(state.to_dict())
        steps_narrative.append(f'Eve re-sends qubit in {eve_basis}-basis with bit={eve_bit}')

    # ------------------------------------------------------------------
    # Step 4: Bob measures
    # ------------------------------------------------------------------
    bob_bit, state = measure_in_basis(state, 0, bob_basis, rng)
    circuit.append({
        'gate': 'M', 'targets': [0],
        'label': f'Bob measures in {bob_basis}-basis -> got {bob_bit}',
    })
    state_history.append(state.to_dict())
    steps_narrative.append(f'Bob measures in {bob_basis}-basis -> gets bit={bob_bit}')

    # ------------------------------------------------------------------
    # Analysis
    # ------------------------------------------------------------------
    bases_match = alice_basis == bob_basis
    bits_match = (alice_bit == int(bob_bit))

    # Build outcome codes for clean UI display
    if not bases_match:
        outcome = 'DISCARDED'
        outcome_detail = f'Alice used {alice_basis}-basis, Bob used {bob_basis}-basis. Bases differ -- this round is publicly discarded during sifting.'
    elif bits_match:
        if eve_present and eve_disturbed:
            outcome = 'LUCKY_MATCH'
            outcome_detail = f'Eve disturbed the state (wrong basis) but Bob got the correct bit by chance (25% probability). Eve is still detectable over many rounds!'
        else:
            outcome = 'SECURE'
            outcome_detail = f'Bases match ({alice_basis}) and bits agree. This bit joins the shared key.'
    else:
        # bases match, bits differ -> Eve caused this
        outcome = 'EVE_DETECTED'
        outcome_detail = f'Bases match ({alice_basis}) but Bob got bit={int(bob_bit)} while Alice sent bit={alice_bit}. Eve\'s interception in the wrong basis ({eve_basis}) caused this error. EAVESDROPPING DETECTED!'

    # Build summary for the formula display
    summary_parts = [
        f'Alice: bit={alice_bit}, basis={alice_basis} -> sent {basis_state}',
    ]
    if eve_present:
        summary_parts.append(
            f'Eve: measured in {eve_basis}-basis -> got {eve_bit}'
            + (' (wrong basis!)' if eve_disturbed else ' (correct basis)')
        )
    summary_parts.append(f'Bob: measured in {bob_basis}-basis -> got {int(bob_bit)}')
    summary_parts.append(f'Formula: Outcome = {outcome}')

    return {
        'algorithm': 'bb84_demo',
        'circuit': circuit,
        'state_history': state_history,
        'alice_bit': alice_bit,
        'alice_basis': alice_basis,
        'eve_present': eve_present,
        'eve_basis': eve_basis if eve_present else None,
        'eve_bit': int(eve_bit) if eve_bit is not None else None,
        'eve_disturbed': eve_disturbed if eve_present else None,
        'bob_basis': bob_basis,
        'bob_bit': int(bob_bit),
        'bases_match': bases_match,
        'bits_match': bits_match,
        'outcome': outcome,
        'outcome_detail': outcome_detail,
        'steps_narrative': steps_narrative,
        'summary': '\n'.join(summary_parts),
    }
