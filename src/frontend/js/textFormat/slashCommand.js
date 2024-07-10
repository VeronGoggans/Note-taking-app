export class SlashCommand {
    constructor(view, formatter) {
        this.view = view;
        this.formatter = formatter;
        this.commandContainer = document.querySelector('.foreward-slash-command-container');
        this.executeSlashCommand();

    }


    executeSlashCommand() {
        this.commandContainer.addEventListener('click', (event) => {
        const range = window.getSelection().getRangeAt(0);
        const targetClass = event.target.closest('div').classList[0];

        this.deleteForwardSlash(range);
        this.commandContainer.style.display = 'none';
        switch (targetClass) {
          case 'note-link-option':
            // Implement note link function
            break;
          case 'link-option':
            this.formatter.addLink(range);
            break;
          case 'embed-video-option':
            this.formatter.addEmbedVideo(range);
            break;
          case 'horizontal-line-option':
            this.formatter.addHorizontalLine(range);
            break;
          case 'quote-block':
            this.formatter.addQuoteBlock(range);
            break;
          case 'important-block':
            this.formatter.addImportantBlock(range);
            break;
          case 'copyable-block':
            this.formatter.addCopyBlock(range);
            break;
          case 'heading-1':
            this.formatter.addHeading(range, 1);
            break;
          case 'heading-2':
            this.formatter.addHeading(range, 2);
            break;
          case 'heading-3':
            this.formatter.addHeading(range, 3);
            break;
          case 'heading-4':
            this.formatter.addHeading(range, 4);
            break;
          case 'heading-5':
            this.formatter.addHeading(range, 5);
            break;
          case 'heading-6':
            this.formatter.addHeading(range, 6);
            break;
          case 'time':
            // Implement time function
            break;
          case 'date':
            this.formatter.addDateBlock(range);
            break;
          default:
            console.log('No matching function for:', targetClass);
        }});
    }

    deleteForwardSlash(range) {
        const caretNode = range.startContainer;
        const caretOffset = range.startOffset;
      
        // Check if caretNode is a text node and there is a character before the caret
        if (caretNode.nodeType === Node.TEXT_NODE && caretOffset > 0) {
          const textContent = caretNode.textContent;
          
          // Check if the character before the caret is a forward slash
          if (textContent[caretOffset - 1] === '/') {
            // Create a new range to select the forward slash
            const deleteRange = document.createRange();
            deleteRange.setStart(caretNode, caretOffset - 1);
            deleteRange.setEnd(caretNode, caretOffset);
      
            // Remove the forward slash
            deleteRange.deleteContents();
          }
        }
      }
}