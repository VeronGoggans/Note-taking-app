import os 
from backend.src.service.enums.responseMessages import RespMsg
from backend.src.service.fileOperations.JsonOperations import Json
from backend.src.service.idGenerators.idGenerator import IdGenerator
from backend.src.domains.projectDomain.boardTask import BoardTask
from backend.src.requestClasses.BoardTaskRequest import BoardTaskRequest

class ProjectTaskData():
    def __init__(self) -> None:
        self.projects_path = os.getcwd() + '/storage/json/projects.json'


    def add(self, project_id: int, task_data: BoardTaskRequest) -> [BoardTask, RespMsg]:
        """
        Add a task to the given board section in a project.

        Args:
            project_id (int): The identifier of the project to which the task will be added.
            task_data (BoardTaskRequest): Task data containing all necessary information for a BoardTask object.

        Returns:
            Union[BoardTask, RespMsg]: The added BoardTask object if successful, or a RespMsg indicating the outcome.
        """
        data = Json.load_json_file(self.projects_path)
        task: BoardTask = self.__create_task_object(task_data)
        for project in data['projects']:
            if project['id'] == project_id:
                project[task.board_section].append(task.__dict__)
                Json.update_json_file(self.projects_path, data)
                return task
        return RespMsg.NOT_FOUND


    def get(self, project_id: int) -> [dict[str, list[BoardTask]], RespMsg]:
        """
        Retrieve all tasks from a project.

        Args:
            project_id (int): The identifier of the project to retrieve tasks from.

        Returns:
            Union[Dict[str, List[BoardTask]], RespMsg]: A dictionary containing tasks organized by board section
            or a RespMsg indicating the outcome. The dictionary structure is as follows:
            {
                "To Do": List[BoardTask],
                "Doing": List[BoardTask],
                "Testing": List[BoardTask],
                "Done": List[BoardTask]
            }
        """
        tasks = {
            "To Do": None,
            "Doing": None,
            "Testing": None,
            "Done": None
        }
        data = Json.load_json_file(self.projects_path)
        for project in data['projects']:
            if project['id'] == project_id:
                tasks['To Do'] = project['To Do']
                tasks['Doing'] = project['Doing']
                tasks['Testing'] = project['Testing']
                tasks['Done'] = project['Done']
                return tasks
        return RespMsg.NOT_FOUND
    

    def get_by_id(self, project_id: int, task_id: int) -> [dict, RespMsg]:
        """
        Retrieve a task within a project by its unique identifier.

        Args:
            project_id (int): The identifier of the project in which to search for the task.
            task_id (int): The unique identifier of the task to retrieve.

        Returns:
            Union[dict, RespMsg]: A dictionary representing the task if found, or a RespMsg indicating the outcome.
            Possible values for RespMsg include RespMsg.NOT_FOUND if the project or task is not found.
        """
        data = Json.load_json_file(self.projects_path)
        for project in data['projects']:
            if project['id'] == project_id:
                for board_section in ['To Do', 'Doing', 'Testing', 'Done']:
                    for task in project[board_section]:
                        if task['id'] == task_id:
                            return task
                return RespMsg.NOT_FOUND
        return RespMsg.NOT_FOUND


    def update(self, project_id: int, task_id: int, task_data: BoardTaskRequest) -> RespMsg:
        """
        Update a task within a project.

        Args:
            project_id (int): The identifier of the project to which the task belongs.
            task_id (int): The identifier of the task to update.
            task_data (BoardTaskRequest): Updated task data.

        Returns:
            RespMsg: A response message indicating the outcome of the task update. Possible values include RespMsg.OK
            if the task is successfully updated, or RespMsg.NOT_FOUND if the project or task is not found. 
            Additionally, it may return the result of the self.__move_task() method if the task is moved to a different section.
        """
        data = Json.load_json_file(self.projects_path)
        current_task: dict = self.get_by_id(project_id, task_id)
        updated_task: BoardTask = self.__construct_task_object(task_id, task_data)

        if current_task['board_section'] != updated_task.board_section:
            return self.__move_task(project_id, current_task, updated_task)

        for project in data['projects']:
            if project['id'] == project_id:
                for task in project[current_task['board_section']]:
                    if task['id'] == task_id:
                        updated_task = self.__update_task(task, task_data)
                        Json.update_json_file(self.projects_path, data)
                        return updated_task
                return RespMsg.NOT_FOUND
        return RespMsg.NOT_FOUND
        

    def delete(self, project_id: int, task_id: int, board_section: str) -> RespMsg:
        """
        Delete a task from a project.

        Args:
            project_id (int): The identifier of the project to which the task belongs.
            task_id (int): The identifier of the task to be deleted.
            board_section (str): The board section where the task is located.

        Returns:
            RespMsg: A response message indicating the outcome of the task deletion. Possible values include RespMsg.OK
            if the task is successfully deleted or RespMsg.NOT_FOUND if the project or task is not found.
        """
        data = Json.load_json_file(self.projects_path)
        for project in data['projects']:
            if project['id'] == project_id:
                for task in project[board_section]:
                    if task['id'] == task_id:
                        project[board_section].remove(task)
                        Json.update_json_file(self.projects_path, data)
                        return RespMsg.OK
                return RespMsg.NOT_FOUND
        return RespMsg.NOT_FOUND   
    

    def __move_task(self, project_id: int, current_task: dict, updated_task: BoardTask) -> RespMsg:
        self.delete(project_id, current_task['id'], current_task['board_section'])
        data = Json.load_json_file(self.projects_path)
        for project in data['projects']:
            if project['id'] == project_id:
                project[updated_task.board_section].append(updated_task.__dict__)
                Json.update_json_file(self.projects_path, data)
                return RespMsg.OK
        return RespMsg.NOT_FOUND


    def __update_task(self, current_task: dict, new_task: BoardTaskRequest):
        current_task['name'] = new_task.name
        current_task['description'] = new_task.description
        current_task['estimated_time'] = new_task.estimated_time
        current_task['due_date'] = new_task.due_date
        current_task['priority'] = new_task.priority
        return current_task


    def __create_task_object(self, task_data: BoardTaskRequest) -> BoardTask:
        """
        Create a BoardTask object.

        Args:
            task_data (BoardTaskRequest): Data containing all the information required for creating a BoardTask object.

        Returns:
            BoardTask: The newly created BoardTask object, with an auto-generated ID.
        """
        id = IdGenerator.ID('boardTask')
        return BoardTask(
            id, 
            task_data.name, 
            task_data.description,
            task_data.estimated_time,
            task_data.due_date,
            task_data.priority,
            task_data.board_section
            )
    
    def __construct_task_object(self, task_id: int, task_data: BoardTaskRequest) -> BoardTask:
        return BoardTask(
            task_id,
            task_data.name, 
            task_data.description,
            task_data.estimated_time,
            task_data.due_date,
            task_data.priority,
            task_data.board_section
        )