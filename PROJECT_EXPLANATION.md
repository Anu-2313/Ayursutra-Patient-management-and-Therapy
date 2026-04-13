# AyurSutra — Complete Project Explanation
### For Academic Presentation & Teacher Review

---

## What is AyurSutra?

**AyurSutra** is a cloud-based digital management system built specifically for **Panchakarma therapy centers** (Ayurvedic clinics). The name "AyurSutra" combines two Sanskrit words — *Ayur* (life/health) and *Sutra* (thread/formula) — meaning "the formula for a healthy life."

The project solves a real-world problem: most Ayurvedic clinics in India still use paper registers, manual appointment books, and handwritten patient files. This causes:
- Long patient waiting times
- Scheduling conflicts between doctors and therapy rooms
- Loss of important patient health records
- No safety checks before giving treatments

AyurSutra replaces all of this with a smart digital system.

---

## The Problem This Project Solves

According to research (Rastogi, 2011), **two-thirds of a patient's time** in a Panchakarma center is wasted just waiting — not because of treatment, but because of poor scheduling and missing records.

Current hospital software (like general HMS systems) is designed for modern medicine (allopathy). They have **no fields** for Ayurvedic concepts like:
- What is the patient's body type? (Prakriti)
- How strong is their digestion? (Agni)
- How sensitive is their stomach? (Koshta)

Without these, a doctor cannot safely prescribe Panchakarma therapy. AyurSutra fills this gap.

---

## Medical Terms Used in This Project (Explained Simply)

### 1. Panchakarma
**What it means:** "Pancha" = Five, "Karma" = Actions. It is a 5-step Ayurvedic detoxification and healing process.

**The 5 therapies are:**
- **Vamana** — Therapeutic vomiting to remove excess Kapha (mucus/heaviness) from the body
- **Virechana** — Therapeutic purgation (controlled laxative) to remove excess Pitta (heat/toxins)
- **Basti** — Medicated enema to balance Vata (air/movement) and clean the colon
- **Nasya** — Nasal administration of medicated oils to clear the head and neck region
- **Raktamokshana** — Blood purification therapy

**Why it matters:** Panchakarma is not a simple treatment. It has 3 phases and requires careful planning based on each patient's unique body type.

---

### 2. Prakriti (Body Constitution)
**What it means:** Every person is born with a unique combination of three energies. This is called their Prakriti — their permanent body and mind type.

**The three types:**
| Prakriti | Physical Traits | Mental Traits |
|----------|----------------|---------------|
| **Vata** | Thin, dry skin, light body | Creative, anxious, quick thinker |
| **Pitta** | Medium build, sharp features, warm body | Focused, intense, leadership quality |
| **Kapha** | Heavy build, smooth skin, strong | Calm, stable, slow but steady |

**Why it matters in AyurSutra:** The system uses Prakriti to decide which oil to use, what temperature the therapy should be, and how intense the treatment should be. A Pitta person cannot handle high-temperature steam therapy — the system automatically warns the doctor.

---

### 3. Agni (Digestive Fire)
**What it means:** In Ayurveda, "Agni" literally means fire. It represents the body's digestive and metabolic power — how well the body processes food and medicine.

**The 4 states of Agni:**
| State | Meaning | Clinical Risk |
|-------|---------|---------------|
| **Samagni** | Balanced, healthy digestion | No restrictions |
| **Manda** | Slow, weak digestion | Cannot handle heavy medicated ghee — risk of Ama (toxin) formation |
| **Tikshna** | Sharp, overactive digestion | Avoid spicy/sour foods and intense therapies |
| **Vishama** | Irregular, unpredictable digestion | Must eat at fixed times |

**Why it matters in AyurSutra:** Before giving a patient Snehapana (internal medicated ghee therapy), the doctor MUST know the Agni state. If a patient has Manda Agni and receives heavy ghee, it can cause metabolic toxicity. AyurSutra shows a red warning automatically.

---

### 4. Koshta (Bowel Nature)
**What it means:** Koshta describes how a person's gastrointestinal system (stomach and intestines) responds to medicines and treatments.

