import { headingsMap, arrowKeys } from "../constants/constants.js";


export class TextEditorEventListener {
    constructor(editor, headingButton) {
        this.editor = editor;
        this.headingButton = headingButton
        this.editor.addEventListener('keyup', (event) => {this._updateHeadingStatusOnKeyUp(event)});
        this.editor.addEventListener('mouseup', () => {this._updateHeadingStatus()});
    }

    _updateHeadingStatus() {
        console.log('I am triggerd');
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let node = range.startContainer;

            // Traverse up the DOM tree to find the relevant tag
            while (node && node !== this.editor) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (headingsMap[node.tagName]) {
                        this.headingButton.textContent = headingsMap[node.tagName];
                        return;
                    }
                }
                node = node.parentNode;
            }
        } 
        if (this.headingButton.textContent !== 'Headings') {
            this.headingButton.textContent = 'Headings';
        }
    }

    _updateHeadingStatusOnKeyUp(event) {
        if (arrowKeys.has(event.key)) this._updateHeadingStatus();
    }
}