const questions = [
    {
        question: "What are you playing ?",
        answers: [
            { text: "game", correct: false },
            { text: "Quiz-game", correct: true },
            { text: "video game ", correct: false },
            { text: "cricket game ", correct: false }
        ]
    },
    {
        question: "What is your favorite color?",
        answers: [
            { text: "Red", correct: false },
            { text: "Black", correct: true },
            { text: "Green", correct: false },
            { text: "Yellow", correct: false }
        ]
    },
    {
        question: "What is your favorite animal?",
        answers: [
            { text: "Dog", correct: true },
            { text: "Cat", correct: false },
            { text: "Elephant", correct: false },
            { text: "Lion", correct: false }
        ]
    },
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let questionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[questionIndex];
    questionElement.innerHTML =(questionIndex+1)+"."+ currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  function handleNextButton(){
    questionIndex++;
    if(questionIndex<questions.length){
      showQuestion();
    }else{
      showScore();
    }
  }
  function showScore(){
    resetState();
    questionElement.innerHTML=`you scored${score} out of ${questions.length}`;
    nextButton.innerHTML="play Again";
    nextButton.style.display="block";
  
  }
  nextButton.addEventListener("click",()=>{
    if(questionIndex<questions.length){
      handleNextButton();
  
    }else{
      startQuiz();
    }
  })
  startQuiz();