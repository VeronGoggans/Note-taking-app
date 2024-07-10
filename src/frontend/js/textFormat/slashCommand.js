export class SlashCommand {
    constructor(view, formatter) {
        this.view = view;
        this.formatter = formatter;
        this.commandContainer = document.querySelector('.foreward-slash-command-container');
        this.executeSlashCommand();

    }


    executeSlashCommand() {
        const commandDivs = this.commandContainer.querySelectorAll('div');
        commandDivs.forEach(div => {
            div.addEventListener('click', (event) => {
              console.log(`Clicked on: ${event.currentTarget.innerText}`);
              // Add your specific logic here
                const range = window.getSelection().getRangeAt(0);
                this.deleteForwardSlash(range);
                this.formatter.addHeading(range);
                this.commandContainer.style.display = 'none';
            });
        });
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