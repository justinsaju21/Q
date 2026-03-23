# EXPERIMENT – 11
## The Oracle’s Secret: Quantum Parallelism & Deutsch’s Algorithm

---

### **11.1 OBJECTIVES**
The objective of this module is to implement the first true quantum algorithm: **Deutsch’s Algorithm**. Students will learn how a quantum computer can determine a global property of a function (whether it is constant or balanced) using only half the number of queries required by a classical computer.

**Key Learning Outcomes**:
1.  **Algorithmic Speedup**: To empirically verify the 2:1 performance advantage of quantum logic over classical bits.
2.  **Quantum Parallelism**: To understand how the Hadamard gate allows the computer to "see" multiple function inputs ($0$ and $1$) simultaneously.
3.  **The "Oracle" Concept**: To categorize "Black Box" functions and their physical implementation using multi-qubit gates.
4.  **Inference via Phase**: To observe how the answer to a logical riddle is encoded into the **Relative Phase** of the qubit.
5.  **Industrial Application**: To evaluate how Deutsch-Jozsa principles are used in **Hardware Benchmarking** for state-of-the-art quantum processors.

---

### **11.2 APPARATUS & VIRTUAL ENVIRONMENT**
| S.No | Component | Specification / Version | Quantity |
| :--- | :--- | :--- | :--- |
| 1 | Quantum Simulator Engine | WebGL-Accelerated v1.0 | 1 |
| 2 | Oracle Library | Constant (0, 1) and Balanced (ID, NOT) | 1 Set |
| 3 | Phase Disk Array | Interference Monitor for State Collapse | 1 |
| 4 | Statevector Display | 4-Dimensional Amplitude Tracking | 1 |
| 5 | Algorithm Preset | Deutsch-Jozsa (Special Feature) | 1 |

---

### **11.3 THEORETICAL FOUNDATION**
*(Word Count Target: 500+)*

**11.3.1 The Classical Riddle**
Imagine you have a black box (an **Oracle**) that takes an input $x$ ($0$ or $1$) and returns an output $f(x)$ ($0$ or $1$). There are only four possible functions:
*   **Constant 0**: $f(0)=0, f(1)=0$
*   **Constant 1**: $f(0)=1, f(1)=1$
*   **Balanced (ID)**: $f(0)=0, f(1)=1$
*   **Balanced (NOT)**: $f(0)=1, f(1)=0$

Your task is to find out if the box is **Constant** (returns the same thing for both inputs) or **Balanced** (returns different things). A classical computer **must** query the box twice (once for $x=0$ and once for $x=1$) to be 100% sure. There is no other way.

**11.3.2 The Quantum "Single-Query" Solution**
In 1985, David Deutsch proposed a way to solve this with only **one** query. How? By using **Quantum Parallelism**. Instead of sending $0$ or $1$, Alice sends a **Superposition** $|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$. 

Because quantum gates are linear, the Oracle acts on both $|0\rangle$ and $|1\rangle$ at the same time. The magic happens during the finish: the Oracle doesn't just change the probabilities; it "kicks back" a phase onto the control qubit. If the function is constant, the phases for $|0\rangle$ and $|1\rangle$ are the same (In-Phase). If it is balanced, the phases are opposite (Out-of-Phase).

**11.3.3 The "Kickback" Phenomenon**
Phase kickback is a subtle but powerful effect in multi-qubit logic. When we use a controlled gate where the target is in the $|-\rangle$ state, the eigenvalue of that operation is "pushed" back onto the control qubit. In Deutsch's algorithm, the second qubit is our "ancilla" (helper) that we set to $|-\rangle$. This creates the interference pattern that allows Alice to measure the answer in a single step.

**11.3.4 Historical Context: The Birth of Speedup**
Deutsch's Algorithm is simple, but its historical significance is massive. It was the absolute proof that quantum computers are not just "faster classical computers"—they are fundamentally different. It broke the "Strong Church-Turing Thesis" and launched the entire field of quantum algorithm research, leading directly to Grover's search and Shor's factoring.

