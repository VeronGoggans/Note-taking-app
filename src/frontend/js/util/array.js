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
                this.objects[i].title = note.title;
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