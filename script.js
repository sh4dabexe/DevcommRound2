/**
 * Tech Pulse — General Knowledge Quiz
 * Pure Vanilla JavaScript implementation
 *
 * Features:
 * - 20 Curated General Knowledge MCQs (Science, Tech, Geography, History, Nature)
 * - Fisher-Yates shuffle algorithm for selecting 5 random unique questions per attempt
 * - Welcome screen with name validation and mode selection
 * - Mode 1: Results at the end (All 5 questions displayed simultaneously with validation)
 * - Mode 2: Instant feedback (Step-by-step questions with immediate answer reveal)
 * - Comprehensive final results screen with score out of 5, percentages, and question review
 * - "Start Again" and "Change Settings" flows
 */

// ==========================================================================
// 1. Question Bank (20 General Knowledge MCQs)
// ==========================================================================
const QUESTION_BANK = [
  {
    id: 1,
    question: "Which planet in our solar system is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: "Mars"
  },
  {
    id: 2,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Pb"],
    answer: "Au"
  },
  {
    id: 3,
    question: "Which is the largest and deepest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    id: 4,
    question: "Who is credited with inventing the World Wide Web in 1989 at CERN?",
    options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Alan Turing"],
    answer: "Tim Berners-Lee"
  },
  {
    id: 5,
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    answer: "Canberra"
  },
  {
    id: 6,
    question: "Which organ in the human body is primarily responsible for filtering blood?",
    options: ["Heart", "Liver", "Kidneys", "Lungs"],
    answer: "Kidneys"
  },
  {
    id: 7,
    question: "In what year did the Apollo 11 mission land the first humans on the Moon?",
    options: ["1965", "1969", "1971", "1975"],
    answer: "1969"
  },
  {
    id: 8,
    question: "Which fundamental force keeps planets in orbit around the Sun?",
    options: ["Electromagnetism", "Strong Nuclear Force", "Gravity", "Centrifugal Force"],
    answer: "Gravity"
  },
  {
    id: 9,
    question: "What is the hardest naturally occurring substance known on Earth?",
    options: ["Quartz", "Titanium", "Diamond", "Graphene"],
    answer: "Diamond"
  },
  {
    id: 10,
    question: "Which country is home to the historic citadel of Machu Picchu?",
    options: ["Bolivia", "Chile", "Peru", "Mexico"],
    answer: "Peru"
  },
  {
    id: 11,
    question: "What does the abbreviation 'CPU' stand for in computer hardware?",
    options: [
      "Central Processing Unit",
      "Computer Power Unit",
      "Core Programming Utility",
      "Central Peripheral Unit"
    ],
    answer: "Central Processing Unit"
  },
  {
    id: 12,
    question: "Which gas makes up approximately 78% of Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    answer: "Nitrogen"
  },
  {
    id: 13,
    question: "Who painted the famous Renaissance masterpiece the 'Mona Lisa'?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Vincent van Gogh"],
    answer: "Leonardo da Vinci"
  },
  {
    id: 14,
    question: "Which river is traditionally recognized as the longest in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    answer: "Nile River"
  },
  {
    id: 15,
    question: "Which subatomic particle carries a negative elementary electric charge?",
    options: ["Proton", "Neutron", "Electron", "Positron"],
    answer: "Electron"
  },
  {
    id: 16,
    question: "In internet networking, what does 'HTTP' stand for?",
    options: [
      "HyperText Transfer Protocol",
      "High-speed Transport Protocol",
      "HyperText Technology Process",
      "Hosted Terminal Transport Packet"
    ],
    answer: "HyperText Transfer Protocol"
  },
  {
    id: 17,
    question: "Which African nation was historically known to the world as Abyssinia?",
    options: ["Egypt", "Ethiopia", "Sudan", "Kenya"],
    answer: "Ethiopia"
  },
  {
    id: 18,
    question: "What is the approximate speed of light traveling through a vacuum?",
    options: ["150,000 km/s", "300,000 km/s", "500,000 km/s", "1,000,000 km/s"],
    answer: "300,000 km/s"
  },
  {
    id: 19,
    question: "Which scientific instrument is used to measure atmospheric pressure?",
    options: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"],
    answer: "Barometer"
  },
  {
    id: 20,
    question: "Which British mathematician and cryptanalyst is regarded as a father of modern computer science?",
    options: ["Alan Turing", "John von Neumann", "Charles Babbage", "Claude Shannon"],
    answer: "Alan Turing"
  }
];

