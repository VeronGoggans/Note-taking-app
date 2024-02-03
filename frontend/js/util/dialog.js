import { NoteDetailContainer } from "../components/noteDetailContainer.js";
import { DeleteContainer } from "../components/deleteContainer.js";
import { ForgotSaveContainer } from "../components/forgotSaveContainer.js";

export class Dialog {
    constructor() {
        this.dialog = document.querySelector('.dialog');
    }

    show() {
        this.dialog.style.visibility = 'visible';
        this.dialog.style.top = '0%';
    }

    hide() {
        this.dialog.style.visibility = 'hidden';
        this.dialog.style.top = '100%';
        this.dialog.removeChild(this.dialog.firstChild);
    }

    addChild(child) {
        this.dialog.appendChild(child);
    }


    renderNoteDetails(noteInfo) {
        this.addChild(new NoteDetailContainer(noteInfo[1], noteInfo[2]))
        this.show();
      }
    
      renderNoteDeleteContainer(noteInfo, view) {
        this.addChild(new DeleteContainer(noteInfo[0], noteInfo, view))
        this.show();
      }
    
      renderForgotSaveContainer(view) {
        this.addChild(new ForgotSaveContainer(view));
        this.show();
      }
}