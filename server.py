from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from backend.presentation.controller.note_controller import NoteRouter
from backend.presentation.controller.folder_controller import FolderRouter
from backend.presentation.controller.subfolder_controller import SubfolderRouter
from backend.data.file.json_manager import JsonManager

app = FastAPI()
json_manager = JsonManager()
note_router = NoteRouter(json_manager)
folder_router = FolderRouter(json_manager)
subfolder_router = SubfolderRouter(json_manager)

app.include_router(folder_router.route)
app.include_router(subfolder_router.route)
app.include_router(note_router.route)

# Setting up a FRONT-END page for the API
app.mount("/", StaticFiles(directory=".", html=True), name="static")