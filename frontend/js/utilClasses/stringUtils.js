class StringUtil {

    static fromatString(inputString) {
        let trimedString = this.stripString(inputString);
        let formatedString = this.replaceNewlineWithBreak(trimedString);
        return formatedString
    }

    static stripString(inputString) {
        return inputString.trim();
    }

    static replaceNewlineWithBreak(inputString) {
        return inputString.replace(/\n/g, '<br>');
    }

    static replaceBreakToNewLine(inputString) {
        return inputString.replace(/<br>/g, '\n');
    }

    // static lineBreakCap(inputString) {
    //     let segments = inputString.split('<br>');
    //     let counter = 0;
    //     let resultSegments = [];

    //     for (let segment of segments) {
    //         counter++;
    //         if (counter === 16) {
    //             resultSegments.push(segment);
    //             resultSegments.push("...") 
    //             break;
    //         }
    //     resultSegments.push(segment);
    //     }
    //     // Join the result segments back into a string
    //     let resultString = resultSegments.join('<br>');

    //     return resultString;
    // }
}