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