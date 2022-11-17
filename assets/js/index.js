// element declarations
var quizContainer = document.getElementById('quiz')
var startButton = document.getElementById('start')
var timerElement = document.getElementById('timer')
var resultsElement = document.getElementById('results')
var timerEl = document.getElementById("timer");

var score = 0
var counter = 0;
var highScores = []

var timerId

function handleStartButtonClick() {
    document.getElementById('intro').innerHTML = ''
    startTimer()
    renderNewQuestion()
}
startButton.addEventListener('click', handleStartButtonClick)

document.getElementById('highScoresLink').addEventListener('click', function() {
    if (document.getElementById('highScores').innerHTML === "") {
        highScoresFunction()
        document.getElementById('intro').innerHTML = ''
    }
})

var questionIndex = 0

var questions=[{
    title:"Commonly used data types do NOT include: ",
    answers:[{
        label:"strings",
        isCorrect:false,
    },
    {
        label:"booleans",
        isCorrect:false,
    },
    {
        label:"alerts",
        isCorrect:true,
    },
    {
        label:"numbers",
        isCorrect:false,
    }]
},{
    title:"Strings values must be enclosed with",
    answers:[{
        label:"doubles quotes",
        isCorrect:true,
    },
    {
        label:"curly brackets",
        isCorrect:false,
    },
    {
        label:"square brackets",
        isCorrect:false,
    },
    {
        label:"parenthesis",
        isCorrect:true,
    }]
},{
    title:"The condition in an if/else statement is enclosed with: ",
    answers:[{
        label:"single quotes",
        isCorrect:false,
    },
    {
        label:"double quotes",
        isCorrect:false,
    },
    {
        label:"parenthesis",
        isCorrect:false,
    },
    {
        label:"curly brackets",
        isCorrect:true,
    }]
}, {
    title:"Arrays in Javascript can be used to store: ",
    answers:[{
        label:"other arrays",
        isCorrect:false,
    },
    {
        label:"numbers",
        isCorrect:false,
    },
    {
        label:"strings",
        isCorrect:true,
    },
    {
        label:"All of the above",
        isCorrect:true,
    }]
}]

// when we click on an answer, this function will run
function renderNewQuestion() {
    if (questionIndex >= questions.length) {
        quizContainer.innerHTML = ''
        resultsElement.innerHTML = ''
        timerElement.innerHTML = ''
        showScores()
        clearInterval(timerId)
        return
    } 
    quizContainer.innerHTML = ""
    // update time

    // show new question: 1. get new title, 2. show options
    setQuestionTitle()
    showAnswerOptions()
    
    questionIndex++
}

// set the new question title
function setQuestionTitle() {
    var title = questions[questionIndex].title

    // create new h2 element
    var newQuestionTitle = document.createElement('h2')
    var newTextNode = document.createTextNode(title)

    newQuestionTitle.appendChild(newTextNode)
    quizContainer.appendChild(newQuestionTitle)
}

// renders the question's choices
function showAnswerOptions() {
    var answerOptions = questions[questionIndex].answers

    answerOptions.forEach((option) => {
        showChoice(option.label, option.isCorrect)
    })
}

function showChoice(title, isCorrect) {
    var newAnswerChoice = document.createElement('button')
    var newButtonText = document.createTextNode(title)
    newAnswerChoice.appendChild(newButtonText)

    if (isCorrect) {
        newAnswerChoice.addEventListener('click', function() {
            score += 10
            setResultsText('Correct!')
            renderNewQuestion()
        })
    } else {
        newAnswerChoice.addEventListener('click', function() {
            setResultsText('Wrong!')
            renderNewQuestion()
        })
    }

    quizContainer.appendChild(newAnswerChoice)
}

function setResultsText(resultString) {
    var newResultPar = document.createElement('p')
    var newResultText = document.createTextNode(resultString)

    // clear current result
    resultsElement.innerHTML = ''

    newResultPar.appendChild(newResultText)
    resultsElement.appendChild(newResultPar)
}

function highScoresFunction() {
    score = 0
    questionIndex = 0
    document.getElementById('scores').innerHTML = ''
    var highScoresElement = document.getElementById('highScores')

    highScoresElement.appendChild(createElementHelper('h2', 'High scores'))
    
    var goBackButton = createElementHelper('button', 'Go back')
    var clearHighScoresButton = createElementHelper('button', 'Clear high scores')

    // show current highscores
    for (var i = 0; i < highScores.length; i++) {
        var currentHighScoreObject = highScores[i]

        var newHighScore = createElementHelper('li', currentHighScoreObject.initials + " - " + currentHighScoreObject.score)
        highScoresElement.appendChild(newHighScore)
    }

    goBackButton.addEventListener('click', showMainScreen)
    clearHighScoresButton.addEventListener('click', clearHighScores)

    highScoresElement.appendChild(goBackButton)
    highScoresElement.appendChild(clearHighScoresButton)
}

function createElementHelper(elementType, text) {
    var newElement = document.createElement(elementType)
    var newNode = document.createTextNode(text)

    newElement.appendChild(newNode)
    return newElement
}

function showMainScreen() {
    document.getElementById('highScores').innerHTML = ''

    var sectionElement = document.createElement('section')

    var h1Element = createElementHelper('h1', 'Coding Quiz Challenge')
    var pElement = createElementHelper('p', 'Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 15 seconds!')

    var buttonElement = createElementHelper('button', 'Start Quiz')
    buttonElement.addEventListener('click', handleStartButtonClick)

    var mainElement = document.getElementById('intro')

    sectionElement.appendChild(h1Element)
    sectionElement.appendChild(pElement)
    sectionElement.appendChild(buttonElement)
    mainElement.appendChild(sectionElement)
}

function clearHighScores() {
    highScores = []
    document.getElementById('highScores').innerHTML = ""
    highScoresFunction()
}

function showScores() {
    var newParagraph = document.createElement('p')
    newParagraph.appendChild(document.createTextNode('All done!'))

    var scores = document.createElement('p')
    scores.appendChild(document.createTextNode('Your final score is: ' + score + "."))

    var newForm = document.createElement('form')
    var newLabel = document.createElement('label')
    var newInput = document.createElement('input')
    var newButton = document.createElement('input')

    newLabel.innerHTML = 'Enter initials: '
    newButton.setAttribute('type', 'submit')

    newButton.addEventListener('click', function(event) {
        event.preventDefault()

        // save score and initials to high score array
        highScores.push({
            initials: newInput.value,
            score: score
        })
        highScoresFunction()
    })

    newInput.setAttribute('type', 'text')

    newForm.appendChild(newLabel)
    newForm.appendChild(newInput)
    newForm.appendChild(newButton)

    var scoresElement = document.getElementById('scores')
    scoresElement.appendChild(newParagraph)
    scoresElement.appendChild(scores)
    scoresElement.appendChild(newForm)
}

function startTimer() {
    counter = 0
    timerId = setInterval(function(){
        timerEl.innerHTML="Time: "+ (5 - counter)
        counter++;
        if(counter > 5){
            clearInterval(timerId);
            quizContainer.innerHTML = ''
            timerElement.innerHTML = ''
            showScores()
        }
    }, 1000)
}