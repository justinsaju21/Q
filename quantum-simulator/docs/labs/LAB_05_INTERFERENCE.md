# EXPERIMENT – 05
## The Quantum Eraser: Controlling Information Flow with Interference

---

### **05.1 OBJECTIVES**
The objective of this module is to observe the most fundamental non-classical effect: **Quantum Interference**. Students will learn how to use phase to "erase" path information and selectively control which state the qubit collapses into.

**Key Learning Outcomes**:
1.  **Interference Mechanisms**: To distinguish between **Constructive** and **Destructive** interference in a single-qubit system.
2.  **Information Erasure**: To understand the "Quantum Eraser" concept—how adding a phase shift can "undo" a previous operation.
3.  **Path Information**: To recognize that knowing "which path" a qubit took (e.g., through measurement) destroys the ability to interfere.
4.  **Circuit Logic**: To master the **H-Z-H** sequence as the foundation for the Deutsch and Grover algorithms.
5.  **Industrial Application**: To analyze the use of interference in **Quantum Optical Computing** and noise-canceling sensors.

---

### **05.2 APPARATUS & VIRTUAL ENVIRONMENT**
| S.No | Component | Specification / Version | Quantity |
| :--- | :--- | :--- | :--- |
| 1 | Quantum Simulator | WebGL-Accelerated v1.0 | 1 |
| 2 | Phase Disk Monitor | Relative Phase Viewer (0 to π) | 1 |
| 3 | Statevector Monitor | Complex Field Display | 1 |
| 4 | Pulse Propagation | Visual Circuit Path Monitor | 1 |
| 5 | Interference Set | H-Gate (Splitter), Z-Gate (Eraser) | 1 Set |

---

### **05.3 THEORETICAL FOUNDATION**
*(Word Count Target: 500+)*

**05.3.1 The Magic of Complex Amplitudes**
In classical probability, if you have a 50% chance of an event and a 50% chance of another, they add up to 100%. In quantum mechanics, we don't add probabilities; we add **Amplitudes** (complex numbers). Because amplitudes can be positive, negative, or even imaginary, they can "cancel each other out." 

Think of noise-canceling headphones. They detect incoming sound waves and generate an opposite wave (shifted by 180 degrees) to cancel the noise. This is exactly what we do with qubits. If two "computational paths" lead to the same result $|0\rangle$, but one path has a positive phase and the other has a negative phase, they will add up to zero. The state $|0\rangle$ is "erased" from existence via **Destructive Interference**.

**05.3.2 The H-Z-H Protocol (The Eraser)**
The **Hadamard (H)** gate acts like a beam splitter. It takes the $|0\rangle$ state and splits it into two paths: $|0\rangle$ and $|1\rangle$. Now, if we apply another H-gate immediately, we get back to $|0\rangle$ ($H^2 = I$). 

However, if we insert a **Z-gate** between the two Hadamards, we perform a "Phase Flip." This shift of $\pi$ radians ($180^\circ$) turns our constructive interference into destructive interference. Suddenly, the $|0\rangle$ paths cancel out, and precisely 100% of the probability flows into the $|1\rangle$ state. In physics, we have "erased" the original $|0\rangle$ state using nothing but a phase pulse.

**05.3.3 The "Which-Path" Paradox**
One of the strangest rules in physics is that **Information kills Interference**. If any part of the universe "knows" whether the qubit is a 0 or a 1 (e.g., if we measure it mid-circuit), the interference disappears. The qubit ceases to be a wave and becomes a particle. This is why quantum computers must be kept in absolute isolation; any "leakage" of information acts as a measurement that destroys the computation. In this lab, you will see how we maintain the "shroud of mystery" (coherence) to keep the interference working.

**05.3.4 Historical Context: The 19th Century Slits**
This concept bridges modern computing to the 1801 Young's Double Slit experiment. Young proved light was a wave by showing interference fringes on a screen. Richard Feynman later called this the "only mystery" of quantum mechanics. In this lab, you are controlling that mystery with digital gates.

