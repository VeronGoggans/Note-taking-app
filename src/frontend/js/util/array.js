class ObjectArray {
    constructor() {
        this.objects = []
    }

    add(object) {
        this.objects.push(object);
    }

    remove(object) {
        const ID = object.id;

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === ID) {
                this.objects.splice(i, 1);
            }
        }
    }

    get(objectId) {
        return this.objects.find(obj => obj.id === objectId)
    }

    getLast() {
        return this.objects[this.objects.length - 1]
    }

    clear() {
        this.objects = [];
    }

    size() {
        return this.objects.length;
    }
}

export class NoteObjectArray extends ObjectArray {
    update(note) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === note.id) {
                this.objects[i].name = note.name;
                this.objects[i].content = note.content;
                this.objects[i].bookmark = note.bookmark;
                this.objects[i].favorite = note.favorite;
                this.objects[i].color = note.color;
                this.objects[i].last_edit = note.last_edit;
            }
        }
    }
}

export class TemplateObjectArray extends ObjectArray {
    update(template) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === template.id) {
                this.objects[i].name = template.name;
                this.objects[i].content = template.content;
                this.objects[i].last_edit = template.last_edit;
            }
        }
    }
}

export class FolderObjectArray extends ObjectArray {
    update(folder) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === folder.id) {
                this.objects[i].name = folder.name;
                this.objects[i].color = folder.color;
            }
        }
    }
}

export class FlashcardDeckObjectArray extends ObjectArray {
    update(deck) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === deck.id) {
                this.objects[i].name = deck.name;
            }
        }
    }
}

export class FlashcardObjectArray extends ObjectArray {
    getNewCard(flashcardId, nextCard) {        
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === flashcardId) {
                if (nextCard) {
                    return this.objects[i + 1];
                }                
                return this.objects[i - 1];
            }
        }
        return this.objects[0]
    }


    update(flashcard) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === flashcard.id) {
                this.objects[i].term = flashcard.term;
                this.objects[i].description = flashcard.description
                this.objects[i].rating = flashcard.rating
            }
        }
    }
}


export class StickyNoteObjectArray extends ObjectArray {
    update(stickyNote) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === stickyNote.id) {
                this.objects[i].name = stickyNote.name;
                this.objects[i].content = stickyNote.content;
            }
        }
    }
}