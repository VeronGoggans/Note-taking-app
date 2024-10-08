from sqlalchemy.orm import Session
from collections import Counter
from src.backend.data.models import Folder, Note, Taskboard, Flashcard, FlashcardSet
from src.backend.data.exceptions.exceptions import NotFoundException


def find_folder(folder_id: int, db: Session) -> (Folder | NotFoundException):
    folder = db.query(Folder).filter(Folder.id == folder_id).first()
    
    if folder is None:
        raise NotFoundException(f"Folder with id {folder_id} not found.")
    return folder



def find_note(note_id: int, db: Session) -> ( Note | NotFoundException ):
    note = db.query(Note).filter(Note.id == note_id).first()
    
    if note is None:
        raise NotFoundException(f"Note with id {note_id} not found.")
    return note



def find_taskboard(id: int, db: Session) -> ( Taskboard | NotFoundException ):
    taskboard = db.query(Taskboard).filter(Taskboard.id == id).first()

    if taskboard is None:
        raise NotFoundException(f"Taskboard with id {id} not found.")
    return taskboard


def find_deck(id: int, db: Session) -> ( FlashcardSet | NotFoundException ):
    deck = db.query(FlashcardSet).filter(FlashcardSet.id == id).first()
    
    if deck is None:
        raise NotFoundException(f"Deck with id {id} not found.")
    return deck


def find_flashcard(id: int, db: Session) -> ( Flashcard | NotFoundException ):
    flashcard = db.query(Flashcard).filter(Flashcard.id == id).first()
    
    if flashcard is None:
        raise NotFoundException(f"Flashcard with id {id} not found.")
    return flashcard


def get_folder_hierarchy(id: int, db: Session) -> list[dict]:
    """
    Retrieve the folder hierarchy for a given folder or note ID.
    The hierarchy is a list of dictionaries with {id, name} for each folder in the path.
    """

    folder = None

    # Step 1: Check if the ID belongs to a Note
    note = db.query(Note).filter(Note.id == id).first()
    
    if note:
        # If it's a note, find the folder where the note is located
        folder_id = note.folder_id
        folder = db.query(Folder).filter(Folder.id == folder_id).first()
    else:
        # Step 2: Check if the ID belongs to a Folder
        folder = db.query(Folder).filter(Folder.id == id).first()

    if not folder:
        raise NotFoundException(f"No folder or note found with id {id}.")

    # Step 3: Traverse up the folder hierarchy and collect the path
    hierarchy = []
    current_folder = folder

    while current_folder:
        hierarchy.append({"id": current_folder.id, "name": current_folder.name})
        current_folder = db.query(Folder).filter(Folder.id == current_folder.parent_id).first()

    # Reverse the hierarchy so that the root folder comes first
    hierarchy.reverse()

    return hierarchy
