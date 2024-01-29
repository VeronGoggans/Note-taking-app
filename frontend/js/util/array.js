class ArrayUtil {
    /**
     * This method will filter out all of the folders
     * from a given array
     * 
     * @param {Array} array 
     */
    static filterNotes(array) {
        // The string part n is part of all note ID's (n-10)
        const NOTE_ID = 'n';
        let notesArray = [];
        for(let i = 0; i < array.length; i++) {
            if (array[i].id.includes(NOTE_ID)){
                notesArray.push(array[i]);
            }
        }
        return notesArray
    }

    /**
     * This method will filter out all of the notes
     * from a given array
     * 
     * @param {Array} array 
     */
    static filterSubfolders(array) {
        // The string part s is part of all subfolder ID's (s-10)
        const SUBFOLDER_ID = 's';
        let folderArray = [];
        for(let i = 0; i < array.length; i++) {
            if (array[i].id.includes(SUBFOLDER_ID)){
                folderArray.push(array[i]);
            }
        }
        return folderArray
    }
}


export class HTMLArray {
    /**
     * This class is used to create arrays of note html collections.
     * This._content.children returns an HTML collections array of notes and subfolders.
     * Given this array, this class will return an HTML collections array with only notes. 
     * 
     * @param {HTMLCollection} array 
     * @returns 
     */
    constructor(array, type) {
        return this.#createHtmlArray(array, type);
    }

    #createHtmlArray(array, type) {
        if (type === 'note') {
            return ArrayUtil.filterNotes(array);
        } else {
            return ArrayUtil.filterSubfolders(array);
        }
    }
}


export class NoteObjectArray {
    constructor() {
        this.objects = [];
    }

    /**
     * This method adds the given note to the array.
     * 
     * @param {Dict} note 
     */
    add(note) {
        this.objects.push(note);
    }

    /**
     * This method removes the given note from the array.
     * 
     * @param {Dict} note 
     */
    remove(note) {
        const ID = note.id;

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === ID) {
                this.objects.splice(i, 1);
            }
        }
        console.log(this.objects);
    }

    /**
     * This method updates a note object in the noteObjects list.
     * 
     * @param {Dict} note The updated note from the backend 
     * containing the updated note information.
     */
    update(note) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === note.id) {
                this.objects[i].name = note.title;
                this.objects[i].content = note.content;
                this.objects[i].bookmark = note.bookmark;
                this.objects[i].lastEdit = note.last_edit;
            }
        }
        console.log(this.objects);
    }

    /**
     * This method finds the note with the given note ID.
     * 
     * @param {String} noteId 
     * @returns a note dictionary
     */
    get(noteId) {
        return this.objects.find(obj => obj.id === noteId)
    }

    clear() {
        this.objects = [];
    }

    size() {
        return this.objects.length;
    }
}