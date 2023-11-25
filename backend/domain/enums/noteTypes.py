from enum import Enum

# This enum class is currently only used in the private filter function in the NotesData class.
# It uses this enum class to know what to filter by.
class NoteTypes(Enum):
    STANDARD = 'standard'
    PROTECTED = 'protected'
    BOOKMARKED = 'bookmark'
    ALL = 'all'