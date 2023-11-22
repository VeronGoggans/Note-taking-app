from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from backend.presentation.controller import note_controller
from backend.presentation.controller import folder_controller
from backend.presentation.controller import subfolder_controller
from backend.presentation.controller import password_controller

app = FastAPI()
app.include_router(folder_controller.route)
app.include_router(subfolder_controller.route)
app.include_router(note_controller.route)
app.include_router(password_controller.route)

# Setting up a FRONT-END page for the API
app.mount("/", StaticFiles(directory=".", html=True), name="static")