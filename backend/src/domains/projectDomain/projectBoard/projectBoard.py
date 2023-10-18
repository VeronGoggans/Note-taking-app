from backend.src.domains.projectDomain.projectBoard.todoBoardSection import TodoBoardSection
from backend.src.domains.projectDomain.projectBoard.doingBoardSection import DoingBoardSection
from backend.src.domains.projectDomain.projectBoard.testingBoardSection import TestingBoardSection
from backend.src.domains.projectDomain.projectBoard.doneBoardSection import DoneBoardSection

class ProjectBoard():
    def __init__(self):
        self.todo_board = TodoBoardSection()
        self.doing_board = DoingBoardSection()
        self.testing_board = TestingBoardSection()
        self.done_board = DoneBoardSection()

    def to_dict(self):
        return {
            'todo_board': self.todo_board.to_dict(),
            'doing_board': self.doing_board.to_dict(),
            'testing_board': self.testing_board.to_dict(),
            'done_board': self.done_board.to_dict()
        }
        