// ==========================================================================
// 2. Application State
// ==========================================================================
const state = {
  userName: "",
  quizMode: "end", // "end" or "instant"
  currentQuestions: [], // 5 questions selected for this attempt
  userAnswers: {}, // { [questionId]: "Selected Option" }
  instantState: {}, // { [questionId]: { submitted: boolean, isCorrect: boolean } }
  currentInstantIndex: 0, // 0 to 4 for instant mode
  score: 0
};

// ==========================================================================
// 3. DOM Elements
// ==========================================================================
const elements = {
  // Screens
  screenWelcome: document.getElementById("screen-welcome"),
  screenQuiz: document.getElementById("screen-quiz"),
  screenResults: document.getElementById("screen-results"),

  // Header status
  headerUserBadge: document.getElementById("header-user-badge"),
  headerPlayerName: document.getElementById("header-player-name"),
  headerModeTag: document.getElementById("header-mode-tag"),

  // Welcome screen
  nameInput: document.getElementById("player-name-input"),
  nameErrorMsg: document.getElementById("name-error-msg"),
  modeRadios: document.querySelectorAll('input[name="quiz-mode"]'),
  modeCards: document.querySelectorAll(".mode-card"),
  btnStartQuiz: document.getElementById("btn-start-quiz"),

  // Quiz screen
  progressSection: document.getElementById("quiz-progress-section"),
  progressCounterText: document.getElementById("progress-counter-text"),
  progressPercentText: document.getElementById("progress-percent-text"),
  progressbar: document.getElementById("quiz-progressbar"),
  progressBarFill: document.getElementById("progress-bar-fill"),
  questionsContainer: document.getElementById("quiz-questions-container"),
  validationAlert: document.getElementById("quiz-validation-alert"),
  validationAlertMsg: document.getElementById("validation-alert-msg"),
  submitBar: document.getElementById("quiz-submit-bar"),
  btnSubmitQuiz: document.getElementById("btn-submit-quiz"),

  // Results screen
  resultsGreeting: document.getElementById("results-greeting"),
  resultsFeedbackPhrase: document.getElementById("results-feedback-phrase"),
  scoreNumerator: document.getElementById("score-numerator"),
  scorePercentBadge: document.getElementById("score-percent-badge"),
  statCorrectCount: document.getElementById("stat-correct-count"),
  statIncorrectCount: document.getElementById("stat-incorrect-count"),
  resultsReviewList: document.getElementById("results-review-list"),
  btnRestartQuiz: document.getElementById("btn-restart-quiz"),
  btnChangeSettings: document.getElementById("btn-change-settings")
};

// ==========================================================================
// 4. Utility Functions (Fisher-Yates Shuffle)
// ==========================================================================

/**
 * Uses the Fisher-Yates algorithm to randomly sample 5 unique questions from the bank.
 * Guarantees exactly 5 different questions without duplicates (20C5 combinations).
 */
function getRandomQuestions() {
  const pool = [...QUESTION_BANK];

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Pick first 5
  return pool.slice(0, 5);
}

/**
 * Switches the active screen with clean opacity/transform animations.
 */
