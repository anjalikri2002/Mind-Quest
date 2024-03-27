let question = [
    {
        question:"What is the largest ocean in the world?",
        option : [
            {text : "Atlantic Ocean ",correct:false},
            {text : " Indian Ocean ",correct:false},
            {text : " Arctic Ocean",correct:false},
            {text : "Pacific Ocean",correct:true}
        ]
    },
    {
        question:"Which country is home to the famous ancient monument Stonehenge?",
        option : [
            { text : "France",correct:false},
            { text : "United Kingdom",correct:true},
            { text : "Italy",correct:false},
            { text : "Egypt",correct:false}
        ]
    },
    {
        question:"Which continent is the most populous?",
        option : [
            { text : "Asia",correct:true},
            { text : "Africa",correct:false},
            { text : "Europe",correct:false},
            { text : "North America",correct:false}
        ]
    },
    
    {
        question:"Which planet is known as the Red Planet?",
        option : [
            { text : "Venus ",correct:false},
            { text : "Mars",correct:true},
            { text : "Jupiter",correct:false},
            { text : "Saturn",correct:false}
        ]
    },
    {
        question:"What is the largest organ in the human body?",
        option : [
            { text : "Heart",correct:false},
            { text : "Liver",correct:false},
            { text : "Brain",correct:false},
            { text : "Skin",correct:true}
        ]
    },
    {
        question:"Who painted the Mona Lisa?",
        option : [
            { text : "Vincent van Gogh",correct:false},
            { text : "Pablo Picasso",correct:false},
            { text : "Leonardo da Vinci",correct:true},
            { text : "Michelangelo",correct:false}
        ]
    },
    {
        question:"Who wrote the play 'Romeo and Juliet'?",
        option : [
            { text : "William Shakespeare",correct:true},
            { text : "Jane Austen",correct:false},
            { text : "Charles Dickens",correct:false},
            { text : "F.Scott Fitzgerald",correct:false}
        ]
    },
    {
        question:" Which metal is the lightest metal in world?",
        option : [
            { text : "Zinc",correct:false},
            { text : "Lithium",correct:true},
            { text : "Platinum",correct:false},
            { text : "Gold",correct:false}
        ]
    },
    {
        question:"What is the capital of Australia?",
        option : [
            { text : "Sydney",correct:false},
            { text : "Melbourne",correct:false},
            { text : "Canberra",correct:true},
            { text : "Perth",correct:false}
        ]
    },
    {
        question:" Who is the Father of the Computer?",
        option : [
            { text : "Charles Babbage",correct:true},
            { text : "Thomas Edison",correct:false},
            { text : " Albert Einstein",correct:false},
            { text : "Isaac Newton",correct:false}
        ]
    },
    {
        question:"Which one of the following is not an Operating System (OS)?",
        option : [
            { text : "Windows 10",correct:false},
            { text : "Linux",correct:false},
            { text : "DOS",correct:false},
            { text : "MS Excel",correct:true}
        ]
    },
    {
        question:"What is also known as a portable computer?",
        option : [
            { text : "Laptop",correct:true},
            { text : "CPU",correct:false},
            { text : "Monitor",correct:false},
            { text : "Printer",correct:false}
        ]
    },
    {
        question:"50 times of 8 is equal to:",
        option : [
            { text : " 788 ",correct:true},
            { text : "778",correct:false},
            { text : "768",correct:false},
            { text : "758",correct:false}
        ]
    },
    {
        question:"Counting numbers are kept under ________ number.",
        option : [
            { text : "Whole ",correct:false},
            { text : "Natural",correct:true},
            { text : "Rational",correct:false},
            { text : "Odd",correct:false}
        ]
    },
];
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let timerInterval; // Variable to hold the timer interval

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = question[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.textContent = questionNo + ". " + currentQuestion.question;

    currentQuestion.option.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.classList.add("btn");
        optionsElement.appendChild(button);
        if (option.correct) {
            button.dataset.correct = option.correct;
        }
        button.addEventListener("click", selectOption);
    });

    // Start the timer when showing the question
    startTimer();
}

function resetState() {
    nextButton.style.display = "none";
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

function selectOption(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        playCorrectSound(); // Play correct sound
    } else {
        selectedBtn.classList.add("incorrect");
        playIncorrectSound(); // Play incorrect sound
    }

    Array.from(optionsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    clearInterval(timerInterval); // Stop the timer
    nextButton.style.display = "block";
    nextButton.addEventListener("click", handleNextButtonClick);
}

function handleNextButtonClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    resetState();
    questionElement.innerHTML = `Quiz ended. Your score: ${score} out of ${question.length}`;
    nextButton.textContent = "Play Again";
    nextButton.addEventListener("click", startQuiz);
    nextButton.style.display = "block";
}

function skipQuestion() {
    currentQuestionIndex++; // Move to the next question

    if (currentQuestionIndex < question.length) {
        showQuestion(); // Show the next question
    } else {
        endQuiz(); // End the quiz if there are no more questions
    }
}
function playCorrectSound() {
    const correctSound = document.getElementById("correct-sound");
    correctSound.play();
}

function playIncorrectSound() {
    const incorrectSound = document.getElementById("incorrect-sound");
    incorrectSound.play();
}
// Add event listener to the skip button
const skipButton = document.getElementById('skip-btn');
skipButton.addEventListener('click', skipQuestion);

// Function to skip the current question
function skipQuestion() {
    currentQuestionIndex++; // Move to the next question

    if (currentQuestionIndex < question.length) {
        showQuestion(); // Show the next question
    } else {
        endQuiz(); // End the quiz if there are no more questions
    }
}
// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// Shuffle the questions array
shuffleArray(question);

// Shuffle the options array for each question
question.forEach(q => {
    shuffleArray(q.option);
});



startQuiz();
