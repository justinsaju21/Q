# EXPERIMENT – 02
## The Fair Coin: Breaking Binary Logic with Superposition

---

### **02.1 OBJECTIVES**
The goal of this laboratory is to explore the "Engine Room" of quantum advantage: **Superposition**. Students will learn that a qubit can exist in a state that is neither $|0\rangle$ nor $|1\rangle$, but a linear combination of both.

**Key Learning Outcomes**:
1.  **Fundamental Concepts**: To understand the **Hadamard (H) Gate** as a 90-degree rotation that creates a 50/50 superposition.
2.  **Visual Mastery**: To identify the **Equator of the Bloch Sphere** as the region of maximum quantum uncertainty.
3.  **Mathematical Rigor**: To derive the $|+\rangle$ state vector and prove that its total probability remains 1.0 (Normalization).
4.  **Hardware Insight**: To understand how superposition is used in creating **True Randomness** (QRNG).
5.  **Industrial Application**: To analyze how state uncertainty is exploited in Quantum Sensing and Metrology.

---

### **02.2 APPARATUS & VIRTUAL ENVIRONMENT**
| S.No | Component | Specification / Version | Quantity |
| :--- | :--- | :--- | :--- |
| 1 | Quantum Simulator Engine | WebGL-Accelerated v1.0 | 1 |
| 2 | Bloch Sphere Visualizer | High-Fidelity 3D Rendering (Z-X-Y axes) | 1 |
| 3 | Phase Disk Monitor | Relative Phase ($\phi$) Tracking | 1 |
| 4 | Statevector Display | Amplitude ($\alpha, \beta$) Monitoring | 1 |
| 5 | Quantum Logic Gates | Hadamard (H), Pauli-X, Identity (I) | As Req. |

---

### **02.3 THEORETICAL FOUNDATION**
*(Word Count Target: 500+)*

**02.3.1 The Wave-Particle Paradox**
In classical physics, an object is always in a definite state. A door is either open or closed; a bit is either 0 or 1. This is known as **Determinism**. However, at the sub-atomic level, particles like electrons and photons behave according to the laws of **Wave-Particle Duality**. 

Imagine a water wave passing through two slits. It doesn't choose one slit; it passes through both and creates an interference pattern. A qubit in a quantum computer behaves exactly like that wave. Through the phenomenon of **Superposition**, we can place a qubit into a state where it is "mathematically both 0 and 1" simultaneously. It is only when we **Measure** the qubit that it "collapses" into a definite classical state of 0 or 1.

**02.3.2 The Hadamard (H) Gate: The "Fair Coin" Creator**
If the Pauli-X gate was a 180-degree flip (turning the coin over), the **Hadamard (H) Gate** is the action of spinning the coin on a table. While it is spinning, you cannot say it is "Heads" or "Tails." It exists in a blur of both.

Geometrically, the H-gate performs a dual-action. It rotates the state $|0\rangle$ away from the North Pole and places it exactly on the **Equator** of the Bloch Sphere. In this position, the qubit has exactly zero bias toward 0 or 1. If you measure it 1,000 times, you will get roughly 500 "0s" and 500 "1s." This is the foundation of **True Quantum Randomness**.

**02.3.3 The Concept of Relative Phase ($\phi$)**
In Lab 01, we saw only the Z-axis. But on the equator, a new dimension opens up: **Phase**. Two superposition states can have the same 50/50 probabilities but be physically different because their "waves" are pointing in different directions.
*   **The $|+\rangle$ State**: A "0+1" superposition where the waves are in-phase.
*   **The $|-\rangle$ State**: A "0-1" superposition where the waves are out-of-phase.

In your simulator, the **Phase Disks** will be your primary tool for seeing this "invisible" data. Even when the histogram looks identical, the Phase Disks will tell you if your qubit is in the positive ($+$) or negative ($-$) phase.

**02.3.4 Historical Context: Bohr vs. Einstein**
This phenomenon was the center of the famous Bohr-Einstein debates. Einstein famously said, "God does not play dice," expressing his discomfort with the idea that superposition is inherently probabilistic. Niels Bohr replied, "Einstein, stop telling God what to do." Today, billions of dollars in industry prove Bohr was right: Superposition is a real, measurable physical resource that we use for computing.

