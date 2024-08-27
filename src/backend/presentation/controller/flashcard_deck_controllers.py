from fastapi import APIRouter
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.flashcard_deck_service import FlashcardDeckService
from src.backend.data.flashcard.flashcard_deck_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard_requests import PostDeckRequest, PutDeckRequest
from src.backend.presentation.request_bodies.flashcard_requests import PostFlashcardRequest
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO
from src.backend.presentation.decorators.controller_decorators import exception_handler


class FlashcardDeckRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = FlashcardDeckService(FlashcardDeckManager(), json_manager)

        self.route.add_api_route('/deck/{id}', self.get_deck_by_id, methods=['GET'])
        self.route.add_api_route('/deckSearchItems', self.get_search_items, methods=['GET'])
        self.route.add_api_route('/decks', self.get_all_decks, methods=['GET'])
        self.route.add_api_route('/randomDecks', self.get_5_random_decks, methods=['GET'])
        self.route.add_api_route('/deck', self.add_deck, methods=['POST'])
        self.route.add_api_route('/deck', self.update_deck, methods=['PUT'])
        self.route.add_api_route('/deck/{id}', self.delete_deck, methods=['DELETE'])


    @exception_handler
    def add_deck(self, request: PostDeckRequest): 
        flashcards = self.__request_to_dto(request.flashcards)
        new_deck = self.service.add_deck(request.name, flashcards)
        return {"status": 'succes', 'deck': new_deck}, HttpStatus.OK


    @exception_handler
    def get_deck_by_id(self, id: str):
        deck = self.service.get_deck_by_id(id)
        return {'status': 'succes', "deck": deck}, HttpStatus.OK
        

    @exception_handler
    def get_all_decks(self):
        all_decks, misc = self.service.get_all_decks()
        return {'status': 'succes', 'decks': all_decks, 'misc': misc}, HttpStatus.OK
        

    @exception_handler
    def get_search_items(self):
        search_items = self.service.get_search_items()
        return {'status': 'succes', 'items': search_items}, HttpStatus.OK
        

    @exception_handler
    def get_5_random_decks(self):
        random_decks = self.service.get_random_decks()
        return {'status': 'succes', 'decks': random_decks}, HttpStatus.OK
        

    @exception_handler
    def update_deck(self, request: PutDeckRequest):
        self.service.update_deck(request)
        return {'status': 'succes'}, HttpStatus.OK
        

    @exception_handler
    def delete_deck(self, id: str):
        deck = self.service.delete_deck(id)
        return {"status": 'succes', 'deck': deck}, HttpStatus.OK
        

    def __request_to_dto(self, flashcards: list[PostFlashcardRequest]):
        return [PostFlashcardDTO(card.term, card.description) for card in flashcards]