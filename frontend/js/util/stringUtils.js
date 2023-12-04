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
}