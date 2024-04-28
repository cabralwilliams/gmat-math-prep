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
        return { question, answer };
    }

    getQuestion2(totalTerms = 100) {
        const updatedTerms = totalTerms > 49 ? totalTerms : 50;
        const sequence = this.ArithSequence.getSequence(1, updatedTerms);
        const question = `A certain arithmetic sequence starts with the following terms: ${sequence[0]}, ${sequence[1]}, ${sequence[2]}.  What is the sum of the first ${updatedTerms} of the sequence?`;
        const answer = (sequence[0] + sequence[updatedTerms - 1])*updatedTerms/2;
        return { question, answer };
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
        return { question, answer };
    }

    getQuestion4(firstRow = 10, rowIncrease = Math.ceil(Math.random()*4)) {
        const totalRows = (10 + Math.floor(Math.random()*11))*5;
        const rowList = [];
        for(let i = 0; i < totalRows; i++) {
            rowList.push(firstRow + i*rowIncrease);
        }
        const rowReplace = 10 + Math.floor(Math.random()*(totalRows - 19));
        const seatCountAtReplace = rowList[rowReplace - 1];
        const newSeatCount = seatCountAtReplace + reselectIntIfZero(-10, 10);
        const question = `An event venue is to be constructed, the original plan being for it to be constructed with ${totalRows} rows of seats, with the first row having ${firstRow} seats and each successive row having ${rowIncrease} more seat${rowIncrease > 1 ? 's' : ''} than the previous row.  However, plans change that force the ${rowReplace}${getPositiveTermEnding(rowReplace)} row to have exactly ${newSeatCount} seats.  Following this change, how many total seats will the venue have?`;
        const answer = (rowList[0] + rowList[rowList.length - 1])*totalRows/2 + newSeatCount - seatCountAtReplace;
        return { question, answer };
    }

    getRandomQuestion() {
        const totalQuestionTypes = 4;
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
            default:
                return this.getQuestion4();
        }
    }
}