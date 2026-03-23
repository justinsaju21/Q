# EXPERIMENT – 07
## Controlled Logic: Universal Gates & The Birth of Interaction

---

### **07.1 OBJECTIVES**
The goal of this laboratory is to move beyond the isolated qubit and explore **Quantum Interaction**. Students will learn how the state of one qubit can be used to control the state of another, forming the basis for **Universal Computation**.

**Key Learning Outcomes**:
1.  **Multi-Qubit Gates**: To master the operations and 4x4 matrix representation of the **Controlled-NOT (CNOT)** gate.
2.  **Logic Synchronization**: To understand the **Interactive Highlighting** UI—how actions on a Control wire affect the Target's state.
3.  **Cross-Component Analysis**: To interpret the change in the **Phase Disk Array** as two independent qubits begin to share a computational destiny.
4.  **Mathematical Derivation**: To use **Tensor Products** to calculate the joint state of a 2-qubit system.
5.  **Industrial Application**: To analyze the role of CNOT gates in building **Error-Resilient Logical Qubits**.

---

### **07.2 APPARATUS & VIRTUAL ENVIRONMENT**
| S.No | Component | Specification / Version | Quantity |
| :--- | :--- | :--- | :--- |
| 1 | Quantum Simulator Engine | WebGL-Accelerated v1.0 | 1 |
| 2 | Multi-Wire Circuit Editor | 2-Qubit Configuration | 1 |
| 3 | Statevector Monitor | 4-Outcome Amplitude Display ($00, 01, 10, 11$) | 1 |
| 4 | Gate Library | CNOT (CX), Pauli-X, Identity (I) | As Req. |
| 5 | Cross-Panel Highlighting | Interaction Visualizer (UI Feature) | 1 |

---

### **07.3 THEORETICAL FOUNDATION**
*(Word Count Target: 500+)*

**07.3.1 From Individual to Collective Behavior**
Until now, our experiments have been "lonely." We manipulated one qubit at a time. However, a single qubit can only hold a tiny amount of information. The power of a quantum computer arises from the **Interaction** between qubits. When qubits interact, they cease to be independent entities and become a single, collective system.

In classical computing, the most important interactive gate is the **NAND** gate, which is "Universal" because you can build any other gate using only NANDs. In the quantum world, the **CNOT** gate (Controlled-NOT) serves a similar purpose. When combined with single-qubit rotations (like those from Lab 03), the CNOT allows us to build any quantum algorithm imaginable.

