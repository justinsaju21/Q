# EXPERIMENT – 10
## Quantum Teleportation: Transporting States without Physical Movement

---

### **10.1 OBJECTIVES**
The objective of this module is to implement the "Jewel" of quantum communication: **Quantum Teleportation**. Students will learn how to transfer the exact quantum state ($|\psi\rangle$) of one qubit to another distant qubit using a shared entanglement resource and classical communication.

**Key Learning Outcomes**:
1.  **Protocol Architecture**: To master the 3-qubit teleportation circuit spanning Alice (Sender) and Bob (Receiver).
2.  **No-Cloning Theorem**: To understand the physical law that prohibits copying quantum states and explains why the original must be destroyed.
3.  **Joint Measurement**: To categorize the **Bell State Measurement (BSM)** used to "disassemble" the state at the source.
4.  **Information Flux**: To differentiate between the **Quantum Channel** (entanglement) and the **Classical Channel** (bits) required for success.
5.  **Industrial Application**: To analyze the records set by the **Micius Satellite** and its implications for a global Quantum Internet.

---

### **10.2 APPARATUS & VIRTUAL ENVIRONMENT**
| S.No | Component | Specification / Version | Quantity |
| :--- | :--- | :--- | :--- |
| 1 | Quantum Simulator Engine | WebGL-Accelerated v1.0 | 1 |
| 2 | Triple-Qubit Circuit Array | Q0 (Source), Q1 (Carrier), Q2 (Target) | 1 |
| 3 | Entanglement Source | H + CNOT (Q1-Q2 Link) | 1 |
| 4 | Bell Measurement Unit | CNOT + H + Measurement | 1 Set |
| 5 | Conditional Corrections | Classical-Control Pauli-X and Z | 1 Set |

---

### **10.3 THEORETICAL FOUNDATION**
*(Word Count Target: 500+)*

**10.3.1 Moving the "Soul," Not the "Body"**
In science fiction, teleportation involves moving a physical object through space. In quantum mechanics, however, teleportation is more subtle. We don't move the qubit itself; we move its **State**. 

Imagine you have a piece of paper with a unique poem on it. Teleportation isn't sending the paper in an envelope. It's more like Alice reading the poem (Measurement), shredding the original (No-Cloning Theorem), calling Bob over the phone (Classical Channel), and Bob writing the poem down on a fresh piece of paper in his lab. In this analogy, the "poem" is the quantum state $|\psi\rangle$, and the "fresh paper" is a qubit already in Bob's possession that he has previously entangled with Alice.

**10.3.2 The No-Cloning Theorem**
Why must we shred the original? In 1982, physicists Wootters, Zurek, and Dieks proved the **No-Cloning Theorem**. It states that it is mathematically impossible to create an exact, independent copy of an unknown quantum state. If you could clone a qubit, you could violate Heisenberg’s Uncertainty Principle or even send information faster than light. Because we cannot clone $|\psi\rangle$, the only way for Bob to get it is for Alice to **destroy** her version. Teleportation is a "State Transfer," never a "State Multiplication."

**10.3.3 The Core Logic: Bell State Measurement**
Teleportation relies on a 3-qubit dance.
1.  **The Link**: Alice and Bob first share an entangled pair (Q1 and Q2).
2.  **The Merger**: Alice takes her "unknown state" (Q0) and meshes it with her half of the link (Q1) using a CNOT and H-gate.
3.  **The Disassembly**: Alice measures her two qubits. This "collapses" the entire 3-qubit system. Because the qubits are entangled, this measuring action instantly "kicks" Bob’s qubit (Q2) into a state that is mathematically related to Alice’s original poem.
4.  **The Phone Call**: Alice sends her 2-bit measurement result to Bob. This is the **Classical Channel**.
5.  **The Reconstruction**: Based on those bits, Bob applies a final rotation (X or Z) to "fix" his qubit, bringing it into perfect alignment with Alice's original.

**10.3.4 Historical Context: The Micius Satellite**
In 2017, the **University of Science and Technology of China (USTC)** used the Micius satellite to teleport a qubit state from a ground station in Tibet to a satellite 1,400 km above the Earth. This proved that the "Spooky Link" could survive atmospheric turbulence and massive distances, paving the way for a orbital quantum network.

---

### **10.4 MATHEMATICAL MODELING**
*(Word Count Target: 300+)*

**10.4.1 The Pre-Teleportation State**
Let the state to be teleported be $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$.
Alice and Bob share $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$.
The total 3-qubit state is:
$$|\Psi_{Total}\rangle = (\alpha|0\rangle + \beta|1\rangle) \otimes \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$$

