from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from backend.routes import NoteRoute
from backend.routes import DirectoryRoute
from backend.routes import SubDirectoryRoute
from backend.routes import DirectoryNoteRoute

app = FastAPI()
app.include_router(NoteRoute.route)
app.include_router(DirectoryRoute.route)
app.include_router(SubDirectoryRoute.route)
app.include_router(DirectoryNoteRoute.route)

# Setting up a FRONT-END page for the API
app.mount("/", StaticFiles(directory=".", html=True), name="static")


# @app.post('/notePassword/{id}/{password}/{parent}')
# def note_password(id: int, password: str, parent: bool):
#     hashed_password = Hash.hash(password)
#     response = notes_password_dto.add_note_password(id, hashed_password, parent)
#     if response != RespMsg.INTERAL_SERVER_ERROR:
#         return {'status_code': response}
#     return {"status_code": RespMsg.INTERAL_SERVER_ERROR} 



# #____________________________________ [NOTES] DELETE ENDPOINTS ____________________________________


# @app.delete('/notePassword/{id}/{parent}')
# def note_password(id: int, parent: bool):
#     response = notes_password_dto.delete_note_password(id, parent)
#     if response != RespMsg.INTERAL_SERVER_ERROR:
#         return {'status_code': response}
#     return {"status_code": RespMsg.INTERAL_SERVER_ERROR} 



# #____________________________________ [NOTES] UPDATE ENDPOINTS ____________________________________


# @app.put('/noteLocation/{note_id}/{category_id}/{parent}')
# def noteLocation(note_id: int, category_id: int, parent: bool):
#     response = notes_dto.update_note_category(note_id, category_id, parent)
#     if response != RespMsg.INTERAL_SERVER_ERROR:
#         return {'status_code': response}
#     return {'status_code': RespMsg.INTERAL_SERVER_ERROR}