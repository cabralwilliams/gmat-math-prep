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