const questionsDB = {
    "Verbal Reasoning": [
        {
            question: "Which word does not belong to the group?",
            options: ["Inch", "Kilogram", " Centimeter", " Yard"],
            answer: "Kilogram"
        },
        {
            question: "Find the odd one out.",
            options: ["Apple", "Apple", "Carrot", " Banana"],
            answer: "Carrot"
        },
        {
            question: "If in a certain code, 'ROAD' is written as 'URDG', how is 'RAIL' written in that code?",
            options: ["UXLO", "UXNL", "UXMJ", "UXMO"],
            answer: "UXMO"
        },
        {
            question: "Complete the analogy: Doctor : Hospital :: Teacher : ?",
            options: ["Class", "School", "Book", "Student"],
            answer: "School"
        },
        {
            question: "Which one is different from the rest?",
            options: ["Book", "Paper", "Pen", "Sharpener"],
            answer: "Paper"
        },
        {
            question: "Which of the following is a synonym of 'Abundant'?",
            options: ["Rare", "Plentiful", "Short", "Empty"],
            answer: "Plentiful"
        },
        {
            question: "What comes next in the series? Z,X,V,T,?",
            options: ["P", "S", "R", "P"],
            answer: "R"
        },
        {
            question: "Choose the word most similar in meaning to 'Reluctant'.",
            options: ["Willing", "Hesitant", "Cheerful", "Eager"],
            answer: "Hesitant"
        },
        {
            question: "Which pair of words is related in the same way as 'Eye : See'??",
            options: ["Nose : Hear", "Tongue : Taste", "Ear : Smell", "Hand : Write"],
            answer: "Tongue : Taste"
        },
        {
            question: "Choose the word which is the exact opposite of 'Optimistic'.",
            options: ["Realistic", "Idealistic", "Pessimistic", "Fantastic"],
            answer: "Pessimistic"
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
        },
        {
            question: "What is the capital city of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Perth"],
            answer: "Canberra"
        },
        {
            question: "Who wrote the play Romeo and Juliet?",
            options: ["Charles Dickens", "William Shakespare", "Jane Austen", "George Bernard Shaw"],
            answer: "William Shakespare"
        },
        {
            question: "In which year did World War II end?",
            options: ["1942", "1945", "1939", "1950"],
            answer: "1945"
        },
        {
            question: "What is the longest river in the world?",
            options: ["Amazon", "Yangtze", "Nile", "Mississippi"],
            answer: "Nile"
        },
        {
            question: "Who is known as the 'Father of Computers'?",
            options: ["Alen Turing", "Charles Babbage", "Tim Berners-Lee", "Venus"],
            answer: "Charles Babbage"
        },
        {
            question: "Which country is famous for the Eiffel Tower?",
            options: ["Italy", "Spain", "Germany", "France"],
            answer: "France"
        },
        {
            question: "How many continents are there in the world?",
            options: ["5", "6", "7", "8"],
            answer: "7"
        },
        {
            question: "What gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            answer: "Carbon Dioxide"
        }
    ],
    "Aptitude": [
        {
            question: "What will be the next number in the series: 2, 4, 8, 16, ?",
            options: ["18", "20", "32", "24"],
            answer: "32"
        },
        {
            question: "A man buys a watch for $400 and sells it for $500. What is his profit percentage?",
            options: ["10%", "20%", "25%", "30%"],
            answer: "25%"
        },
        {
            question: "If 12 men can complete a work in 6 days, how many men are required to complete the same work in 4 days?",
            options: ["8", "18", "16", "10"],
            answer: "18"
        },
        {
            question: "What is the average of 10, 20, 30, 40, and 50?",
            options: ["25", "30", "35", "40"],
            answer: "30"
        },
        {
            question: "A train running at 60 km/hr crosses a pole in 30 seconds. What is the length of the train?",
            options: ["500 meters", "600 meters", "400 meters", "300 meters"],
            answer: "500 meters"
        },
        {
            question: "If the cost price of an item is $240 and the selling price is $300, find the profit.",
            options: ["$50", "$60", "$70", "$80"],
            answer: "$60"
        },
        {
            question: "What will be the compound interest on $5000 at 10% per annum for 2 years?",
            options: ["$1000", "$1050", "$1100", "$1025"],
            answer: "$1025"
        },
        {
            question: "A number is divisible by both 3 and 5. Which of the following could it be?",
            options: ["21", "30", "45", "Both B and C"],
            answer: "Both B and C"
        },
        {
            question: "Solve: 15% of 200 + 25% of 120 = ?",
            options: ["60", "70", "80", "90"],
            answer: "60"
        },
        {
            question: "A shopkeeper allows 10% discount on the marked price. If the marked price is $500, what is the selling price?",
            options: ["$450", "$480", "$470", "$490"],
            answer: "$450"
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
