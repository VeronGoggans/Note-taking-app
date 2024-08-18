from src.backend.domain.sticky_note import StickyNote
from src.backend.presentation.dtos.note_dtos import PostStickyNoteDto, PutStickyNoteDto
from src.backend.data.exceptions.exceptions import AdditionException, NotFoundException


class StickyNoteManager:    

    def add(self, sticky_notes: list, sticky_note: StickyNote):
        try:
            sticky_notes.append(sticky_note.__dict__)
            return sticky_note
        except Exception as e:
            raise AdditionException('An error occurred while adding the sticky note', errors={'exception': str(e)})


    def update(self, sticky_notes: list, request_dto: PutStickyNoteDto):
        for sticky_note in sticky_notes:
            if sticky_note['id'] == request_dto.sticky_note_id:
                updated_sticky_note = self.__update_entity(sticky_note, request_dto)
                return updated_sticky_note
        raise NotFoundException(f'Sticky note with id: {request_dto.sticky_note_id}, could not be found.')
    

    def delete(self, sticky_notes: list, sticky_note_id: str):
        for sticky_note in sticky_notes:
            if sticky_note['id'] == sticky_note_id:
                sticky_notes.remove(sticky_note)
                return sticky_note
        raise NotFoundException(f'Sticky note with id: {sticky_note_id}, could not be found.')    

    
    def __update_entity(self, current_note: dict, updated_note: PutStickyNoteDto):
        sticky_note = StickyNote.from_json(current_note)
        sticky_note.content = updated_note.content
        sticky_note.name = updated_note.name
        
        current_note['name'] = updated_note.name
        current_note['content'] = updated_note.content
        return sticky_note