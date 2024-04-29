function getRandomIntegerBetweenRange(intLow = -10, intHigh = 10) {
    const minVal = Math.min(intLow, intHigh);
    const maxVal = Math.max(intLow, intHigh);
    return minVal + Math.floor(Math.random()*(maxVal - minVal));
}

function reselectIntIfZero(intLow = -10, intHigh = 10) {
    let output = 0;
    while(output === 0) {
        output = getRandomIntegerBetweenRange(intLow, intHigh);
    }
    return output;
}

function getSingleFillInElementWithoutExhibit(textToShow, clickFunction) {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'd-flex flex-wrap';
    const questionDiv = document.createElement('div');
    questionDiv.className = 'col-12 col-md-7';
    const inputDiv = document.createElement('div');
    inputDiv.className = 'col-12 col-md-5 d-flex flex-column align-items-center';
    const outputInput = document.createElement('input');
    const outputLabel = document.createElement('label');
    const questionButton = document.createElement('button');
    questionButton.id = 'responseButton';
    questionButton.textContent = 'Submit';
    questionButton.className = 'btn btn-secondary col-10';
    questionButton.onclick = clickFunction;
    outputInput.type = 'number';
    outputInput.className = 'col-10 mt-1 mb-1';
    outputInput.setAttribute('step', '0.1');
    outputInput.setAttribute('id', 'response1');
    outputLabel.className = 'col-10';
    outputLabel.setAttribute('for', 'response1');
    outputLabel.textContent = 'Enter response:';
    questionDiv.textContent = textToShow;
    inputDiv.append(outputLabel, outputInput, questionButton);
    outputDiv.append(questionDiv, inputDiv);
    return outputDiv;
}

function getPositiveTermEnding(termNo = 1) {
    const hundredMod = termNo%100;
    if(hundredMod > 10 && hundredMod < 20) {
        return 'th';
    } else {
        switch(hundredMod) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }
}

function getResultRow(statisticsObject, questionNumber) {
    const outputRow = document.createElement('tr');
    outputRow.className = 'd-flex justify-content-evenly';
    const numberTd = document.createElement('tr');
    numberTd.className = 'col-1 pl-1 pr-1';
    const questionTd = document.createElement('td');
    questionTd.className = 'col-3 pl-1 pr-1';
    const answerTd = document.createElement('td');
    answerTd.className = 'col-1 pl-1 pr-1';
    const responseTd = document.createElement('td');
    responseTd.className = 'col-1 pl-1 pr-1';
    const statusTd = document.createElement('td');
    statusTd.className = 'col-1 pl-1 pr-1';
    const explanationTd = document.createElement('td');
    explanationTd.className = 'col-3 pl-1 pr-1';
    numberTd.textContent = questionNumber;
    questionTd.textContent = statisticsObject.questionOb.question;
    answerTd.textContent = statisticsObject.questionOb.answer;
    responseTd.textContent = statisticsObject.response;
    statusTd.textContent = statisticsObject.questionOb.answer === statisticsObject.response;
    explanationTd.textContent = statisticsObject.questionOb.explanation;
    outputRow.append(numberTd, questionTd, answerTd, responseTd, statusTd, explanationTd);
    return outputRow;
}

function getPracticeStatsElement(statisticsObject, title) {
    const mappedRows = statisticsObject.questionObjects.map((ob, i) => {
        const objectInfo = {
            questionOb: ob,
            response: statisticsObject.responses[i]
        };
        return getResultRow(objectInfo, i + 1);
    });
    const outputDiv = document.createElement('div');
    outputDiv.className = 'd-flex flex-column mt-2 mb-2';
    const titleHeader = document.createElement('h3');
    titleHeader.textContent = title;
    const outputTable = document.createElement('table');
    const tableHeaderRow = document.createElement('tr');
    tableHeaderRow.className = 'd-flex justify-content-evenly';
    const tableHeaderStrs = ['Q#', 'Question', 'Correct Answer', 'Your Response', 'Correct?', 'Explanation'];
    const headerColumns = [1,3,1,1,1,3];
    const headerEls = tableHeaderStrs.map((h, i) => {
        const nextHeader = document.createElement('th');
        nextHeader.textContent = h;
        nextHeader.className = `col-${headerColumns[i]} pl-1 pr-1`;
        return nextHeader;
    });
    tableHeaderRow.append(...headerEls);
    outputTable.append(tableHeaderRow, ...mappedRows);
    outputDiv.append(titleHeader, outputTable);
    return outputDiv;
}