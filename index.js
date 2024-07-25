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
import { notesTemplate, flashcardsTemplate, settingsTemplate, templatesTemplate, homeTemplate } from './src/frontend/js/constants/templates.js';
 


document.addEventListener('DOMContentLoaded', () => {
    const viewContainer = document.querySelector('.content');

    const dialog = new Dialog();
    const notificationHandler = new NotificationHandler();
    const applicationView = new ApplicationView(this, dialog);
    const applicationModel = new ApplicationModel();
    const folderController = new FolderController(this, dialog, notificationHandler);
    const noteController = new NoteController(this, dialog, notificationHandler);
    const templateController = new TemplateController(this, dialog, notificationHandler);
    const flashcardController = new FlashcardController(this, dialog, notificationHandler);
    const textEditorController = new TextEditorController(this, dialog);
    const settingController = new SettingController();

    const controllers = {
        notes: noteController,
        flashcards: flashcardController,
        templates: templateController,
        settings: settingController,
        editor: textEditorController
    }

    const templates = {
        notes: notesTemplate,
        flashcards: flashcardsTemplate,
        templates: templatesTemplate,
        settings: settingsTemplate,
        editor: null
    }

    function showView(viewId) {
        const controller = controllers[viewId];
        if (controller) {
            viewContainer.innerHTML = templates[viewId];
        }
    }

    document.querySelectorAll('.sidebar .sidebar-content a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const viewId = event.target.getAttribute('data-view');
            showView(viewId);
        });
    });

    showView('notes')
})
const App = new ApplicationController();
App.start();




