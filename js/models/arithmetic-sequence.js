class ArithmeticSequence {
    constructor(firstTerm = 1, commonDifference = 1) {
        this.firstTerm = firstTerm;
        this.commonDifference = commonDifference;
    }

    resetSequence(firstTerm = 1, commonDifference = 1) {
        this.firstTerm = firstTerm;
        this.commonDifference = commonDifference;
    }

    getSequence(start = 1, totalTerms = 3) {
        const output = [];
        for(let i = 0; i < totalTerms; i++) {
            output.push(this.firstTerm + (start - 1 + i)*this.commonDifference);
        }
        return output;
    }

    printSequence(start = 1, totalTerms = 4, truncate = false) {
        const sequence = this.getSequence(start, totalTerms);
        let output = sequence.join(', ');
        if(!truncate) {
            output += ', ...';
        }
        return output;
    }
}

class ArithmeticProblemGenerator {
    constructor(firstTerm = 1, commonDifference = 1) {
        this.firstTerm = firstTerm;
        this.commonDifference = commonDifference;
        this.ArithSequence = new ArithmeticSequence(this.firstTerm, this.commonDifference);
    }

    setFirstTerm(newFirstTerm = 1) {
        this.firstTerm = newFirstTerm;
    }

    setCommonDifference(newCommonDifference = 1) {
        this.commonDifference = newCommonDifference;
    }

    setArithsequence() {
        this.ArithSequence = new ArithmeticSequence(this.firstTerm, this.commonDifference);
    }

    getQuestion1() {
        const termCount = (15 + Math.floor(Math.random()*11))*2;
        const allTerms = this.ArithSequence.getSequence(1, termCount);
        const question = `A certain arithmetic sequence consists of the following terms: ${allTerms[0]}, ${allTerms[1]}, ${allTerms[2]}, ... ${allTerms[allTerms.length - 3]}, ${allTerms[allTerms.length - 2]}, ${allTerms[allTerms.length - 1]}.  What is the median of this sequence?`;
        const answer = (allTerms[0] + allTerms[allTerms.length - 1])/2;
        const explanation = `The mean and median of any arithmetic sequence are always the same.  This value can always be found by taking the average of two terms in opposite positions in the sequence.  Note that (${allTerms[0]} + ${allTerms[allTerms.length - 1]})/2 = (${allTerms[1]} + ${allTerms[allTerms.length - 2]})/2 = ${answer}, which is the correct answer.`;
        return { question, answer, explanation };
    }

    getQuestion2(totalTerms = 100) {
        const updatedTerms = totalTerms > 49 ? totalTerms : 50;
        const sequence = this.ArithSequence.getSequence(1, updatedTerms);
        const question = `A certain arithmetic sequence starts with the following terms: ${sequence[0]}, ${sequence[1]}, ${sequence[2]}.  What is the sum of the first ${updatedTerms} terms of the sequence?`;
        const answer = (sequence[0] + sequence[updatedTerms - 1])*updatedTerms/2;
        const explanation = `The sum of a finite arithmetic sequence can be found by taking the sum of first and last terms, multiplying this value by the total number of terms, and then dividing this value by two.  In this case we get (${sequence[0]} + ${sequence[sequence.length - 1]})*${totalTerms}/2 = ${answer}.`;
        return { question, answer, explanation };
    }