---

### **05.4 MATHEMATICAL MODELING**
*(Word Count Target: 300+)*

**05.4.1 The Sequence Calculation**
Let's solve the $H \rightarrow Z \rightarrow H$ circuit algebraically:
1.  **Start State**: $|0\rangle$
2.  **First H-Gate**: $H|0\rangle = |+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$
3.  **Z-Gate (The Phase Shift)**: 
    $$Z \cdot \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle) = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle) = |-\rangle$$
    *(Notice: The sign of the $|1\rangle$ component has flipped)*
4.  **Final H-Gate**: 
    $$H|-\rangle = \frac{1}{\sqrt{2}}H|0\rangle - \frac{1}{\sqrt{2}}H|1\rangle$$
    Substitute the H-transformation:
    $$\frac{1}{2}(|0\rangle + |1\rangle) - \frac{1}{2}(|0\rangle - |1\rangle)$$
    Subtracting the terms: 
    - $|0\rangle$ terms: $\frac{1}{2} - \frac{1}{2} = 0$ (Destructive Interference)
    - $|1\rangle$ terms: $\frac{1}{2} - (-\frac{1}{2}) = 1$ (Constructive Interference)

**Final Result**: The state is precisely $|1\rangle$.

---

### **05.5 PRE-LAB EVALUATION (Preparation)**
1.  **Analogy**: Explain the difference between "Adding Marbles" and "Adding Ocean Waves." Which one represents quantum probability?
2.  **Geometric Prediction**: If $|+\rangle$ is at the $+X$ position and a Z-gate rotates it 180 degrees, where does it land?
3.  **The Eraser**: In the $H-Z-H$ circuit, which gate acts as the "Eraser" of the original state?
4.  **Measurement**: If you measure the qubit *after* the first H-gate but *before* the Z-gate, what will your final histogram show after the second H-gate?
5.  **Algebra**: Calculate the outcome of $H \cdot X \cdot H$ starting from $|0\rangle$. Show your work.
6.  **Interference**: Why do we need the second H-gate to "see" the interference? Why isn't the Z-gate enough?
7.  **Definition**: What is "Decoherence" in terms of path information?

---

### **05.6 EXPERIMENTAL PROCEDURE**
*(Word Count Target: 600+)*

**Phase 1: Building the Interference Engine**
1.  Launch the simulator and initialize **1 Qubit**.
2.  Drag and drop two **H-gates** onto the wire.
3.  Observe the baseline ($H \cdot H$). 
    - The vector rotates to the equator and back to the North Pole.
    - Result: 100% Probability of `0`. This is the "Identity" baseline.
4.  Record this as the control group in your Observation Table.

**Phase 2: The Quantum Eraser (Phase Flip)**
5.  Insert a **Z-gate** between the two Hadamards ($H \rightarrow Z \rightarrow H$).
6.  Click **Next Step** periodically. 🚩 **WATCH THE PULSE dot**:
    - **Step 1**: Vector is on the Equator ($X=1$). Phase Disks are in sync (0 rad).
    - **Step 2**: The Z-gate "kicks" the phase. Watch the **Phase Disk** for $|1\rangle$ rotate 180 degrees. The Bloch vector swings to the opposite side of the sphere ($X=-1$).
    - **Step 3**: The final H-gate completes.
7.  **Data Harvesting**: Observe the **Histogram**. The probability has shifted entirely from `0` to `1`. You have used interference to "delete" the path back to the North Pole.

**Phase 3: Measuring the Path (Destroying the Mystery)**
8.  Modify the circuit: $H \rightarrow \text{Measure} \rightarrow Z \rightarrow H$. (Use a measurement gate if available, or mentally simulate it).
9.  By "Measuring," you force the computer to choose $|0\rangle$ or $|1\rangle$. 
10. **Result**: Observe that the interference is broken. The histogram will show a randomized 50/50 split instead of a 100% `1`.
11. Record the effect of measurement on the interference pattern.

