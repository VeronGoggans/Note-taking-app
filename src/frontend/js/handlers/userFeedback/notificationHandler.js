import { CNode } from "../../util/CNode.js"

export class NotificationHandler {
    constructor() {
        this.screen = document.querySelector('.main');
        this.types = {
            'SAVED': 'Saved',
            'UPDATED': 'Updated',
            'DELETED': 'Deleted',
            'NEW': 'New',
            'EMPTY': 'Empty',
            'EXPORT': 'Export'
        }
        this.icons = {
            'SAVED': 'fa-solid fa-check',
            'UPDATED': 'fa-solid fa-pen',
            'DELETED': 'fa-regular fa-trash-can',
            'NEW': 'fa-solid fa-plus',
            'EMPTY': 'fa-regular fa-bell',
            'EXPORT': 'fa-solid fa-download'
        }
        this.messages = {
            'SAVED': 'Note successfully created.',
            'UPDATED': 'Your changes have been saved.',
            'DELETED': 'has been deleted.',
            'NEW': 'Changes saved.\nCreating a new note.',
            'EMPTY': 'This folder is empty.<br>Start by making a note or subfolder.',
            'EXPORT': 'Export successful'
        }
    }

    /**
     * Pushes a notification of the given type onto the screen.
     * @param {String} type - One of the following: 'saved', 'updated', 'deleted', 'new', 'empty'.
     * @param {String} [noteName='null'] - Optional note name, necessary only for 'deleted' type.
     */
    push(type, noteName = 'null') {
        const notificationTypes = {
            'saved': { icon: this.icons.SAVED, message: this.messages.SAVED, type: this.types.SAVED},
            'updated': { icon: this.icons.UPDATED, message: this.messages.UPDATED, type: this.types.UPDATED},
            'deleted': { icon: this.icons.DELETED, message: `${noteName} ${this.messages.DELETED}`, type: this.types.DELETED},
            'new': { icon: this.icons.NEW, message: this.messages.NEW, type: this.types.NEW},
            'empty': { icon: this.icons.EMPTY, message: this.messages.EMPTY, type: this.types.EMPTY},
            'export': {icon: this.icons.EXPORT, message: this.messages.EXPORT, type: this.types.EXPORT}
        };
    
        const data = notificationTypes[type.toLowerCase()]; // Convert to lowercase for case-insensitivity
        if (!data) {
            throw new Error(`Invalid notification type: ${type}`);
        }
    
        this.screen.appendChild(new Notification(data.icon, data.message, data.type));
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