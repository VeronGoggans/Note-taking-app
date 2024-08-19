/**
 * This class is used to store Editor objects togethor with it's type
 * Objects like:
 * 1. Notes
 * 2. Templates
 * 
 * Types like:
 * 1. note
 * 2. template
 * 
 * The type variable is used by the TextEditorController to determine 
 * if it needs to make a HTTP request to the NoteRouter or TemplateRouter 
 */
export class TextEditorModel {
    constructor() {
        this.editorObject = null
        this.editorObjectType = null
    }

    storeEditorObject(editorObject, editorObjectType) {
        this.editorObject = editorObject;
        this.editorObjectType = editorObjectType;
        console.log(`Stored object: ${editorObject}`);
    }

    storeEditorObjectType(type) {
        this.editorObjectType = type;
        console.log(`Stored type: ${type}`)
    }

    getStoredObject() {
        return {
            editorObject: this.editorObject, 
            editorObjectType: this.editorObjectType
        }
    }

    getStoredObjectId() {
        return this.editorObject.id;
    }

    clear() {
        this.editorObject = null;
        console.log('CLEARED Stored Object');
    }
}