    getQuestion3(totalTerms = 100) {
        const updatedTerms = totalTerms > 59 ? totalTerms : 60;
        const sequence = this.ArithSequence.getSequence(1, updatedTerms);
        const term1 = Math.ceil(Math.random()*10);
        const term2 = 11 + Math.ceil(Math.random()*20);
        const term3 = term2 + Math.ceil(Math.random()*20);
        const abr1 = getPositiveTermEnding(term1);
        const abr2 = getPositiveTermEnding(term2);
        const abr3 = getPositiveTermEnding(term3);
        const question = `If the ${term1}${abr1} term of an aritmetic sequence is ${sequence[term1 - 1]} and the ${term2}${abr2} term of the sequence is ${sequence[term2 - 1]}, what is the ${term3}${abr3} term of the sequence?`;
        const answer = sequence[term3 - 1];
        const explanation = `To solve this you must first find the common difference in the sequence.  This can be done by dividing the difference between the values of two terms by the difference of those terms' positions in the sequence.  Here we get (${sequence[term2 - 1]} - ${sequence[term1 - 1]})/(${term2} - ${term1}) = ${this.ArithSequence.commonDifference}.  Once you have this value, you just need to apply this difference the appropriate number of time to get to the desired term.`;
        return { question, answer, explanation };
    }

    getQuestion4(firstRow = 10, rowIncrease = Math.ceil(Math.random()*4)) {
        const totalRows = (10 + Math.floor(Math.random()*11))*5;
        const rowList = [];
        for(let i = 0; i < totalRows; i++) {
            rowList.push(firstRow + i*rowIncrease);
        }
        const rowReplace = 10 + Math.floor(Math.random()*(totalRows - 19));
        const originalTotalCount = (rowList[0] + rowList[totalRows - 1])*totalRows/2;
        const seatCountAtReplace = rowList[rowReplace - 1];
        const newSeatCount = seatCountAtReplace + reselectIntIfZero(-10, 10);
        const question = `An event venue is to be constructed, the original plan being for it to be constructed with ${totalRows} rows of seats, with the first row having ${firstRow} seats and each successive row having ${rowIncrease} more seat${rowIncrease > 1 ? 's' : ''} than the previous row.  However, plans change that force the ${rowReplace}${getPositiveTermEnding(rowReplace)} row to have exactly ${newSeatCount} seats.  Following this change, how many total seats will the venue have?`;
        const answer = originalTotalCount + newSeatCount - seatCountAtReplace;
        const explanation = `To solve this you must use your knowledge of arithmetic sequences to find two things: the number of seats that would have been in the entire venue and the number of seats that would have been in the ${rowReplace}${getPositiveTermEnding(rowReplace)} row before the change.  The original venue total would have been ${originalTotalCount}, and the number of seats that would have been in the ${rowReplace}${getPositiveTermEnding(rowReplace)} row is ${seatCountAtReplace}.  Therefore, we can calculate the new value as ${answer} seats.`;
        return { question, answer, explanation };
    }

    getQuestion5(firstRow = 20, rowIncrease = Math.ceil(Math.random()*4)) {
        const sequence = [
            firstRow,
            firstRow + rowIncrease,
            firstRow + 2*rowIncrease,
            firstRow + 3*rowIncrease,
            firstRow + 4*rowIncrease
        ];

        const qIndex = Math.ceil(Math.random()*3);
        const displaySequence = [`${sequence[0]}`, 'x','y','z',`${sequence[4]}`];
        const question = `In a theater, the first five rows contain the following number of seats: ${displaySequence.join(', ')}.  If the increase in the number of seats from row to row is consistent in the theater, what is the value of ${displaySequence[qIndex]}?`;
        const answer = sequence[qIndex];
        const explanation = `In this example, the first five rows form an arithmetic sequence. In going from the first row to the fifth, we apply four times the common difference, or ${sequence[4] - sequence[0]} (4*${rowIncrease}).  By applying the common difference, ${rowIncrease}, the appropriate number of times, we get to ${displaySequence[qIndex]} = ${sequence[qIndex]}.`;
        return { question, answer, explanation };
    }

    getRandomQuestion() {
        const totalQuestionTypes = 5;
        const questionIndex = Math.ceil(Math.random()*totalQuestionTypes);
        switch(questionIndex) {
            case 1:
                return this.getQuestion1();
            case 2:
                return this.getQuestion2();
            case 3:
                return this.getQuestion3();
            case 4:
                return this.getQuestion4();
            case 5:
                return this.getQuestion5();
            default:
                return this.getQuestion4();
        }
    }
}