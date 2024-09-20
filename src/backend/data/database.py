from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class Database:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    @staticmethod
    def get_db():
        """Provide a transactional scope around a series of operations."""
        db = Database.SessionLocal()
        try:
            yield db  
        except Exception as e:
            db.rollback()  
            raise
        finally:
            db.close()  