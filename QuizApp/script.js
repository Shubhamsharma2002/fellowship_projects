// 1. Data Structure initialization
const quizData = {
  "sections": [
    {
      "sectionTitle": "General Knowledge",
      "questions": [
        { "questionType": "mcq", "question": "What is the tallest mountain in the world?", "options": ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"], "answer": "Mount Everest" },
        { "questionType": "text", "question": "What is the capital of Italy?", "answer": "Rome" },
        { "questionType": "number", "question": "How many continents are there?", "answer": 7 },
        { "questionType": "mcq", "question": "Which ocean is the largest?", "options": ["Atlantic", "Indian", "Pacific", "Arctic"], "answer": "Pacific" },
        { "questionType": "text", "question": "Who wrote 'Romeo and Juliet'?", "answer": "William Shakespeare" },
        { "questionType": "number", "question": "In what year did the Titanic sink?", "answer": 1912 },
        { "questionType": "mcq", "question": "What is the smallest country in the world?", "options": ["Monaco", "Nauru", "Vatican City", "San Marino"], "answer": "Vatican City" },
        { "questionType": "text", "question": "What is the longest river in the world?", "answer": "Nile" },
        { "questionType": "number", "question": "How many planets are in the Solar System?", "answer": 8 },
        { "questionType": "mcq", "question": "Which country is known as the Land of the Rising Sun?", "options": ["China", "Japan", "South Korea", "Thailand"], "answer": "Japan" }
      ]
    },
    {
      "sectionTitle": "Science",
      "questions": [
        { "questionType": "mcq", "question": "What is the chemical symbol for water?", "options": ["H2O", "CO2", "O2", "NaCl"], "answer": "H2O" },
        { "questionType": "text", "question": "What force keeps us on the ground?", "answer": "Gravity" },
        { "questionType": "number", "question": "At what temperature (Celsius) does water boil?", "answer": 100 },
        { "questionType": "mcq", "question": "What is the hardest natural substance on Earth?", "options": ["Iron", "Diamond", "Quartz", "Granite"], "answer": "Diamond" },
        { "questionType": "text", "question": "What is the largest planet in our Solar System?", "answer": "Jupiter" },
        { "questionType": "number", "question": "How many elements are in the periodic table?", "answer": 118 },
        { "questionType": "mcq", "question": "What is the human body's largest organ?", "options": ["Heart", "Skin", "Liver", "Brain"], "answer": "Skin" },
        { "questionType": "text", "question": "What gas do plants absorb during photosynthesis?", "answer": "Carbon Dioxide" },
        { "questionType": "number", "question": "How long does Earth take to orbit the Sun (in days)?", "answer": 365 },
        { "questionType": "mcq", "question": "Which vitamin is produced when the skin is exposed to sunlight?", "options": ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], "answer": "Vitamin D" }
      ]
    },
    {
      "sectionTitle": "Mathematics",
      "questions": [
        { "questionType": "mcq", "question": "What is the value of Pi (approximate)?", "options": ["2.14", "3.14", "4.14", "5.14"], "answer": "3.14" },
        { "questionType": "text", "question": "What is the term for a shape with three sides?", "answer": "Triangle" },
        { "questionType": "number", "question": "What is the square root of 64?", "answer": 8 },
        { "questionType": "mcq", "question": "What is 50% of 200?", "options": ["100", "150", "200", "250"], "answer": "100" },
        { "questionType": "text", "question": "What is the next prime number after 7?", "answer": "11" },
        { "questionType": "number", "question": "How many degrees are in a right angle?", "answer": 90 },
        { "questionType": "mcq", "question": "What is the sum of angles in a triangle?", "options": ["180", "360", "270", "90"], "answer": "180" },
        { "questionType": "text", "question": "What is the term for a 10-sided polygon?", "answer": "Decagon" },
        { "questionType": "number", "question": "If a rectangle has a width of 4cm and a length of 10cm, what is its area (in cm²)?", "answer": 40 },
        { "questionType": "mcq", "question": "What is the value of 'x' in the equation 2x + 6 = 14?", "options": ["2", "3", "4", "5"], "answer": "4" }
      ]
    },
    {
      "sectionTitle": "Indian History",
      "questions": [
        { "questionType": "mcq", "question": "Who was the first Emperor of the Maurya Dynasty?", "options": ["Ashoka", "Chandragupta Maurya", "Harsha", "Bindusara"], "answer": "Chandragupta Maurya" },
        { "questionType": "text", "question": "What was the capital of the Mughal Empire?", "answer": "Agra" },
        { "questionType": "number", "question": "In what year did India gain independence?", "answer": 1947 },
        { "questionType": "mcq", "question": "Who was the founder of the Gupta Empire?", "options": ["Samudragupta", "Chandragupta I", "Chandragupta II", "Kumaragupta"], "answer": "Chandragupta I" },
        { "questionType": "text", "question": "Which city was the capital of the Maratha Empire?", "answer": "Pune" },
        { "questionType": "number", "question": "In what century did the Battle of Plassey take place?", "answer": 18 },
        { "questionType": "mcq", "question": "Who was the first female ruler of Delhi Sultanate?", "options": ["Razia Sultana", "Mumtaz Mahal", "Noor Jahan", "Jodha Bai"], "answer": "Razia Sultana" },
        { "questionType": "text", "question": "What was the main language of administration under the Mughal Empire?", "answer": "Persian" },
        { "questionType": "number", "question": "How many years did the British Raj last in India?", "answer": 90 },
        { "questionType": "mcq", "question": "Which year marked the start of the British East India Company's rule in India?", "options": ["1600", "1757", "1858", "1947"], "answer": "1757" }
      ]
    }
  ]
};

