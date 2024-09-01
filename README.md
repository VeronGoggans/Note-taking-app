# Simple Note taking app
This is my implementation of a note taking app for desktop.

I created this app with two things I thought this app should have. 
1. The app should be easy on the eye. This prevents the user from losing track of where they are or what they have to click on in order to do what they want to do. To accomplish this I chose for a simplistic design.
2. The app should be simple and easy to use. Providing as little obstacles for the user, so they can take notes without a complex series of buttons to press and menu's to open.

> **Important** This app is completly local. This app does not save your notes in the cloud, but instead saves them localy in the form of .txt files..

## Features
**App features:**
The user can create the following:
- Notes
- Sticky notes
- Templates
- Flashcards
- Folders
- Subfolders

# Light mode
### Home
![home view light](https://github.com/VeronGoggans/Note-taking-app/blob/spa/docs/img/home-view-light.png?raw=true)
On the home screen, the user can see the following:\
1. **Recently Visited Folders**: By clicking on any folder, the user is taken directly to that location.
2. **Recently Worked-on Notes**: Clicking on a note opens the editor, allowing the user to continue working on it seamlessly.
3. **Random Flashcard Decks**: Clicking on a deck lets the user start or continue practicing the flashcards.

There is also a search bar where the user can search for anything, including templates\,
flashcard decks, folders, and notes
### Inside folder
![folder view light](https://github.com/VeronGoggans/Note-taking-app/blob/spa/docs/img/folder-view-light.png?raw=true)
On the Notes tab, the user has several options:\
- Use the search bar to find specific folders and notes.
- Create new folders by clicking the folder icon.
- Create new notes by clicking the file icon.
- Click the bookmark icon to view all bookmarked notes.
- Click the home icon to return to the root or home folder of the Notes tab.

Additionally, the Notes tab serves as the main area for accessing and managing notes.
### Inside the editor
![editor view light](https://github.com/VeronGoggans/Note-taking-app/blob/spa/docs/img/editor-view-light.png?raw=true)
When a user clicks on a note, they are taken to the editor, where several actions are available:\
- In the upper left corner, there is a button to exit the editor and view the note's location.
- In the upper right corner, the save button allows the user to save their progress and close the editor. Next to it, the ellipsis button provides a dropdown menu with the following options: New, Save, Delete, and Details.
- Below the ellipsis button is a search icon that lets the user search for any word within the note.
- The template button, located under the search icon, allows the user to load a template directly into their note.
- Lastly, the flashcard deck button, located below the template button, enables the user to create a deck from the current note.

### Notes:
Neutron allows the user to bookmark notes.\
to give the user more control over their notes.\


**Bookmark**\
When a note is bookmarked the note will always render before all the other notes inside the folder. 
And if the bookmark button right under the folder name is clicked, all the bookmarked notes the user has will be shown. 


### Templates
Templates help the user to improve productivity by being able to load in freequently needed text\
directly into their notes.


The following features will be for within the text editor

**Editor Features:**
- bold, italic, underline, strikethrough
- Links (These can be given a custom text)
- Align text left, center and right
- Bullet and numbered lists
- Color text
- Remove formatting
- Undo/redo
- Headings 1 through 6 
- Insert horizontal line
- Save current note
- Delete current note
- Create new note (saves the previous note)
- Show details about current note
- Create Quote block
- Create Important block
- Create Date block

## Slash commands 
To execute a command the user needs to type a **/**.\
after pressing **/** the command box shows up.


![Slash command](https://github.com/VeronGoggans/Keeps/blob/main/docs/img/slash-commands.png?raw=true)\
Inside the command box the user can either click on a command,\
or type in the keyword for a command. 

**command keywords**
|           |                                 |
| --------- | ------------------------------- |
| **Keyword**   | **Action**                          |
| link      | Create a url                    |
| video     | Insert Youtube video            |
| line      | Insert horizontal line          |
| quote     | Insert quote block              |
| important | Insert important block          |
| ul        | Insert unordered list           |
| ol        | Insert ordered list             |
| h1        | Insert heading 1                |
| h2        | Insert heading 1                |
| h3        | Insert heading 1                |
| h4        | Insert heading 1                |
| h5        | Insert heading 1                |
| h6        | Insert heading 1                |
| date      | Insert date block               |
