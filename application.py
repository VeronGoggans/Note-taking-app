import threading
import uvicorn
import webview
import requests
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


def run_server():
    uvicorn.run(app, host="127.0.0.1", port=8000)

# Start FastAPI server in a separate thread
server_thread = threading.Thread(target=run_server)
server_thread.start()

# Wait for the server to start
# You can implement more sophisticated waiting logic here if needed
while True:
    try:
        response = requests.get("http://127.0.0.1:8000/docs")
        if response.status_code == 200:
            break
    except Exception:
        pass

# Open the webview window
webview.create_window(
    "Note", 
    "http://127.0.0.1:8000", 
    width=800, 
    height=600,
    min_size=(650, 400),
    
    )

# Run the pywebview event loop
webview.start()