function switchScreen(targetScreen) {
  const screens = [elements.screenWelcome, elements.screenQuiz, elements.screenResults];

  screens.forEach((screen) => {
    if (screen === targetScreen) {
      screen.style.display = "block";
      // Force reflow for CSS transition
      void screen.offsetWidth;
      screen.classList.add("active");
    } else {
      screen.classList.remove("active");
      screen.style.display = "none";
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================================================
// 5. Welcome Screen Logic & Validation
// ==========================================================================

function handleModeCardClick(selectedCard) {
  elements.modeCards.forEach((card) => card.classList.remove("selected"));
  selectedCard.classList.add("selected");

  const radio = selectedCard.querySelector('input[type="radio"]');
  if (radio) {
    radio.checked = true;
    state.quizMode = radio.value;
  }
}

function validateName() {
  const rawValue = elements.nameInput.value;
  const trimmed = rawValue.trim();

  if (!trimmed) {
    elements.nameInput.classList.add("input-error");
    elements.nameErrorMsg.style.display = "block";
    elements.nameInput.focus();
    return false;
  }

  elements.nameInput.classList.remove("input-error");
  elements.nameErrorMsg.style.display = "none";
  state.userName = trimmed;
  return true;
}

function startQuizFlow() {
  if (!validateName()) {
    return;
  }

  // Update header status
  elements.headerPlayerName.textContent = state.userName;
  elements.headerModeTag.textContent = state.quizMode === "end" ? "Results at End" : "Instant Feedback";
  elements.headerUserBadge.style.display = "flex";

  // Reset quiz state and pick 5 new random questions
  initializeNewQuiz();

  // Show quiz screen
  switchScreen(elements.screenQuiz);
}

// ==========================================================================
// 6. Quiz Initialization & Rendering
// ==========================================================================

function initializeNewQuiz() {
  state.currentQuestions = getRandomQuestions();
  state.userAnswers = {};
  state.instantState = {};
  state.currentInstantIndex = 0;
  state.score = 0;

  elements.validationAlert.style.display = "none";

  renderQuiz();
}

function renderQuiz() {
  if (state.quizMode === "end") {
    renderModeEndQuiz();
  } else {
    renderModeInstantQuiz();
  }
  updateProgressBar();
}

// --------------------------------------------------------------------------
// Mode 1: Results at the End (All 5 questions on one page)
// --------------------------------------------------------------------------
function renderModeEndQuiz() {
  elements.submitBar.style.display = "block";
  elements.questionsContainer.innerHTML = "";

  state.currentQuestions.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `question-card-${q.id}`;

    const isAnswered = Boolean(state.userAnswers[q.id]);

    card.innerHTML = `
      <div class="question-header">
        <span class="question-index-label">QUESTION 0${index + 1} / 05</span>
        <span class="question-answered-badge ${isAnswered ? "done" : ""}" id="badge-${q.id}">
          ${isAnswered ? "✓ Answered" : "Unanswered"}
        </span>
      </div>
      <h3 class="question-title">${q.question}</h3>
      <div class="options-list" role="radiogroup" aria-label="Options for question ${index + 1}">
        ${q.options
          .map((opt, optIndex) => {
            const isSelected = state.userAnswers[q.id] === opt;
            return `
            <label class="option-card ${isSelected ? "selected" : ""}" data-qid="${q.id}" data-opt="${escapeHtml(opt)}">
              <input type="radio" name="q_${q.id}" value="${escapeHtml(opt)}" ${isSelected ? "checked" : ""}>
              <div class="option-indicator" aria-hidden="true"></div>
              <span class="option-text">${escapeHtml(opt)}</span>
            </label>
          `;
          })
          .join("")}
      </div>
    `;

    // Attach click listeners to option cards
    const optionCards = card.querySelectorAll(".option-card");
    optionCards.forEach((optCard) => {
      optCard.addEventListener("click", () => {
        const qid = Number(optCard.dataset.qid);
        const selectedValue = optCard.dataset.opt;
        selectOptionModeEnd(qid, selectedValue, card);
      });
    });

    elements.questionsContainer.appendChild(card);
  });
}

function selectOptionModeEnd(qId, optionValue, questionCard) {
  state.userAnswers[qId] = optionValue;

  // Update visual selection within this question card
  const cards = questionCard.querySelectorAll(".option-card");
  cards.forEach((c) => {
    const radio = c.querySelector('input[type="radio"]');
    if (c.dataset.opt === optionValue) {
      c.classList.add("selected");
      if (radio) radio.checked = true;
    } else {
      c.classList.remove("selected");
      if (radio) radio.checked = false;
    }
  });

  // Update question answered badge
  const badge = document.getElementById(`badge-${qId}`);
  if (badge) {
    badge.textContent = "✓ Answered";
    badge.classList.add("done");
  }

  // Remove any unanswered highlight
  questionCard.classList.remove("highlight-unanswered");
  elements.validationAlert.style.display = "none";

  updateProgressBar();
}

function submitModeEndQuiz() {
  // Check if all 5 questions are answered
  const unansweredIndex = state.currentQuestions.findIndex((q) => !state.userAnswers[q.id]);

  if (unansweredIndex !== -1) {
    const unansweredQuestion = state.currentQuestions[unansweredIndex];
    const missingNum = unansweredIndex + 1;

    // Highlight card
    const targetCard = document.getElementById(`question-card-${unansweredQuestion.id}`);
    if (targetCard) {
      targetCard.classList.add("highlight-unanswered");
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Display validation alert
    elements.validationAlertMsg.textContent = `Please answer Question ${missingNum} before submitting.`;
    elements.validationAlert.style.display = "flex";
    return;
  }

  // All 5 answered: calculate score and display results
  calculateScore();
  showResultsScreen();
}

// --------------------------------------------------------------------------
// Mode 2: Instant Feedback (Step-by-step with immediate evaluation)
// --------------------------------------------------------------------------
function renderModeInstantQuiz() {
  elements.submitBar.style.display = "none";
  elements.validationAlert.style.display = "none";
  elements.questionsContainer.innerHTML = "";

  const index = state.currentInstantIndex;
  const q = state.currentQuestions[index];
  const qFeedback = state.instantState[q.id] || null;
  const isSubmitted = Boolean(qFeedback);

  const card = document.createElement("div");
  card.className = "question-card";
  card.id = `question-card-instant-${q.id}`;

  const currentSelection = state.userAnswers[q.id] || "";

  card.innerHTML = `
    <div class="question-header">
      <span class="question-index-label">QUESTION 0${index + 1} / 05</span>
      <span class="question-answered-badge ${isSubmitted ? "done" : ""}">
        ${isSubmitted ? (qFeedback.isCorrect ? "✓ Correct" : "✕ Incorrect") : "Step " + (index + 1) + " of 5"}
      </span>
    </div>
    <h3 class="question-title">${q.question}</h3>
    <div class="options-list" role="radiogroup" aria-label="Options for question ${index + 1}">
      ${q.options
        .map((opt) => {
          let extraClass = "";
          if (isSubmitted) {
            extraClass += " disabled";
            if (opt === q.answer) {
              extraClass += " correct-revealed";
            } else if (opt === currentSelection && !qFeedback.isCorrect) {
              extraClass += " incorrect-revealed";
            }
          } else if (opt === currentSelection) {
            extraClass += " selected";
          }

          return `
          <label class="option-card ${extraClass}" data-qid="${q.id}" data-opt="${escapeHtml(opt)}">
            <input type="radio" name="instant_q_${q.id}" value="${escapeHtml(opt)}" 
              ${opt === currentSelection ? "checked" : ""} ${isSubmitted ? "disabled" : ""}>
            <div class="option-indicator" aria-hidden="true"></div>
            <span class="option-text">${escapeHtml(opt)}</span>
          </label>
        `;
        })
        .join("")}
    </div>

    <!-- Instant Feedback Details (when submitted) -->
    ${
      isSubmitted
        ? `
      <div class="instant-feedback-box ${qFeedback.isCorrect ? "feedback-correct" : "feedback-incorrect"}" role="status">
        <div class="feedback-status-line">
          <span>${qFeedback.isCorrect ? "✓ Correct!" : "✕ Incorrect"}</span>
        </div>
        <div class="feedback-detail">
          ${
            qFeedback.isCorrect
              ? `Great job! <strong>${escapeHtml(q.answer)}</strong> is the correct answer.`
              : `Your answer was <strong>${escapeHtml(currentSelection)}</strong>. The correct answer is <strong>${escapeHtml(q.answer)}</strong>.`
          }
        </div>
      </div>
    `
        : ""
    }

    <!-- Instant Action Row -->
    <div class="instant-action-row">
      ${
        !isSubmitted
          ? `
        <button type="button" class="btn btn-primary" id="btn-instant-submit" ${!currentSelection ? "disabled" : ""}>
          <span>Submit Answer</span>
        </button>
      `
          : `
        <button type="button" class="btn btn-primary" id="btn-instant-next">
          <span>${index < 4 ? "Next Question →" : "View Results →"}</span>
        </button>
      `
      }
    </div>
  `;

  // Attach option selection click
  if (!isSubmitted) {
    const optionCards = card.querySelectorAll(".option-card");
    optionCards.forEach((optCard) => {
      optCard.addEventListener("click", () => {
        const optionVal = optCard.dataset.opt;
        state.userAnswers[q.id] = optionVal;

        // Visual update
        optionCards.forEach((c) => {
          c.classList.toggle("selected", c.dataset.opt === optionVal);
          const r = c.querySelector('input[type="radio"]');
          if (r) r.checked = c.dataset.opt === optionVal;
        });

        // Enable Submit button
        const submitBtn = document.getElementById("btn-instant-submit");
        if (submitBtn) submitBtn.disabled = false;
      });
    });

    const submitBtn = card.querySelector("#btn-instant-submit");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        submitInstantAnswer(q);
      });
    }
  } else {
    const nextBtn = card.querySelector("#btn-instant-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        advanceInstantQuestion();
      });
    }
  }

  elements.questionsContainer.appendChild(card);
}

