from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from src.backend.presentation.controller.note_controller import NoteRouter
from src.backend.presentation.controller.template_controller import TemplateRouter
from src.backend.presentation.controller.folder_controller import FolderRouter
from src.backend.presentation.controller.subfolder_controller import SubfolderRouter
from src.backend.presentation.controller.setting_controller import SettingRouter
from src.backend.data.file.json_manager import JsonManager

app = FastAPI()
json_manager = JsonManager()
note_router = NoteRouter(json_manager)
template_router = TemplateRouter(json_manager)
folder_router = FolderRouter(json_manager)
subfolder_router = SubfolderRouter(json_manager)
theme_router = SettingRouter(json_manager)

app.include_router(folder_router.route)
app.include_router(subfolder_router.route)
app.include_router(note_router.route)
app.include_router(template_router.route)
app.include_router(theme_router.route)

# Setting up a FRONT-END page for the API
app.mount("/", StaticFiles(directory=".", html=True), name="static")