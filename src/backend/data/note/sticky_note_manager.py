from src.backend.domain.sticky_note import StickyNote
from src.backend.presentation.dtos.note_dtos import PutStickyNoteDto
from src.backend.data.exceptions.exceptions import AdditionException, NotFoundException


class StickyNoteManager:    

    def add(self, sticky_notes: list, sticky_note: StickyNote) -> (StickyNote | AdditionException):
        try:
            sticky_notes.append(sticky_note.__dict__)
            return sticky_note
        except Exception as e:
            raise AdditionException('An error occurred while adding the sticky note', errors={'exception': str(e)})


    def update(self, sticky_notes: list, request_dto: PutStickyNoteDto) -> (dict | NotFoundException):
        for sticky_note in sticky_notes:
            if sticky_note['id'] == request_dto.id:
                return self.__update_entity(sticky_note, request_dto)
        raise NotFoundException(f'Sticky note with id: {request_dto.id}, could not be found.')
    

    def delete(self, sticky_notes: list, id: str) -> (dict | NotFoundException):
        for sticky_note in sticky_notes:
            if sticky_note['id'] == id:
                sticky_notes.remove(sticky_note)
                return sticky_note
        raise NotFoundException(f'Sticky note with id: {id}, could not be found.')    

    
    def __update_entity(self, current_note: dict, updated_note: PutStickyNoteDto) -> StickyNote:
        sticky_note = StickyNote.from_json(current_note)
        sticky_note.content = updated_note.content
        sticky_note.name = updated_note.name
        
        current_note['name'] = updated_note.name
        current_note['content'] = updated_note.content
        return sticky_note