// 2. Application State Variables
let currentSectionIndex = null;
let currentQuestionIndex = 0;
let userScore = 0;
let isAnswered = false;

// 3. DOM Elements Setup
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const scoreDisplay = document.getElementById("score");
const questionDisplay = document.getElementById("question");
const optionsDisplay = document.getElementById("options");
const nextButton = document.getElementById("next-button");

// 4. Initialization & Event Handlers
document.querySelectorAll(".section").forEach(sectionCard => {
  sectionCard.addEventListener("click", (e) => {
    const sectionIdx = parseInt(e.currentTarget.getAttribute("data-section"), 10);
    startQuizSection(sectionIdx);
  });
});

nextButton.addEventListener("click", handleNextTransition);

// 5. Core Quiz Engines
function startQuizSection(sectionIdx) {
  // Validate index configuration to prevent errors
  if (isNaN(sectionIdx) || sectionIdx < 0 || sectionIdx >= quizData.sections.length) {
    console.error("Invalid section route caught.");
    return;
  }
  
  currentSectionIndex = sectionIdx;
  currentQuestionIndex = 0;
  userScore = 0;
  isAnswered = false;
  
  // Transition views cleanly using flexible layout changes
  quizContainer.style.display = "none";
  questionContainer.style.display = "block";
  // Override centering rules applied to the parent body when viewing active questions
  document.body.style.alignItems = "flex-start";
  
  updateScoreUI();
  renderActiveQuestion();
}

function renderActiveQuestion() {
  isAnswered = false;
  optionsDisplay.innerHTML = "";
  nextButton.style.display = "none"; // Conceal next navigation action until input evaluates
  
  const currentSection = quizData.sections[currentSectionIndex];
  const activeQuestion = currentSection.questions[currentQuestionIndex];
  
  questionDisplay.textContent = `Q${currentQuestionIndex + 1}: ${activeQuestion.question}`;
  
  // Dynamic layout rendering based on data input models
  if (activeQuestion.questionType === "mcq") {
    renderMCQOptions(activeQuestion.options);
  } else if (activeQuestion.questionType === "text" || activeQuestion.questionType === "number") {
    renderInputFields(activeQuestion.questionType);
  }
}

// 6. Dynamic Variant Renderers
function renderMCQOptions(options) {
  options.forEach(optionText => {
    const optionElement = document.createElement("div");
    optionElement.textContent = optionText;
    optionElement.addEventListener("click", () => {
      if (isAnswered) return; // Prevent multiple selection triggers
      evaluateAnswer(optionText, optionElement);
    });
    optionsDisplay.appendChild(optionElement);
  });
}

