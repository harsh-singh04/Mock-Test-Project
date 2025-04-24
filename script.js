const questionsDB = {
    "Verbal Reasoning": [
        {
            question: "What is 5 + 7?",
            options: ["10", "11", "12", "13"],
            answer: "12"
        },
        {
            question: "What is the square root of 49?",
            options: ["5", "6", "7", "8"],
            answer: "7"
        },
        {
            question: "What is 15 ÷ 3?",
            options: ["4", "5", "6", "7"],
            answer: "5"
        }
    ],
    "General Knowledge": [
        {
            question: "Who is the Prime Minister of India in 2024?",
            options: ["Narendra Modi", "Rahul Gandhi", "Arvind Kejriwal", "Amit Shah"],
            answer: "Narendra Modi"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars"
        }
    ],
    "Aptitude": [
        {
            question: "Choose the correct spelling:",
            options: ["Recieve", "Receive", "Recive", "Receeve"],
            answer: "Receive"
        },
        {
            question: "What is the synonym of 'Happy'?",
            options: ["Sad", "Angry", "Joyful", "Dark"],
            answer: "Joyful"
        }
    ]
};

let currentSubject = "";
let score = 0;
let timer;
let timeLeft = 120;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".test-card .btn").forEach(button => {
        button.addEventListener("click", () => {
            const subject = button.parentElement.querySelector("h3").textContent.trim();
            displayQuiz(subject);
        });
    });

    document.getElementById("submit-btn").addEventListener("click", () => {
        submitQuiz();
    });
});

function displayQuiz(subject) {
    currentSubject = subject;
    const quizArea = document.getElementById("quiz-area");
    const questionBox = document.getElementById("question-box");
    const quizTitle = document.getElementById("quiz-title");
    const nameInput = document.getElementById("user-name");
    const quizTools = document.getElementById("quiz-tools");

    quizArea.style.display = "block";
    quizTools.style.display = "block";
    document.getElementById("review-section").style.display = "none";
    quizTitle.textContent = `${subject} Test`;
    questionBox.innerHTML = "";
    nameInput.value = "";
    score = 0;

    questionsDB[subject].forEach((q, i) => {
        const div = document.createElement("div");
        div.classList.add("question-block");
        div.innerHTML = `<p><strong>${i + 1}. ${q.question}</strong></p>`;

        q.options.forEach(opt => {
            const label = document.createElement("label");
            label.innerHTML = `
                <input type="radio" name="q${i}" value="${opt}" />
                ${opt}
            `;
            div.appendChild(label);
            div.appendChild(document.createElement("br"));
        });

        questionBox.appendChild(div);
    });

    updateProgressBar(0);
    clearInterval(timer);
    startTimer();

    setTimeout(() => {
        const yOffset = -80;
        const y = quizArea.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }, 100);
}

function startTimer() {
    timeLeft = 120;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

function updateProgressBar(percent) {
    document.getElementById("progress-bar").style.width = `${percent}%`;
}

function submitQuiz() {
    const name = document.getElementById("user-name").value.trim();
    if (!name) return alert("Please enter your name.");

    const allQuestions = document.querySelectorAll(".question-block");
    const total = allQuestions.length;
    score = 0;
    const reviewBox = document.getElementById("review-box");
    reviewBox.innerHTML = "";

    allQuestions.forEach((block, index) => {
        const selected = block.querySelector(`input[name="q${index}"]:checked`);
        const correctAnswer = questionsDB[currentSubject][index].answer;
        const isCorrect = selected && selected.value === correctAnswer;

        if (isCorrect) score++;

        const feedback = document.createElement("div");
        feedback.innerHTML = `
            <p><strong>Q${index + 1}: ${questionsDB[currentSubject][index].question}</strong></p>
            <p>Your answer: <span class="${isCorrect ? 'correct' : 'incorrect'}">${selected ? selected.value : 'Not Answered'}</span></p>
            <p>Correct answer: <span class="correct">${correctAnswer}</span></p>
            <hr />
        `;
        reviewBox.appendChild(feedback);
        updateProgressBar(((index + 1) / total) * 100);
    });

    document.getElementById("review-section").style.display = "block";
    generatePDF(name, score, total);
    clearInterval(timer);
}

function generatePDF(name, score, total) {
    const doc = new window.jspdf.jsPDF();
    doc.setFontSize(18);
    doc.text("Mock Test Result", 20, 20);
    doc.setFontSize(14);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Score: ${score} / ${total}`, 20, 60);
    doc.text(`Percentage: ${(score / total * 100).toFixed(2)}%`, 20, 80);
    doc.save(`${name}_MockTest_Result.pdf`);
}
