from src.backend.data.note.sticky_note_manager import StickyNoteManager
from src.backend.presentation.dtos.note_dtos import PostStickyNoteDto, PutStickyNoteDto
from src.backend.domain.sticky_note import StickyNote 
from src.backend.data.exceptions.exceptions import NotFoundException, AdditionException
from src.backend.data.file.json_manager import JsonManager
from os import getcwd 

class StickyNoteService:
    def __init__(self, manager: StickyNoteManager, json_manager: JsonManager) -> None:
        self.manager = manager
        self.json_manager = json_manager
        self.BASE_URL = getcwd()
        self.sticky_notes_path = f'{self.BASE_URL}/storage/json/sticky_notes.json'
        self.id_path = f'{self.BASE_URL}/storage/json/id.json'



    def add_sticky_note(self, reqeust_dto: PostStickyNoteDto) -> StickyNote:    
        object_id = self.json_manager.generate_id(self.id_path, 'sticky-note')
        sticky_note = StickyNote(object_id, reqeust_dto.name, reqeust_dto.content)

        sticky_notes = self.json_manager.load(self.sticky_notes_path)
        try:
            sticky_note = self.manager.add(sticky_notes, sticky_note)
            self.json_manager.update(self.sticky_notes_path, sticky_notes)
            return sticky_note
        except AdditionException as e:
            raise e


    def get_sticky_notes(self) -> list[object]:
        try:
            return self.json_manager.load(self.sticky_notes_path)
        except Exception as e:
            raise NotFoundException('There were no sticky notes found.', errors=str(e))


    def update_sticky_note(self, reqeust_dto: PutStickyNoteDto) -> object:
        sticky_notes = self.json_manager.load(self.sticky_notes_path)

        try:
            updated_sticky_note = self.manager.update(sticky_notes, reqeust_dto)
            self.json_manager.update(self.sticky_notes_path, sticky_notes)
            return updated_sticky_note
        except NotFoundException as e:
            raise e 


    def delete_sticky_note(self, id: str) -> None:
        sticky_notes = self.json_manager.load(self.sticky_notes_path)
        
        try:
            self.manager.delete(sticky_notes, id)
            self.json_manager.update(self.sticky_notes_path, sticky_notes)
        except NotFoundException as e:
            raise e 