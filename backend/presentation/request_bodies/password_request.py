from pydantic import BaseModel

class PasswordRequest(BaseModel):
    password: str