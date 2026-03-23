# EXPERIMENT – 09
## Superdense Coding: Doubling Data Capacity via Entanglement

---

### **09.1 OBJECTIVES**
The objective of this module is to demonstrate a practical application of entanglement: **Superdense Coding**. Students will learn how to send two classical bits of information (00, 01, 10, or 11) by transmitting only a single physical qubit between two parties.

**Key Learning Outcomes**:
1.  **Protocol Execution**: To implement the three-stage protocol: Entanglement Distribution, Encoding, and Decoding.
2.  **Information Theory**: To understand how entanglement "pre-loads" capacity into a communication channel.
3.  **Gate Mastery**: To use the Pauli-X, Z, and Y gates to transform the $|\Phi^+\rangle$ state into each of the four Bell bases.
4.  **Mathematical Mapping**: To derive the relationship between single-qubit operations and multi-qubit outcomes.
5.  **Industrial Application**: To analyze the potential for satellite-based **Quantum Telecommunications** and secure bandwidth optimization.

---

### **09.2 APPARATUS & VIRTUAL ENVIRONMENT**
| S.No | Component | Specification / Version | Quantity |
| :--- | :--- | :--- | :--- |
| 1 | Quantum Simulator Engine | WebGL-Accelerated v1.0 | 1 |
| 2 | Entanglement Source | H + CNOT Factory | 1 |
| 3 | Statevector Monitor | 4x1 Complex Mapping | 1 |
| 4 | Encoding Gate Set | Identity (I), X, Z, Y | 1 Set |
| 5 | Decoding Logic | CNOT + H (The Inverse Bell) | 1 Set |

---

### **09.3 THEORETICAL FOUNDATION**
*(Word Count Target: 500+)*

**09.3.1 Breaking the Shannon Limit**
In classical information theory, Claude Shannon proved that you can only send one bit of information per physical bit transmitted. This is a fundamental limit of the universe—or so it seemed. However, in 1992, Charles Bennett and Stephen Wiesner discovered that if two parties share an **Entangled Pair**, they can cheat this limit. 

By manipulating only one half of the entangled pair and sending that single qubit to a receiver, the sender (Alice) can effectively convey **two** classical bits of information. This is **Superdense Coding**. It effectively "doubles" the capacity of a quantum communication line compared to a classical one.

**09.3.2 The Coding Strategy (Alice’s Perspective)**
Imagine Alice and Bob share the $|\Phi^+\rangle$ state: $\frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$.
Alice wants to send one of four classical messages:
*   **Message "00"**: She does nothing (Identity gate).
*   **Message "01"**: She applies an **X-gate** to her qubit.
*   **Message "10"**: She applies a **Z-gate** to her qubit.
*   **Message "11"**: She applies a **Y-gate** (or $i \cdot X \cdot Z$) to her qubit.

By performing these single-qubit rotations, Alice is actually switching the *entire joint state* of the two qubits into one of the four Bell States. She then sends her single qubit across the room (or across space) to Bob.

**09.3.3 The Decoding Strategy (Bob’s Perspective)**
When Bob receives Alice’s qubit, he now has both halves of the entangled pair. But looking at them individually tells him nothing—they both look like 50/50 noise. To "read" the message, Bob must **un-entangle** the pair. He does this by running the Bell Circuit in reverse:
1.  **CNOT**: Collapses the correlation.
2.  **Hadamard**: Rotates the basis back to the Z-axis.
3.  **Measurement**: The final histogram reveals the 2-bit message Alice intended.

**09.3.4 Physical Context: The 2-Bit Qubit**
This experiment proves that entanglement is a physical resource, like fuel or electricity. The "second bit" of information isn't created out of thin air; it was "stored" in the shared entanglement that Alice and Bob established at the beginning. In modern industry, this is seen as a way to maximize the data throughput of expensive satellite links.

---

### **09.4 MATHEMATICAL MODELING**
*(Word Count Target: 300+)*

