export const homeTemplate = `
    <div class="home">
        <div class="top">
        <div class="searchbar-home">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search..." spellcheck="false">
        </div>
        </div>
        <div class="middle">
        <p class="block-title">Recent folders</p>
        <div class="folders"></div>
        <p class="block-title">Recently viewed notes</p>
        <div class="notes"></div>
        <p class="block-title">Jump back in</p>
        <div class="flashcard-decks"></div>
        </div>
    </div>
`;

export const notesTemplate = `
    <div class="notes">
    <div class="notes-top">
        <button class="exit-folder-btn"><i class="fa-solid fa-chevron-left"></i></button>

        <div class="search-container">
            <input type="text" spellcheck="false" placeholder="Search" class="searchbar-input">
            <i class="fa-solid fa-magnifying-glass"></i>
            <ul class="note-suggestions-list"></ul>
        </div>

    </div>
    <div class="notes-bottom">
        <div class="content-folder-view">
        <div class="current-folder-name-container">
            <h2 class="current-folder-name">Home</h2>
            <div>
            <button class="create-folder-btn"><i class="fa-solid fa-folder"></i></button>
            <button class="create-note-btn"><i class="fa-solid fa-file"></i></button>
            <button class="favorite-btn"><i class="fa-solid fa-heart"></i></button>
            <button class="bookmark-btn"><i class="fa-solid fa-bookmark"></i></button>
            </div>
        </div>
        <div class="content-view">
            <div class="note"></div>
        </div>
        </div>
    </div>
    </div>
`;

export const flashcardsTemplate = '';
export const templatesTemplate =  `
    <div class="templates">
        <div class="top">
            <div class="top-left">
                <h1 class="templates-title">Templates</h1>
                <button class="add-template-btn"><i class="fa-solid fa-plus"></i> Add template</button>
            </div>
            <div class="top-right">
                <p>Time saved: <span>0</span>h <span>0</span>m</p>
                <p>Uses: <span>0</span></p>
            </div>
        </div>
        <div class="bottom">
            <p class="block-title">Recent templates</p>
            <div class="recent-templates"></div>
            <p class="block-title">Other templates</p>
            <div class="other-templates"></div>
        </div>
    </div>
`;

export const settingsTemplate = `
    <div class="settings">
    <div class="center">
        <h1 class="settings-title">Settings</h1>
        <div class="settings-container">
            <h3>Theme</h3>
            <p>Select a theme</p>
            <div class="theme-dropdown">
                <input type="text" value="Light" spellcheck="false" placeholder="Theme" class="theme-input">
                <ul class="themes">
                    <li>Light</li>
                    <li>Dark</li>
                    <li>Dual</li>
                </ul>
            </div>
            <h3>Language</h3>
            <p>Select a language</p>
            <div class="language-dropdown">
                <input type="text" spellcheck="false" placeholder="Language" class="language-input">
                <ul class="languages">
                    <li>English</li>
                    <li>Dutch</li>
                </ul>
            </div>
        </div>
    </div>
    </div>
`;