function submitInstantAnswer(question) {
  const chosenAnswer = state.userAnswers[question.id];
  if (!chosenAnswer) return;

  const isCorrect = chosenAnswer === question.answer;
  state.instantState[question.id] = {
    submitted: true,
    isCorrect: isCorrect
  };

  renderModeInstantQuiz();
  updateProgressBar();
}

function advanceInstantQuestion() {
  if (state.currentInstantIndex < 4) {
    state.currentInstantIndex++;
    renderModeInstantQuiz();
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    // Finished all 5 questions
    calculateScore();
    showResultsScreen();
  }
}

// --------------------------------------------------------------------------
// Progress Bar Calculation
// --------------------------------------------------------------------------
function updateProgressBar() {
  let answeredCount = 0;
  const total = 5;

  if (state.quizMode === "end") {
    answeredCount = state.currentQuestions.filter((q) => Boolean(state.userAnswers[q.id])).length;
    const percentage = Math.round((answeredCount / total) * 100);

    elements.progressCounterText.textContent = `${answeredCount} / ${total} answered`;
    elements.progressPercentText.textContent = `${percentage}%`;
    elements.progressBarFill.style.width = `${percentage}%`;
    elements.progressbar.setAttribute("aria-valuenow", percentage);
  } else {
    // Mode 2
    const submittedCount = Object.keys(state.instantState).length;
    const currentStep = state.currentInstantIndex + 1;
    const percentage = Math.round((submittedCount / total) * 100);

    elements.progressCounterText.textContent = `Question ${currentStep} of ${total} (${submittedCount} answered)`;
    elements.progressPercentText.textContent = `${percentage}%`;
    elements.progressBarFill.style.width = `${percentage}%`;
    elements.progressbar.setAttribute("aria-valuenow", percentage);
  }
}

