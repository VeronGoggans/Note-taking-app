from fastapi import APIRouter
from src.backend.domain.enums.responseMessages import Status
from src.backend.application.flashcard_service import FlashcardService
from src.backend.data.flashcard.flashcard_manager import FlashcardManager


class FlashcardRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = FlashcardService(FlashcardManager(), json_manager)

        self.route.add_api_route('/flashcard_set/{id}', self.get_flashcard_by_id, methods=['GET'])


    def get_flashcard_by_id(self, id: str):
        response = self.service.get_flashcard_by_id(id)
        if response != Status.NOT_FOUND:
            return {"Status_code": Status.OK, "FlashcardSet": response}
        return {"Status_code": Status.NOT_FOUND, "FlashcardSet": None}