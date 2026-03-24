"""
Deutsch's Algorithm
===================
The simplest quantum algorithm — determines whether a Boolean function
f: {0,1} → {0,1} is constant or balanced using a SINGLE query.

This is the special case of Deutsch-Jozsa with n_input=1.

Algorithm:
    1. Initialize 2 qubits: |0⟩|1⟩
    2. Apply H to both qubits
    3. Apply oracle Uf
    4. Apply H to first qubit
    5. Measure first qubit:
       - |0⟩ → f is constant
       - |1⟩ → f is balanced

Oracle types (4 possible single-bit functions):
    - Constant-0: f(0)=0, f(1)=0  (identity)
    - Constant-1: f(0)=1, f(1)=1  (X on ancilla)
    - Balanced-Id: f(0)=0, f(1)=1  (CNOT)
    - Balanced-Not: f(0)=1, f(1)=0 (CNOT + X on ancilla)
"""

from typing import List, Dict, Optional
import numpy as np

from ..quantum_state import QuantumState
from ..gates import get_gate_matrix


# ── Oracle matrices for 2-qubit system (4×4) ──────────────────────────

def _build_oracle(oracle_type: str) -> np.ndarray:
    """Build the 4×4 unitary oracle matrix for the Deutsch algorithm.

    Args:
        oracle_type: One of 'constant_0', 'constant_1',
                     'balanced_identity', 'balanced_negation'.

    Returns:
        4×4 unitary matrix representing Uf.
    """
    dim = 4  # 2 qubits → 2² = 4

    if oracle_type == "constant_0":
        # f(x) = 0 for all x  →  Uf = I  (identity, ancilla unchanged)
        return np.eye(dim, dtype=complex)

    elif oracle_type == "constant_1":
        # f(x) = 1 for all x  →  flip ancilla always  (X ⊗ I equivalent)
        oracle = np.zeros((dim, dim), dtype=complex)
        for i in range(dim):
            j = i ^ 1  # flip least-significant (ancilla) bit
            oracle[j, i] = 1.0
        return oracle

    elif oracle_type == "balanced_identity":
        # f(x) = x  →  CNOT (control=input, target=ancilla)
        oracle = np.zeros((dim, dim), dtype=complex)
        for i in range(dim):
            input_bit = (i >> 1) & 1
            ancilla = i & 1
            new_ancilla = ancilla ^ input_bit  # y ⊕ f(x)
            j = (input_bit << 1) | new_ancilla
            oracle[j, i] = 1.0
        return oracle

    elif oracle_type == "balanced_negation":
        # f(x) = NOT x  →  anti-CNOT
        oracle = np.zeros((dim, dim), dtype=complex)
        for i in range(dim):
            input_bit = (i >> 1) & 1
            ancilla = i & 1
            f_x = 1 - input_bit  # NOT x
            new_ancilla = ancilla ^ f_x
            j = (input_bit << 1) | new_ancilla
            oracle[j, i] = 1.0
        return oracle

    else:
        raise ValueError(
            f"Invalid oracle_type '{oracle_type}'. "
            f"Must be constant_0, constant_1, balanced_identity, or balanced_negation."
        )


# ── Circuit generation ─────────────────────────────────────────────────

def generate_circuit(oracle_type: str = "balanced_identity") -> List[Dict]:
    """Generate the Deutsch algorithm circuit.

    Returns:
        List of circuit step dicts with gate, targets, label, param.
    """
    steps: List[Dict] = []

    # Step 1: Prepare ancilla in |1⟩
    steps.append({
        'gate': 'X',
        'targets': [1],
        'label': 'Initialize ancilla q1 to |1⟩',
        'param': None,
    })

    # Step 2: Apply H to both qubits
    steps.append({
        'gate': 'H',
        'targets': [0],
        'label': 'Apply H to input qubit q0',
        'param': None,
    })
    steps.append({
        'gate': 'H',
        'targets': [1],
        'label': 'Apply H to ancilla qubit q1  →  (|0⟩−|1⟩)/√2',
        'param': None,
    })

    # Step 3: Apply Oracle Uf
    steps.append({
        'gate': 'Uf',
        'targets': [0, 1],
        'label': f'Apply oracle Uf ({oracle_type})  — Phase Kickback',
        'param': None,
        'oracle_type': oracle_type,
    })

    # Step 4: Apply H to input qubit (interference)
    steps.append({
        'gate': 'H',
        'targets': [0],
        'label': 'Apply H to input qubit — converts phase to amplitude',
        'param': None,
    })

    # Step 5: Measure input qubit
    steps.append({
        'gate': '__measure__',
        'targets': [0],
        'label': 'Measure input qubit q0',
        'param': None,
    })

    return steps


# ── Execution ──────────────────────────────────────────────────────────

def run(oracle_type: str = "balanced_identity") -> Dict:
    """Execute Deutsch's Algorithm.

    Args:
        oracle_type: 'constant_0', 'constant_1',
                     'balanced_identity', or 'balanced_negation'.

    Returns:
        Dict with circuit, result, measurement, state_history, and formula.
    """
    state = QuantumState(2)
    circuit = generate_circuit(oracle_type)
    state_history = [state.to_dict()]

    oracle_matrix = _build_oracle(oracle_type)
    measured_bit = 0

    for step in circuit:
        if step['gate'] == 'Uf':
            # Apply the oracle matrix directly
            state.apply_gate_matrix(oracle_matrix, step['targets'])
        elif step['gate'] == '__measure__':
            from ..measurement import measure_qubit
            measured_bit, state = measure_qubit(state, step['targets'][0])
        else:
            state.apply_gate(step['gate'], step['targets'], step.get('param'))

        state_history.append(state.to_dict())

    is_constant = (measured_bit == 0)
    result_type = 'constant' if is_constant else 'balanced'

    # Build educational formula based on oracle type
    if oracle_type == 'constant_0':
        oracle_desc = 'f(0)=0, f(1)=0'
    elif oracle_type == 'constant_1':
        oracle_desc = 'f(0)=1, f(1)=1'
    elif oracle_type == 'balanced_identity':
        oracle_desc = 'f(0)=0, f(1)=1'
    else:
        oracle_desc = 'f(0)=1, f(1)=0'

    summary = (
        f"Oracle: {oracle_desc}\n"
        f"Formula: |ψ₀⟩ = |0⟩|1⟩\n"
        f"Formula: |ψ₁⟩ = H⊗H|ψ₀⟩ = (|0⟩+|1⟩)/√2 ⊗ (|0⟩−|1⟩)/√2\n"
        f"Formula: |ψ₂⟩ = Uf|ψ₁⟩  →  Phase Kickback: (−1)^f(x)\n"
        f"Formula: |ψ₃⟩ = H|ψ₂⟩  →  Measurement: |{measured_bit}⟩ = {result_type}"
    )

    return {
        'algorithm': 'deutsch',
        'oracle_type': oracle_type,
        'circuit': circuit,
        'result': result_type,
        'measurement': str(measured_bit),
        'state_history': state_history,
        'summary': summary,
    }
