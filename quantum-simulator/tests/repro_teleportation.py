
import sys
import os
import numpy as np

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from simulation_engine.algorithms import teleportation

def test_teleportation():
    # Test cases: (theta, phi)
    test_cases = [
        (0, 0),          # |0>
        (np.pi, 0),      # |1>
        (np.pi/2, 0),    # |+>
        (np.pi/2, np.pi/2), # |i+>
    ]
    
    for theta, phi in test_cases:
        print(f"\nTesting Teleportation for theta={theta:.3f}, phi={phi:.3f}")
        result = teleportation.run(theta=theta, phi=phi)
        
        orig = result['original_state']
        alpha = complex(orig['alpha']['real'], orig['alpha']['imag'])
        beta = complex(orig['beta']['real'], orig['beta']['imag'])
        
        bob_bloch = result['bob_qubit_bloch']
        
        # Theoretical Bloch from alpha, beta
        # z = |alpha|^2 - |beta|^2
        # x = 2 * Re(alpha * conj(beta))
        # y = 2 * Im(alpha * conj(beta))
        expected_z = np.abs(alpha)**2 - np.abs(beta)**2
        expected_x = 2 * (alpha * np.conj(beta)).real
        expected_y = 2 * (alpha * np.conj(beta)).imag
        
        print(f"Expected Bloch: x={expected_x:.3f}, y={expected_y:.3f}, z={expected_z:.3f}")
        print(f"Actual Bob Bloch: x={bob_bloch['x']:.3f}, y={bob_bloch['y']:.3f}, z={bob_bloch['z']:.3f}")
        
        diff = np.sqrt((expected_x - bob_bloch['x'])**2 + 
                       (expected_y - bob_bloch['y'])**2 + 
                       (expected_z - bob_bloch['z'])**2)
        
        if diff < 1e-5:
            print("✅ SUCCESS: State teleported correctly!")
        else:
            print(f"❌ FAILURE: State mismatch! Diff: {diff:.5f}")

if __name__ == "__main__":
    test_teleportation()
