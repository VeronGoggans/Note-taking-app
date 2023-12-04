import { FolderView } from '/frontend/js/view/folder/FolderView.js';
import { DialogView } from '/frontend/js/view/dialog/DialogView.js';
import { SidebarView } from './frontend/js/view/sidebar/sideBarView.js';

const folderView = new FolderView();
const dialogView = new DialogView(folderView);
const sidebarView = new SidebarView();

folderView.renderListViewFolders();
folderView.renderFolders();

