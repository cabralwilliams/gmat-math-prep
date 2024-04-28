const homeLink = document.getElementById('homeLink');
const arithmeticSeries = document.getElementById('arithmeticSeries');

function hideAllSections() {
    document.getElementById('arithSeriesDiv').classList.add('display-none');
    document.getElementById('applicationHomeInfo').classList.add('display-none');

    homeLink.classList.remove('active');
    arithmeticSeries.classList.remove('active');
}

function resetStatistics(statsArray = []) {
    statsArray.forEach(ob => {
        ob.questionObjects = [];
        ob.responses = [];
    });
}


// Question count variables
let arithmeticQuestionCount = 0;
const arithmeticExampleStats = {
    questionObjects: [],
    responses: []
};

homeLink.addEventListener('click', () => {
    // Set question count variables to zero
    arithmeticQuestionCount = 0;

    // Reset statistics objects
    resetStatistics(
        [
            arithmeticExampleStats
        ]
    );

    // Hide sections
    hideAllSections();
    document.getElementById('applicationHomeInfo').classList.remove('display-none');
    homeLink.classList.add('active');
});

arithmeticSeries.addEventListener('click', () => {
    arithmeticQuestionCount = 0;
    hideAllSections();
    document.getElementById('startArithmeticExamples').classList.remove('display-none');
    document.getElementById('arithSeriesDiv').classList.remove('display-none');
    arithmeticSeries.classList.add('active');
});