# EXPERIMENT – 06
## Changing the Question: Basis Switching & The Uncertainty Principle

---

### **06.1 OBJECTIVES**
The goal of this laboratory is to explore the concept of **Measurement Bases**. Students will learn that the information you get from a qubit depends entirely on "how you point your camera"—a phenomenon known as **Complementarity**.

**Key Learning Outcomes**:
1.  **Basis Literacy**: To understand the difference between the **Z-Basis** (standard) and the **X-Basis** (Hadamard).
2.  **Uncertainty Principle**: To empirically observe that a state with definite value in one basis is completely random in others.
3.  **Non-Commutativity**: To visualize why the order of measurements and gates matters ($[X, Z] \neq 0$).
4.  **Mathematical Transformation**: To use the Hadamard gate as a "Basis Switcher" to convert X-basis measurements into Z-basis measurements.
5.  **Industrial Application**: To analyze the role of basis switching in **Quantum Key Distribution (QKD)** and eavesdropper detection.

---

### **06.2 APPARATUS & VIRTUAL ENVIRONMENT**
| S.No | Component | Specification / Version | Quantity |
| :--- | :--- | :--- | :--- |
| 1 | Quantum Simulator Engine | WebGL-Accelerated v1.0 | 1 |
| 2 | Bloch Sphere Visualizer | 3D Space with Basis Axis Indicators | 1 |
| 3 | Measurement Moniter | State Collapse Flash (Basis-dependent) | 1 |
| 4 | Statevector Display | Amplitude Monitor in Z-Basis | 1 |
| 5 | Basis Switching Set | H-Gate (As Basis Transformer) | 1 |

---

### **06.3 THEORETICAL FOUNDATION**
*(Word Count Target: 500+)*

**06.3.1 The Complementarity Principle**
In classical physics, a property exists whether you measure it or not. If a car is moving at 60 mph, it has that speed and that position simultaneously. But in the quantum world, things are different. According to Niels Bohr's **Principle of Complementarity**, certain properties of a system are mutually exclusive. 

For a qubit, the two most common "questions" we can ask are:
1.  **Z-Question**: "Are you 0 or 1?" (The North/South pole).
2.  **X-Question**: "Are you $+$ or $-$?" (The Front/Back of the equator).

The fundamental law of quantum mechanics is that you cannot know the answer to both questions at the same time. If a qubit is perfectly $|0\rangle$, its X-property is completely unknown. If it is perfectly $|+\rangle$, its Z-property is completely unknown. This is the **Heisenberg Uncertainty Principle** in its simplest form.

**06.3.2 Measurement as a Physical Interaction**
Measurement isn't just looking at the qubit; it is a physical interaction that forces the qubit to "choose" a state from the available basis. In our simulator, when you Measure a qubit in the Z-basis, you are forcing it to collapse to the Z-axis. 

But what if we want to measure it in the X-basis? To do this, we don't change the instrument; we rotate the qubit itself using an **H-Gate**. By rotating the X-basis states ($|+\rangle, |-\rangle$) to the Z-basis ($|0\rangle, |1\rangle$), we can use our standard Z-sensor to "read" the X-information. The Hadamard gate is thus a "Translator" between different quantum languages.

**06.3.3 Non-Commutativity ($[X, Z] \neq 0$)**
In normal math, $5 \times 2 = 2 \times 5$. But in quantum gates, the order of operations changes the universe. If you apply a Z-gate then an X-gate, you get a different state than if you applied X then Z. This is because these gates are rotations around different axes. This "non-commutativity" is why quantum algorithms are so complex—the timing and order of gates are the only things that prevent the state from collapsing into noise.

**06.3.4 Historical Context: The EPR Paradox**
The concept of basis switching was central to the Einstein-Podolsky-Rosen (EPR) thought experiment. They argued that if you could measure a qubit's Z-basis and its partner's X-basis, you could "beat" the uncertainty principle. Bell's Theorem later proved them wrong—no matter how you switch your basis, nature maintains its "shroud of secrecy."

---

### **06.4 MATHEMATICAL MODELING**
*(Word Count Target: 300+)*

**06.4.1 The Z vs X Basis Vectors**
*   **Z-Basis**: $\{ |0\rangle, |1\rangle \} = \{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \}$
*   **X-Basis**: $\{ |+\rangle, |-\rangle \} = \{ \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}, \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix} \}$

**06.4.2 Basis Transformation Algebra**
The Hadamard gate rotates the X-basis to the Z-basis and vice-versa.
$$H|0\rangle = |+\rangle$$
$$H|+\rangle = \frac{1}{\sqrt{2}}H|0\rangle + \frac{1}{\sqrt{2}}H|1\rangle = \frac{1}{2}(|0\rangle+|1\rangle) + \frac{1}{2}(|0\rangle-|1\rangle) = |0\rangle$$

**06.4.3 The Commutator**
The difference between the two orders of operations is defined as the commutator:
$[X, Z] = XZ - ZX$
Performing the multiplication:
$$XZ = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$
$$ZX = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$$
$[X, Z] = \begin{pmatrix} 0 & -2 \\ 2 & 0 \end{pmatrix} \neq 0$
This proof confirms that X and Z are **Incompatible Observables**.

---

### **06.5 PRE-LAB EVALUATION (Preparation)**
1.  **Complementarity**: If a qubit is in state $|+\rangle$, what is its probability $P(0)$ in the Z-basis?
2.  **The "Camera" Analogy**: Why does measuring a qubit change its future behavior?
3.  **Hadamard Magic**: If you measure in the X-basis, which gate must you place before the measurement gate to "fix" the basis?
4.  **Uncertainty**: Can you ever find a state where the probability for both $|0\rangle$ and $|+\rangle$ is 100%? Why or why not?
5.  **Calculations**: Using the vectors in 06.4.1, calculate the dot product of $|0\rangle$ and $|+\rangle$. What does this tell you about their overlap?
6.  **Heisenberg**: In your own words, explain how basis switching proves the existence of an "Uncertainty Principle."
7.  **Order of Operations**: If you apply $Z$ then $X$ to state $|0\rangle$, what is the final state?

