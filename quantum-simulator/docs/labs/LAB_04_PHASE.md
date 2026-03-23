# EXPERIMENT – 04
## The Hidden Dimension: Mastering Relative Phase & Complex Interference

---

### **04.1 OBJECTIVES**
The objective of this module is to explore the "Invisible" property of a qubit: **Relative Phase**. While superposition ($H$ gate) allows us to be in two states at once, the phase determines how those two states will later interfere with each other.

**Key Learning Outcomes**:
1.  **Phase Control**: To categorize and apply the **Z, S, and T** gates as phase-shift operators.
2.  **Geometric Insight**: To differentiate between **Global Phase** (un-observable) and **Relative Phase** (the basis of quantum algorithms).
3.  **Visualization Proficiency**: To master the use of **Phase Disks** (Circle Notation) to detect shifts that the histogram alone cannot reveal.
4.  **Math Representation**: To mathematically model the rotation of the complex amplitude vector using Euler’s formula.
5.  **Industrial Application**: To understand the use of phase-interference in high-precision **Interferometry** (e.g., LIGO) and Optical Communication.

---

### **04.2 APPARATUS & VIRTUAL ENVIRONMENT**
| S.No | Component | Specification / Version | Quantity |
| :--- | :--- | :--- | :--- |
| 1 | Quantum Simulator | WebGL-Accelerated v1.0 | 1 |
| 2 | Phase Disk Monitor | Circle Visualizer (Range: 0 to 2π) | 1 |
| 3 | Statevector Monitor | Complex ($\alpha, \beta$) Field | 1 |
| 4 | Phase Shift Gates | Z (π), S (π/2), T (π/4) | 1 Set |
| 5 | Interference Setup | H-Gate Base (Equator) | 1 |

---

### **04.3 THEORETICAL FOUNDATION**
*(Word Count Target: 500+)*

**04.3.1 The Concept of Phase**
In the macroscopic world, we rarely think about phase. If you have two flashlights, the light simply gets brighter when you point them at the same spot. However, because qubits behave like **Waves**, their state is not just a matter of "How much 0" and "How much 1," but also "What is the timing between them?" 

Imagine two pendulums swinging at the same speed. If they are in sync, we say they are "In Phase." If one is at its peak while the other is at its base, they are "Out of Phase." In a qubit, this timing difference between the $|0\rangle$ and $|1\rangle$ amplitudes is called the **Relative Phase ($\phi$)**.

**04.3.2 Why Phase remains "Hidden"**
Phase is the most elusive property of quantum mechanics. If you measure a 50/50 qubit, you will get a 0 or a 1 with equal probability—**no matter what the phase is**. Whether the phase is $0$ or $\pi$, the histogram looks identical. This is why we call it the "Hidden Dimension." 

However, phase is fundamentally a **Resource**. In quantum computers, we don't just calculate probabilities; we manipulate these hidden phases so that the wrong answers cancel each other out (destructive interference) and the correct answers reinforce each other (constructive interference). The Phase Disk tool in your simulator is your "X-Ray vision" into this dimension.

**04.3.3 The Phase Gate Family (Z, S, T)**
We use specific gates to "tune" this phase without changing the probability:
*   **The Z-Gate (Pauli-Z)**: Performs a 180-degree phase shift ($\pi$ radians). It flips $|+\rangle$ to $|-\rangle$.
*   **The S-Gate (Phase Gate)**: Performs a 90-degree phase shift ($\pi/2$ radians). It rotates the state to the Y-axis.
*   **The T-Gate (π/8 Gate)**: Performs a 45-degree phase shift ($\pi/4$ radians). This is the most computationally expensive gate in real hardware (the "T-gate bottleneck").

**04.3.4 Historical Context: The Interferometer**
This property was first exploited in classical physics by the Michelson-Morley and Mach-Zehnder interferometers. They proved that light travels in waves by observing how it "interferes" with itself based on simple distance-based phase shifts. In this lab, you are performing the quantum version of those 19th-century breakthroughs.

