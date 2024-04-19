import {CNode} from "../util/CNode.js"

export class TextFormatter {
    static addLink() {
      const SELECTION = window.getSelection();

      // Get the range of the selection
      const RANGE = SELECTION.getRangeAt(0);

      const CONTAINER = CNode.create('div', {'class': 'link-container'});
      const CANCEL_BTN = CNode.create('button', {'class': 'cancel-link-btn'});
      const ICON = CNode.create('i', {'class': 'fa-solid fa-xmark'});
      const ORIGINAL_LINK = CNode.create('input', {'class': 'original-link-input', 'type': 'text', 'placeholder': 'Paste link here...'});
      const CUSTOM_LINK = CNode.create('input', {'class': 'custom-link-input', 'type': 'text', 'placeholder': 'Custom text'});

      // Putting the UI together 
      CANCEL_BTN.appendChild(ICON);
      CONTAINER.appendChild(CANCEL_BTN);
      CONTAINER.appendChild(ORIGINAL_LINK);
      CONTAINER.appendChild(CUSTOM_LINK);

      CANCEL_BTN.addEventListener('click', () => {CONTAINER.remove()});
      ORIGINAL_LINK.addEventListener('keydown', (event) => {insert(event)});
      CUSTOM_LINK.addEventListener('keydown', (event) => {insert(event)});

      function insert(event) {
        if (event.key === 'Enter') {
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
        }
      }
      RANGE.insertNode(CONTAINER);
      ORIGINAL_LINK.focus();
   }


   static addCodeBlock() {
     // Get the selected text range
     const selection = window.getSelection();
     const range = selection.getRangeAt(0);

     // Create a <code> element and set its text content to the selected text
     const codeElement = document.createElement('code');
     codeElement.textContent = range.toString();

     // Replace the selected text range with the <code> element
     range.deleteContents();
     range.insertNode(codeElement);
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
    const INPUT = CNode.create('input', {'type': 'text', 'placeholder': 'Paste link here...', 'class': 'embed-link-input'});

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
    INPUT.focus();
  }
}