const quizData = [
  {
    question: "Your bank sends an email saying your account will be closed unless you click a link to verify details.",
    answer: false
  },
  {
    question: "You receive an email from your college domain asking for feedback on last week’s class.",
    answer: true
  },
  {
    question: "An email offers a free iPhone and asks you to pay only ₹10 for shipping.",
    answer: false
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const questionEl = document.getElementById("question");
  const feedbackEl = document.getElementById("feedback");
  questionEl.innerText = quizData[currentQuestion].question;
  feedbackEl.innerText = "";
}

function checkAnswer(userAnswer) {
  const feedbackEl = document.getElementById("feedback");
  const correct = quizData[currentQuestion].answer;
  if (userAnswer === correct) {
    feedbackEl.innerText = "✅ Correct!";
    score++;
  } else {
    feedbackEl.innerText = "❌ Oops! That was a phishing message.";
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 2000);
}

function showResult() {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");

  questionEl.innerText = `🎉 Quiz Complete! You scored ${score} out of ${quizData.length}`;
  optionsEl.style.display = "none";
  feedbackEl.innerHTML = "";

  // Create Try Again Button
  const restartBtn = document.createElement("button");
  restartBtn.innerText = "🔁 Try Again";
  restartBtn.style.padding = "10px 20px";
  restartBtn.style.marginTop = "20px";
  restartBtn.style.fontSize = "16px";
  restartBtn.style.backgroundColor = "#28a745";
  restartBtn.style.color = "white";
  restartBtn.style.border = "none";
  restartBtn.style.borderRadius = "8px";
  restartBtn.style.cursor = "pointer";
  restartBtn.onclick = restartQuiz;
  feedbackEl.appendChild(restartBtn);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("options").style.display = "block";
  loadQuestion();
}

window.onload = loadQuestion;

// ✅ DARK MODE TOGGLE WITH ICON CHANGE
document.getElementById("darkModeToggle").addEventListener("click", function () {
  const body = document.body;
  const icon = document.getElementById("modeIcon");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    icon.innerText = "☀️";
  } else {
    icon.innerText = "🌙";
  }
});
// Handle fake phishing report form
document.getElementById("reportForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("reporterName").value;
  const description = document.getElementById("emailDescription").value;
  const statusEl = document.getElementById("reportStatus");

  if (description.trim() === "") {
    statusEl.style.color = "red";
    statusEl.innerText = "⚠️ Please describe the email.";
    return;
  }

  // Fake processing delay
  statusEl.style.color = "green";
  statusEl.innerText = "✅ Thank you" + (name ? `, ${name}` : "") + "! Your report has been received.";

  // Optional: Clear form
  document.getElementById("reportForm").reset();
});
// Fake Email Analyzer Logic
function analyzeEmail() {
  const input = document.getElementById("emailInput").value.toLowerCase();
  const result = document.getElementById("analysisResult");

  const phishingKeywords = [
    "verify your account",
    "urgent action",
    "login immediately",
    "suspended",
    "free iphone",
    "click here",
    "password reset",
    "bank",
    "lottery",
    "you have won",
    "limited time offer"
  ];

  let flagged = false;

  for (const keyword of phishingKeywords) {
    if (input.includes(keyword)) {
      flagged = true;
      break;
    }
  }

  if (input.trim() === "") {
    result.style.color = "red";
    result.innerText = "⚠️ Please paste an email message.";
  } else if (flagged) {
    result.style.color = "crimson";
    result.innerText = "❌ Warning: This message contains signs of phishing!";
  } else {
    result.style.color = "green";
    result.innerText = "✅ This email looks safe. No phishing keywords found.";
  }
}