**10.4.2 The Bell Measurement Collapse**
After Alice performs her CNOT and H-gate on the first two qubits, the joint state can be rewritten. If Alice measures her qubits and gets "00", the remaining qubit (Bob's) collapses into:
$$|\psi_{Bob}\rangle = \alpha|0\rangle + \beta|1\rangle$$
Wait! This is the **exact** original state. Bob doesn't even need to do anything.
However, if Alice measures "11", Bob's state becomes:
$$|\psi_{Bob}\rangle = \alpha|1\rangle - \beta|0\rangle$$
To "fix" this, Bob must apply an **X and a Z gate**.

**10.4.3 Classical Bit Logic**
Total outcomes for Alice:
*   `00` $\rightarrow$ Bob does nothing.
*   `01` $\rightarrow$ Bob applies **X**.
*   `10` $\rightarrow$ Bob applies **Z**.
*   `11` $\rightarrow$ Bob applies **XZ**.

---

### **10.5 PRE-LAB EVALUATION (Preparation)**
1.  **Cloning Paradox**: Why is it impossible to build a "Quantum Xerox Machine"?
2.  **Channels**: Why can't teleportation happen without a "Classical Phone Call"? (Think about the speed of light).
3.  **State Identity**: After the experiment, what state is Alice's original qubit (Q0) in?
4.  **Calculations**: If Alice measures `01`, what operation must Bob perform to recover the state?
5.  **Probability**: Before Bob applies his correction, what is the probability that he already has the correct state without doing anything?
6.  **Distance**: Does the simulator's "Entanglement Link" visual get weaker as you add more gates? Explain using decoherence theory.
7.  **No-Communication Theorem**: Prove that Alice cannot send a "Hello" message to Bob using teleportation alone.

---

### **10.6 EXPERIMENTAL PROCEDURE**
*(Word Count Target: 600+)*

**Phase 1: Preparing the "Soul" to be Teleported**
1.  Initialize **3 Qubits** in state $|000\rangle$.
2.  **Alice’s Secret**: Apply a rotation gate (e.g., $Ry(45^\circ)$) to `q0`. This is the state we want to teleport.
3.  Observe the **Phase Disk** for `q0`. Note the specific tilt—this is what Bob must receive.

**Phase 2: Distributing the Link**
4.  Create entanglement between `q1` (Alice) and `q2` (Bob).
5.  **Circuit**: $H$ on `q1`, followed by $CNOT(1,2)$.
6.  Verify the **3D Entanglement Web** connects `q1` and `q2`.

**Phase 3: The Bell State Measurement (Alice’s Lab)**
7.  Alice interacts her secret (`q0`) with her link (`q1`).
8.  **Circuit**: $CNOT(0,1)$ followed by $H$ on `q0$.
9.  Add **Measurement Gates** to both `q0` and `q1`.
10. Click **Next Step**. Observe the **Histogram**. You will see one of four binary strings (e.g., `00...`, `01...`, etc.).

**Phase 4: The Conditional Correction (Bob’s Lab)**
11. Based on Alice's measurement, apply the fix to `q2`:
    - If `q1` was $1$, apply **X** to `q2`.
    - If `q0` was $1$, apply **Z** to `q2`.
12. 🚩 **FINAL AUDIT**:
    - Observe the **Phase Disk for q2**. Does it exactly match the initial disk for `q0`?
    - Compare the **Statevector amplitudes** of the final `q2` with your notes from Phase 1.
13. If they match, you have successfully teleported a quantum state!

---

### **10.7 OBSERVATION & PREDICTIVE ANALYSIS**

**Observation Table 10.1**:
| Original State $|\psi\rangle$ | Alice Measures ($q_0q_1$) | Bob's Interim State | Correction Applied | Final Outcome Match? |
| :--- | :--- | :--- | :--- | :--- |
| $Ry(45^\circ)$ | `00` | $|\psi\rangle$ | None | YES |
| $Ry(45^\circ)$ | `10` | $Z|\psi\rangle$ | $Z$ | YES |
| $H|0\rangle$ | | | | |
| $S|0\rangle$ | | | | |

**Visual Analysis**:
*   **The Path of Information**: Map the different pulses in the circuit. Identify the "Quantum Pulse" (entanglement) vs. the "Classical Pulse" (measurement bits).
*   **Decoherence Visual**: In a real system, the longer the circuit, the "fuzzier" the Phase Disk becomes. How does the simulator handle this high-complexity logic?

---

### **10.8 INDUSTRY CASE STUDY: THE RECORD-BREAKERS**
*(Word Count Target: 300+)*

**Hardware Modality: Photonic Satellites & Diamond Hubs**
The race for teleportation is being led by two major groups:
1.  **USTC (China)**: Jian-Wei Pan’s team holds the world record for distance (1,400 km) using the Micius satellite. They are currently planning a second satellite, "Micius-II," which aims to distribute entanglement at even higher rates for a persistent teleportation channel.
2.  **QuTech (Delft, Netherlands)**: While USTC focuses on distance, TU Delft focuses on **Networking**. In 2022, they were the first to teleport a state across a "multi-node" network, moving a qubit between two labs that were not directly connected. This is the blueprint for a distributed Quantum Data Center.

**Industrial Application: Unhackable Clouds**
Why teleport? If a company wants to process sensitive financial data on a quantum cloud, they don't want to send their data via regular fiber. By teleporting the state directly into the cloud's processor, the data **never physically travels** across the internet in a readable form. It is the ultimate shield for data-in-transit.

---

### **10.9 POST-LAB ANALYTICAL QUESTIONS**
1.  **The Information Limit**: If Alice didn't "shred" her qubit (Measure it), could Bob still receive the state? Explain using the No-Cloning theorem.
2.  **Classical Delay**: Why can't Bob start using his qubit the *microsecond* Alice measures hers? What is he waiting for?
3.  **Visualization Insight**: Describe how the **3D Web** connects Alice and Bob's panels. What happens to the web visual at the exact moment Alice performs her measurement?
4.  **Hardware Insight**: In a fiber-optic network, every 50 km of glass absorbs 90% of the light. How do "Quantum Repeaters" use teleportation to overcome this loss?
5.  **Scaling**: Could you teleport a 2-qubit entangled state? What would be the "cost" in terms of shared entanglement?

---

### **10.10 CONCLUSION & NEXT STEPS**
**Summary of Findings**: We have successfully implemented the most famous protocol in quantum science. We proved that state-transfer is possible without physical travel, provided we sacrifice an entanglement resource and pay the price of a classical phone call.

**Final Insight**: In the quantum world, "Information" is separate from "Matter."

**Preparation for Lab 11**: 
We've moved information; now let's use it for **Speed**. In **Lab 11**, we will implement our first true speedup: **Deutsch’s Algorithm**, and see how a quantum computer can "solve a riddle" in half the time of a classical one.
