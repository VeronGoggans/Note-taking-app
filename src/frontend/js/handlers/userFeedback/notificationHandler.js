import { CNode } from "../../util/CNode.js"

export class NotificationHandler {
    constructor() {
        this.screen = document.querySelector('.main');
        this.types = {
            'SAVED': 'Saved',
            'UPDATED': 'Updated',
            'DELETED': 'Deleted',
            'NEW': 'New',
            'EMPTY': 'Empty'
        }
        this.icons = {
            'SAVED': 'fa-solid fa-check',
            'UPDATED': 'fa-solid fa-pen',
            'DELETED': 'fa-regular fa-trash-can',
            'NEW': 'fa-solid fa-plus',
            'EMPTY': 'fa-regular fa-bell'
        }
        this.messages = {
            'SAVED': 'Note successfully created.',
            'UPDATED': 'Your changes have been saved.',
            'DELETED': 'has been deleted.',
            'NEW': 'Changes saved.\nCreating a new note.',
            'EMPTY': 'This folder is empty.<br>Start by making a note or subfolder.'
        }
    }
    /**
     * type has to be one of the following 
     * (saved, updated, deleted, new, empty).
     * 
     * noteName is optional and only nessecary for the 
     * deleted type.
     * 
     * @param {String} type 
     * @param {String} noteName
     */
    push(type, noteName = 'null') {
        if (type === this.types.SAVED) {
            this.screen.appendChild(new Notification(this.icons.SAVED, this.messages.SAVED, this.types.SAVED));
        } else if (type === this.types.UPDATED) {
            this.screen.appendChild(new Notification(this.icons.UPDATED,this.messages.UPDATED, this.types.UPDATED));
        } else if (type === this.types.DELETED) {
            this.screen.appendChild(new Notification(this.icons.DELETED, `${noteName} ${this.messages.DELETED}`, this.types.DELETED));
        } else if (type === this.types.NEW) {
            this.screen.appendChild(new Notification(this.icons.NEW, this.messages.NEW, this.types.NEW));
        } else if (type === this.types.EMPTY) {
            this.screen.appendChild(new Notification(this.icons.EMPTY, this.messages.EMPTY, this.types.EMPTY));
        }
    }
}


class Notification {
    constructor(icon, message, title) {
        this.NOTIFICATION_CARD = CNode.create('div', {'class': 'notification-card'});
        this.ICON = CNode.create('i', {'class': icon, 'id': 'notification-icon'});
        this.MESSAGE_BOX = CNode.create('div', {});
        this.TITLE = CNode.create('p', {'class': 'notification-message-title', 'textContent': title})
        this.MESSAGE = CNode.create('p', {'class': 'notification-message', 'innerHTML': message});
        return this.#render();
    }

    #render() {
        this.NOTIFICATION_CARD.appendChild(this.ICON);
        this.MESSAGE_BOX.appendChild(this.TITLE);
        this.MESSAGE_BOX.appendChild(this.MESSAGE);
        this.NOTIFICATION_CARD.appendChild(this.MESSAGE_BOX);
        this.NOTIFICATION_CARD.addEventListener('click', () => {this.#slideDown(250)});
        setTimeout(() => {
            this.slideUp();
        }, 100);
        return this.NOTIFICATION_CARD
    }

    #slideDown(duration) {
        this.NOTIFICATION_CARD.classList.remove('show-notification');
        setTimeout(() => {
            this.NOTIFICATION_CARD.remove(); 
        }, duration);
    }

    slideUp() {
        this.NOTIFICATION_CARD.classList.add('show-notification');
        setTimeout(() => {
            this.#slideDown(250);
        },5000);   
    }
}