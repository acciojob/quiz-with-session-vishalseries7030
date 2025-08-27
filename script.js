// your JS code here

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load saved progress
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Load saved score if any
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.innerText = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear before render

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Each question in its own <div> (Cypress requires this)
    const questionDiv = document.createElement("div");

    // Question text
    const qText = document.createElement("p");
    qText.innerText = question.question;
    questionDiv.appendChild(qText);

    // Options
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // restore selection if saved in sessionStorage
      if (userAnswers[i] === choice) {
        input.setAttribute("checked", "true"); // attribute (Cypress expects this)
        input.checked = true; // UI state
      }

      // on change, update sessionStorage
      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      // add label text
      const label = document.createElement("label");
      label.innerText = choice;

      questionDiv.appendChild(input);
      questionDiv.appendChild(label);
    }

    questionsElement.appendChild(questionDiv);
  }
}

// Handle submit
submitBtn.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Initial render
renderQuestions();