---

### **04.4 MATHEMATICAL MODELING**
*(Word Count Target: 300+)*

**04.4.1 Euler's Formula & The State Vector**
A general qubit state on the equator is represented as:
$$|\psi\rangle = \frac{1}{\sqrt{2}}(|0\rangle + e^{i\phi}|1\rangle)$$
Here, $\phi$ is the relative phase. The term $e^{i\phi}$ is a complex phase factor that rotates the state around the Z-axis of the Bloch Sphere.

**04.4.2 The Phase Gate Matrices**
Each phase gate multiplies the $|1\rangle$ component by a specific factor:
*   $$Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$ (Multiplies by $e^{i\pi}$)
*   $$S = \begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix}$$ (Multiplies by $e^{i\pi/2}$)
*   $$T = \begin{pmatrix} 1 & 0 \\ 0 & e^{i\pi/4} \end{pmatrix}$$

**04.4.3 Global vs. Relative Phase**
If the entire matrix is multiplied by a factor (e.g., $-I$), this is a **Global Phase**.
$$|\psi\rangle_{global} = -1 \times \begin{pmatrix} \alpha \\ \beta \end{pmatrix} = \begin{pmatrix} -\alpha \\ -\beta \end{pmatrix}$$
In quantum mechanics, $|\psi\rangle$ and $-|\psi\rangle$ are physically **identical**. Only the *relative* angle between $\alpha$ and $\beta$ can be Measured.

---

### **04.5 PRE-LAB EVALUATION (Preparation)**
1.  **Visual Literacy**: In the simulator's **Phase Disks**, what does a "full" disk for state 0 and an "empty" disk for state 1 represent?
2.  **Complex Math**: What is $e^{i\pi}$ equal to? How does this explain the Z-gate's matrix?
3.  **Experimental Hyp**: If you apply an S-gate followed by another S-gate, which single gate is it equivalent to?
4.  **Physics Check**: Define **Destructive Interference**. How does phase make it possible?
5.  **Calculations**: If $|\psi\rangle = 0.707|0\rangle + 0.707i|1\rangle$, what is the relative phase in degrees?
6.  **Un-observability**: Why can't we detect a phase shift by looking only at the 0/1 Histogram?
7.  **The T-Gate**: How many T-gates are required to perform a full Z-rotation (180 degrees)?

---

### **04.6 EXPERIMENTAL PROCEDURE**
*(Word Count Target: 600+)*

**Phase 1: Detecting the Invisible (The Phase Disk)**
1.  Initialize with **1 Qubit**. Apply an **H-gate** ($|0\rangle \rightarrow |+\rangle$).
2.  Observe the **Histogram**. 50/50.
3.  Observe the **Phase Disks**. Note that both "clock hands" are at 12 o'clock (0 rad phase).
4.  Drag a **Z-gate** *after* the H-gate.
5.  Click **Next Step**.
    - **Check Histogram**: It is still 50/50. The "measured" state hasn't changed.
    - **Check Phase Disks**: The disk for state `1` has rotated 180 degrees. The "clock hand" is now at 6 o'clock.
    - **Check Bloch Sphere**: The arrow has rotated exactly to the opposite side of the equator (-X).

**Phase 2: The S and T Rotations**
6.  Clear the Z-gate. Apply an **S-gate** instead.
7.  Observe the 90-degree rotation on the Bloch Sphere. The arrow now points to $+Y$.
8.  Clear and apply a **T-gate**.
9.  Observe the 45-degree rotation. This is the precision "fine-tuning" required for algorithms like **Shor's Algorithm**.

**Phase 3: Global Phase (The Ghost Shift)**
10. Apply an **X-gate**, then an **H-gate**, then a **Z-gate**.
11. Observe the mathematical output in the **Statevector Table**. 
12. Click on the "Toggle Global Phase" option (if available) or observe the complex numbers. Note how the *signs* of all numbers might flip, but the relative angle between the disks stays the same.

