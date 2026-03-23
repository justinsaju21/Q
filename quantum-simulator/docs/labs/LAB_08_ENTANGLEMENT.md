# EXPERIMENT – 08
## The Spooky Link: Creating Bell States & Proving Non-Locality

---

### **08.1 OBJECTIVES**
The objective of this laboratory is to witness the most profound mystery of the quantum world: **Entanglement**. Students will learn how to "link" two qubits so that they no longer have individual identities, but share a single, non-local state.

**Key Learning Outcomes**:
1.  **State Synthesis**: To create the four **Bell States** using a combination of Hadamard and CNOT gates.
2.  **Visual Analytics**: To interpret the **3D Entanglement Web** and **Purity Badges** as indicators of non-local correlation.
3.  **Experimental Validation**: To prove that measuring one qubit instantly determines the state of the other, regardless of the distance between them (in the simulator).
4.  **Mathematical Rigor**: To mathematically prove **Non-Separability**—showing that an entangled state cannot be written as a product of two independent qubits.
5.  **Industrial Application**: To analyze the role of entanglement in **Quantum Networking** and the emerging **Quantum Internet**.

---

### **08.2 APPARATUS & VIRTUAL ENVIRONMENT**
| S.No | Component | Specification / Version | Quantity |
| :--- | :--- | :--- | :--- |
| 1 | Quantum Simulator Engine | WebGL-Accelerated v1.0 | 1 |
| 2 | Entanglement Visualizer | 3D Connectivity Web (Dynamic Links) | 1 |
| 3 | Purity Badge Monitor | Measurement of State Decoherence | 2 |
| 4 | Statevector Monitor | 4x1 Complex Amplitude Tracker | 1 |
| 5 | Bell Circuit Setup | H-Gate + CNOT-Gate | 1 Set |

---

### **08.3 THEORETICAL FOUNDATION**
*(Word Count Target: 500+)*

**08.3.1 Einstein’s "Spooky Action at a Distance"**
In 1935, Albert Einstein, Boris Podolsky, and Nathan Rosen published a paper (the EPR paper) arguing that quantum mechanics must be incomplete. They were troubled by a prediction: if two particles interact in a certain way, they become "Entangled." This means that if you measure one particle on Earth, you instantly know the state of its partner on the Moon—faster than the speed of light. Einstein called this **"Spooky action at a distance"** and believed it violated the laws of relativity.

**08.3.2 The Reality of Non-Locality**
However, decades of experiments (including the 2022 Nobel Prize-winning work of Aspect, Clauser, and Zeilinger) have proven that Einstein was wrong. Entanglement is real. When two qubits are entangled, they do not "send a signal" to each other; they simply **stop being two separate things**. They become a single mathematical object $| \psi_{AB} \rangle$. 

In your simulator, you will see this reflected in the **Purity Badge**. For a single independent qubit, the purity is 100%. But for an entangled qubit, if you look at it in isolation, its purity drops. It appears "fuzzy" or "noisy" because its true information is hidden in its relationship with its partner.

**08.3.3 The Four Bell States**
There are four specific ways to maximally entangle two qubits. These are known as the **Bell States** (or EPR pairs). The most famous is the $|\Phi^+\rangle$ state:
$$|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$$
In this state, the qubits are perfectly correlated. If you measure '0' for the first, the second is guaranteed to be '0'. If you measure '1', the second is guaranteed to be '1'. They are fundamentally "linked" by the geometry of Hilbert Space.

**08.3.4 Physical Context: Entanglement Distribution**
How do we maintain this link? In a laboratory, entanglement is fragile. Any heat, vibration, or stray light (decoherence) will "snap" the link. To build a Quantum Internet, companies are building **Entanglement Hubs** that use lasers to create entangled photons and "beam" them over fiber-optic cables to different cities, keeping the "spooky link" alive over hundreds of miles.

---

### **08.4 MATHEMATICAL MODELING**
*(Word Count Target: 300+)*

