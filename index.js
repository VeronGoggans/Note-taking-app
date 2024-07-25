import { ApplicationController } from '/src/frontend/js/controller/applicationController.js';
import { ApplicationModel } from './src/frontend/js/model/applicationModel.js';
import { ApplicationView } from './src/frontend/js/view/applicationView.js';
import { FolderController } from './src/frontend/js/controller/folderController.js';
import { NoteController } from './src/frontend/js/controller/noteController.js';
import { TemplateController } from './src/frontend/js/controller/templateController.js';
import { FlashcardController } from './src/frontend/js/controller/flashcardController.js';
import { TextEditorController } from './src/frontend/js/controller/textEditorController.js';
import { SettingController } from './src/frontend/js/controller/settingController.js';
import { Dialog } from './src/frontend/js/util/dialog.js';
import { NotificationHandler } from './src/frontend/js/handlers/userFeedback/notificationHandler.js';

const dialog = new Dialog();
const notificationHandler = new NotificationHandler();
const applicationView = new ApplicationView(this, dialog);
const applicationModel = new ApplicationModel();
const folderController = new FolderController(this, dialog, notificationHandler);
const noteController = new NoteController(this, dialog, notificationHandler);
const templateController = new TemplateController(this, dialog, notificationHandler);
const flashcardCOntroller = new FlashcardController(this, dialog, notificationHandler);
const textEditorController = new TextEditorController(this, dialog);
const settingController = new SettingController();

document.addEventListener('DOMContentLoaded', () => {
    
})
const App = new ApplicationController();
App.start();




