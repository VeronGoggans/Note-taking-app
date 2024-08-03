export const homeTemplate = `
    <div class="home">
        <div class="top">

        <div class="searchbar">
            <i id="search-icon" class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search..." spellcheck="false">
            <ul></ul>
        </div>
        
        </div>
        <div class="middle">
        <p class="block-title">Recent folders</p>
        <div class="recent-folders"></div>
        <p class="block-title">Your recent work</p>
        <div class="recent-notes"></div>
        <p class="block-title">Jump back in</p>
        <div class="flashcard-decks"></div>
        </div>
    </div>
`;

export const notesTemplate = `
    <div class="notes">
    <div class="notes-top">
        <button class="exit-folder-btn"><i class="fa-solid fa-chevron-left"></i></button>

        <div class="searchbar">
            <i id="search-icon" class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search..." spellcheck="false">
            <ul></ul>
        </div>

    </div>
    <div class="notes-bottom">
        <div class="content-folder-view">
        <div class="current-folder-name-container">
            <h2 class="current-folder-name">Home</h2>
            <div>
            <button class="create-folder-btn"><i class="fa-solid fa-folder"></i></button>
            <button class="create-note-btn"><i class="fa-solid fa-file"></i></button>
            <button class="home-folder-btn"><i class="fa-solid fa-house"></i></button>
            <button class="favorites-btn"><i class="fa-solid fa-heart"></i></button>
            <button class="bookmarks-btn"><i class="fa-solid fa-bookmark"></i></button>
            </div>
        </div>
        <div class="content-view">
        </div>
        </div>
    </div>
    </div>
`;

export const flashcardsTemplate = `
    <div class="flashcards-view">
        <h1>Flashcards</h1>
        <div class="stats-section">
            <p>Current streak: <span>🔥0</span>d</p>
            <p>Time studied: <span>0</span>h <span>0</span>m</p>
            <p>Total cards: <span class="flashcard-count">0</span></p>
        </div>
        <div class="deck-section">
            <h2>Decks</h2>
            <p class="continue-studying">Continue studying your cards</p>
            <button class="create-deck-btn">Add a deck</button>
            <div class="flashcard-deck-container"> </div>
        </div>
    </div>
`;
export const templatesTemplate =  `
    <div class="templates">
        <div class="top">
            <div class="top-left">
                <h1 class="templates-title">Templates</h1>
                <button class="add-template-btn"><i class="fa-solid fa-plus"></i>Add template</button>
            </div>
            <div class="top-right">
                <p>Uses: <span class="total-uses-count">0</span></p>
                <p>Templates: <span class="template-count"></span></p>
                <p>Most used: <span class="most-used-template"></span></p>
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
                <input type="text" spellcheck="false" placeholder="Theme" class="theme-input">
                <ul class="themes">
                    <li theme="light">Light</li>
                    <li theme="dark">Dark</li>
                </ul>
            </div>
            <h3>Language</h3>
            <p>Select a language</p>
            <div class="language-dropdown">
                <input type="text" spellcheck="false" placeholder="Coming soon" class="language-input">
                <ul class="languages">
                    <li>English</li>
                    <li>Dutch</li>
                </ul>
            </div>
        </div>
    </div>
    </div>
`;

