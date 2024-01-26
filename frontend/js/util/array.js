export class ArrayUtil {
    /**
     * This method will convert a html collection array 
     * into a converntional array.
     * 
     * @param {HTMLCollection} array 
     */
    static collectionToArray(array) {
        return Array.from(array);
    }


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


export class NoteArray {
    /**
     * This class is used to create arrays of note html collections.
     * This._content.children returns an HTML collections array of notes and subfolders.
     * Given this array, this class will return an HTML collections array with only notes. 
     * 
     * @param {HTMLCollection} array 
     * @returns 
     */
    constructor(array) {
        return this.#createNoteArray(array);
    }

    #createNoteArray(array) {
        return ArrayUtil.filterNotes(array);
    }
}


export class SubfolderArray {
    /**
     * This class is used to create arrays of subfolder html collections.
     * This._content.children returns an HTML collections array of notes and subfolders.
     * Given this array, this class will return an HTML collections array with only subfolders. 
     * 
     * @param {HTMLCollection} array 
     * @returns 
     */
    constructor(array) {
        return this.#createSubfolderArray(array);
    }

    #createSubfolderArray(array) {
        return ArrayUtil.filterSubfolders(array);
    }
}