from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from src.backend.presentation.routers.note_router import NoteRouter
from src.backend.presentation.routers.template_router import TemplateRouter
from src.backend.presentation.routers.flashcard_deck_router import FlashcardDeckRouter
from src.backend.presentation.routers.flashcard_router import FlashcardRouter
from src.backend.presentation.routers.folder_router import FolderRouter
from src.backend.presentation.routers.sticky_note_router import StickyNoteRouter
from src.backend.presentation.routers.taskboard_router import TaskboardRouter
from src.backend.presentation.routers.setting_router import SettingRouter
from src.backend.data.file.json_manager import JsonManager

app = FastAPI()
json_manager = JsonManager()
note_router = NoteRouter(json_manager)
template_router = TemplateRouter(json_manager)
flashcard_deck_router = FlashcardDeckRouter(json_manager)
flashcard_router = FlashcardRouter(json_manager)
folder_router = FolderRouter(json_manager)
sticky_note_router = StickyNoteRouter(json_manager)
taskboard_router = TaskboardRouter(json_manager)
theme_router = SettingRouter(json_manager)

app.include_router(folder_router.route)
app.include_router(note_router.route)
app.include_router(template_router.route)
app.include_router(flashcard_deck_router.route)
app.include_router(flashcard_router.route)
app.include_router(sticky_note_router.route)
app.include_router(taskboard_router.route)
app.include_router(theme_router.route)

# Setting up a FRONT-END page for the API
app.mount("/", StaticFiles(directory=".", html=True), name="static")