from fastapi import APIRouter
from src.backend.domain.enums.responseMessages import Status
from src.backend.application.flashcard_service import FlashcardService
from src.backend.data.flashcard.flashcard_deck_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard.post_deck_request import PostDeckRequest


class FlashcardRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = FlashcardService(FlashcardDeckManager(), json_manager)

        self.route.add_api_route('/deck/{id}', self.get_flashcard_by_id, methods=['GET'])
        self.route.add_api_route('/decks', self.get_all_decks, methods=['GET'])
        self.route.add_api_route('/deck', self.add_deck, methods=['POST'])


    def get_flashcard_by_id(self, id: str):
        response = self.service.get_flashcard_by_id(id)
        if response != Status.NOT_FOUND:
            return {"Status_code": Status.OK, "FlashcardSet": response}
        return {"Status_code": Status.NOT_FOUND, "FlashcardSet": None}
    

    def get_all_decks(self):
        response = self.service.get_all_decks()
        if response != Status.NOT_FOUND:
            return {"Status_code": Status.OK, 'Decks': response}
        return {"Status_code": Status.NOT_FOUND, 'Decks': None}
    

    def add_deck(self, post_deck_request: PostDeckRequest): 
        response = self.service.add_deck(post_deck_request)
        if response != Status.NOT_FOUND:
            return {"Status_code": Status.OK, 'Decks': response}
        return {"Status_code": Status.NOT_FOUND, 'Decks': None}