---

### **02.4 MATHEMATICAL MODELING**
*(Word Count Target: 300+)*

**02.4.1 The Hadamard Matrix**
The Hadamard gate is represented by the matrix:
$$H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$$

**02.4.2 Deriving the $|+\rangle$ State**
Let's apply the H-gate to the $|0\rangle$ state:
1.  **Initial Vector**: $|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$
2.  **Transformation**:
    $$|+\rangle = H|0\rangle = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix}$$
3.  **Calculation**:
    - Top: $\frac{1}{\sqrt{2}} (1 \times 1 + 1 \times 0) = \frac{1}{\sqrt{2}}$
    - Bottom: $\frac{1}{\sqrt{2}} (1 \times 1 + (-1) \times 0) = \frac{1}{\sqrt{2}}$
4.  **Resulting State Vector**:
    $$|+\rangle = \begin{pmatrix} \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} \end{pmatrix} \approx \begin{pmatrix} 0.707 \\ 0.707 \end{pmatrix}$$

**02.4.3 Normalization Proof**
We must verify that the total probability is 1.0:
$$P(0) + P(1) = |0.707|^2 + |0.707|^2 = 0.5 + 0.5 = 1.0$$
This proves that the H-gate preserves the total energy of the system while distributing it equally between 0 and 1.

---

### **02.5 PRE-LAB EVALUATION (Preparation)**
1.  **Wave Theory**: What happens when two waves that are "out of phase" meet? What is the name for this effect?
2.  **Algebra**: If the amplitude of state $|0\rangle$ is $0.707$, what is the percentage probability of measuring a 0? Show the formula.
3.  **Geometry**: On a 3D sphere, the equator represents all states where the Z-coordinate is what?
4.  **Prediction**: If you apply the Hadamard gate to the state $|1\rangle$, what do you expect the final vector to look like? Use the H-matrix to prove it algebraically.
5.  **Historical**: Why did Einstein dislike the concept of "Quantum Superposition"?
6.  **Relative Phase**: Does changing the phase of a 50/50 qubit change its measurement probability? (Hypothesize based on Phase Disks).
7.  **Complex Amplitudes**: What does the $1/\sqrt{2}$ factor represent in the Hadamard matrix?

---

### **02.6 EXPERIMENTAL PROCEDURE**
*(Word Count Target: 600+)*

**Phase 1: Establishing the North Pole Baseline**
1.  Initialize the simulator with **1 Qubit**. Confirm state is $|0\rangle$.
2.  Observe the **Statevector Table**. Note the values for $\alpha$ and $\beta$.
3.  Observe the **Bloch Sphere**. The arrow should be locked at $(0, 0, 1)$.

**Phase 2: Creating the Superposition**
4.  Drag the **H gate** onto the wire of `q0`.
5.  Click **Next Step**. 🚩 **WATCH THE BLOCH SPHERE CAREFULLY**:
    - Observe the vector sweep a 90-degree path from the North Pole to the **X-axis** on the equator.
    - Notice the **Trajectory Trail**. It should trace a curved path toward the "front" of the sphere.
6.  Check the **Statevector Table**. Both states should now have an amplitude of $0.7071$.
7.  Observe the **Histogram**. Both bars for `0` and `1` should be at roughly 50% height. Record this in Trial 2 of the Observation Table.

**Phase 3: The "Invisible" Phase Experiment**
8.  With the qubit in superposition ($|+\rangle$), drag an **X-gate** *before* the H-gate.
9.  Reset and run. Now you are applying $H|1\rangle$.
10. **Data Comparison**:
    - Look at the **Histogram**. Does it look any different from $H|0\rangle$? (It should still be 50/50).
    - Now look at the **Phase Disks**. Notice the "Clock Hand" or the color of the disk for state 1. It should have shifted by 180 degrees ($\pi$ phase).