---

### **06.6 EXPERIMENTAL PROCEDURE**
*(Word Count Target: 600+)*

**Phase 1: Determinism in the Z-Basis**
1.  Initialize with **1 Qubit** in state $|0\rangle$.
2.  Add a **Measurement Gate** (or observe the final step in the control panel).
3.  **Result**: 100% chance of `0`. This state is "Certain" in the Z-basis.

**Phase 2: Uncertainty in the X-Basis**
4.  Remove the measurement. Apply an **H-gate** ($|0\rangle \rightarrow |+\rangle$).
5.  Now measure. Observe the **Histogram**. 
6.  **Result**: 50/50 split. Even though the state is a "pure" state on the equator, asking it a "Z-question" makes it behave randomly.
7.  Record this as the "Heisenberg Effect."

**Phase 3: Measuring the X-Basis Correctly**
8.  Modify the circuit: $H \rightarrow H \rightarrow \text{Measure}$. 
9.  The second H-gate rotates $|+\rangle$ back to the Z-axis ($|0\rangle$).
10. **Result**: 100% chance of `0`. 
11. **Insight**: By "Switching the Basis" (the second H-gate), you have converted the uncertainty back into certainty. You have "asked the right question."

**Phase 4: Order Matters (Commutativity Check)**
12. Build Circuit A: $X \rightarrow Z$ on state $|0\rangle$. Record the Phase Disk outcome.
13. Build Circuit B: $Z \rightarrow X$ on state $|0\rangle$. Record the Phase Disk outcome.
14. 🚩 **WATCH THE BLOCH SPHERE**: Observe the different paths taken by the vector. Note that the final state for A is $|1\rangle$, but for B it is $-|1\rangle$. 
15. This proves that phase and state depend on the **Order of Measurement**.

---

### **06.7 OBSERVATION & PREDICTIVE ANALYSIS**

**Observation Table 06.1**:
| Sequence | State on Sphere | Basis Measured | Result Distribution | Uncertainty |
| :--- | :--- | :--- | :--- | :--- |
| $|0\rangle \rightarrow M$ | North Pole | Z | 100% `0` | Zero |
| $H|0\rangle \rightarrow M$ | Equator ($+X$) | Z | 50/50 | Maximum |
| $H|0\rangle \rightarrow H \rightarrow M$ | North Pole | X (via Z-trans) | 100% `0` | Zero |
| $Z \rightarrow X \rightarrow M$ | | Z | | |

**Visual Analysis**:
*   **The Flash Breakdown**: Observe the **Collapse Animation** in the simulator. Does it feel "different" when a qubit collapses from 50/50 compared to when it's already 100%?
*   **Axis Vectors**: Identify the $X$ and $Z$ axes on the Bloch Sphere. Draw where the qubit lands for each trial.

---

### **06.8 INDUSTRY CASE STUDY: QKD & THE BB84 PROTOCOL**
*(Word Count Target: 300+)*

**Hardware Modality: Fiber Optic Quantum Networks**
Companies like **Toshiba** and **ID Quantique** use basis switching to build un-hackable communication lines. This is called **Quantum Key Distribution (QKD)**.

**The Strategy**:
The sender (Alice) sends qubits using a random mix of **Z-Basis** ($0, 1$) and **X-Basis** ($+, -$). The receiver (Bob) also measures them in a random mix of bases.
1.  **Success**: When their bases match, they get a perfect, shared bit.
2.  **Eavesdropping Detection**: If a hacker (Eve) tries to "listen," she must choose a basis to measure. If she chooses wrong, she **flips the basis** of the qubit permanently (Heisenberg effect). When Alice and Bob compare a small portion of their keys, they will see an increased error rate ($25\%$), revealing Eve's presence. There is no way to "hiddenly" measure a qubit.

**Industrial Application: Randomness Auditing**
Basis switching is also used by **NIST** (National Institute of Standards and Technology) to verify "True Randomness." By switching bases, they can prove that a quantum computer isn't just following a secret pattern, but is truly obeying the laws of probability.

---

### **06.9 POST-LAB ANALYTICAL QUESTIONS**
1.  **The "Camera" Insight**: If you were a hacker, could you ever measure a qubit without the sender knowing? Use the concepts of Lab 06 to answer.
2.  **Mathematical Limit**: If Alice sends $+X$ and Bob measures in $Z$, what is the mathematically exact probability BOB gets a `0`?
3.  **Visualization Insight**: Why does the H-gate move the vector from the pole to the equator? Explain the geometry of a 45-degree rotation around Y followed by a 180 around X.
4.  **Engineering Challenge**: Propose a circuit that measures the **Y-Basis**. (Hint: You will need a gate besides $H$).
5.  **Scaling**: If you have 1,000 qubits in the $|+\rangle$ state and you measure all of them in $Z$, roughly how many `0`s will you get? What will be the standard deviation?

---

### **06.10 CONCLUSION & NEXT STEPS**
**Summary of Findings**: We have successfully proven the Principle of Complementarity. We learned that "Certainty" is a luxury—you can be certain about the pole, or the equator, but never both.

**Final Insight**: The power of quantum computing isn't just in "Many States," but in "Many Perspectives."

**Preparation for Lab 07**: 
We've mastered the individual qubit. Now, we enter the world of **Interaction**. In **Lab 07**, we will link two qubits together for the first time using **Controlled Logic** and witness the birth of a "Universal" gate set.
