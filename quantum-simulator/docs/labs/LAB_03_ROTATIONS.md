# EXPERIMENT – 03
## The Weighted Coin: Arbitrary Rotations & The Unit Circle

---

### **03.1 OBJECTIVES**
The objective of this module is to move beyond discrete gates ($X, H$) and master **Continuous Control** over the qubit's state. Students will use parameterized rotations to "tune" probabilities to any value on the unit circle.

**Key Learning Outcomes**:
1.  **Dynamic Manipulation**: To understand the **Rx, Ry, and Rz** gates as continuous rotation operators.
2.  **Probability Control**: To calculate and verify the exact angle $\theta$ required to achieve a specific target probability $P(0)$.
3.  **Physical Intuition**: To link the concept of **Larmor Precession** to the Rz-rotation seen in the simulator.
4.  **Mathematical Modeling**: To derive the relationship between the rotation angle and the resulting state vector amplitudes.
5.  **Industrial Application**: To analyze the role of RF pulses in **Magnetic Resonance Imaging (MRI)** systems.

---

### **03.2 APPARATUS & VIRTUAL ENVIRONMENT**
| S.No | Component | Specification / Version | Quantity |
| :--- | :--- | :--- | :--- |
| 1 | Quantum Simulator Engine | WebGL-Accelerated v1.0 | 1 |
| 2 | Bloch Sphere Visualizer | 3D Space with Parameterized Arrow | 1 |
| 3 | Rotation Gate Library | Rx(θ), Ry(θ), Rz(θ) | As Req. |
| 4 | Statevector Monitor | Unit Circle ($x, y, z$) Tracking | 1 |
| 5 | Probability Histogram | Continuous Distribution Viewer | 1 |

---

### **01.3 THEORETICAL FOUNDATION**
*(Word Count Target: 500+)*

**03.3.1 From Bit-Flips to Smooth Rotations**
In previous labs, we treated quantum states as either "Up" ($|0\rangle$), "Down" ($|1\rangle$), or "In the Middle" ($|+\rangle$). However, the true power of a quantum computer lies in its ability to access **every point** on the surface of the Bloch Sphere. If the Hadamard gate is a 90-degree step, the **Rotation Gates** ($Rx, Ry, Rz$) are the steering wheel.

