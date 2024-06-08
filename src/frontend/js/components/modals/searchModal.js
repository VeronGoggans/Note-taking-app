import { CNode } from "../../util/CNode.js";

export class SearchModal {
    constructor() {

        this.currentHighlightIndex = -1;
        this.highlights = [];
        this.editorPaper = document.querySelector('.editor-paper')

        this.#initializeElements();
        this.#attachEventListeners();
        return this.#render();
    }

    #attachEventListeners() {
        this.CLOSE_BUTTON.addEventListener('click', () => {this.#removeModal()});
        this.INPUT.addEventListener('input', () => {this.handleInput()});
        this.NEXT_BUTTON.addEventListener('click', () => {this.scrollToHighlight()})
    }

    #initializeElements() {
        this.MODAL = CNode.create('div', {'class': 'search-function-modal'});
        this.INPUT = CNode.create('input', {'placeholder': 'Find', 'spellcheck': false});
        this.PARAGRAPH = CNode.create('p', {'textContent': '0 of 0'});
        // BUTTONS
        this.PREVIOUS_BUTTON = CNode.create('button', {});
        this.NEXT_BUTTON = CNode.create('button', {});
        this.CLOSE_BUTTON = CNode.create('button', {});
        // ICONS
        this.PREVIOUS_ICON = CNode.create('i', {'class': 'fa-solid fa-chevron-up'});
        this.NEXT_ICON = CNode.create('i', {'class': 'fa-solid fa-chevron-down'});
        this.CLOSE_ICON = CNode.create('i', {'class': 'fa-solid fa-xmark'});
    }

    #render() {
        this.PREVIOUS_BUTTON.appendChild(this.PREVIOUS_ICON);
        this.NEXT_BUTTON.appendChild(this.NEXT_ICON);
        this.CLOSE_BUTTON.appendChild(this.CLOSE_ICON);
        this.MODAL.append(this.INPUT, this.PARAGRAPH, this.PREVIOUS_BUTTON, this.NEXT_BUTTON, this.CLOSE_BUTTON);
        return this.MODAL
    }

    #removeModal() {
        this.removeHighlights();
        this.MODAL.remove();
    }

    handleInput() {
        const searchValue = this.INPUT.value;

        // Remove previous highlights
        this.removeHighlights();

        if (searchValue) {
            this.highlightText(searchValue);
        }

        // Reset highlights tracking
        this.currentHighlightIndex = -1;
        this.highlights = Array.from(document.querySelectorAll('.highlight'));
        this.PARAGRAPH.textContent = `${this.highlights.length} found`;
    }

    scrollToHighlight() {
        if (this.highlights.length > 0) {
            this.currentHighlightIndex = (this.currentHighlightIndex + 1) % this.highlights.length;
            const nextHighlight = this.highlights[this.currentHighlightIndex];
            nextHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    removeHighlights() {
        const spans = this.editorPaper.querySelectorAll('span.highlight');
        spans.forEach(span => {
            const parent = span.parentNode;
            while (span.firstChild) {
                parent.insertBefore(span.firstChild, span);
            }
            parent.removeChild(span);
            parent.normalize();
        });
    }

    highlightText(searchValue) {
        const textNodes = this.getTextNodes();
        const searchRegExp = new RegExp(searchValue, 'gi');

        textNodes.forEach(node => {
            const fragment = document.createDocumentFragment();
            let nodeValue = node.nodeValue;
            let lastIndex = 0;

            nodeValue.replace(searchRegExp, (match, offset) => {
                const before = document.createTextNode(nodeValue.slice(lastIndex, offset));
                const highlightSpan = document.createElement('span');
                highlightSpan.className = 'highlight';
                highlightSpan.textContent = match;
                fragment.appendChild(before);
                fragment.appendChild(highlightSpan);
                lastIndex = offset + match.length;
            });

            fragment.appendChild(document.createTextNode(nodeValue.slice(lastIndex)));
            node.parentNode.replaceChild(fragment, node);
        });
    }

    getTextNodes() {
        const textNodes = [];
        const walker = document.createTreeWalker(this.editorPaper, NodeFilter.SHOW_TEXT, null, false);

        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        return textNodes;
    }

    
}