**09.4.1 Encoding Table (Matrix Transformations)**
Starting from the $|\Phi^+\rangle$ state:
1.  **Identity (00)**: $I \otimes I |\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle) = |\Phi^+\rangle$
2.  **X-Gate (01)**: $X \otimes I |\Phi^+\rangle = \frac{1}{\sqrt{2}}(|10\rangle + |01\rangle) = |\Psi^+\rangle$
3.  **Z-Gate (10)**: $Z \otimes I |\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle - |11\rangle) = |\Phi^-\rangle$
4.  **Y-Gate (11)**: $Y \otimes I |\Phi^+\rangle = \frac{i}{\sqrt{2}}(|01\rangle - |10\rangle) = i|\Psi^-\rangle$

**09.4.2 The Decoding Derivation**
For Alice’s "10" message ($|\Phi^-\rangle$):
1.  **CNOT**: $CNOT \frac{1}{\sqrt{2}}(|00\rangle - |11\rangle) = \frac{1}{\sqrt{2}}(|00\rangle - |10\rangle)$
2.  **Hadamard on Q0**: 
    - $H \otimes I \frac{1}{\sqrt{2}}(|00\rangle - |10\rangle) = \frac{1}{\sqrt{2}}H|0\rangle \otimes |0\rangle - \frac{1}{\sqrt{2}}H|1\rangle \otimes |0\rangle$
    - $\frac{1}{2}(|0\rangle+|1\rangle)|0\rangle - \frac{1}{2}(|0\rangle-|1\rangle)|0\rangle$
    - Canceling the $|00\rangle$ terms: $\frac{1}{2}|00\rangle - \frac{1}{2}|00\rangle = 0$.
    - Adding the $|10\rangle$ terms: $\frac{1}{2}|10\rangle - (-\frac{1}{2})|10\rangle = 1|10\rangle$.
**Final Result**: Bob measures `10`, perfectly recovering Alice's message.

---

### **09.5 PRE-LAB EVALUATION (Preparation)**
1.  **Shannon Limit**: In your own words, why is Superdense Coding considered "impossible" in classical physics?
2.  **Alice & Bob**: During the protocol, how many qubits are physically moved from Alice's lab to Bob's lab?
3.  **The Middle State**: After Alice applies her gate but before Bob receives the qubit, what is the Purity of Bob's qubit?
4.  **Calculations**: If Alice wanted to send "01", which gate must she apply to her qubit?
5.  **Reversibility**: Why is Bob's decoding circuit ($CNOT + H$) called the "Inverse Bell" circuit?
6.  **Phase**: Why does Alice use a Z-gate to send the message "10" instead of just another X-gate?
7.  **Resource Usage**: Can Alice and Bob perform Superdense Coding twice using the same entangled pair? Explain why or why not.

---

### **09.6 EXPERIMENTAL PROCEDURE**
*(Word Count Target: 600+)*

**Phase 1: Preparing the Channel**
1.  Initialize **2 Qubits** in state $|00\rangle$.
2.  Build the **Entanglement Source**: Place an **H-gate** on `q0` and a **CNOT (0,1)**.
3.  Verify the joint state is $|\Phi^+\rangle$. This is the "Shared Channel."

**Phase 2: Alice’s Encoding (The Message)**
4.  **Selection**: Choose a 2-bit target message (e.g., `10`).
5.  **Gate Placement**: Place the required gate (**Z-gate**) on `q0` (Alice’s wire).
6.  Click **Next Step**. Observe the **Bloch Sphere**. Alice's vector should rotate, but notice that the joint state (Statevector Table) transitions to a new Bell State ($|\Phi^-\rangle$).
7.  Verify that the **3D Entanglement Web** is still active and robust.

**Phase 3: Bob’s Decoding (The Reception)**
8.  Place Bob’s decoder *after* Alice's gate:
    - **CNOT (q0 as control, q1 as target)**.
    - **Hadamard on q0**.
