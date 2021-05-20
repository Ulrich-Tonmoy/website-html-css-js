const quizData = [
    {
        question: "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "Which one is not a web API?",
        a: "Asp.Net",
        b: "Laravel",
        c: "NLTK",
        d: "Django",
        correct: "c",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What is the programming language of the web?",
        a: "JavaScript",
        b: "C#",
        c: "Python",
        d: "Php",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "Asp.Net is an API for which programming language?",
        a: "CPP",
        b: "JavaScript",
        c: "Php",
        d: "C#",
        correct: "d",
    },
];

const quiz = document.getElementById("quiz");
const answers = document.querySelectorAll('.answer');
const question = document.getElementById('question');
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    answers.forEach((ans) => {
        ans.checked = false;
    });
    const currentQuizData = quizData[currentQuiz];
    question.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
}

function getSelected() {
    let answer;
    answers.forEach((ans) => {
        if (ans.checked) {
            answer = ans.id;
        }
    });
    return answer;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        if (currentQuiz < quizData.length - 1) {
            currentQuiz++;
            loadQuiz();
        }
        else {
            quiz.innerHTML = `<h2 class="quiz">You answer correctly ${score}/${quizData.length}.</h2>
            <button onClick="location.reload()">Retake</button>`;
        }
    }
});