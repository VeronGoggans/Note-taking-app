from pydantic import BaseModel

class ProjectByIdRequest(BaseModel):
    relevant_data: list