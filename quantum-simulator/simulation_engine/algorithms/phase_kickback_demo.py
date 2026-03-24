"""
Phase Kickback Demonstration
============================
A visual lab demonstrating the Phase Kickback mechanism natively.

By setting a target qubit into different states and applying a
Controlled-Phase (CP) gate, we can see the control qubit undergo
a rotation along the Z-axis of the Bloch sphere, entirely "kicked back"
from the target qubit.

This provides visual intuition for why Uf affects the input register
in Deutsch's and Shor's algorithms.
"""

from typing import List, Dict
import numpy as np
from ..quantum_state import QuantumState


def generate_circuit(target_state: str, kickback_angle_pi: float) -> List[Dict]:
    """Generate the Phase Kickback circuit.

    Args:
        target_state: '|0⟩', '|1⟩', '|+⟩', or '|−⟩'
        kickback_angle_pi: Phase angle $\\theta$ in multiples of $\\pi$.
    """
    steps: List[Dict] = []
    
    # Step 1: Initialize Target Qubit q1
    label_target = f'Prepare target q1 in state {target_state}'
    if target_state == '|1⟩':
        steps.append({'gate': 'X', 'targets': [1], 'label': label_target, 'param': None})
    elif target_state == '|+⟩':
        steps.append({'gate': 'H', 'targets': [1], 'label': label_target, 'param': None})
    elif target_state == '|−⟩':
        steps.append({'gate': 'X', 'targets': [1], 'label': 'X to |1⟩', 'param': None})
        steps.append({'gate': 'H', 'targets': [1], 'label': label_target, 'param': None})
    else:
        # |0⟩ requires no gate
        pass

    # Step 2: Initialize Control Qubit q0 to |+⟩
    steps.append({
        'gate': 'H',
        'targets': [0],
        'label': 'Prepare control q0 in superposition |+⟩ (Equator of Bloch Sphere)',
        'param': None,
    })

    # Step 3: Apply Controlled-Phase Gate
    # Instead of Uf, we use a standard CP gate where param=theta.
    # In the UI circuit, we can model this with the abstract `P` gate controlled, but we 
    # don't have a CP gate natively in CircuitEditor rendering. It renders C-something automatically.
    # Let's use CZ if angle is 1.0, otherwise we'd need CP. Our engine supports applying generic matrices.
    # Let's map it to an abstract `CP` gate string for the UI, and build the 4x4 matrix here.
    
    theta = kickback_angle_pi * np.pi
    
    steps.append({
        'gate': 'CP',
        'targets': [0, 1],
        'label': f'Apply Controlled-Phase(θ = {kickback_angle_pi}π). Watch q0 on the Bloch sphere!',
        'param': theta,
    })

    # Step 4: Measure (optional, just to complete the circuit formally)
    steps.append({
        'gate': '__measure__',
        'targets': [0],
        'label': 'Measure control qubit',
        'param': None,
    })

    return steps


def run(target_state: str = '|1⟩', kickback_angle_pi: float = 1.0) -> Dict:
    """Execute the Phase Kickback Lab."""
    state = QuantumState(2)
    circuit = generate_circuit(target_state, kickback_angle_pi)
    state_history = [state.to_dict()]

    measured_bit = 0
    theta = kickback_angle_pi * np.pi

    # Build CP 4x4 Matrix
    # CP = diag(1, 1, 1, e^{i theta})
    cp_matrix = np.eye(4, dtype=complex)
    cp_matrix[3, 3] = np.exp(1j * theta)

    for step in circuit:
        if step['gate'] == 'CP':
            state.apply_gate_matrix(cp_matrix, step['targets'])
        elif step['gate'] == '__measure__':
            from ..measurement import measure_qubit
            measured_bit, state = measure_qubit(state, step['targets'][0])
        else:
            state.apply_gate(step['gate'], step['targets'], step.get('param'))
        
        state_history.append(state.to_dict())

    # Calculate expected phase kickback
    # If target is |0>, kickback = 0
    # If target is |1>, kickback = theta
    # If target is |+>, control becomes entangled (not pure phase kickback)
    # If target is |-> and theta=pi, control shifts by pi
    
    if target_state == '|0⟩':
        kick_desc = "Target is |0⟩, so the Phase gate never activates. No kickback."
    elif target_state == '|1⟩':
        kick_desc = f"Target is |1⟩, so Phase gate activates. Control q0 absorbs {kickback_angle_pi}π phase rotation!"
    elif target_state == '|−⟩':
        kick_desc = f"Target is |−⟩. The phase transfers fully to the control qubit!"
    else:
        kick_desc = "Target is |+⟩. This creates ENTANGLEMENT between q0 and q1 instead of pure phase kickback."

    summary = (
        f"Experiment: Controlled-Phase(θ={kickback_angle_pi}π) with Target={target_state}\n"
        f"Formula: Control initially: |ψ_control⟩ = |+⟩ (0 phase)\n"
        f"Formula: Target initially: |ψ_target⟩ = {target_state}\n"
        f"Formula: {kick_desc}"
    )

    return {
        'algorithm': 'phase_kickback',
        'target_state': target_state,
        'kickback_angle_pi': kickback_angle_pi,
        'circuit': circuit,
        'result': 'Demonstration Complete',
        'measurement': str(measured_bit),
        'state_history': state_history,
        'summary': summary,
    }
