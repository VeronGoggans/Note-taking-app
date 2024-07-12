import { commands } from "../constants/constants.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
 
export class SlashCommand {
    constructor(view, formatter) {
        this.view = view;
        this.formatter = formatter;
        this.commandContainer = document.querySelector('.foreward-slash-command-container');
        this.commands = this.commandContainer.querySelector('.commands');
        this.input = this.commandContainer.querySelector('input');
        this.#eventListeners();
        this.storedRange = null;
    }

  
    executeSlashCommand(range, targetClass) {
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
        case 'unordered-list':
          this.formatter.addList(range, 'ul');
          break;
        case 'ordered-list':
          this.formatter.addList(range, 'ol');
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
      }
      this.input.value = '';
    }


    /**
     * This method handles a command when the user 
     * clicks on one of them.
     */
    #listenForCommmandClicks() {
      this.commands.addEventListener('click', (event) => {
        const targetClass = event.target.closest('div').classList[0];

        AnimationHandler.fadeOut(this.commandContainer)
        this.executeSlashCommand(this.storedRange, targetClass);
      });
    }


    #updateCommandSuggestions(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const userInput = this.input.value;
        const targetClass = commands[userInput];
        AnimationHandler.fadeOut(this.commandContainer);
        this.executeSlashCommand(this.storedRange, targetClass);
      }
      if (event.key === 'Backspace' && this.input.value === '') {
        event.preventDefault();
        AnimationHandler.fadeOut(this.commandContainer);
      }
    }

    #eventListeners() {
      this.#listenForCommmandClicks();
      this.input.addEventListener('keydown', (event) => {this.#updateCommandSuggestions(event)});
    }

    rememberRange(range) {
      this.storedRange = range;
    }
}