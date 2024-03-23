from pydantic import BaseModel

class PutEditorPageStyleRequest(BaseModel):
    style: str
