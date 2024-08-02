from dataclasses import dataclass

@dataclass
class PostTemplateDto:
    name: str
    content: str


@dataclass
class PutTemplateDto:
    template_id: str
    name: str
    content: str