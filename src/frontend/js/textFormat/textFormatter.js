import {CNode} from "../util/CNode.js"

export class TextFormatter {
    static addLink() {
      const SELECTION = window.getSelection();

      // Get the range of the selection
      const RANGE = SELECTION.getRangeAt(0);

      const CONTAINER = CNode.create('div', {'class': 'link-container'});
      const CANCEL_BTN = CNode.create('button', {'class': 'cancel-link-btn'});
      const ICON = CNode.create('i', {'class': 'fa-solid fa-xmark'});
      const SAVE_BTN = CNode.create('button', {'class': 'save-link-btn', 'textContent': 'Save'});
      const ORIGINAL_LINK = CNode.create('input', {'class': 'original-link-input', 'type': 'text', 'placeholder': 'https://your-url'});
      const CUSTOM_LINK = CNode.create('input', {'class': 'custom-link-input', 'type': 'text', 'placeholder': 'Custom text'});

      // Putting the UI together 
      CANCEL_BTN.appendChild(ICON);
      CONTAINER.appendChild(CANCEL_BTN);
      CONTAINER.appendChild(ORIGINAL_LINK);
      CONTAINER.appendChild(CUSTOM_LINK);
      CONTAINER.appendChild(SAVE_BTN);

      CANCEL_BTN.addEventListener('click', () => {CONTAINER.remove()});
      SAVE_BTN.addEventListener('click', () => {
        // Delete the input
        RANGE.deleteContents();

        // Create a link element
        const LINK = document.createElement('a');

        LINK.addEventListener('click', () => {window.open(ORIGINAL_LINK.value)});
        
        // The selected text is equal to the link.
        LINK.href = ORIGINAL_LINK.value;

        if (CUSTOM_LINK.value !== '') {
          LINK.textContent = CUSTOM_LINK.value;
        } else {
          LINK.textContent = ORIGINAL_LINK.value;
        }

        RANGE.insertNode(LINK);
      });
      RANGE.insertNode(CONTAINER);
   }


   static addParagraph() {
      // Get the current selection 
      const SELECTION = window.getSelection();

      // Get the range of the selection
      const RANGE = SELECTION.getRangeAt(0);

      const PARAGRAPH = document.createElement('div');
      PARAGRAPH.classList.add('paragraph');

      const P = document.createElement('p');
      P.textContent = RANGE;

      PARAGRAPH.appendChild(P);

      // Creating a break element to put below the paragraph.
      const BREAK = document.createElement('br');

      RANGE.insertNode(BREAK);
      RANGE.insertNode(PARAGRAPH);

      // Collapse the range
      RANGE.collapse(false);
  }


  static addLine() {
      // Get the current selection 
      const SELECTION = window.getSelection();

      // Get the range of the selection
      const RANGE = SELECTION.getRangeAt(0);

      const HR = document.createElement('hr');

      // Creating a break element
      const BREAK = document.createElement('br');
  
      RANGE.insertNode(BREAK);
      RANGE.insertNode(HR);

      // Collapse the range
      RANGE.collapse(false);
  }


  static addColor(color, command) {
      // Use document.execCommand to change text color
      document.execCommand('styleWithCSS', false, true);
      document.execCommand(command, false, color);
  }


  /**
   * This method listens for link clicks.
   * 
   * This method is usefull for when a note has link element in them.
   * Because the link element tags dont have eventlisteners on them when loaded in.
   * This method creates that event listener.
   */
  static listenForLinkClicks(page) {
      const LINKS = page.querySelectorAll('a');
      LINKS.forEach(function(LINK) {
        LINK.addEventListener('click', () => {window.open(LINK.href)})
    });
  }


  static addEmbedVideo() {
    // Get the current selection 
    const SELECTION = window.getSelection();

    // Get the range of the selection
    const RANGE = SELECTION.getRangeAt(0);
    
    const CONTAINER = CNode.create('div', {'class': 'embed-container', 'contentEditable': 'false'});
    const BTN = CNode.create('button', {'class': 'cancel-embed-video-btn'});
    const ICON = CNode.create('i', {'class': 'fa-solid fa-xmark'});
    const INPUT = CNode.create('input', {'type': 'text', 'placeholder': 'https://your-url', 'class': 'embed-link-input'});

    // Putting the UI together 
    CONTAINER.appendChild(BTN);
    BTN.appendChild(ICON);
    CONTAINER.appendChild(INPUT);

    BTN.addEventListener('click', () => {CONTAINER.remove()})

    INPUT.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        // Delete the input
        RANGE.deleteContents();

        // Specify no cookies
        const NO_COOKIES = 'youtube-nocookie';
        const IFRAME_CONTAINER = document.createElement('div');

        // adding nocookies text to the embed link for reduced cookies
        let iframeArray = INPUT.value.split('youtube');
        iframeArray.splice(1, 0, NO_COOKIES);

        const NO_COOKIE_IFRAME = iframeArray.join('');

        IFRAME_CONTAINER.innerHTML = NO_COOKIE_IFRAME;
        const iframeElement = IFRAME_CONTAINER.querySelector('iframe');
        if (iframeElement) {
          iframeElement.title = '';
        }
        RANGE.insertNode(IFRAME_CONTAINER);
      }
    })
    RANGE.insertNode(CONTAINER);
  }
}