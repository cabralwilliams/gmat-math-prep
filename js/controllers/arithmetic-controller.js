const arithSeqEx1 = new ArithmeticSequence(
    getRandomIntegerBetweenRange(),
    reselectIntIfZero(-4,4)
);

const arithSeriesExDiv1 = document.getElementById('arithSeriesExDiv1');
const arithmeticSeriesLink = document.getElementById('arithmeticSeries');
const startArithmeticExamples = document.getElementById('startArithmeticExamples');
const arithExampleProblemDiv = document.getElementById('arithExampleProblemDiv');
let currentArithmeticQuesionOb;
let arithmeticQuestionAndAnswer;
let arithmeticQuestionandAnswerElement;

arithSeriesExDiv1.innerHTML = arithSeqEx1.printSequence();

function runArithmeticExamples() {
    if(arithmeticQuestionCount === 0) {
        startArithmeticExamples.classList.add('display-none');
        arithExampleProblemDiv.innerHTML = '';
        arithmeticQuestionCount = 1;
        currentArithmeticQuesionOb = new ArithmeticProblemGenerator(reselectIntIfZero(), reselectIntIfZero(2, 9));
        arithmeticQuestionAndAnswer = currentArithmeticQuesionOb.getQuestion1();
        arithmeticQuestionandAnswerElement = getSingleFillInElementWithoutExhibit(arithmeticQuestionAndAnswer.question, runArithmeticExamples);
        const infoDiv = document.createElement('div');
        infoDiv.className = 'd-flex col-12 justify-content-center mt-2 mb-2';
        const headingElement = document.createElement('h4');
        headingElement.className = 'mt-1 mb-1 col-12';
        headingElement.textContent = `Question ${arithmeticQuestionCount}`;
        arithExampleProblemDiv.append(headingElement, arithmeticQuestionandAnswerElement);
    } else if(arithmeticQuestionCount < 10) {
        const studentResponse = parseFloat(document.getElementById('response1').value);
        arithmeticExampleStats.questionObjects.push(arithmeticQuestionAndAnswer);
        arithmeticExampleStats.responses.push(studentResponse);
        console.log(arithmeticExampleStats);
        currentArithmeticQuesionOb = new ArithmeticProblemGenerator(reselectIntIfZero(), reselectIntIfZero(2, 9));
        arithmeticQuestionAndAnswer = currentArithmeticQuesionOb.getRandomQuestion();
        arithmeticQuestionandAnswerElement = getSingleFillInElementWithoutExhibit(arithmeticQuestionAndAnswer.question, runArithmeticExamples)
        arithmeticQuestionCount++;
        arithExampleProblemDiv.innerHTML = '';
        const infoDiv = document.createElement('div');
        infoDiv.className = 'd-flex col-12 justify-content-center mt-2 mb-2';
        const headingElement = document.createElement('h4');
        headingElement.className = 'mt-1 mb-1 col-12';
        headingElement.textContent = `Question ${arithmeticQuestionCount}`;
        arithExampleProblemDiv.append(headingElement, arithmeticQuestionandAnswerElement);
    } else {
        const studentResponse = parseFloat(document.getElementById('response1').value);
        arithmeticExampleStats.questionObjects.push(arithmeticQuestionAndAnswer);
        arithmeticExampleStats.responses.push(studentResponse);
        arithmeticQuestionCount = 0;
        arithExampleProblemDiv.innerHTML = '';
        const performanceStats = getPracticeStatsElement(arithmeticExampleStats, 'Arithmetic Sequence Results');
        arithExampleProblemDiv.appendChild(performanceStats);
        document.getElementById('startArithmeticExamples').classList.remove('display-none');
    }
}

arithmeticSeriesLink.addEventListener('click', () => {
    arithSeqEx1.resetSequence(getRandomIntegerBetweenRange(), reselectIntIfZero(-4,4));
    arithSeriesExDiv1.innerHTML = arithSeqEx1.printSequence();
});

startArithmeticExamples.addEventListener('click', runArithmeticExamples);