**08.4.1 The Bell Circuit Derivation**
To create the $|\Phi^+\rangle$ state, we apply an H-gate to Q0, and then a CNOT from Q0 to Q1:
1.  **Initial State**: $|00\rangle$
2.  **Hadamard on Q0**: 
    $$H|0\rangle \otimes |0\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle) \otimes |0\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |10\rangle)$$
3.  **CNOT (Q0 $\rightarrow$ Q1)**:
    - The CNOT acts on the $|10\rangle$ part of the superposition and flips the second qubit.
    - Result: $\frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$

**08.4.2 The Non-Separability Proof**
A state is entangled if it **cannot** be factored into $(a|0\rangle + b|1\rangle) \otimes (c|0\rangle + d|1\rangle)$.
If we try to factor $|\Phi^+\rangle$:
$$\frac{1}{\sqrt{2}}|00\rangle + \frac{1}{\sqrt{2}}|11\rangle = ac|00\rangle + ad|01\rangle + bc|10\rangle + bd|11\rangle$$
For this to work:
- $ad = 0$ (since there is no $|01\rangle$ term)
- $bc = 0$ (since there is no $|10\rangle$ term)
However, if $ad=0$ and $bc=0$, then either $a, c, d$ or $b$ must be zero, which would make $ac$ or $bd$ zero. But we know $ac = 1/\sqrt{2}$ and $bd = 1/\sqrt{2}$. This is a mathematical contradiction.
**Conclusion**: The state is non-separable (Entangled).

---

### **08.5 PRE-LAB EVALUATION (Preparation)**
1.  **The EPR Paradox**: What was Einstein's primary objection to entanglement?
2.  **Separability**: Explain what it means for a state to be "Separable" in your own words.
3.  **Visual Prediction**: When you create an entangled state, what will happen to the **3D Web** in the simulator?
4.  **Calculations**: Using the Bell circuit logic, find the final state if you apply an **X-gate** to Q0 *before* the H-gate.
5.  **Purity**: If a qubit is 100% entangled with another, what is its "Isolated Purity" value? (Search for the "Reduced Density Matrix" principle).
6.  **Bell Test**: Why is it impossible to explain entanglement using a "secret plan" (hidden variables) that the qubits agreed on in advance?
7.  **Speed of Light**: Does entanglement allow us to send *information* faster than light? (Search for the "No-Communication Theorem").

---

### **08.6 EXPERIMENTAL PROCEDURE**
*(Word Count Target: 600+)*

**Phase 1: Synthesizing the $|\Phi^+\rangle$ State**
1.  Initialize **2 Qubits** in state $|00\rangle$.
2.  Place an **H-gate** on `q0`.
3.  Place a **CNOT (CX)** gate with `q0` as control and `q1` as target.
4.  Click **Next Step**. 🚩 **WATCH THE DYNAMICS**:
    - **Observe**: As the CNOT pulse completes, look at the **3D Entanglement Web**. A glowing link should appear between the two Bloch Sphere panels.
    - **Observe**: Look at the **Purity Badges**. They should both drop to **0.50** (50% purity). This is the sign of a Maximally Entangled State.
5.  **Data Check**: Observe the **Histogram**. It should show exactly two bars: `00` and `11`, each at 50%. The "correlated" states are `01` and `10` are gone.

**Phase 2: The Instantaneous Measurement**
6.  Add a **Measurement Gate** to `q0`.
7.  Run the simulation multiple times.
8.  **Outcome**: Notice that every time `q0` collapses to `0`, `q1` instantly collapses to `0` as well. There is never a case where you get `01` or `10`. This is the "Spooky Link" in action.

**Phase 3: Creating the Anti-Correlated State ($|\Psi^+\rangle$)**
9.  Modify the circuit: Add an **X-gate** to `q1` before the CNOT.
10. Run. Observe the **Histogram**. 
11. **Outcome**: Now the bars are at `01` and `10`. This is the "Anti-Correlated" Bell State. If one is 0, the other **must** be 1.
12. Record the difference in the **3D Web** visual (it might change color or intensity).

