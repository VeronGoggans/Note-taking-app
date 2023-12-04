class NoteUtils {

    static createBookmarkIcon(bookmark) {
        const notBookmarked = "fa-regular fa-bookmark";
        const bookmarked = "fa-solid fa-bookmark";
        const bookmarkIcon = document.createElement("i");

        // Using the ternary operator to apply the right class
        // to the bookmark icon        
        bookmark ? 
        bookmarkIcon.setAttribute('class', bookmarked) : 
        bookmarkIcon.setAttribute('class', notBookmarked);

        bookmarkIcon.title = 'bookmark';
        return bookmarkIcon
    }

    static storeNoteDataToSessionStorage(noteId, noteName, noteContent, notePasswordProtection, noteBookmark) {
        MySessionStorage.set('note-id', noteId);
        MySessionStorage.set('note-name', noteName);
        MySessionStorage.set('note-content', noteContent);
        MySessionStorage.set('note-password-protect', notePasswordProtection);
        MySessionStorage.set('note-bookmark', noteBookmark);
    }    


    static removeNoteCardFromScreen(noteId) {
        
    }
}