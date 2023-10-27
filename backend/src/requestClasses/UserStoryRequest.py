from pydantic import BaseModel

class UserStoryRequest(BaseModel):
    name: str
    priority: str
    estimated_time: str
    as_a_description: str
    i_want_description: str
    so_that_description: str