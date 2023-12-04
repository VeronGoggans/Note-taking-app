import { FolderService } from '/frontend/js/service/folderService.js';
import { FolderView } from '/frontend/js/view/folder/FolderView.js';
import { DialogView } from '/frontend/js/view/dialog/DialogView.js';
const folderService = new FolderService();
const folderView = new FolderView();
const dialogView = new DialogView();

folderView.renderListViewFolders();
folderView.renderFolders();

