from pydantic import BaseModel

class TemplateRequest(BaseModel):
    """
    - name (str): The name of the template.
    - content (str): The content of the template.
    """
    name: str
    content: str