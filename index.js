import { FolderView } from '/frontend/js/view/folder/FolderView.js';
import { FolderController } from './frontend/js/controller/folderController.js';
import { NoteController } from './frontend/js/controller/noteController.js';
import { ComminucationController } from './frontend/js/controller/communicationController.js';
import { DialogView } from '/frontend/js/view/dialog/DialogView.js';
import { SidebarView } from './frontend/js/view/sidebar/sideBarView.js';

const NOTE_CONTROLLER = new NoteController();
const FOLDER_CONTROLLER = new FolderController();
const COMM_CONTROLLER = new ComminucationController(FOLDER_CONTROLLER, NOTE_CONTROLLER);


FOLDER_CONTROLLER.getFolders();