---

### **11.4 MATHEMATICAL MODELING**
*(Word Count Target: 300+)*

**11.4.1 The Joint Initial State**
We use two qubits. Q0 is the data qubit (input) and Q1 is the ancilla (target).
1.  **Preparation**:
    - $Q0 \rightarrow |+\rangle$
    - $Q1 \rightarrow |-\rangle$
    - Joint State: $|\Psi_1\rangle = \frac{1}{\sqrt{2}}(|0\rangle+|1\rangle) \otimes \frac{1}{\sqrt{2}}(|0\rangle-|1\rangle)$

**11.4.2 Applying the Oracle ($U_f$)**
The Oracle performs $|x\rangle|y\rangle \rightarrow |x\rangle|y \oplus f(x)\rangle$.
After the oracle, the state of the first qubit becomes:
$$|\psi_{Q0}\rangle = \frac{1}{2}\left[(-1)^{f(0)}|0\rangle + (-1)^{f(1)}|1\rangle\right]$$
1.  **If Constant ($f(0)=f(1)$)**: The phase is the same for both. $|\psi_{Q0}\rangle = \pm \frac{1}{\sqrt{2}}(|0\rangle+|1\rangle) = \pm|+\rangle$.
2.  **If Balanced ($f(0) \neq f(1)$)**: The phases are opposite. $|\psi_{Q0}\rangle = \pm \frac{1}{\sqrt{2}}(|0\rangle-|1\rangle) = \pm|-\rangle$.

**11.4.3 Final Measurement**
Bob applies a final **H-gate** to Q0.
- $H|+\rangle = |0\rangle$ (Means the box was CONSTANT)
- $H|-\rangle = |1\rangle$ (Means the box was BALANCED)
A single measurement of $|0\rangle$ or $|1\rangle$ now gives the global secret of the black box.

---

### **11.5 PRE-LAB EVALUATION (Preparation)**
1.  **Complexity**: How many "Queries" does a classical computer need to solve the Deutsch riddle?
2.  **Superposition**: Why is it necessary to put the first qubit into the $|+\rangle$ state before querying the Oracle?
3.  **Phase Kickback**: Explain what happens to the control qubit if the target is in the $|-\rangle$ state and a CNOT is applied.
4.  **Calculations**: If the Oracle is a simple **Identity (Balanced)** function, write out the 4x4 matrix for the transformation.
5.  **Histograms**: In the "Uncertainty" Phase (mid-algorithm), what will the histogram for Q0 show? 
6.  **The Ancilla**: Why is the second qubit (Q1) called an "Ancilla"? Does its final state matter for the answer?
7.  **Definition**: What is a "Balanced" function in terms of its output counts?

---

### **11.6 EXPERIMENTAL PROCEDURE**
*(Word Count Target: 600+)*

**Phase 1: Setting up the Quantum Workspace**
1.  Initialize **2 Qubits** in state $|00\rangle$.
2.  **Ancilla Prep**: Apply an **X-gate** followed by an **H-gate** to `q1`. This places the ancilla in the $|-\rangle$ state (South Pole on the X-axis).
3.  **Input Prep**: Apply an **H-gate** to `q0`. This creates the parallel search state $|+\rangle$.
4.  Verify the **Phase Disks**. Note that one is at 0 degrees and the other is at 180 degrees.

**Phase 2: Implementing the Oracle (The Riddle)**
5.  Now, decide on a "Secret" for your box.
6.  **To build a CONSTANT (0) box**: Do nothing (Identity).
7.  **To build a BALANCED box**: Place a **CNOT (q0, q1)**.
8.  Watch the **Pulse Propagation**. The pulse should travel through both wires, representing the parallel query.

**Phase 3: Extracting the Secret**
9.  Add a final **H-gate** to `q0`.
10. 🚩 **PREDICTIVE CHECKPOINT**: 
    - If you built a CNOT (Balanced) box, what do you expect to see?
    - Compare your prediction with the **Statevector Table**.