11. This proves that $H|1\rangle$ produces the $|-\rangle$ state. Record this in Trial 3.

**Phase 4: Interference & Reversibility**
12. Add a **second H-gate** after the first one ($H \cdot H$).
13. Run the simulation. Observe the vector returning from the equator to the North Pole.
14. **Conclusion**: An H-gate followed by an H-gate is an **Identity** operation ($H^2 = I$). Superposition is reversible!

---

### **02.7 OBSERVATION & PREDICTIVE ANALYSIS**

**Observation Table 02.1**:
| Trial | Circuit | Pred. P(0) | Meas. P(0) | Bloch X-Pos | Phase Offset |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | $|0\rangle$ | 100% | 100% | 0.0 | None |
| 2 | $H|0\rangle$ | | | +1.0 | 0° |
| 3 | $H|1\rangle$ | | | -1.0 | 180° ($\pi$) |
| 4 | $H(H|0\rangle)$ | | | | |

**Visual Artifact Analysis**:
*   **The Equator Mapping**: Sketch the X, Y, and Z coordinates of the vector in Trial 2. Why is $Z = 0$ at this point?
*   **Phase Disks**: Draw the difference between the $|+\rangle$ and $|-\rangle$ phase disk configurations. Use the "clock hand" position to denote phase angle.

---

### **02.8 INDUSTRY CASE STUDY: QRNG**
*(Word Count Target: 300+)*

**Hardware Modality: Photonic Qubits**
Companies like **ID Quantique** (Switzerland) use superposition to solve a massive problem in cybersecurity: **High-Entropy Randomness**. Classical computers are "Pseudo-Random"—if you know the starting seed, you can predict the numbers. This makes encryption keys vulnerable.

**The Quantum Solution**:
A photonic QRNG (Quantum Random Number Generator) sends a single photon toward a **Beam Splitter** (which acts as a physical Hadamard Gate). The photon enters a superposition of "transmitted" and "reflected." When it hits a detector, nature *itself* chooses the outcome with 50/50 probability. There is no seed and no pattern. This is **Pure Entropy**.

**Industrial Application: Quantum Lidar & Sensing**
Superposition also allows sensors to become "Super-sensitive." By putting a qubit in a 50/50 state, any external magnetic or electric field will cause the phase of the qubit to rotate. By measuring this tiny phase shift (using the Phase Disks principle), companies are building sensors that can "see" through walls or detect mineral deposits deep underground from a drone.

---

### **02.9 POST-LAB ANALYTICAL QUESTIONS**
1.  **The "Spinning Coin" Analogy**: Why is superposition often compared to a spinning coin? At what point in the simulation does the coin "stop spinning"?
2.  **Mathematical Insight**: Why is the amplitude $0.707$ and not $0.5$? Explain the relationship between Amplitude and Probability ($P = |A|^2$).
3.  **Experimental Error**: If the H-gate was slightly "faulty" and resulted in a 49/51 split instead of 50/50, how much would the Bloch vector deviate from the equator (in degrees)?
4.  **Reversibility**: If quantum gates are rotations, why does applying the same rotation twice sometimes return you to the start ($H^2 = I$) and sometimes move you 360 degrees ($X^2 = I$)?
5.  **Multi-Qubit Scaling**: If you have 2 qubits and apply an H-gate to both, how many bars will appear on the histogram? What will be the height of each bar? (This is the start of "Quantum Parallelism").

---

### **02.10 CONCLUSION & NEXT STEPS**
**Summary of Findings**: We have successfully broken the binary barrier. We moved from the poles to the equator and proved that a qubit can exist in a 50/50 state of uncertainty. We also discovered that "relative phase" is a hidden dimension that differentiates two 50/50 states.

**Final Insight**: Superposition is the "Workhorse" of quantum computing. It allows us to process multiple states at once, forming the basis for parallelism.

**Preparation for Lab 03**: 
Superposition is great, but what if you don't want a "Fair Coin"? What if you want a 70/30 split? In **Lab 03**, we will learn how to use **Rotations** to "tune" our probabilities to any value we desire along the unit circle.
