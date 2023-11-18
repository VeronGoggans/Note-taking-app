from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from backend.presentation.controller import NoteController
from backend.presentation.controller import DirectoryController
from backend.presentation.controller import SubDirectoryController

app = FastAPI()
app.include_router(DirectoryController.route)
app.include_router(SubDirectoryController.route)
app.include_router(NoteController.route)

# Setting up a FRONT-END page for the API
app.mount("/", StaticFiles(directory=".", html=True), name="static")