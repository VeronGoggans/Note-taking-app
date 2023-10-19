from pydantic import BaseModel

class ProjectRequest(BaseModel):
    name: str
    description:str