**07.3.2 The Logic of Conditionality**
The CNOT gate involves two qubits:
1.  **The Control Qubit (C)**: This qubit acts as the "Switch." If it is in state $|0\rangle$, nothing happens to the other qubit. If it is in state $|1\rangle$, it triggers a reaction.
2.  **The Target Qubit (T)**: This qubit is the "Responder." It is flipped (NOT'ed) if and only if the control qubit was $|1\rangle$.

This is equivalent to the classical **XOR** (Exclusive OR) operation. But there is a massive difference: in quantum mechanics, the control qubit doesn't have to be just a 0 or a 1. It can be a **Superposition**. When the control is in a superposition, the CNOT gate doesn't just "flip" the target; it creates a bridge between them that leads to Entanglement (the subject of Lab 08).

**07.3.3 The Physics of Coupling**
How do we physically make two qubits "talk" to each other? Qubits are often charged particles or magnets. To perform a CNOT gate, we bring them close together so that their fields overlap. This is called **Coulomb Coupling** (for electrical charges) or **Dipole-Dipole Interaction** (for magnetic moments). 

In our simulator, this is represented by the vertical line connecting the two wires. In real superconducting hardware, this is achieved by a "Coupler"—a specialized circuit component that allows a pulse on one wire to "leak" into the neighboring wire under specific conditions.

**07.3.4 Historical Context: The DiVincenzo Criteria**
In 2000, physicist David DiVincenzo listed the five requirements for a practical quantum computer. Criteria #4 was: "A Universal Set of Quantum Gates." The CNOT was the first multi-qubit gate ever implemented (using a trapped ion) in 1995, proving that "Collective Computing" was possible.

---

### **07.4 MATHEMATICAL MODELING**
*(Word Count Target: 300+)*

**07.4.1 The Joint State Vector**
To represent two qubits, we use a 4-dimensional vector. The basis states are $|00\rangle, |01\rangle, |10\rangle, \text{ and } |11\rangle$.
If Qubit 1 is $|a\rangle$ and Qubit 2 is $|b\rangle$, the joint state is the **Tensor Product**:
$$|\psi\rangle = |a\rangle \otimes |b\rangle$$

**07.4.2 The CNOT Matrix**
The CNOT gate is a 4x4 unitary matrix:
$$CNOT = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 1 & 0 \end{pmatrix}$$
Observe how the top-left 2x2 is an Identity matrix (stays the same if Control=0), and the bottom-right 2x2 is an X-matrix (flips if Control=1).

**07.4.3 Deriving the Output**
Let's apply CNOT to state $|10\rangle$ (Control=1, Target=0):
$$|\psi_{final}\rangle = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 1 & 0 \end{pmatrix} \begin{pmatrix} 0 \\ 0 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \\ 1 \end{pmatrix} = |11\rangle$$
The target qubit was successfully flipped from 0 to 1 because the control was 1.

---

### **07.5 PRE-LAB EVALUATION (Preparation)**
1.  **Definitions**: What is a "Universal Gate Set"? Name two gates that comprise it.
2.  **Logic Logic**: If the Control is $|0\rangle$ and the Target is $|1\rangle$, what is the final state after a CNOT?
3.  **Tensor Math**: Calculate the 4-element vector for the state $|01\rangle$.
4.  **UI Prediction**: When you drag a CNOT gate over two wires, which panel in the simulator will show the most complex change?
5.  **Interactive Glow**: Explain how the "Cross-Component Highlighting" helps you verify which qubit is the Control.
6.  **Physics Check**: What is the name of the physical force that allows two ions to "talk" to each other?
7.  **Unitary Proof**: Confirm that the CNOT matrix is its own inverse ($CNOT^2 = I$).

---

### **07.6 EXPERIMENTAL PROCEDURE**
*(Word Count Target: 600+)*

**Phase 1: Binary Determinism (The Classical Mode)**
1.  Initialize the simulator with **2 Qubits**.
2.  **State Baseline**: Confirm the starting state is $|00\rangle$ (both vectors North).
3.  **Circuit Setup**: Drag the **CX (CNOT)** gate. Place the dot (Control) on `q0` and the circle (Target) on `q1`.
4.  Click **Next Step**.
    - **Observe**: Nothing changes! Why? Because the control qubit (`q0`) is $|0\rangle$.
5.  Verify the **Statevector Table**. It should still be 100% for index `00`.

**Phase 2: Triggering the Flip**
6.  Modify the circuit: Add an **X-gate** on `q0` *before* the CNOT. ($|0\rangle \rightarrow |1\rangle$).
7.  Click **Next Step**. 🚩 **WATCH THE PULSE dot**:
    - **Step 1**: The X-gate pulse hits `q0`. Its Bloch vector flips to the South Pole.
    - **Step 2**: The collective pulse reaches the CNOT.
    - **Outcome**: Observe the **q1 Bloch Sphere** suddenly flipping from North to South.
8.  **Data Harvesting**: Check the **Histogram**. It should now show 100% for code `11`. Record this as the "Successful Conditional Flip."

**Phase 3: The Interaction UI (Power User Feature)**
9.  Hover your mouse over the CNOT gate on the wire.
10. Notice that both the `q0` and `q1` Bloch Sphere panels begin to "glow" or sync their highlights. This visual engine is proving the logical link between them.
11. Observe the **Statevector Table** again. Notice how the row for `11` is now highlighted in a different color, reflecting the multi-qubit nature of the state.

**Phase 4: CNOT on Superposition (The Intro to Spooky)**
12. Replace the X-gate on `q0` with an **H-gate** ($|0\rangle \rightarrow |+\rangle$).
13. Keep the CNOT on both wires. Run the simulation.
14. **Observation**: Notice that the **Control** is "spinning" in a 50/50 state, and the **Target** is also somewhat affected.
15. This is no longer a simple flip—it is the creation of a **Bell State**. Record the statevector. You have officially created Entanglement.

---

### **07.7 OBSERVATION & PREDICTIVE ANALYSIS**

**Observation Table 07.1**:
| Sequence | Control State | Target State | Final Logical State | P(11) | Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| CNOT(0, 0) | $|0\rangle$ | $|0\rangle$ | $|00\rangle$ | 0% | No Action |
| CNOT(1, 0) | $|1\rangle$ | $|0\rangle$ | $|11\rangle$ | 100% | Flip Success |
| CNOT(1, 1) | $|1\rangle$ | $|1\rangle$ | $|10\rangle$ | 0% | Flip back to 0 |
| CNOT(+, 0) | $|+\rangle$ | $|0\rangle$ | | | Entangled |

**Visual Analysis**:
*   **Highlight Mapping**: Draw a diagram of how the "Glow" connects the circuit wire to the specific 3D Panels in the simulator.
*   **Histogram Resolution**: Why are there 4 columns in the histogram now? Label each column with its binary string ($00, 01, 10, 11$).

---

### **07.8 INDUSTRY CASE STUDY: LOGIC SYNTHESIS**
*(Word Count Target: 300+)*

**Hardware Modality: Superconducting Quasiparticles**
In companies like **Rigetti** and **Amazon Braket**, they don't manually drag gates for every operation. They use **Compilers** (like Quill or Cirq). These compilers take high-level math and decompose it into a series of CNOT gates.

**Industrial Application: Fault-Tolerant Gates**
The biggest challenge in quantum industry is **Gate Fidelity**. Because CNOT gates involve two qubits interacting, they are 10x slower and 10x noisier than single-qubit gates.
1.  **Logical Qubits**: Companies are developing **Surface Codes** that use dozens of CNOT gates to create one "Logical Qubit" that is immune to noise. 
2.  **Quantum Volume**: This is a key industrial metric (pioneered by IBM). It determines the complexity of a processor based on how many CNOT gates it can execute before the information is lost to noise. When you use the CNOT in this lab, you are interacting with the most difficult and powerful gate in modern engineering.

---

### **07.9 POST-LAB ANALYTICAL QUESTIONS**
1.  **The XOR Paradox**: Why is the CNOT gate mathematically equivalent to the classical XOR gate? If the inputs were $A$ and $B$, what is the target output?
2.  **Order of Logic**: If you place a CNOT with `q1` as the control and `q0` as the target, how does the 4x4 matrix change? (Hint: See the "Controlled-Z" matrix for comparison).
3.  **Experimental Interaction**: Describe how the **Pulse Propagation** visual helps you visualize the "Timing" of the interaction. Do both qubits react at exactly the same micro-second?
4.  **Hardware Insight**: Why do industry leaders strive to reduce the "Gate Time" of the CNOT? What physical process (like decoherence) happens if the gate takes too long?
5.  **Scaling**: If you have 3 qubits and you want to flip the 3rd qubit ONLY if the 1st and 2nd are both 1, how many CNOT gates would you need? (Research the **Toffoli Gate**).

---

### **07.10 CONCLUSION & NEXT STEPS**
**Summary of Findings**: We have successfully mastered multi-qubit logic. We proved that the CNOT gate acts as a conditional switch, allowing information to flow between independent qubits.

**Final Insight**: Interaction is the bridge from "Physics" to "Computing."

**Preparation for Lab 08**: 
We've seen how CNOT bridges qubits, but what happens when that bridge becomes unbreakable? In **Lab 08**, we will use CNOT on a superposition to create **The Spooky Link** (Entanglement) and perform a **Bell Test** to prove that Einstein's "Local Realism" is false.
