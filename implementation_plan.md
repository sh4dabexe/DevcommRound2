# Quiz Website — Implementation Plan

## 1. Project Overview

Build a **single-page, responsive multiple-choice quiz website** using only:

* HTML
* CSS
* Vanilla JavaScript

No backend, database, authentication, or external API is required.

The quiz will contain a **predefined bank of 20 General Knowledge MCQs** stored directly in JavaScript.

For every quiz attempt:

* Exactly **5 questions** are selected randomly from the 20-question bank.
* Each question has 4 multiple-choice options.
* The user answers all 5 questions.
* The website calculates and displays the final score **out of 5**.
* The user can start another quiz, generating a new random combination.

The total possible 5-question combinations are:

**20C5 = 15,504 combinations**

Therefore, repeated attempts can produce many different quizzes.

---

# 2. User Flow

The complete application should follow this flow:

```text
Website Opens
      ↓
Welcome Screen
      ↓
Enter Name
      ↓
Choose Answer Mode
      ↓
┌─────────────────────────────┐
│ 1. Show answers at the end  │
│ 2. Reveal answers each step  │
└─────────────────────────────┘
      ↓
Randomly select 5 questions
from 20
      ↓
Quiz Screen
      ↓
Answer Question 1
      ↓
Answer Question 2
      ↓
Answer Question 3
      ↓
Answer Question 4
      ↓
Answer Question 5
      ↓
Submit Quiz
      ↓
Final Score / Results
      ↓
Review Correct & Incorrect Answers
      ↓
Start Again
      ↓
New random 5-question quiz
```

---

# 3. Welcome Screen

When the website is opened, the first screen should not immediately show the quiz.

Instead, display a clean welcome card.

### Content

```text
TECH PULSE
General Knowledge Quiz

Test your knowledge across
science, geography, history,
technology and the world.

[ Enter your name ]

[ Continue → ]
```

### Name Input

The user must enter their name before starting.

Example:

```text
Your Name
┌──────────────────────────────┐
│ Enter your name...           │
└──────────────────────────────┘
```

The Continue button should remain disabled until a valid name is entered.

---

# 4. Answer Mode Selection

After entering the name, show the quiz mode selection.

## Mode 1 — Results at End

```text
◉ Results at the End

Answer all 5 questions first.
Your correct and incorrect answers
will be revealed after submission.
```

## Mode 2 — Instant Feedback

```text
○ Reveal After Each Question

Submit each answer and immediately
see whether your answer was correct.
```

The selected mode should be visually highlighted.

Then:

```text
[ Start Quiz → ]
```

---

# 5. Question Bank

All questions are predefined in JavaScript.

The question bank contains **20 General Knowledge questions**.

Data structure:

```js
const questions = [
    {
        id: 1,
        question: "...",
        options: ["...", "...", "...", "..."],
        answer: "..."
    }
];
```

Each question must contain:

* Unique ID
* Question text
* Four options
* Correct answer

The questions should not be manually written into the HTML.

JavaScript will dynamically generate the quiz UI.

---

# 6. Random Question Selection

Every quiz attempt must randomly select **5 unique questions** from the 20-question bank.

The same question must not appear twice in a single attempt.

Conceptually:

```text
20 Questions
     ↓
Shuffle
     ↓
Take First 5
     ↓
Quiz
```

A proper shuffle algorithm such as **Fisher-Yates** should be preferred over relying on repeated random selection.

Example:

```js
function getRandomQuestions() {
    const shuffled = [...questions];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
        [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 5);
}
```

This guarantees 5 different questions within an attempt.

---

# 7. Quiz Screen

The main quiz screen should follow a **Google Forms-inspired structure**, but with a custom visual identity.

Each question appears as a separate card.

Example:

```text
┌─────────────────────────────────────────┐
│ QUESTION 01 / 05                        │
│                                         │
│ Which planet is known as the Red Planet?│
│                                         │
│ ○ Venus                                 │
│ ○ Mars                                  │
│ ○ Jupiter                               │
│ ○ Mercury                               │
└─────────────────────────────────────────┘
```

All 5 questions should be visible on the same page.

---

# 8. Progress Indicator

At the top of the quiz screen:

```text
QUESTION PROGRESS

5 questions
━━━━━━━━━━━━━━━━━━━━
████████░░░░░░░░░░░░  40%
```

The progress indicator should communicate:

* Total questions: 5
* Number of answered questions
* Percentage completed

Example:

```text
2 / 5 answered
40%
```

---

# 9. Answer Options

Options should not look like plain browser radio buttons.

Each option should be a clickable card.

Default:

```text
┌─────────────────────────────────┐
│ ○  Pacific Ocean                │
└─────────────────────────────────┘
```

Selected:

```text
┌─────────────────────────────────┐
│ ●  Pacific Ocean                │
└─────────────────────────────────┘
```

The entire option card should be clickable.

Only one option can be selected per question.

---

# 10. Submit Behaviour

The Submit button should appear after the five questions.

```text
[ Submit Quiz → ]
```

Before submission:

* Check whether all 5 questions have been answered.
* If any question is unanswered, prevent submission.
* Clearly indicate unanswered questions.