**Phase 4: Multi-Phase "S" Eraser**
12. Replace the Z-gate with an **S-gate** ($H \rightarrow S \rightarrow H$).
13. Observe the outcome. It is no longer 100%. It is 50/50, but with a complex phase shift.
14. This proves that you need exactly 180 degrees of "out of phase" rotation for total destructive interference.

---

### **05.7 OBSERVATION & PREDICTIVE ANALYSIS**

**Observation Table 05.1**:
| Sequence | Hypothesis | Result State | State 0 Amp. | State 1 Amp. | Inference Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| $H \rightarrow H$ | Pure 0 | $|0\rangle$ | $1.00$ | $0.00$ | Constructive |
| $H \rightarrow Z \rightarrow H$ | Pure 1 | $|1\rangle$ | | | Destructive (0) |
| $H \rightarrow S \rightarrow H$ | | | | | Mixed |
| $H \rightarrow \text{Measure} \rightarrow H$ | Random | | | | Broken |

**Visual Analysis**:
*   **Amplitude Summation**: Draw a vector diagram showing the two paths for the $|0\rangle$ amplitude in the $HZH$ experiment. Show them pointing in opposite directions.
*   **The "Pulse" Visual**: Describe how the visual speed/glow of the pulse changes (or doesn't) during constructive vs destructive interference.

---

### **05.8 INDUSTRY CASE STUDY: NOISE-CANCELING QUBITS**
*(Word Count Target: 300+)*

**Hardware Modality: Trapped Ions**
In companies like **IonQ** or **Quantinuum**, qubits are individual ions (atoms) suspended in mid-air by electric fields. Their "phase" is extremely delicate. Stray magnetic fields from the laboratory environment act like an "unintentional Z-gate," flipping the phase and destroying the interference required for a calculation.

**Industrial Solution: Dynamical Decoupling**
Engineers use the **Quantum Eraser** principle to protect the qubits. By sandwiching the useful computation between a series of $H$ and $Z$ pulses (called a "U-gate cycle"), they can "average out" the environmental noise. The environment pushes the phase one way, and the HZH logic pushes it back, essentially "erasing" the noise before it can destroy the data. Without interference-based noise cancellation, quantum computers would only work for a few microseconds.

---

### **05.9 POST-LAB ANALYTICAL QUESTIONS**
1.  **The "Which-Path" Question**: If you could look at the qubit while it was at the equator without "Measuring" it, would the interference still work? Why is this impossible in physics?
2.  **Mathematical Limit**: Why does the $H \rightarrow S \rightarrow H$ experiment result in a 50/50 split? Calculate the probability amplitude for $|0\rangle$ using the S-gate matrix.
3.  **Visualization Insight**: On the **Phase Disks**, describe the visual difference between $|0\rangle + |1\rangle$ and $|0\rangle - |1\rangle$. How does this relate to the "color" or "dial" in the simulator?
4.  **Engineering Challenge**: Propose a circuit that uses interference to "erase" the $|1\rangle$ state instead of the $|0\rangle$ state.
5.  **Scaling**: If you had 2 qubits, how could you use interference to make the histogram show a 100% chance for the string `11`? (Focus on the Hadamard transformation for multiple qubits).

---

### **05.10 CONCLUSION & NEXT STEPS**
**Summary of Findings**: We have successfully demonstrated the "Quantum Eraser." We proved that by manipulating the complex phase of a qubit, we can force it to "un-exist" in certain states via destructive interference, or "reinforce" itself in others.

**Final Insight**: Interference is the "Filter" of the quantum world. We compute by letting the wrong answers destroy themselves.

**Preparation for Lab 06**: 
We've interference-tuned our qubits, but now we must confront a deeper mystery. Does the qubit's state depend on *how* we measure it? In **Lab 06**, we will explore **Basis Switching** and the **Heisenberg Uncertainty Principle**.
