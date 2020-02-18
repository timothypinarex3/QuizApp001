let qNumber = 0;
let point = 0;

function generateQuestion() {
    $('.questionBox').html(
        `<div>
            <form class="questionForm" method="post">
                <fieldset>
                    <legend>${QUESTIONS[qNumber].question}</legend>
                    <label>
                        <input type="radio" name="office" value=0>
                        ${QUESTIONS[qNumber].choices[0]}
                    </label>
                    <label>
                        <input type="radio" name="office" value=1>
                        ${QUESTIONS[qNumber].choices[1]}
                    </label>
                    <label>
                        <input type="radio" name="office" value=2>
                        ${QUESTIONS[qNumber].choices[2]}
                    </label>
                    <label>
                        <input type="radio" name="office" value=3>
                        ${QUESTIONS[qNumber].choices[3]}
                    </label>
                </fieldset>
                <button type="submit" class="submitAnswer">Submit Answer</button>
            </form>
        </div>`
    );
    formSubmit();
}

function formSubmit() {
    $('.questionForm').submit(function(event) {
        event.preventDefault();
        const userAnswer = parseInt($('input[name="office"]:checked').val());
        const rightAnswer = QUESTIONS[qNumber].correctAnswer;

        if (userAnswer === rightAnswer) {
            choseRightAnswer();
        } else {
            choseWrongAnswer();
        }
    });
}

function choseRightAnswer() {
    $('.questionBox').html(
        `<div>
            <strong>Correct!<strong>
            <img src="https://img.nbc.com/mpx-static/NBCdotCOM/mezzthumb/ee7dee9d039c2087301abf870c8353e1_ef2fefb2f311c5c7e407dd3215d3cf2c.jpg" class="correct" alt="Happy Jim Halpert">
            <button class="nextButton">Next Question</button>
        </div>`
    );
   point++;
    $(' pointNumber').html(`$ point}`);
    nextQuestion();
}

function choseWrongAnswer() {
    let explanation = QUESTIONS[qNumber].explanation;
    $('.questionBox').html(
        `<div>
            <strong>Wrong!<strong>
            <img src="https://vignette.wikia.nocookie.net/theoffice/images/9/96/Prisonmike.png/revision/latest?cb=20100327171549" class="wrong" alt="Prison Mike">
            <p>${explanation}</p>
            <button class="nextButton">Next Question</button>
        </div>`
    );
    nextQuestion();
}

function nextQuestion() {
    $('.nextButton').on('click', function() {
        qNumber++;
        if (qNumber <= 4) {
            $('.questionNumber').html(`${qNumber + 1}`);
            generateQuestion();
        } else {
            showResults();
        }
    });
}

function showResults() {
    $('.questionBox').html(`
    <img src="https://img.nbc.com/sites/nbcunbc/files/images/2016/1/19/MDot-TheOffice-640x360-MP.jpg" class="wrong" alt="Prison Mike">
        <p>You got ${point} correct out of 5!</p>
        <button class="restartQuiz">Restart Quiz</button>
    `);
    restartQuiz();
}

function restartQuiz() {
    $('.restartQuiz').on('click', function() {
        qNumber = 0;
       point = 0;
        $('.questionNumber').html(`${qNumber + 1}`);
        $(' pointNumber').html(`$ point}`);
        generateQuestion();
    });
}

function generateQuiz() {
    $('.startButton').on('click', function() {
        $('.questionNumber').html(`${qNumber + 1}`);
        $('.startBox').remove();
        $('.startButton').remove();
        $('.questionBox').css('display', 'block');
        generateQuestion();
    });
}

function startQuiz() {
    generateQuiz();
}

$(startQuiz);