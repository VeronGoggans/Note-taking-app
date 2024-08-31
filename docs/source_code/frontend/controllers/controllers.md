# Controllers
The controllers are the middle man for communication between the **Model** and **View.**\
All the controller classes have 

## Parameters
Each controller as of now only has one parameter which is passed through by the application controller.
|                       |                                                                                                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parameter             | Explanation                                                                                                                                                    |
| applicationController | The main controller of the application. Each controller uses this parameter to communicate with other controllers without directly knowing of their existence. |

## CRUD Methods
Each controller has CRUD methods that can be called from it's view, and the application controller.

**Examples of CRUD methods from the folder controller**
```javascript
    async add(object) {
        const { name } = object
        const parentFolderId = this.model.getCurrentFolderID();

        try {
            const { folder } = await this.model.add('/folder', {'folder_id': parentFolderId, 'name': name});
            this.view.renderOne(folder);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async get() {
        const parentFolderId = this.model.getCurrentFolderID();

        try {
            const { folders } = await this.model.get(`/folders/${parentFolderId}`);
            this.view.renderAll(folders);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async getById(folderId) {
        try {
            return await this.model.get(`folderById/${folderId}`);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async update(object) {
        try {
            const { folder } = await this.model.update('/folder', {'folder_id': object.id, 'name': object.name, 'color': object.color});
            this.view.renderUpdate(folder);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async delete(folderId) {
        try {
            const { folder } = await this.model.delete(`/folder/${folderId}`);
            this.view.renderDelete(folder);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }
```

## Shared Non Generic Methods
These are non generic methods that each controller has 

### init Method
This method is used to initialize/setup the controller when it's called by the application controller.\
**Example of the init method inside the sticky note controller**

```javascript
    async init() {
        this.view = new StickyNoteView(this, this.dialog);
        await this.get()
    }
```