function renderInputFields(type) {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "10px";

  const inputElement = document.createElement("input");
  inputElement.type = type === "number" ? "number" : "text";
  inputElement.placeholder = type === "number" ? "Enter numeric value..." : "Type your answer here...";
  inputElement.id = "user-typed-input";
  
  const submitBtn = document.createElement("button");
  submitBtn.className = "submit-answer";
  submitBtn.textContent = "Submit Answer";
  
  submitBtn.addEventListener("click", () => {
    const rawVal = inputElement.value.trim();
    if (!rawVal) return; // Ignore empty values safely
    
    // Formatting numbers to match raw data evaluation styles
    const processedValue = type === "number" ? Number(rawVal) : rawVal;
    evaluateAnswer(processedValue, inputElement, submitBtn);
  });
  
  container.appendChild(inputElement);
  container.appendChild(submitBtn);
  optionsDisplay.appendChild(container);
}

// 7. Validation & Feedback System
function evaluateAnswer(userResponse, interactionElement, dynamicBtn = null) {
  isAnswered = true;
  const activeQuestion = quizData.sections[currentSectionIndex].questions[currentQuestionIndex];
  const targetCorrectAnswer = activeQuestion.answer;
  
  let isCorrect = false;

  // Process comparisons cleanly matching explicit formats
  if (activeQuestion.questionType === "mcq" || activeQuestion.questionType === "text") {
    isCorrect = String(userResponse).toLowerCase() === String(targetCorrectAnswer).toLowerCase();
  } else if (activeQuestion.questionType === "number") {
    isCorrect = Number(userResponse) === Number(targetCorrectAnswer);
  }

  // Visual highlights for user tracking updates
  const feedbackElement = document.createElement("div");
  feedbackElement.id = "feedback";

  if (isCorrect) {
    userScore += 1;
    updateScoreUI();
    feedbackElement.textContent = "✓ Correct Answer!";
    feedbackElement.style.color = "#28a745";
    if (activeQuestion.questionType === "mcq") interactionElement.classList.add("selected");
  } else {
    feedbackElement.textContent = `✗ Incorrect. Correct: ${targetCorrectAnswer}`;
    feedbackElement.style.color = "#dc3545";
  }

  // Deactivate input assets upon validation
  if (dynamicBtn) dynamicBtn.disabled = true;
  const inputAsset = document.getElementById("user-typed-input");
  if (inputAsset) inputAsset.disabled = true;

  optionsDisplay.appendChild(feedbackElement);
  nextButton.style.display = "block"; // Open navigation path access
}

function handleNextTransition() {
  const currentSection = quizData.sections[currentSectionIndex];
  currentQuestionIndex++;
  
  if (currentQuestionIndex < currentSection.questions.length) {
    renderActiveQuestion();
  } else {
    renderQuizCompletionView();
  }
}

function renderQuizCompletionView() {
  optionsDisplay.innerHTML = "";
  nextButton.style.display = "none";
  
  const totalQuestions = quizData.sections[currentSectionIndex].questions.length;
  questionDisplay.textContent = `🎉 Section Complete!`;
  
  const completeSummary = document.createElement("div");
  completeSummary.style.fontSize = "20px";
  completeSummary.style.margin = "20px 0";
  completeSummary.innerHTML = `You scored <strong>${userScore}</strong> out of <strong>${totalQuestions}</strong>.`;
  
  const resetBtn = document.createElement("button");
  resetBtn.id = "next-button";
  resetBtn.style.display = "block";
  resetBtn.textContent = "Return to Dashboard";
  resetBtn.addEventListener("click", restoreDashboardView);
  
  optionsDisplay.appendChild(completeSummary);
  optionsDisplay.appendChild(resetBtn);
}

function restoreDashboardView() {
  questionContainer.style.display = "none";
  quizContainer.style.display = "grid";
  document.body.style.alignItems = "center"; // Re-center the selection panel layout
}

function updateScoreUI() {
  scoreDisplay.textContent = `Score: ${userScore}`;
}