11. Observe the **Histogram** for `q0`.
    - If it shows 100% `0`, the box is constant.
    - If it shows 100% `1`, the box is balanced.
12. **Validation**: Test the other three possible boxes (NOT, Constant 1) and record the results.

**Phase 4: Using the Preset Feature**
13. Click the **Presets** menu in the simulator. Select **Deutsch-Jozsa**.
14. Observe how the complexity scales as more qubits are added. Notice that even with 5 qubits, the "Balanced" secret is found in a single 100% measurement.

---

### **11.7 OBSERVATION & PREDICTIVE ANALYSIS**

**Observation Table 11.1**:
| Oracle Type | Logic used (e.g., CNOT) | Pred. Outcome on Q0 | Meas. Outcome | State Q0 (Mid-Pulse) |
| :--- | :--- | :--- | :--- | :--- |
| Constant 0 | Identity | `0` | `0` | $|+\rangle$ |
| Balanced (ID) | CNOT | `1` | `1` | $|-\rangle$ |
| Constant 1 | X(q1) | | | |
| Balanced (NOT) | X(q0) $\rightarrow$ CNOT | | | |

**Visual Analysis**:
*   **The Interference Map**: Draw the wave cancellation that happens during the final H-gate for the "Constant" trial.
*   **The "Kickback" Trail**: Describe the color/glow change in the simulator when the phase moves from the target back to the control wire.

---

### **11.8 INDUSTRY CASE STUDY: HARDWARE BENCHMARKING**
*(Word Count Target: 300+)*

**Hardware Modality: Superconducting Quasiparticles**
When IBM launches a new quantum processor (like the **Eagle** or **Osprey**), they need to prove it is working correctly. They don't just run simple gates; they run the **Deutsch-Jozsa** algorithm as a "System Test."

**The Industrial Challenge**:
1.  **Complexity Scaling**: If a 100-qubit machine can successfully differentiate a balanced function from a constant one in one query, it proves that the system maintains "Global Coherence."
2.  **Quantum Advantage Benchmarks**: The speedup (O(1) vs O(2^N)) is used to market the computer to industrial clients in **Logistics** and **Financial Modeling**. If the algorithm fails (gives 80% instead of 100%), engineers use the "Percent Deviation" (exactly like the one in your lab) to identify which qubits are suffering from thermal noise.

---

### **11.9 POST-LAB ANALYTICAL QUESTIONS**
1.  **The Query Paradox**: If you looked "inside" the oracle, you would see two wires. Does this mean we are still query-ing both states? Explain the difference between "Two Wires" and "Two Computational Queries."
2.  **Mathematical Insight**: Why is the ancilla (Q1) required to be in the $|-\rangle$ state? What happens if you run the same circuit with Q1 in the $|+\rangle$ state? 
3.  **Visualization Insight**: Describe how the **Phase Disks** for Q0 and Q1 appear "linked" during the Oracle pulse.
4.  **Hardware Insight**: In a real system, the CNOT gate in the Oracle is the most likely place for an error to occur. Based on Lab 07, how would a CNOT error change the final 100% measurement?
5.  **Scaling**: If you had a set of 100 inputs, how many queries would a classical computer need to check if the set is constant or balanced? How many would a quantum computer need?

---

### **11.10 CONCLUSION & NEXT STEPS**
**Summary of Findings**: We have successfully executed our first quantum speedup. We proved that by using superposition and phase kickback, we can solve a global property riddle in 50% less time than classical logic allows.

**Final Insight**: Quantum computing is about "Finding the Pattern," not just "Checking the Data."

**Preparation for Lab 12**: 
We've solved a riddle; now let's find a needle in a haystack. In our **Final Lab (12)**, we will implement **Grover's Algorithm**, the gold standard for quantum search, and witness the power of **Amplitude Amplification**.