9.  Click **Next Step** iteratively. 🚩 **WATCH THE PULSE dot**:
    - **Step 1**: The pulse hits the CNOT. Watch the entanglement between the spheres "collapse."
    - **Step 2**: The pulse hits the H-gate. The vector on `q0` rotates back to the pole.
10. Observe the **Histogram**. It should reveal your chosen message (`10`) with 100% certainty.

**Phase 4: Comprehensive Test Cycle**
11. Repeat the experiment for all four messages ($00, 01, 10, 11$).
12. **Observation**: Notice how the **Phase Disks** for the joint state change for each message. This is how Bob "measures" the phase that Alice hid in the qubit.

---

### **09.7 OBSERVATION & PREDICTIVE ANALYSIS**

**Observation Table 09.1**:
| Target Message | Alice's Gate | Bell State Created | Bob's Measured State | Success (%) |
| :--- | :--- | :--- | :--- | :--- |
| `00` | $I$ | $|\Phi^+\rangle$ | `00` | 100% |
| `01` | $X$ | $|\Psi^+\rangle$ | `01` | 100% |
| `10` | $Z$ | $|\Phi^-\rangle$ | | |
| `11` | $Y$ | $|\Psi^-\rangle$ | | |

**Visual Analysis**:
*   **The Transmission Leap**: Sketch the circuit. Draw a line in the middle representing the "Quantum Channel" where the qubit travels from Alice to Bob.
*   **Entropy Table**: Compare the classical Shannon Entropy vs. the Quantum Information Capacity for this 1-qubit transfer.

---

### **09.8 INDUSTRY CASE STUDY: SATELLITE BANDWIDTH**
*(Word Count Target: 300+)*

**Hardware Modality: Free-Space Entanglement Distribution**
In 2017, the Chinese **Micius Satellite** demonstrated entanglement distribution over a distance of 1,200 km. This is the first step toward **Commercial Superdense Coding**.

**The Industrial Challenge**:
Sending photons through space is incredibly expensive. Every "Quantum Slot" in a satellite transmission is precious. 
1.  **Capacity Doubling**: By using Superdense Coding, space agencies can send double the telemetry data per photon compared to classical laser links.
2.  **Ultra-Secure Logistics**: Companies like **Quantinuum** are researching use-cases where superdense coding is used to transmit "Multi-factor Authentication" keys. One bit is the key, and the second bit is the "Integrity Check"—ensuring that both bits arrive in one physical packet that cannot be hacked.

---

### **09.11 POST-LAB ANALYTICAL QUESTIONS**
1.  **The Entanglement Limit**: If Alice and Bob lose their entanglement half-way through the protocol (decoherence), what will happen to the data Bob receives?
2.  **Information Paradox**: If Alice only has one qubit, and she only performs a single-qubit gate, how can Bob learn 2 bits? Where was the "second bit" hiding?
3.  **Visualization Insight**: Describe how the **Phase Disks** distinguish between the "00" and "10" messages in Bob's decoder.
4.  **Hardware Insight**: Why is Superdense Coding considered more "Practical" than Teleportation for short-range fiber networks?
5.  **Scaling**: If Alice had 2 entangled pairs (4 qubits) and sent 2 qubits to Bob, how many classical bits could she transmit?

---

### **09.10 CONCLUSION & NEXT STEPS**
**Summary of Findings**: We have successfully broken the classical capacity limit. We proved that a shared entanglement resource allows a single qubit to carry the payload of two classical bits.

**Final Insight**: Entanglement isn't just about "Spooky Links"; it is about **Communication Efficiency**.

**Preparation for Lab 10**: 
We've sent one qubit to double the data. But what if we want to send the *entire* state of a qubit without physically moving it at all? In **Lab 10**, we will use the same "link" to perform **Quantum Teleportation**, moving a qubit's soul from one hardware location to another.