**Phase 4: Breaking the Link (Decoherence)**
13. With the qubits entangled, add a **measurement** to `q0` but *not* `q1`.
14. Observe the **Purity Badge** of `q1` after the measurement.
15. **Conclusion**: Measuring one qubit "breaks" the entanglement and returns the other qubit to a pure classical state.

---

### **08.7 OBSERVATION & PREDICTIVE ANALYSIS**

**Observation Table 08.1**:
| Sequence | Bell State Name | Joint Probabilities ($00, 01, 10, 11$) | Purity (Q0) | Entanglement Web Visual |
| :--- | :--- | :--- | :--- | :--- |
| $H_0 \rightarrow CX_{0,1}$ | $|\Phi^+\rangle$ | $50\%, 0\%, 0\%, 50\%$ | 0.50 | Strong Link |
| $X_1 \rightarrow H_0 \rightarrow CX_{0,1}$ | $|\Psi^+\rangle$ | $0\%, 50\%, 50\%, 0\%$ | | |
| $X_0 \rightarrow H_0 \rightarrow CX_{0,1}$ | $|\Phi^-\rangle$ | | | |
| $| \text{Pure } 00 \rangle$ | | $100\%, 0\%, 0\%, 0\%$ | 1.00 | No Link |

**Visual Artifact Analysis**:
*   **The 3D Connectivity Web**: Sketch the visual link between the panels. How does the simulator distinguish between different types of Bell States visually?
*   **Histogram Analysis**: Why does an entangled state look like a "Fair Coin" if you only look at one qubit, but a "Perfect Lock" if you look at both?

---

### **08.8 INDUSTRY CASE STUDY: THE QUANTUM INTERNET**
*(Word Count Target: 300+)*

**Hardware Modality: Entanglement Distribution Hubs**
Industry leaders like **Aliro Quantum** and **Qunnect** are no longer just building computers; they are building the **Quantum Internet**. The backbone of this internet is the distribution of Bell States.

**The Commercial Race**:
1.  **AliroNet™**: This platform coordinates "Entanglement as a Service." By distributing Bell States between data centers, they allow multiple small quantum computers to "link" into one massive supercomputer.
2.  **Qunnect's "Gotham" Network**: In NYC, Qunnect has demonstrated the world's first scalable entanglement network using existing fiber-optic lines. They use "Quantum Memories" to store entangled photons for several milliseconds, long enough to transmit data.
3.  **ID Quantique**: Their hardware uses Bell Tests to **Certify Randomness**. If a system passes a Bell Test (violating Bell's Inequality), it is mathematically impossible for the results to be predicted by any hacker. It is the ultimate "Security Audit."

---

### **08.9 POST-LAB ANALYTICAL QUESTIONS**
1.  **The Factorization Question**: Why is it mathematically impossible to talk about the "state of Qubit 1" when it is entangled? (Refer to the Non-Separability proof).
2.  **EPR Paradox**: If Bob is in a submarine at the bottom of the ocean and Alice measures her entangled qubit on top of a mountain, how does Bob's qubit "know" to collapse? (The "No-Communication Theorem" perspective).
3.  **Visual Insight**: Explain the relationship between the **Purity Badge** and the intensity of the **3D Entanglement Web**.
4.  **Engineering Challenge**: Propose a circuit that creates the $|\Psi^-\rangle$ state (The "Singlet State"). This state is crucial for **Quantum Error Correction**.
5.  **Scaling**: If you have 3 qubits entangled in a "GHZ State" ($|000\rangle + |111\rangle$), what happens to the entanglement link if you measure just one qubit?

---

### **08.10 CONCLUSION & NEXT STEPS**
**Summary of Findings**: We have successfully generated "The Spooky Link." We mathematically proved that entangled states are non-separable and empirically verified that they share a unified destiny across the simulator's panels.

**Final Insight**: Entanglement is not just a curiosity; it is the "High-Speed Bus" of quantum information.

**Preparation for Lab 09**: 
Now that we have the "link," how can we use it to send data? In **Lab 09**, we will exploit this link to perform **Superdense Coding**, sending two classical bits of information using just one physical qubit.
