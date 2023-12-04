import { FolderService } from '/frontend/js/service/folderService.js';
import { FolderView } from '/frontend/js/view/FolderView.js';
const folderService = new FolderService();
const folderView = new FolderView();

folderView.renderListViewFolders('folders');
