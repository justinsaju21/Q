"""
BB84 Single-Qubit Demo — "The Physics Proof"
=============================================
Step-by-step simulation of ONE qubit's journey through the BB84
protocol, designed for Bloch sphere visualization.

Shows the exact quantum mechanics behind eavesdropping detection:
    1. Alice prepares |0⟩
    2. Alice encodes her bit (X gate if bit=1)
    3. Alice chooses a basis (H gate if basis=X)
    4. (Optional) Eve intercepts — measures in her basis, collapses
       the state, then re-prepares based on her result
    5. Bob measures in his chosen basis

The 25% error rate emerges naturally from the linear algebra —
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
        circuit steps, and result summary.
    """
    rng = np.random.default_rng(seed)

    alice_basis = alice_basis.upper()
    eve_basis = eve_basis.upper()
    bob_basis = bob_basis.upper()
    alice_bit = int(alice_bit)

    state = QuantumState(1)
    state_history = [state.to_dict()]
    circuit = []

    # ------------------------------------------------------------------
    # Step 1: Alice encodes her bit
    # ------------------------------------------------------------------
    if alice_bit == 1:
        state.apply_gate('X', [0])
        circuit.append({
            'gate': 'X', 'targets': [0],
            'label': f'Alice encodes bit={alice_bit}: X gate  →  |1⟩',
        })
        state_history.append(state.to_dict())

    # ------------------------------------------------------------------
    # Step 2: Alice chooses her basis
    # ------------------------------------------------------------------
    if alice_basis == 'X':
        state.apply_gate('H', [0])
        basis_state = '|+⟩' if alice_bit == 0 else '|−⟩'
        circuit.append({
            'gate': 'H', 'targets': [0],
            'label': f'Alice selects X-basis: H gate  →  {basis_state}',
        })
        state_history.append(state.to_dict())
    else:
        basis_state = '|0⟩' if alice_bit == 0 else '|1⟩'
        circuit.append({
            'gate': 'I', 'targets': [0],
            'label': f'Alice selects Z-basis (no rotation)  →  {basis_state}',
        })
        # Still record the snapshot even if no gate is applied
        state_history.append(state.to_dict())

    # ------------------------------------------------------------------
    # Step 3 (optional): Eve intercepts
    # ------------------------------------------------------------------
    eve_bit = None
    if eve_present:
        # Eve measures — this COLLAPSES the state
        eve_bit, state = measure_in_basis(state, 0, eve_basis, rng)
        circuit.append({
            'gate': '__measure__', 'targets': [0],
            'label': f'⚠️ Eve measures in {eve_basis}-basis  →  got {eve_bit}',
        })
        state_history.append(state.to_dict())

        # Eve must re-send: prepare a fresh qubit matching her result
        state = QuantumState(1)
        if eve_bit == 1:
            state.apply_gate('X', [0])
        if eve_basis == 'X':
            state.apply_gate('H', [0])

        circuit.append({
            'gate': '__prepare__', 'targets': [0],
            'label': f'⚠️ Eve re-sends qubit in {eve_basis}-basis (bit={eve_bit})',
        })
        state_history.append(state.to_dict())

    # ------------------------------------------------------------------
    # Step 4: Bob measures
    # ------------------------------------------------------------------
    bob_bit, state = measure_in_basis(state, 0, bob_basis, rng)
    circuit.append({
        'gate': '__measure__', 'targets': [0],
        'label': f'Bob measures in {bob_basis}-basis  →  got {bob_bit}',
    })
    state_history.append(state.to_dict())

    # ------------------------------------------------------------------
    # Analysis
    # ------------------------------------------------------------------
    bases_match = alice_basis == bob_basis
    bits_match = alice_bit == bob_bit

    if eve_present:
        eve_basis_matched_alice = eve_basis == alice_basis
        summary_lines = [
            f"Alice sent bit={alice_bit} in {alice_basis}-basis",
            f"Eve intercepted in {eve_basis}-basis → got {eve_bit}",
            f"Bob measured in {bob_basis}-basis → got {bob_bit}",
            "",
        ]
        if bases_match and not bits_match:
            summary_lines.append("🚨 ERROR: Bob's bit ≠ Alice's bit!")
            summary_lines.append(
                "Eve's measurement in the wrong basis collapsed the state, "
                "introducing an irrecoverable error."
            )
        elif bases_match and bits_match:
            summary_lines.append("✅ Bits match — Eve got lucky this round.")
            if not eve_basis_matched_alice:
                summary_lines.append(
                    "Eve measured in the wrong basis but the random "
                    "re-collapse happened to produce the correct result."
                )
        else:
            summary_lines.append(
                "Bases don't match — this round would be discarded during sifting."
            )
    else:
        summary_lines = [
            f"Alice sent bit={alice_bit} in {alice_basis}-basis",
            f"Bob measured in {bob_basis}-basis → got {bob_bit}",
            "",
        ]
        if bases_match:
            summary_lines.append(f"✅ Bases match → bits agree: {alice_bit} = {bob_bit}")
        else:
            summary_lines.append("Bases don't match — this round would be discarded.")

    return {
        'algorithm': 'bb84_demo',
        'circuit': circuit,
        'state_history': state_history,
        'alice_bit': alice_bit,
        'alice_basis': alice_basis,
        'eve_present': eve_present,
        'eve_basis': eve_basis,
        'eve_bit': eve_bit,
        'bob_basis': bob_basis,
        'bob_bit': int(bob_bit),
        'bases_match': bases_match,
        'bits_match': bits_match,
        'summary': '\n'.join(summary_lines),
    }
