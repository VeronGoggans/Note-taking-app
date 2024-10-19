export const editFolderModalTemplate = `
<h2>New folder</h2>
<div class="folder-settings">
    <span id="title">Folder name</span>
    <p>You can change the name of this folder below</p>
    <input type="text" placeholder="Untitled" spellcheck="false">

    <span id="title">Folder theme</span>
    <p>Select a theme for this folder</p>
    <div class="folder-color-options">
        <div style="background-color: rgb(121, 144, 255)"></div>
        <div style="background-color: rgb(169, 215, 255)"></div>
        <div style="background-color: rgb(217, 237, 255)"></div>
        <div style="background-color: rgb(158, 213, 197)"></div>
        <div style="background-color: rgb(203, 255, 197)"></div>
        <div style="background-color: rgb(173, 255, 164)"></div>
        <div style="background-color: rgb(142, 122, 181)"></div>
        <div style="background-color: rgb(223, 193, 255)"></div>
        <div style="background-color: rgb(255, 163, 163)"></div>
        <div style="background-color: rgb(255, 197, 197)"></div>
        <div style="background-color: rgb(255, 182, 116)"></div>
        <div style="background-color: rgb(255, 224, 158)"></div>
        <div class="original-folder-color" style="background-color: #fff"></div>
    </div>
    <div class="buttons-container">
        <button class="cancel-btn">Cancel</button>
        <button class="save-btn">Add folder</button>
    </div>
</div>
`