**The 3 types:**
| Type | Meaning | Clinical Importance |
|------|---------|-------------------|
| **Madhya** | Moderate, normal bowel | Standard treatments apply |
| **Krura** | Hard, constipated bowel | Needs stronger preparation before purgation |
| **Mrudu** | Sensitive, loose bowel | HIGH-INTENSITY VIRECHANA IS DANGEROUS |

**Why it matters in AyurSutra:** This is the most safety-critical parameter. If a patient has **Mrudu Koshta** and a doctor prescribes high-intensity Virechana (purgation), it can cause severe dehydration and complications. AyurSutra shows a **🚨 CRITICAL alert** and blocks the recommendation.

---

### 5. Nadi Pariksha (Pulse Examination)
**What it means:** In Ayurveda, a trained doctor reads the patient's pulse at the wrist using three fingers. Each finger detects a different energy (Vata, Pitta, Kapha). This is part of the "Dashavidha Pariksha" (Ten-fold examination).

**The 4 pulse types in AyurSutra:**
- **Vata Nadi** — Irregular, thin, fast pulse (like a snake's movement)
- **Pitta Nadi** — Sharp, jumping, moderate pulse (like a frog's movement)
- **Kapha Nadi** — Slow, broad, steady pulse (like a swan's movement)
- **Mixed** — Combination of the above

**Why it matters:** Nadi confirms the Dosha diagnosis. If the Prakriti says Vata but the Nadi shows Pitta, the doctor knows there is a current imbalance (Vikriti) that needs attention.

---

### 6. Dosha (Body Energy)
**What it means:** Dosha means "that which can cause imbalance." The three Doshas — Vata, Pitta, Kapha — are the fundamental energies that govern all physical and mental processes.

- **Vata** = Air + Space energy → Controls movement, breathing, nerve signals
- **Pitta** = Fire + Water energy → Controls digestion, metabolism, intelligence
- **Kapha** = Earth + Water energy → Controls structure, immunity, lubrication

**In AyurSutra:** The ML (Machine Learning) model predicts which Dosha is dominant based on the patient's physical and lifestyle data, then recommends the most suitable therapy.

---

### 7. The Three Phases of Panchakarma

#### Phase 1: Purvakarma (Preparatory Phase)
**What it means:** "Purva" = Before. This is the preparation done BEFORE the main treatment.

**Two sub-steps:**
- **Snehana (Oleation):** The patient is given medicated ghee (clarified butter) internally and oil massage externally. This "lubricates" the body and loosens the toxins from deep tissues.
- **Swedana (Sudation):** Steam therapy. The heat makes the patient sweat, which further loosens the toxins and moves them toward the digestive tract for elimination.

**Goal:** Achieve "Utkleshvastha" — the state where toxins are fully liquefied and ready to be expelled.

**In AyurSutra:** The Therapy Cycle Planner automatically schedules Days 1-3 (or 1-5 for 14-day cycles) as Purvakarma with the correct oil based on Prakriti.

---

#### Phase 2: Pradhanakarma (Main Cleansing Phase)
**What it means:** "Pradhana" = Primary/Main. This is the actual detoxification treatment.

Based on the patient's Prakriti, the main therapy is selected:
- Vata dominant → **Basti** (medicated enema)
- Pitta dominant → **Virechana** (purgation)
- Kapha dominant → **Vamana** (therapeutic emesis)

**In AyurSutra:** The system automatically selects the correct main therapy and checks for contraindications before scheduling.

---

#### Phase 3: Paschatkarma (Follow-up Phase)
**What it means:** "Paschat" = After. This is the recovery and rehabilitation phase after the main treatment.

**Key component — Samsarjana Krama:**
This is a graduated diet plan where the patient slowly rebuilds their digestive strength. They start with liquid foods (rice water), then semi-solid, then normal food over several days.

**Why it's critical:** After Panchakarma, the digestive system is very sensitive. Eating heavy food immediately can cause serious complications. AyurSutra tracks this phase and reminds both doctor and patient.

---

### 8. Abhyanga
**What it means:** Full-body oil massage using warm medicated oils. It is one of the most common Panchakarma therapies.

**Special requirement:** Abhyanga requires **2 therapists working simultaneously** in perfect synchronization to maintain equal pressure and temperature on both sides of the body.

**In AyurSutra:** The scheduling system automatically allocates 2 therapists for Abhyanga and checks that both are available at the same time — something no general hospital software does.

---

### 9. Shirodhara
**What it means:** "Shiro" = Head, "Dhara" = Flow. Warm medicated oil is poured in a continuous stream on the patient's forehead for 30-45 minutes.

**Used for:** Stress, anxiety, insomnia, headaches, neurological conditions.

**Oil used:** Ksheerabala Tailam (2 liters per session).

**In AyurSutra:** The inventory system automatically deducts 2L of Ksheerabala Tailam when a Shirodhara session is booked and alerts the administrator when stock is low.

---

### 10. Virechana
**What it means:** Therapeutic purgation — controlled use of herbal laxatives to eliminate excess Pitta (heat and toxins) from the small intestine.

**Safety concern:** This is the most dangerous therapy if given to the wrong patient. A patient with **Mrudu Koshta** (sensitive bowel) can suffer severe dehydration.

**In AyurSutra:** The system has a **Critical Safety Net** — if a doctor tries to schedule Virechana for a Mrudu Koshta patient, a red alert appears immediately and the recommendation is flagged as CRITICAL.

---

### 11. Tailam (Medicated Oil)
**What it means:** "Tailam" means oil in Sanskrit. In Panchakarma, specific medicated oils are prepared by boiling herbs in sesame or coconut oil. Different oils are used for different conditions.

**Common oils in AyurSutra's inventory:**
| Oil Name | Used For |
|----------|---------|
| Ksheerabala Tailam | Shirodhara, Basti, neurological conditions |
| Sesame Oil (Tila Taila) | Abhyanga for Vata patients |
| Coconut Oil (Narikela Taila) | Abhyanga for Pitta patients |
| Castor Oil (Eranda Taila) | Virechana (purgation) |
| Mustard Oil (Sarshapa Taila) | Abhyanga for Kapha patients |

---

### 12. Ama (Toxins)
**What it means:** "Ama" literally means "undigested/unprocessed." In Ayurveda, when Agni (digestive fire) is weak, food and medicines are not properly processed, creating Ama — a sticky toxic substance that blocks the body's channels.

**Why it matters:** If a patient with Manda Agni (weak digestion) is given heavy medicated ghee (Snehapana), the ghee cannot be digested and turns into Ama, causing metabolic toxicity.

**In AyurSutra:** The system warns: "Manda Agni detected — risk of Ama formation with heavy ghee doses."

---

### 13. Sara (Tissue Quality) and Satva (Mental Strength)
These are part of the **Dashavidha Pariksha** (Ten-fold Ayurvedic examination):

- **Sara** = Quality of body tissues (Pravara = Excellent, Madhyama = Moderate, Avara = Poor)
- **Satva** = Mental and psychological strength (Pravara = Strong, Madhyama = Moderate, Avara = Weak)

These help the doctor understand how well the patient will respond to intensive treatments and how much mental stress they can handle during the therapy.

---

## How AyurSutra Works — Step by Step

### Step 1: Patient Registration
A new patient visits the clinic. The receptionist/doctor opens AyurSutra and fills in:

**Layer 1 — Allopathic/Demographic data:**
- Name, age, gender, height, weight, phone
- Medical history (diabetes, hypertension, etc.)
- Known allergies
- Chief complaint (why they came)

**Layer 2 — Ayurvedic Diagnostic data (using Structured Input Method):**
- Prakriti (body constitution)
- Agni (digestive fire state — dropdown with exactly 4 options)
- Koshta (bowel type — dropdown with exactly 3 options)
- Nadi (pulse type)
- Sara (tissue quality)
- Satva (mental strength)

**Why structured dropdowns?** Research showed that 3 different doctors described the same patient's Agni as "Weak Agni," "Poor Digestion," and "Slow Metabolic Rate" — all meaning the same thing but impossible to search or analyze. AyurSutra forces everyone to use the same standard term: "Manda." This achieves **100% terminological uniformity**.

**Result:** A **Longitudinal Patient Record (LPR)** is created — a permanent digital health file that tracks the patient's health over time.

---

### Step 2: ML-Powered Therapy Scheduling
The doctor opens the Therapy Scheduler and enters:
- Patient name and Ayurvedic parameters
- Symptoms (e.g., "stress, joint pain, insomnia")
- Preferred date and time

**The AI/ML system then:**
1. Runs the **Dosha Classifier** — predicts whether the patient is Vata, Pitta, or Kapha dominant (87.3% accuracy)
2. Runs the **Therapy Recommender** — suggests the top 3-4 most suitable therapies (82.7% accuracy)
3. Runs the **Contraindication Engine** — checks all safety rules and shows alerts

**Conflict Resolution (15-minute Turnaround Constant):**
When booking, the system checks:
- Is the selected therapist already booked at that time?
- Is the therapy room already occupied?
- Is there at least 15 minutes gap between sessions (for room cleaning)?

If any conflict exists, the system blocks the booking and suggests alternative time slots.

---

### Step 3: Multi-Day Therapy Cycle Planning
For a full Panchakarma course (7 or 14 days), the doctor uses the **Cycle Planner**:

1. Enter patient name, Prakriti, Agni, Koshta, start date
2. System generates a complete day-by-day plan:
   - Days 1-3: Purvakarma (Snehana + Swedana)
   - Days 4-5: Pradhanakarma (main therapy based on Prakriti)
   - Days 6-7: Paschatkarma (Samsarjana Krama diet)
3. Each day shows: therapy name, oil required, quantity, number of therapists needed, duration
4. **Inventory is automatically calculated** — e.g., "You need 3.5L of Ksheerabala Tailam for this cycle"

---

### Step 4: Inventory Management (Depletion-Linked Tracking)
When a therapy session is booked:
- System calculates how much oil will be used
- Deducts from current stock
- If stock falls below reorder level → **automatic alert to administrator**

Example: Shirodhara uses 2L of Ksheerabala Tailam per session. If 3 Shirodhara sessions are booked this week and only 4L is in stock, the system alerts: "Stock will run out after 2 sessions. Order now."

---

### Step 5: Role-Based Dashboards
Different people see different things when they log in:

**Admin Dashboard:**
- All appointments for the day
- All staff availability
- Center performance metrics (cancellation rate, room utilization)
- Low inventory alerts
- Safety alerts across all patients

**Practitioner (Doctor) Dashboard:**
- Today's patient consultations
- Patient Prakriti distribution chart
- Clinical safety alerts
- Quick access to clinical tools

**Therapist Dashboard:**
- ONLY their own assigned sessions for today
- "Next Session" highlighted with one-tap Start button
- Session progress tracker
- Protocol reminders (oil temperature, room cleaning)

**Patient Dashboard:**
- Their own health profile (Prakriti, Agni, Koshta)
- Upcoming appointments
- Personalized diet plan
- Wellness tips based on their Agni state
- Therapy progress tracker

---

### Step 6: Digital Health Records (EHR)
All patient records are stored digitally and can be:
- Searched by patient name, therapy, date
- Filtered by Agni state or Koshta type
- Expanded to show full Ayurvedic profile
- Flagged with safety alerts

**Example:** A doctor searches for all patients with "Manda Agni" — instantly finds them and can review their treatment plans.

---

## Key Features Summary

| Feature | What It Does | Why It Matters |
|---------|-------------|----------------|
| Patient Registration | Captures both allopathic and Ayurvedic data | Creates complete health profile |
| Dosha Classifier (ML) | Predicts Vata/Pitta/Kapha dominance | 87.3% accuracy, guides therapy selection |
| Therapy Recommender (ML) | Suggests best therapies | 82.7% accuracy, expert-validated |
| Contraindication Engine | Checks safety rules | Prevents dangerous therapy combinations |
| Conflict Resolution | Prevents double-booking | 100% success rate in stress tests |
| 15-min Turnaround Buffer | Ensures room cleaning time | Reduces Static Idle Time by 40% |
| Multi-Day Cycle Planner | Plans full Panchakarma course | Automates 7/14-day scheduling |
| Inventory Tracking | Monitors oil/herb stock | Prevents running out mid-treatment |
| Role-Based Dashboards | Different views per user | Right information to right person |
| Structured Input Method | Enforces standard terminology | 100% data uniformity |

---

## Efficiency Results (From Research Paper)

| Task | Manual Time | AyurSutra Time | Time Saved |
|------|------------|----------------|-----------|
| New Patient Registration | 12.5 minutes | 3.2 minutes | **74.4%** |
| 7-Day Therapy Scheduling | 18.0 minutes | 1.5 minutes | **91.6%** |
| Finding Patient Records | 5.0 minutes | Less than 5 seconds | **98.3%** |
| Daily Resource Report | 45.0 minutes | Instant (automated) | **100%** |
| **Overall Admin Time** | — | — | **88% reduction** |

---

## Technology Used (Simple Explanation)

| Technology | What It Is | Why Used |
|-----------|-----------|---------|
| React | JavaScript library for building web pages | Makes the interface fast and interactive |
| TypeScript | Typed version of JavaScript | Prevents coding errors |
| Vite | Build tool | Makes the app load very fast |
| Tailwind CSS | Styling framework | Makes the design look professional |
| React Router | Navigation system | Handles moving between pages |
| localStorage | Browser storage | Saves data without a backend server |
| PWA | Progressive Web App | Can be installed on phone like an app |

---

## Who Benefits From AyurSutra?

### Practitioners (Doctors/Vaidyas)
- 40% less time on administrative work
- Instant access to patient history
- AI-powered therapy recommendations
- Safety alerts prevent medical errors

### Patients
- Shorter waiting times
- Personalized treatment based on their unique body type
- Digital health records they can access anytime
- Personalized diet plan and wellness tips

### Administrators
- Real-time room and staff utilization data
- Automatic inventory alerts
- 60% fewer administrative tasks
- Compliance with NABH (National Accreditation Board for Hospitals) standards

---

## Alignment with Government Initiatives

AyurSutra is designed to align with:

1. **NAMASTE Portal** (Ministry of Ayush) — Uses standardized Ayurvedic terminology codes
2. **ABHA System** (Ayushman Bharat Digital Mission) — Ready for integration with national health ID
3. **DPDP Act 2023** (Digital Personal Data Protection) — Patient data is protected with role-based access
4. **NABH Standards** — Documented, error-free patient journey

---

## Future Scope

1. **AI Diet Planner** — Using Charaka Samhita (ancient Ayurvedic text) as training data for a Generative AI that creates dynamic daily meal plans
2. **IoT Wearables** — Monitor patient's heart rate, sleep, and skin temperature during Paschatkarma (recovery phase) at home
3. **Tele-Consultation** — Video consultation with digital pulse reading interface for global patients
4. **Predictive Analytics** — Using Big Data to predict which therapy combinations work best for which Prakriti types across seasons (Rituchikram)

---

## Demo Login Credentials

| Role | Email | Password | What They See |
|------|-------|----------|--------------|
| Admin | admin@ayursutra.com | admin123 | Full center control, all data |
| Practitioner | doctor@ayursutra.com | doctor123 | Clinical tools, patient consultations |
| Therapist | therapist@ayursutra.com | therapy123 | Only their own sessions |
| Patient | patient@ayursutra.com | patient123 | Personal health portal |

---

## In One Sentence

**AyurSutra is a smart digital platform that brings Ayurvedic wisdom into the modern age — it helps Panchakarma centers manage patients safely, schedule therapies intelligently, track medicines automatically, and give every patient a personalized treatment experience based on their unique body type.**

---

*Prepared for academic presentation — AyurSutra Capstone Project*
*Department of Computer Science and Engineering, Lovely Professional University*
