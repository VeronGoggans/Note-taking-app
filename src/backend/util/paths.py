from os import getcwd

CWD = getcwd()
FOLDERS_PATH = f'{CWD}/storage/json/notes.json'
FLASHCARDS_PATH = f'{CWD}/storage/json/flashcard_decks.json'
STICKY_NOTES_PATH = f'{CWD}/storage/json/sticky_notes.json'
TASKBOARD_PATH = f'{CWD}/storage/json/taskboards.json'
TEMPLATES_PATH = f'{CWD}/storage/json/templates.json'
ID_PATH = f'{CWD}/storage/json/id.json'
MISC_PATH = f'{CWD}/storage/json/misc.json'
SETTINGS_PATH = f'{CWD}/storage/json/settings.json'

FOR_FOLDER = 'folder'
FOR_SUBFOLDER = 'subfolder'
FOR_NOTE = 'note'
FOR_STICKY_NOTE = 'sticky-note'
FOR_TEMPLATE = 'template'
FOR_TASKBOARD = 'taskboard'
FOR_FLASHCARD_DECK = 'flashcard-deck'

PREFIXES = {
    'note': 'n-',
    'folder': 'f-',
    'subfolder': 's-',
    'template': 't-',
    'flashcard-deck': 'fcd-',
    'flashcard': 'fc-',
    'sticky-note': 'sn-',
    'taskboard': 'tb-',
    'task': 'tk'
}
