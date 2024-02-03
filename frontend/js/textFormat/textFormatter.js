export class TextFormatter {
    static addLink() {
      const SELECTION = window.getSelection();

      // Get the range of the selection
      const RANGE = SELECTION.getRangeAt(0);

      // Create a link element
      const LINK = document.createElement('a');

      LINK.addEventListener('click', () => {window.open(RANGE)});
      
      // The selected text is equal to the link.
      LINK.href = RANGE;

      // Surround the selected text with a link element
      RANGE.surroundContents(LINK);

      SELECTION.removeRange(RANGE);
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

    const EMBED_INPUT = document.createElement('input');
    EMBED_INPUT.type = 'text';
    EMBED_INPUT.placeholder = 'Embed ink...';
    EMBED_INPUT.classList.add('embed-link-input');

    EMBED_INPUT.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        // Delete the input
        RANGE.deleteContents();

        // Specify no cookies
        const NO_COOKIES = 'youtube-nocookie';
        const IFRAME_CONTAINER = document.createElement('div');

        // adding nocookies text to the embed link for reduced cookies
        let iframeArray = EMBED_INPUT.value.split('youtube');
        iframeArray.splice(1, 0, NO_COOKIES);

        const NO_COOKIE_IFRAME = iframeArray.join('');

        IFRAME_CONTAINER.innerHTML = NO_COOKIE_IFRAME;
        RANGE.insertNode(IFRAME_CONTAINER);
      }
    })
    RANGE.insertNode(EMBED_INPUT);
  }
}