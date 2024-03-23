from pydantic import BaseModel

class PutThemeRequest(BaseModel):
    theme: str