Example:

```text
Please answer Question 4 before submitting.
```

Do not silently submit an incomplete quiz.

---

# 11. Mode 1 — Answers Revealed at End

If the user selected:

**Results at the End**

Then after clicking Submit:

1. Calculate score.
2. Show final score.
3. Show review of all 5 questions.
4. Mark correct/incorrect answers.

### Correct

```text
✓ CORRECT

Your answer:
Mars

Correct answer:
Mars
```

Use green styling.

### Incorrect

```text
✕ INCORRECT

Your answer:
Venus

Correct answer:
Mars
```

User's incorrect answer should be red.

The correct answer should always be green.

---

# 12. Mode 2 — Reveal After Each Question

If the user selected:

**Reveal After Each Question**

The website should provide immediate feedback after answering a question.

Example:

```text
Question 01 / 05

Which planet is known as the Red Planet?

● Mars
○ Venus
○ Jupiter
○ Mercury

[ Submit Answer ]
```

After submission:

```text
✓ Correct!

Mars is the correct answer.

[ Next Question → ]
```

For an incorrect answer:

```text
✕ Incorrect

Your answer:
Venus

Correct answer:
Mars

[ Next Question → ]
```

The answer state should be visually clear.

After Question 5, show the final score.

---

# 13. Final Results Screen

After all 5 questions have been completed:

```text
QUIZ COMPLETE

Great job, Voice!

        4 / 5

        80%

✓ 4 Correct
✕ 1 Incorrect
```

The score should be the primary visual element.

Below the score, display the question review.

---

# 14. Results Review

Each question should show:

```text
QUESTION 03

What is the chemical symbol for gold?

Your answer:
✓ Au

Correct answer:
✓ Au
```

Correct question:

* Green border
* Green status indicator
* Green correct answer

Incorrect question:

```text
QUESTION 04

Which is the largest ocean?

Your answer:
✕ Atlantic Ocean

Correct answer:
✓ Pacific Ocean
```

Incorrect user answer:

* Red

Correct answer:

* Green

---

# 15. Start Again

At the bottom of the results screen:

```text
[ ↻ Start Again ]
```

When clicked:

* Clear previous answers.
* Reset score.
* Keep or re-request the user's name.
* Keep the selected answer mode.
* Generate a fresh random set of 5 questions.
* Return to the quiz screen.

The new quiz should not simply reuse the previous five questions unless randomness happens to select them again.

---

# 16. Visual Design

## Design Direction

The website should feel:

* Modern
* Clean
* Slightly futuristic
* Minimal
* Academic/tech oriented
* Professional rather than childish

Avoid:

* Excessive gradients
* Huge animations
* Cartoon-style graphics
* Too many colors
* Excessive glassmorphism
* Distracting backgrounds

The goal is a polished student project rather than an over-engineered commercial dashboard.

---

# 17. Color Palette

### Primary Background

```text
#0B0F14
```

Very dark blue-black.

### Secondary Background

```text
#111820
```

Used for cards and sections.

### Card Background

```text
#151E27
```

### Primary Accent

```text
#38BDF8
```

Electric/cyan blue.

### Primary Text

```text
#F8FAFC
```

### Secondary Text

```text
#94A3B8
```

### Border

```text
#263241
```

### Correct / Success

```text
#22C55E
```

### Incorrect / Error

```text
#EF4444
```

### Warning

```text
#F59E0B
```

Use green and red primarily for quiz feedback rather than general decoration.

---

# 18. Typography

Use a modern sans-serif font.

Preferred:

```text
Inter
```

Fallback:

```css
font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
```

Typography hierarchy:

```text
Website Title
32–40px

Section Heading
24–28px

Question
20–22px

Option
16px

Supporting Text
14–15px

Labels
12–13px
```

On mobile, typography should scale down slightly.

---

# 19. Layout

Desktop layout:

```text
┌────────────────────────────────────────────────────┐
│                    HEADER                           │
│                                                     │
│              TECH PULSE QUIZ                        │
│                                                     │
├────────────────────────────────────────────────────┤
│                                                     │
│              MAIN QUIZ CONTAINER                    │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │ Question 01                                 │   │
│  │ Options                                     │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │ Question 02                                 │   │
│  │ Options                                     │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│                     ...                             │
│                                                     │
└────────────────────────────────────────────────────┘
```

Recommended maximum content width:

```text
720px – 800px
```

This keeps the quiz readable instead of stretching it across the entire screen.

---

# 20. Responsive Design

Responsive design is a major requirement.

The website must work properly on:

* Desktop
* Laptop
* Tablet
* Mobile
* Small mobile screens

## Desktop

At widths above approximately 900px:

```text
max-width: 760px
margin: auto
```

Use comfortable spacing around question cards.

---

## Tablet

At approximately 600–900px:

* Reduce outer page padding.
* Keep cards almost full width.
* Reduce heading size slightly.
* Maintain comfortable option sizes.

---

## Mobile

Below approximately 600px:

```css
padding: 16px;
```

Question cards should become nearly full width.

Example:

