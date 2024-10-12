from sqlalchemy.orm import Session
from sqlalchemy import func
from src.backend.data.models import Template
from src.backend.presentation.request_bodies.template_requests import *
from src.backend.data.exceptions.exceptions import *
from datetime import datetime


class TemplateManager:

    def add(self, template: Template, db: Session) -> Template:
        db.add(template)
        db.commit()
        db.refresh(template)
        return template


    def get_all(self, db: Session) -> None:
        recent, other = self.__get_top_5_most_recent_templates(db)
        uses = self.__get_total_uses(db)
        favorite_template = self.__get_most_used_template(db)

        if not recent:
            raise NoContentException('There are no templates yet.')
        return recent, other, uses, favorite_template
        

    def get_by_id(self, id: int, update_use_count: bool, db: Session) -> (Template | NotFoundException):
        template = self.__find_template(id, db)
        if update_use_count:
            template.uses = template.uses + 1
            db.commit()
            db.refresh(template)
        return template
    

    def get_all_names(self, db: Session) -> list[dict]:
        search_items = (
            db.query(Template.id, Template.name)
            .all() 
        )
        return [{"id": item.id, "name": item.name} for item in search_items]


    def update(self, id: int, name: str, content: str, db: Session) -> (Template | NotFoundException):
        template = self.__find_template(id, db)
        template.name = name
        template.content = content
        template.last_edit = datetime.now()
        db.commit()
        db.refresh(template)
        return template


    def delete(self, id: int, db: Session) -> (Template | NotFoundException):
        template = self.__find_template(id, db)
        db.delete(template)
        db.commit()
        return template


    def __find_template(self, id: int, db: Session) -> ( Template | NotFoundException):
        template = db.query(Template).filter(Template.id == id).first()

        if template is None:
            raise NotFoundException(f'Template with id {id} not found.')
        return template


    def __get_top_5_most_recent_templates(self, db: Session) -> list[Template]:
        # Get the top 5 most recently edited templates
        top_5_recent_templates = (
            db.query(Template)
            .order_by(Template.last_edit.desc())
            .limit(5)
            .all()
        )

        # Get all remaining templates, excluding the top 5
        remaining_templates = (
            db.query(Template)
            .filter(Template.id.notin_([t.id for t in top_5_recent_templates]))  # Exclude the top 5 by their IDs
            .order_by(Template.name.asc())  # Sort alphabetically by name or use another criteria
            .all()
        )
        return top_5_recent_templates, remaining_templates
    

    def __get_total_uses(self, db: Session) -> int:
        total_uses = db.query(func.sum(Template.uses)).scalar()
        return total_uses if total_uses is not None else 0
    

    def __get_most_used_template(self, db: Session) -> str:
        most_used_template = (
            db.query(Template)
            .order_by(Template.uses.desc())
            .first()
        )

        if most_used_template:
            return most_used_template.name
        return "No templates found."