**Phase 4: Converting Phase back to Probability**
13. **Circuit**: $H \rightarrow Z \rightarrow H$.
14. 🚩 **PREDICTIVE CHECKPOINT**: Before you run the second H-gate, what do you expect the histogram to show?
15. Run. Notice the qubit is now at the $|1\rangle$ state with 100% probability. This proves the "hidden" phase from the Z-gate was converted back into a "visible" probability by the final H-gate. This is called a **Basis Transformation**.

---

### **04.7 OBSERVATION & PREDICTIVE ANALYSIS**

**Observation Table 04.1**:
| Trial | Sequence | Bloch Position ($x, y, z$) | Phase Disk Angle ($\phi$) | Pred. P(1) | Meas. P(1) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | $H$ | $(1, 0, 0)$ | 0° | 50% | 50% |
| 2 | $H \rightarrow Z$ | $(-1, 0, 0)$ | 180° | 50% | |
| 3 | $H \rightarrow S$ | $(0, 1, 0)$ | | 50% | |
| 4 | $H \rightarrow T$ | | 45° | | |
| 5 | $H \rightarrow Z \rightarrow H$ | | | | |

**Visual Analysis**:
*   **Clock Hand Mapping**: Draw the 4 positions of the "clock hand" for $0, Z, S,$ and $T$. 
*   **The Equator Trail**: Describe how the vector moves *along* the equator during these trials. Contrast this with Lab 01 (North to South).

---

### **04.8 INDUSTRY CASE STUDY: LIGO & FIBER OPTICS**
*(Word Count Target: 300+)*

**Hardware Modality: Optical Interferometry**
Phase is not just for computers; it is the most sensitive measurement tool in the universe. The **Laser Interferometer Gravitational-Wave Observatory (LIGO)** detected ripples in space-time caused by colliding black holes. It did this by splitting a laser beam (H-gate), bouncing it off two mirrors, and recombining it. Any tiny gravitational wave would shift the "phase" of one beam, causing the beams to either cancel out or reinforce each other.

**Industrial Application: Phase-Shift Keying (PSK)**
In modern high-speed **Fiber Optic Communications**, we don't just turn the light ON or OFF to send data (Amplitude Modulation). That's too slow. Instead, we use **Phase Modulation**. By shifting the phase of a light pulse by small increments (just like our $S$ and $T$ gates), we can pack far more data into a single fiber. Every time you stream high-definition video, you are likely relying on Phase-Shift Keying principles.

---

### **04.9 POST-LAB ANALYTICAL QUESTIONS**
1.  **The "Hidden" Paradox**: If phase is invisible during measurement, how can we prove it even exists? (Use the $HZH$ experiment to explain).
2.  **Computational Cost**: Why is it harder for a real quantum computer (like a trapped ion system) to perform a T-gate than a Z-gate? (Search for "T-Gate Synthesis").
3.  **Basis Logic**: An H-gate creates superposition. A Z-gate rotates the phase. What happens if you apply a Z-gate to $|0\rangle$ *before* the H-gate? Try it and explain.
4.  **Interference Logic**: If two qubits are in $|+\rangle$ and $|-\rangle$ respectively, they look the same on a histogram. If you add them (interfere them), what is the difference in the final state?
5.  **Engineering Challenge**: Propose a circuit that uses only S-gates to achieve the same result as a T-gate. Is it possible? Why or why not?

---

### **04.10 CONCLUSION & NEXT STEPS**
**Summary of Findings**: We have successfully unlocked the "Phase Dimension." We proved that phase is the engine of quantum advantage—even though it's hidden under the surface of probability, it dictates the final outcome of the computation.

**Final Insight**: In quantum computing, we "Code in Phase" but "Read in Probability."

**Preparation for Lab 05**: 
Now that we have both Superposition and Phase, we are ready to perform the first true Quantum Algorithm. In **Lab 05**, we will build a **Quantum Eraser** and see how **Interference** allows us to selectively destroy or create information paths.