```text
┌────────────────────────┐
│ QUESTION 01 / 05       │
│                        │
│ Which planet is known  │
│ as the Red Planet?     │
│                        │
│ ┌────────────────────┐ │
│ │ ○ Venus            │ │
│ └────────────────────┘ │
│                        │
│ ┌────────────────────┐ │
│ │ ○ Mars             │ │
│ └────────────────────┘ │
└────────────────────────┘
```

Important mobile considerations:

* No horizontal scrolling.
* Buttons should be easy to tap.
* Option cards should have sufficient height.
* Text should wrap naturally.
* Progress bar should fit within the screen.
* Result score should remain prominent.
* Avoid tiny fonts.

Minimum recommended touch target:

```text
44px+
```

for interactive controls.

---

# 21. Responsive Breakpoints

Use simple CSS media queries.

```css
/* Mobile */
@media (max-width: 600px) {
    ...
}

/* Tablet */
@media (min-width: 601px) and (max-width: 900px) {
    ...
}

/* Desktop */
@media (min-width: 901px) {
    ...
}
```

Do not create unnecessary breakpoints.

---

# 22. Animations

Animations should be subtle.

Recommended:

* Card fade-in
* Button hover
* Option selection transition
* Result reveal
* Progress bar transition

Avoid heavy animations.

Example:

```css
transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
```

A selected option may slightly move upward:

```text
transform: translateY(-1px);
```

Keep animations fast and unobtrusive.

---

# 23. JavaScript Architecture

Keep the JavaScript modular.

Suggested functions:

```text
initializeQuiz()
        ↓
getRandomQuestions()
        ↓
renderQuiz()
        ↓
handleAnswer()
        ↓
submitQuiz()
        ↓
calculateScore()
        ↓
showResults()
        ↓
startAgain()
```

Additional functions:

```text
validateName()
selectMode()
renderQuestion()
showInstantFeedback()
updateProgress()
resetQuiz()
```

---

# 24. Application State

JavaScript should maintain:

```js
let userName = "";
let quizMode = "";
let currentQuestions = [];
let userAnswers = [];
let score = 0;
```

Example:

```text
userName
    ↓
"Voice"

quizMode
    ↓
"end"

currentQuestions
    ↓
[Question 4, Question 12, Question 2, Question 19, Question 7]

userAnswers
    ↓
["Mars", "Au", "Ganga", ...]
```

---

# 25. File Structure

Keep the project simple:

```text
quiz-website/
│
├── index.html
├── style.css
└── script.js
```

Optional:

```text
├── assets/
│   └── ...
```

No framework is necessary.

No backend is necessary.

---

# 26. Data Flow

```text
20-question bank
       ↓
Fisher-Yates shuffle
       ↓
Select 5 questions
       ↓
Render questions
       ↓
User selects answers
       ↓
Store answers
       ↓
Submit
       ↓
Compare with correct answers
       ↓
Calculate score
       ↓
Display result
```

---

# 27. Edge Cases

The implementation should handle:

### Empty name

Do not allow quiz to start.

### Empty answer

Do not allow final submission.

### Start Again

Completely reset:

* Answers
* Score
* Question state
* Feedback state

### Refresh

Since there is no backend, refreshing the page can reset the quiz.

This is acceptable for the assignment.

### Same question appearing twice

Must never happen within the same 5-question attempt.

---

# 28. Accessibility

Basic accessibility should be implemented.

* Use semantic HTML.
* Use proper `<label>` elements for options.
* Ensure keyboard navigation works.
* Maintain visible focus states.
* Do not rely only on color to communicate correct/incorrect states.
* Include text such as `Correct` and `Incorrect` along with green/red styling.
* Ensure sufficient contrast between text and background.

---

# 29. Final Technical Requirements

The completed website must satisfy:

* [x] Single-page application
* [x] HTML/CSS/JavaScript only
* [x] 20 predefined MCQs
* [x] 4 options per question
* [x] Correct answer stored in JavaScript
* [x] User name entry
* [x] Two answer modes
* [x] Random selection of 5 questions
* [x] No duplicate questions within one attempt
* [x] Score calculated out of 5
* [x] Correct answers shown in green
* [x] Incorrect answers shown in red
* [x] Correct answer revealed after submission
* [x] Instant-feedback mode
* [x] Final results screen
* [x] Start Again functionality
* [x] Responsive desktop/tablet/mobile layout
* [x] Frontend only
* [x] No external API
* [x] No backend
* [x] No database

---

# 30. Overall Experience

The final website should feel like:

```text
OPEN WEBSITE
      ↓
"Welcome to Tech Pulse"
      ↓
Enter Name
      ↓
Choose Feedback Mode
      ↓
START QUIZ
      ↓
5 RANDOM QUESTIONS
      ↓
ANSWER
      ↓
SUBMIT
      ↓
┌───────────────────────┐
│       4 / 5           │
│       80%             │
│                       │
│   ✓ 4 Correct         │
│   ✕ 1 Incorrect       │
└───────────────────────┘
      ↓
Review Answers
      ↓
[ Start Again ]
      ↓
Fresh Random Quiz
```

The priority should be **clean UI + reliable functionality + responsive behavior**, rather than adding unnecessary features.
