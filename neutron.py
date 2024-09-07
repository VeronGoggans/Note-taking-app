import socket
import threading
import uvicorn
import webview
import requests
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from os import getcwd
from src.backend.presentation.controller.note_controller import NoteRouter
from src.backend.presentation.controller.template_controller import TemplateRouter
from src.backend.presentation.controller.flashcard_deck_controllers import FlashcardDeckRouter
from src.backend.presentation.controller.flashcard_controller import FlashcardRouter
from src.backend.presentation.controller.folder_controller import FolderRouter
from src.backend.presentation.controller.sticky_note_controller import StickyNoteRouter
from src.backend.presentation.controller.taskboard_controller import TaskboardRouter
from src.backend.presentation.controller.setting_controller import SettingRouter
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
app.mount("/", StaticFiles(directory=f"{getcwd()}.", html=True), name="static")
# Find an available port dynamically
def find_available_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))  # Bind to port 0 to let the OS choose an available port
        return s.getsockname()[1]  # Get the port number chosen by the OS

port = find_available_port()

def run_server():
    uvicorn.run(app, host="127.0.0.1", port=port)

# Start FastAPI server in a separate thread
server_thread = threading.Thread(target=run_server)
server_thread.start()

# Wait for the server to start
# You can implement more sophisticated waiting logic here if needed
while True:
    try:
        response = requests.get(f"http://127.0.0.1:{port}/docs")
        if response.status_code == 200:
            break
    except Exception:
        pass

# Open the webview window
webview.create_window(
    "Neutron", 
    f"http://127.0.0.1:{port}", 
    width=1400, 
    height=800,
    min_size=(850, 400),
)

# Run the pywebview event loop
webview.start()
