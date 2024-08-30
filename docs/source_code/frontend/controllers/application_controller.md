# Application controller

## InitView method
**Parameters**

1. viewId
2. viewParameters

<br>

|                |                                                                 |
| -------------- | --------------------------------------------------------------- |
| Parameter      | Explanation                                                     |
| viewId         | Is a String value representing which view should be loaded.     |
| viewParameters | Is an Object that can vary based on which view is being loaded. |

<br>

**viewParameters for the notes view**

```json
   {
    "folder": "Object",
    "location": "Object"
   } 
```

<br>

|           |                                                                                                                                                                 |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parameter | Explanation                                                                                                                                                     |
| folder    | The folder that the notes view should load                                                                                                                      |
| location  | A hierarchical array of folder objects. This value can only be null if the notes view is loaded in when the exit button inside the editor view has been clicked. |

<br>

**viewParameters for the editor view**

```json
   {
    "editorObjectType": "String",
    "editorObject": "Object",
    "newEditorObject": "Boolean",
    "previousView": "String"
   } 
```

<br>

|                  |                                                                                                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parameter        | Explanation                                                                                                                                                                                                                                  |
| editorObjectType | A string telling the editor if a note or template is being **made/edited**                                                                                                                                                                   |
| editorObject     | This can either be a note/template object or null. If a note/template has been clicked on this value will be an object. But if the add note/add template button has been clicked on this value is null as there is no object to begin with.  |
| newEditorObject  | A boolean value telling the texteditor Model if it is creating or editing a note/template                                                                                                                                                    |
| previousView     | A string value telling the texteditor controller which view to load when the exit editor button has been clicked.                                                                                                                            |