// ==========================================================================
// 7. Score Calculation & Results Screen
// ==========================================================================

function calculateScore() {
  let correctTotal = 0;

  state.currentQuestions.forEach((q) => {
    const userChoice = state.userAnswers[q.id];
    if (userChoice === q.answer) {
      correctTotal++;
    }
  });

  state.score = correctTotal;
}

function showResultsScreen() {
  // Populate results hero
  elements.resultsGreeting.textContent = `Great job, ${state.userName}!`;
  elements.scoreNumerator.textContent = state.score;

  const percentage = Math.round((state.score / 5) * 100);
  elements.scorePercentBadge.textContent = `${percentage}%`;

  elements.statCorrectCount.textContent = `${state.score} Correct`;
  elements.statIncorrectCount.textContent = `${5 - state.score} Incorrect`;

  // Tailored performance phrase
  let feedbackPhrase = "";
  if (state.score === 5) {
    feedbackPhrase = "Flawless score! You demonstrated complete mastery across all topics.";
  } else if (state.score === 4) {
    feedbackPhrase = "Outstanding work! You have exceptionally strong general knowledge.";
  } else if (state.score === 3) {
    feedbackPhrase = "Good effort! A solid performance with broad trivia awareness.";
  } else if (state.score >= 1) {
    feedbackPhrase = "Nice attempt! Review the answers below to expand your knowledge base.";
  } else {
    feedbackPhrase = "Keep learning! Every quiz is an opportunity to discover new facts.";
  }
  elements.resultsFeedbackPhrase.textContent = feedbackPhrase;

  // Render Detailed Review Section
  renderAnswerReviewList();

  // Switch to Results Screen
  switchScreen(elements.screenResults);
}

