from sqlalchemy import create_engine, Column, String, Integer, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from src.backend.util.calendar import Calendar

Base = declarative_base()

# Folders table (top-level folders)
class Folder(Base):
    __tablename__ = 'folders'
    
    id = Column(Integer, primary_key=True, autoincrement=True) 
    name = Column(String, nullable=False)
    color = Column(String, nullable=True, default='rgb(255, 255, 255)')
    last_visit = Column(String, nullable=False, default=Calendar.datetime(precise=True))
    
    # Self-referential foreign key
    parent_id = Column(Integer, ForeignKey('folders.id', ondelete='CASCADE'), nullable=True)

    # One-to-many relationships
    subfolders = relationship("Folder", backref=backref("parent_folder", remote_side=[id]), cascade="all, delete-orphan")
    notes = relationship("Note", backref="folder", cascade="all, delete-orphan")




# Notes table (can belong to either a folder or a subfolder)
class Note(Base):
    __tablename__ = 'notes'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    content = Column(String, nullable=True)
    bookmark = Column(Boolean, default=False)
    last_edit = Column(String, nullable=False, default=Calendar.datetime())
    creation = Column(String, nullable=False, default=Calendar.date())
    
    # Foreign keys for folder or subfolder
    folder_id = Column(Integer, ForeignKey('folders.id', ondelete='CASCADE'), nullable=True)




class StickyNote(Base):
    __tablename__ = 'sticky_notes'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=True)
    content = Column(String, nullable=True)




class Template(Base):
    __tablename__ = 'templates'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=True)
    content = Column(String, nullable=True)
    last_edit = Column(String, nullable=False, default=Calendar.datetime())
    creation = Column(String, nullable=False, default=Calendar.date())
    uses = Column(Integer, default=0)




class Taskboard(Base):
    __tablename__ = 'taskboards'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=True)
    description = Column(String, nullable=True)
    board_sections = Column(JSON, default=['todo', 'inprogress', 'done'])

    tasks = relationship("Task", backref="parent_taskboard", cascade="all, delete-orphan")



class Task(Base):
    __tablename__ = 'tasks'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=True)
    description = Column(String, nullable=True)
    due_date = Column(String, nullable=True)
    section = Column(String, nullable=False, default='todo')

    # Foreign keys for folder or subfolder
    taskboard_id = Column(Integer, ForeignKey('taskboards.id', ondelete='CASCADE'), nullable=True)




class FlashcardSet(Base):
    __tablename__ = 'flashcard_sets'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=True)
    last_study = Column(String, nullable=False, default='Not studied yet.')

    flashcards = relationship("Flashcard", backref="parent_flashcard_set", cascade="all, delete-orphan")




class Flashcard(Base):
    __tablename__ = 'flashcards'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    term = Column(String, nullable=True)
    description = Column(String, nullable=True)
    rating = Column(String, nullable=False, default='idle')

    # Foreign keys for folder or subfolder
    flascard_set_id = Column(Integer, ForeignKey('flashcard_sets.id', ondelete='CASCADE'), nullable=True)



## Maybe sometime in the future. ##

# class NoteBook(Base):
#     __tablename__ = 'notebooks'
    
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     name = Column(String, nullable=True)
#     description = Column(String, nullable=True)