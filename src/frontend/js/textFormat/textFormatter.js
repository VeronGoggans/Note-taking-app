import {CNode} from "../util/CNode.js";
import { getCurrentDateAndTime } from "../util/date.js";

export class TextFormatter {
  constructor() {

  }
  
  
  addHorizontalLine(range, lineType = null) {
    const br = document.createElement('br');
    range.insertNode(br);

    // Create the hr element with specified border type
    const line = document.createElement('hr');
    if (lineType !== null) {
      line.style.border = `2px ${lineType} var(--editor-text)`;
    } else {
      line.style.border = `2px solid var(--editor-text)`;
    }

    range.insertNode(line);
    this.#removeSelectedEffect(range, br);
    this.#moveCursorToTextBlock(br)
  }


  addImportantBlock(range) {
    const { br, p } = this.#createBlockHelperNodes();
    const impContainer = CNode.create('div', {'class': 'important-block'});
    const icon = CNode.create('i', {'class': 'fa-solid fa-exclamation'});

    impContainer.append(icon, p);
    range.insertNode(br);
    range.insertNode(impContainer);
    this.#removeSelectedEffect(range, impContainer);
    this.#moveCursorToTextBlock(p);
  }


  addQuoteBlock(range) {
    const { br, p } = this.#createBlockHelperNodes();
    const quoteBlock = CNode.create('div', {'class': 'quote-block'});

    quoteBlock.appendChild(p);
    range.insertNode(br);
    range.insertNode(quoteBlock);
    this.#removeSelectedEffect(range, quoteBlock);
    this.#moveCursorToTextBlock(p);
  }


  addDateBlock(range) {
    const br = document.createElement('br');
    const dateTimeContainer = CNode.create('div', {'class': 'date-time-block'});

    dateTimeContainer.innerHTML = getCurrentDateAndTime();
    range.insertNode(br);
    range.insertNode(dateTimeContainer);
    this.#removeSelectedEffect(range, dateTimeContainer);
    this.#moveCursorToTextBlock(br);
  }

  addCopyBlock(range) {
    const { br, p } = this.#createBlockHelperNodes();
    const copyBlock = CNode.create('div', {'class': 'copyable-block'});
    const icon = CNode.create('i', {'class': 'fa-regular fa-paste'});

    copyBlock.append(icon, p);
    range.insertNode(br);
    range.insertNode(copyBlock);
    this.#removeSelectedEffect(range, copyBlock);
    this.#moveCursorToTextBlock(p);
  }

  addHeading(range, headingType, extension = null) {
    const heading = document.createElement(`h${headingType}`);

    // Set the user input as the textContent of the heading. 
    if (extension !== null) {
      heading.textContent = extension;
    }

    range.insertNode(heading);
    this.#removeSelectedEffect(range, heading);
    this.#moveCursorToTextBlock(heading);
  }

  addList(range, listType) {
    const list = document.createElement(listType);
    const li = document.createElement('li');

    list.appendChild(li);
    range.insertNode(list);
    this.#removeSelectedEffect(range, list);
    this.#moveCursorToTextBlock(li);
  }


  addColor(color, command) {
      // Use document.execCommand to change text color
      document.execCommand('styleWithCSS', false, true);
      document.execCommand(command, false, color);
  }



  addLink(range) {
    const container = CNode.create('div', {'class': 'link-container'});
    const originalUrl = CNode.create('input', {'class': 'original-link-input', 'type': 'text', 'placeholder': 'Paste link here...'});
    const customUrl = CNode.create('input', {'class': 'custom-link-input', 'type': 'text', 'placeholder': 'Custom text'});
    container.append(originalUrl, customUrl);
    
    originalUrl.addEventListener('keydown', (event) => {insert(event, originalUrl)});
    customUrl.addEventListener('keydown', (event) => {insert(event, customUrl)});

    function insert(event, input) {
      if (event.key === 'Enter') {
        // Delete the input
        range.deleteContents();

        // Create a link element
        const anchorTag = document.createElement('a');

        anchorTag.addEventListener('click', () => {window.open(originalUrl.value)});
        
        // The selected text is equal to the link.
        anchorTag.href = originalUrl.value;

        if (customUrl.value !== '') {
          anchorTag.textContent = customUrl.value;
        } else {
          anchorTag.textContent = originalUrl.value;
        }

        range.insertNode(anchorTag);
      } 
      if (event.key === 'Backspace' && input.value === '') {
        container.remove();
      } 
    }

    range.insertNode(container);
    originalUrl.focus();
 }


  addEmbedVideo(range) {    
    const container = CNode.create('div', {'class': 'embed-container', 'contentEditable': 'false'});
    const inputTag = CNode.create('input', {'type': 'text', 'placeholder': 'Paste link here...', 'class': 'embed-link-input'});
    container.append(inputTag);

    inputTag.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        // Delete the input
        range.deleteContents();

        // Specify no cookies
        const noCookies = 'youtube-nocookie';
        const iframe = document.createElement('div');

        // adding nocookies text to the embed link for reduced cookies
        let iframeArray = inputTag.value.split('youtube');
        iframeArray.splice(1, 0, noCookies);

        const noCookiesIframe = iframeArray.join('');

        iframe.innerHTML = noCookiesIframe;
        const iframeElement = iframe.querySelector('iframe');
        if (iframeElement) {
          iframeElement.title = '';
        }
        range.insertNode(iframe);
      }
    })

    inputTag.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && inputTag.value === '') {
        container.remove()
      }
    })
    range.insertNode(container);
    inputTag.focus();
  }

  static async addNoteLink(noteId, noteName) {
    const range = window.getSelection().getRangeAt(0);

    const linkContainer = CNode.create('div', {'class': 'linked-note-container', 'id': noteId, 'contentEditable': 'false'});
    const linkIcon = CNode.create('i', {'class': 'fa-solid fa-paperclip'});
    const name = CNode.create('span', {'textContent': noteName, 'class': 'linked-note-name'});
    const fileIcon = CNode.create('i', {'class': 'fa-regular fa-file-lines'});

    linkContainer.append(fileIcon, name, linkIcon);
    range.insertNode(linkContainer);
 }

  /**
   * This method listens for linked note container clicks.
   * 
   * When note link containers are loaded in they don't have eventlisteners on them by default.
   * This method creates those event listener for each link container.
   */
  static listenForNoteLinkClicks(page, controller) {
    const LINKS = page.querySelectorAll('.linked-note-container');
    LINKS.forEach(function(link) {
      link.addEventListener('click', () => {controller.getSearchedNote(link.id)});
    });
  }


  #removeSelectedEffect(range, node) {
    range.setStartAfter(node);
    range.setEndAfter(node);
  }

  #moveCursorToTextBlock(node) {
    // Creating a text node the cursor will move to
    const textNode = document.createTextNode('');
    node.appendChild(textNode);

    // Move the cursor inside the node
    const range = document.createRange();
    const selection = window.getSelection();

    // Set the range to the text node which is already inside the node
    range.setStart(textNode, 0);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);

    node.focus();
  }

  #createBlockHelperNodes() {
    const br = document.createElement('br');
    const p = document.createElement('p');
    return { br, p }
  }  
}