function renderAnswerReviewList() {
  elements.resultsReviewList.innerHTML = "";

  state.currentQuestions.forEach((q, index) => {
    const userChoice = state.userAnswers[q.id];
    const isCorrect = userChoice === q.answer;

    const reviewCard = document.createElement("article");
    reviewCard.className = `review-card ${isCorrect ? "review-card-correct" : "review-card-incorrect"}`;

    reviewCard.innerHTML = `
      <div class="review-meta-row">
        <span class="review-q-number">QUESTION 0${index + 1} / 05</span>
        <span class="review-verdict-badge ${isCorrect ? "badge-correct" : "badge-incorrect"}">
          ${isCorrect ? "✓ CORRECT" : "✕ INCORRECT"}
        </span>
      </div>
      <h3 class="review-question-text">${escapeHtml(q.question)}</h3>
      <div class="review-answers-box">
        <div class="review-answer-line">
          <span class="review-answer-label">Your answer:</span>
          <span class="review-answer-value ${isCorrect ? "val-correct" : "val-incorrect"}">
            ${isCorrect ? "✓ " : "✕ "} ${escapeHtml(userChoice || "No answer selected")}
          </span>
        </div>
        <div class="review-answer-line">
          <span class="review-answer-label">Correct answer:</span>
          <span class="review-answer-value val-correct">
            ✓ ${escapeHtml(q.answer)}
          </span>
        </div>
      </div>
    `;

    elements.resultsReviewList.appendChild(reviewCard);
  });
}

// ==========================================================================
// 8. Restart & Settings Flows
// ==========================================================================

function restartQuizWithFreshQuestions() {
  // Re-run random sampling (generates a fresh 5-question combination)
  initializeNewQuiz();
  switchScreen(elements.screenQuiz);
}

function changePlayerOrSettings() {
  // Keep the name in the input for quick edits
  elements.nameInput.value = state.userName;
  switchScreen(elements.screenWelcome);
}

// Helper to escape HTML and prevent injection
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================================================
// 9. Event Listeners Registration
// ==========================================================================

function initializeEventListeners() {
  // Mode selection cards
  elements.modeCards.forEach((card) => {
    card.addEventListener("click", () => handleModeCardClick(card));
  });

  // Name input enter key trigger
  elements.nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      startQuizFlow();
    }
  });

  // Clear name input error on typing
  elements.nameInput.addEventListener("input", () => {
    if (elements.nameInput.value.trim()) {
      elements.nameInput.classList.remove("input-error");
      elements.nameErrorMsg.style.display = "none";
    }
  });

  // Start button
  elements.btnStartQuiz.addEventListener("click", startQuizFlow);

  // Mode 1 Submit button
  elements.btnSubmitQuiz.addEventListener("click", submitModeEndQuiz);

  // Results screen buttons
  elements.btnRestartQuiz.addEventListener("click", restartQuizWithFreshQuestions);
  elements.btnChangeSettings.addEventListener("click", changePlayerOrSettings);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners();
});