A qubit is physically often a particle with a magnetic moment (like an electron's spin). When we place this particle in a magnetic field, it doesn't just "jump" between states; it precesses. This movement is called **Larmor Precession**. By timing our control pulses, we can stop this precession at any point, allowing us to "weight" our quantum coin. Instead of a 50/50 fair coin, we can create a "67.4/32.6" coin or a "99/1" coin. This precision is what allows quantum algorithms like **Grover's Search** to iteratively "amplify" the correct answer while shrinking the wrong ones.

**03.3.2 The Geometry of the Unit Circle**
To understand these rotations, we look at the cross-section of the Bloch Sphere. Any point on the circle can be described by an angle $\theta$. The state vector $|\psi\rangle$ is represented as:
$$|\psi\rangle = \cos(\theta/2)|0\rangle + \sin(\theta/2)|1\rangle$$
This "Half-Angle" geometry is one of the most unique aspects of quantum mechanics. It means that to perform a full 360-degree rotation of the qubit's probabilities, the physical vector only needs to rotate 180 degrees.

**03.3.3 The Three Axes of Control**
Each rotation gate targets a specific coordinate axis:
*   **Rx(θ)**: Rotates the vector around the X-axis. Used for "tipping" the state from the Z-axis toward the Y-axis.
*   **Ry(θ)**: Rotates around the Y-axis. This is the most common way to change the probability $P(0)$ while keeping the phase real.
*   **Rz(θ)**: Rotates around the Z-axis. This does **not** change the probability, but it changes the "Relative Phase" (where the arrow points on the equator).

**03.3.4 Physical Context: The RF Pulse**
In the real world, these rotations aren't mathematical lines; they are **Radio-Frequency (RF) Pulses**. In an MRI machine, the hydrogen protons in your body are qubits. The machine uses a massive magnet to align them (Z-axis) and then sends an RF pulse ($Ry$ rotation) to "tip" them. The angle of this tip determines the strength of the signal used to build your clinical image.

---

### **03.4 MATHEMATICAL MODELING**
*(Word Count Target: 300+)*

**03.4.1 The Rotation Matrices**
The general rotation matrix around the Y-axis is defined as:
$$Ry(\theta) = \begin{pmatrix} \cos(\theta/2) & -\sin(\theta/2) \\ \sin(\theta/2) & \cos(\theta/2) \end{pmatrix}$$

**03.4.2 Deriving the Probability-Angle Relationship**
Let's find the angle needed to achieve a specific target state. 
Suppose we want $P(1) = 0.25$ (a 25% chance of measuring a 1).
1.  **Fundamental Law**: $P(1) = \sin^2(\theta/2)$
2.  **Solve for Theta**:
    - $\sin^2(\theta/2) = 0.25$
    - $\sin(\theta/2) = \sqrt{0.25} = 0.5$
    - $\theta/2 = \arcsin(0.5) = 30^\circ$ (or $\pi/6$ radians)
    - $\theta = 60^\circ$ (or $\pi/3$ radians)
3.  **Result**: Applying an $Ry(60^\circ)$ gate to $|0\rangle$ will produce a 75/25 probability split.

**03.4.3 Normalization Verification**
Calculating the resulting state vector for $\theta = 60^\circ$:
$|\psi\rangle = \cos(30^\circ)|0\rangle + \sin(30^\circ)|1\rangle$
$|\psi\rangle = 0.866|0\rangle + 0.500|1\rangle$
Check: $|0.866|^2 + |0.500|^2 = 0.75 + 0.25 = 1.0$.

---

### **03.5 PRE-LAB EVALUATION (Preparation)**
1.  **Larmor Frequency**: Define Larmor Precession in your own words. How does it relate to the Z-axis of a qubit?
2.  **Trigonometry**: What is the value of $\cos^2(45^\circ)$? What probability does this represent in a qubit state?
3.  **Axis Awareness**: If a vector is pointing at the North Pole, and you apply an **Rz** rotation, will the arrow move? Why or why not?
4.  **Calculations**: Find the angle $\theta$ (in degrees) required to get a 50/50 superposition using the $Ry$ gate. (Compare this to the Hadamard gate).
5.  **Phase vs. Probability**: Which of the three rotation gates ($Rx, Ry, Rz$) does **not** change the height of the bars in the histogram?
6.  **Medical Imaging**: In an MRI, what happens to the signal strength if the "flip angle" is 180 degrees instead of 90 degrees?
7.  **Unitary Property**: Prove that $Ry(\theta)$ is a unitary matrix.

---

### **03.6 EXPERIMENTAL PROCEDURE**
*(Word Count Target: 600+)*

**Phase 1: Tuning the Probability (The Weighting)**
1.  Initialize the simulator with **1 Qubit**.
2.  From the gate library, select the **Ry(θ)** gate.
3.  **Parameter Input**: Double-click the gate or use the slider to set the angle to **60 degrees** ($\pi/3$).
4.  Place the gate on the wire. Click **Next Step**.
5.  **Data Check**:
    - Verify the **Histogram**. Does it show exactly 75% for `0` and 25% for `1`?
    - Check the **Statevector Table**. Confirm the amplitudes are approximately $0.866$ and $0.500$.
    - Observe the **Bloch Sphere**. The arrow should be tilted 60 degrees away from the North Pole.

**Phase 2: Transition through the Equator**
6.  Change the angle to **90 degrees** ($\pi/2$). This is equivalent to a Hadamard rotation but along the Y-axis.
7.  Step forward. Observe the vector landing exactly on the equator at the $(X=1)$ position.
8.  Observe the **Phase Disk**. Notice it is exactly half-filled.

**Phase 3: Deep-Space Rotation (The Z-Axis)**
9.  Clear the circuit. Place an **H-gate** to get the qubit to the equator.
10. Place an **Rz(θ)** gate *after* the H-gate.
11. Set the Rz angle to **45 degrees** ($\pi/4$).
12. 🚩 **PREDICTIVE CHECKPOINT**: Before you step forward, check the histogram. Do you think the 50/50 probabilities will change?
13. Click **Next Step**. Observe the Bloch arrow rotating *around* the equator but staying at the same "latitude."
14. Observe the **Phase Disk**. The "clock hand" should have moved exactly 45 degrees.

**Phase 4: Comparative Analytics**
15. Compare the visual trajectory of $Ry(90)$ vs. $H$. Note how $Ry$ stays in the Z-X plane, whereas $H$ involves a more complex rotation in 3D space.

---

### **03.7 OBSERVATION & PREDICTIVE ANALYSIS**

**Observation Table 03.1**:
| Trial | Gate/Angle | Pred. P(0) | Meas. P(1) | Bloch Vector Angle | Phase Disk Fill |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | $Ry(60^\circ)$ | 75% | 25% | 60° from North | 1/4 Full |
| 2 | $Ry(90^\circ)$ | | | | |
| 3 | $Ry(180^\circ)$ | | | | |
| 4 | $H \rightarrow Rz(45^\circ)$ | | | | |

**Visual Analysis**:
*   **The Unit Circle Map**: Using the X and Z coordinates from Trial 1, plot the vector on a 2D circle. Show how the $Ry$ gate "sweeps" through the circle.
*   **Trajectory Trails**: Note the different path "colors" or "thickness" in the simulator for different axes of rotation.

---

### **03.8 INDUSTRY CASE STUDY: MRI & QUANTUM SENSING**
*(Word Count Target: 300+)*

**Hardware Modality: Nuclear Magnetic Resonance (NMR)**
The most commercially successful application of quantum rotations is **Magnetic Resonance Imaging (MRI)**. Every person who receives an MRI is essentially undergoing a massive quantum experiment. When the technician says they are "tuning the pulse," they are literally adjusting the $\theta$ of a Pauli-rotation gate.

In an MRI scanner:
1.  **Alignment**: A 3-Tesla magnet aligns the spins (Bloch vectors) of hydrogen nuclei in your water molecules to the $|0\rangle$ state.
2.  **Excitation**: The scanner sends an **RF Pulse** ($Ry$ gate). To get the best signal, they use a "90-degree pulse" ($Ry(\pi/2)$) to knock the vectors onto the equator.
3.  **Measurement**: As the vectors precess back to the pole ($|0\rangle$), they emit radio waves. The speed at which they rotate ($Rz$ precession) tells the computer whether the tissue is healthy or scarred.

**Industrial Application: Quantum Magnetometry**
Beyond medicine, these same rotations are used in **Quantum Magnetometry**. Companies use diamond-detectors (NV Centers) to measure Earth's magnetic field with nanotesla precision. By observing how deep-earth magnetic fields cause a qubit's Bloch vector to "rotate" away from its set position, geologists can find oil, gold, or hidden archeological sites without digging a single hole.

---

### **03.9 POST-LAB ANALYTICAL QUESTIONS**
1.  **Inverse Trigonometry**: If you see a probability of $P(1) = 0.10$ in the histogram, what was the rotation angle $\theta$ (in radians) applied by the gate?
2.  **The Z-Gate Paradox**: Why does the **Rz gate** be used in communication protocols even if it doesn't change the measurement outcome of 0s and 1s?
3.  **Error Correction**: In real hardware, thermal noise can cause a qubit to "decay" from the South Pole back to the North Pole. Which rotation gate ($Rx, Ry, Rz$) would best model this physical error?
4.  **Hardware Insight**: In superconducting qubits, the $Ry$ gate is simply an $Rx$ gate with a 90-degree phase shift in the microwave carrier. Explain why rotating a sphere around X is the same as rotating it around Y if you change your perspective.
5.  **Logic Scaling**: If you apply an $Ry(360^\circ)$ gate, what is the final state? Is it $|0\rangle$ or $-|0\rangle$? (Search for the concept of "Quantum Phase Kickback").

---

### **03.10 CONCLUSION & NEXT STEPS**
**Summary of Findings**: We have successfully transitioned from binary logic to analog quantum control. We demonstrated that the $Ry$ gate allows us to "tune" probabilities by manipulating the cosine and sine of the rotation angle. We also proved that $Rz$ rotations manage the "hidden" relative phase.

**Final Insight**: The ability to access **arbitrary** probabilities is why quantum computers can model molecular energy levels or financial derivatives that classical computers find impossible.

**Preparation for Lab 04**: 
We've seen how phase rotates on the equator, but we haven't explored its power. In **Lab 04**, we will go deep into **The Hidden Dimension** (Complex Phase) and understand how $Z, S,$ and **T-gates** prepare qubits for complex interference experiments.
