import { CNode } from "../../util/CNode.js";
import { getNoteColor } from "../../util/backgroundColor.js";

export class NoteBackroundContainer {
    constructor(id, color, view) {
        this.id = id;
        this.view = view;
        this.activeColor = color;
        this.HOST = CNode.create('div', {'class': 'note-background-color-container'});
        this.H2 = CNode.create('h2', {'textContent': 'Background colors'});
        this.ROW1 = CNode.create('section', {'class': 'note-background-colors-row-one'});
        this.ROW2 = CNode.create('section', {'class': 'note-background-colors-row-two'});
        // The different colors
        this.ORIGINAL = document.createElement('div');
        this.ORIGINAL.style.backgroundColor = '#eaf4ff';
        this.BLUE = document.createElement('div');
        this.BLUE.style.backgroundColor = '#bcd2e9';
        this.PURPLE = document.createElement('div');
        this.PURPLE.style.backgroundColor = '#c2bce9';
        this.RED = document.createElement('div');
        this.RED.style.backgroundColor = '#ffacac';
        this.PINK = document.createElement('div');
        this.PINK.style.backgroundColor = '#ffd7e6';
        this.ORANGE = document.createElement('div');
        this.ORANGE.style.backgroundColor = '#efba94';
        this.YELLOW = document.createElement('div');
        this.YELLOW.style.backgroundColor = '#fffba3';
        this.OLDWHITE = document.createElement('div');
        this.OLDWHITE.style.backgroundColor = '#fefded';
        this.GREEN = document.createElement('div');
        this.GREEN.style.backgroundColor = '#aee4cb';
        this.BLACK = document.createElement('div');
        this.BLACK.style.backgroundColor = '#000000';

        this.activeColorOptions = {
            'white': this.ORIGINAL,
            'blue': this.BLUE,
            'purple': this.PURPLE,
            'red': this.RED,
            'pink': this.PINK,
            'orange': this.ORANGE,
            'yellow': this.YELLOW,
            'old-white': this.OLDWHITE,
            'green': this.GREEN,
            'black': this.BLACK
        }
        
        this.#showActiveClass(color);
        this.#attachEventListeners();
        return this.#render();
    }

    #render() {
        this.HOST.append(this.H2, this.ROW1, this.ROW2);
        this.ROW1.append(this.ORIGINAL, this.BLUE, this.PURPLE, this.RED, this.PINK);
        this.ROW2.append(this.ORANGE, this.YELLOW, this.OLDWHITE, this.GREEN, this.BLACK);
        return this.HOST;
    }

    #attachEventListeners() {
        this.ORIGINAL.addEventListener('click', () => {this.#updateColor('#ffffff')});
        this.BLUE.addEventListener('click', () => {this.#updateColor('#bcd2e9')});
        this.PURPLE.addEventListener('click', () => {this.#updateColor('#c2bce9')});
        this.RED.addEventListener('click', () => {this.#updateColor('#ffacac')});
        this.PINK.addEventListener('click', () => {this.#updateColor('#ffd7e6')});
        this.ORANGE.addEventListener('click', () => {this.#updateColor('#efba94')});
        this.YELLOW.addEventListener('click', () => {this.#updateColor('#fffba3')});
        this.OLDWHITE.addEventListener('click', () => {this.#updateColor('#fefded')});
        this.GREEN.addEventListener('click', () => {this.#updateColor('#aee4cb')});
        this.BLACK.addEventListener('click', () => {this.#updateColor('#000000')});
    }

    #updateColor(hexColor, color = getNoteColor(hexColor)) {
        this.view.updateNoteColor(color);
        this.#showActiveClass(color);
    }

    #showActiveClass(color) { 
        this.#removeActiveClass();
        this.activeColor = color;
        const colorContainer = this.activeColorOptions[color];
        colorContainer.classList.add('active-note-background-color');
    }

    #removeActiveClass() {
        const colorContainer = this.activeColorOptions[this.activeColor];
        colorContainer.classList.remove('active-note-background-color');
    }    
}