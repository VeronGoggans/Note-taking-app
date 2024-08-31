import { CNode } from "../../util/CNode.js";
import { notificationTypes, notificationIcons, notificationMessages } from "../../constants/constants.js";

export class NotificationHandler {
    
    
    static push(type, noteName = null, errorMsg = null) {
        const types = notificationTypes;
        const icons = notificationIcons;
        const messages = notificationMessages;
        const notifications = {
            'saved': { icon: icons.saved, message: messages.saved, type: types.saved},
            'updated': { icon: icons.updated, message: messages.updated, type: types.updated},
            'deleted': { icon: icons.deleted, message: `<b>${noteName}</b> ${messages.deleted}`, type: types.deleted},
            'new': { icon: icons.new, message: messages.new, type: types.new},
            'empty': { icon: icons.empty, message: messages.empty, type: types.empty},
            'error': { icon: icons.error, message: errorMsg, type: types.error}
        };
    
        const data = notifications[type.toLowerCase()]; // Convert to lowercase for case-insensitivity
        
        document.querySelector('.wrapper').appendChild(new Notification(data.icon, data.message, data.type));
    }
}


class Notification {
    constructor(icon, message, title) {
        this.NOTIFICATION_CARD = CNode.create('div', {'class': 'notification-card'});
        this.ICON = CNode.create('i', {'class': icon, 'id': 'notification-icon'});
        this.TITLE = CNode.create('h3', {'textContent': title})
        this.MESSAGE = CNode.create('p', {'innerHTML': message});
        return this.#render();
    }

    #render() {
        this.NOTIFICATION_CARD.append(this.ICON, this.TITLE, this.MESSAGE);
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
        },4500);   
    }
}