export const editorTemplate = `
    <div class="editor-wrapper">
      <div class="toolbar">
        <div class="toolbar-top">
          <i id="exit-editor-btn" class="fa-solid fa-arrow-left"></i>
          <p class="document-location"></p>
          <div class="save-note-btn">Save</div>
          
          <div class="editor-options-dropdown">
            <i id="editor-options-btn" class="fa-solid fa-ellipsis-vertical"></i>
            <div class="options">
              <button class="new-note-span"><i class="fa-solid fa-plus"></i>New</button>
              <button class="save-note-span"><i class="fa-regular fa-floppy-disk"></i>Save</button>
              <button class="delete-note-span"><i class="fa-regular fa-trash-can"></i>Delete</button>
              <button class="note-details-span"><i class="fa-solid fa-info"></i>Details</button>
            </div>
          </div>

        </div>
        <div class="toolbar-bottom">
          <input class="note-name-input" type="text" placeholder="Untitled" spellcheck="false">
        </div>
        
      </div>
      <div class="editor">
        <div class="editor-paper" contenteditable="true" spellcheck="false"></div>
      </div>

      <i id="editor-search-btn" class="fa-solid fa-magnifying-glass"></i>

      <div class="templates-dropdown">
        <i id="editor-template-btn" class="fa-solid fa-layer-group"></i>
        <div class="options">
          <span>Templates</span>
          <ul class="templates-container">
          </ul>
        </div>
      </div>

      <i id="editor-flashcard-set-btn" class="fa-solid fa-pencil"></i>

      <div class="rich-text-option-container">
        <div class="btn-group">
            <button id="boldBtn" onclick="formatText('bold')"><i class="fa-solid fa-bold"></i></button>
            <button id="italicBtn" onclick="formatText('italic')"><i class="fa-solid fa-italic"></i></button>
            <button id="underlineBtn" onclick="formatText('underline')"><i class="fa-solid fa-underline"></i></button>
            <button id="strikeBtn" onclick="formatText('strikethrough')"><i class="fa-solid fa-strikethrough"></i></button>
            <button onclick="formatText('createLink')"><i class="fa-solid fa-link"></i></button>
        </div>
        <div class="btn-group">
            <button onclick="formatText('justifyLeft')"><i class="fa-solid fa-align-left"></i></button>
            <button id="centerAlignBtn" onclick="formatText('justifyCenter')"><i class="fa-solid fa-align-center"></i></button>
            <button id="rightAlignBtn" onclick="formatText('justifyRight')"><i class="fa-solid fa-align-right"></i></button>
        </div>
        <div class="btn-group">
            <button onclick="formatText('insertUnorderedList')"><i class="fa-solid fa-list-ul"></i></button>
            <button onclick="formatText('insertOrderedList')"><i class="fa-solid fa-list-ol"></i></button>
            <button onclick="formatText('insertCheckbox')"><i class="fa-solid fa-list-check"></i></button>
        </div>
        <div class="btn-group">
            <button onclick="formatText('removeFormat')"><i class="fa-solid fa-text-slash"></i></button>
        </div>
      </div>

      <div class="foreward-slash-command-container">
        <input type="text" placeholder="Command..." spellcheck="false">
        <div class="commands">
            <div class="note-link-option"><i class="fa-solid fa-file"></i>Link a document</div>
            <div class="link-option"><i class="fa-solid fa-link"></i>Add a url</div>
            <div class="embed-video-option"><i class="fa-solid fa-play"></i>Add a video</div>
            <div class="horizontal-line-option"><i class="fa-solid fa-ruler-horizontal"></i>Add a horizontal line</div>
            <div class="quote-block"><i class="fa-solid fa-quote-right"></i>Quote block</div>   
            <div class="important-block"><i class="fa-solid fa-exclamation"></i>Important block</div>   
            <div class="copyable-block"><i class="fa-regular fa-paste"></i>Copy block</div> 
            <div class="unordered-list"><i class="fa-solid fa-list-ul"></i>Bullet list</div>
            <div class="ordered-list"><i class="fa-solid fa-list-ol"></i>Numbered list</div> 
            <div class="heading-1"><i class="fa-solid fa-h"></i>Add heading 1</div>
            <div class="heading-2"><i class="fa-solid fa-h"></i>Add heading 2</div>
            <div class="heading-3"><i class="fa-solid fa-h"></i>Add heading 3</div>
            <div class="heading-4"><i class="fa-solid fa-h"></i>Add heading 4</div>
            <div class="heading-5"><i class="fa-solid fa-h"></i>Add heading 5</div>
            <div class="heading-6"><i class="fa-solid fa-h"></i>Add heading 6</div>
            <div class="time"><i class="fa-regular fa-clock"></i>Current time</div>
            <div class="date"><i class="fa-regular fa-calendar"></i>Current date</div>
        </div>
    </div>
    
    </div>
`