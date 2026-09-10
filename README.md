# Tech Pulse — General Knowledge Quiz

An interactive, responsive single-page multiple-choice quiz web application built with **HTML5, Vanilla CSS, and Vanilla JavaScript (ES6+)**.

Developed for Devcomm Round 2 by **[Shadab](https://sh4dabexe.netlify.app/)**.

---

## 🚀 Live Demo & Portfolio

- **Portfolio**: [https://sh4dabexe.netlify.app/](https://sh4dabexe.netlify.app/)

---

## 🎯 Features

- **Zero Dependencies**: Pure HTML, CSS, and Vanilla JavaScript. No external libraries, build tools, databases, or frameworks.
- **20-Question Curated Bank**: Predefined questions across Science, Technology, Geography, History, and the World.
- **Randomized 5-Question Quizzes**: Uses the **Fisher-Yates shuffle algorithm** to randomly sample 5 unique questions per attempt ($20\text{C}5 = 15,504$ combinations) with guaranteed zero duplicate questions.
- **Two Feedback Modes**:
  - **Results at the End**: Form-style view of all 5 questions with dynamic progress tracking and complete submission validation.
  - **Reveal After Each Question**: Step-by-step presentation with instant feedback on each answer before proceeding.
- **Comprehensive Results Screen**:
  - Score display out of 5 and percentage badge.
  - Detailed breakdown of correct and incorrect answers.
  - Full question review cards with color-coded answer comparison (`Your answer` vs. `Correct answer`).
- **Creator Showcase & Attribution**:
  - Dedicated interactive portfolio showcase card for Shadab.
- **Modern Responsive Design**:
  - Sleek dark theme (`#0B0F14`, `#151E27`, `#38BDF8`).
  - Google Fonts Inter typography.
  - Fluid mobile-first responsiveness (optimized for desktop, tablet, and mobile down to 360px).
  - Accessible touch targets (44px+), keyboard navigation, and semantic markup.

---

## 📁 File Structure

```text
├── index.html              # Main HTML markup & screen structures
├── style.css               # Design system, theme tokens, animations & responsive queries
├── script.js               # 20-question bank, Fisher-Yates sampling, game modes & scoring
├── implementation_plan.md  # Detailed project specification & requirements
└── README.md               # Project documentation
```

---

## 💻 How to Run Locally

You can run this project locally without any complex installation:

### Option 1: Direct Browser
Open `index.html` directly in any modern browser (Chrome, Firefox, Edge, Safari).

### Option 2: Local HTTP Server (Python)
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 👨‍💻 Author

**Shadab**
- Website: [https://sh4dabexe.netlify.app/](https://sh4dabexe.netlify.app/)
