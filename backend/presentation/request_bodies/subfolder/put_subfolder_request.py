from pydantic import BaseModel

class PutSubfolderRequest(BaseModel):
    subfolder_id: str
    name: str
    color: str
