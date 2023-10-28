import os
from backend.src.service.fileOperations.JsonOperations import Json
from backend.src.requestClasses.UserStoryRequest import UserStoryRequest
from backend.src.domains.projectDomain.UserStory import UserStory
from backend.src.service.idGenerators.idGenerator import IdGenerator
from backend.src.service.enums.responseMessages import RespMsg


class UserStoryData():
    def __init__(self):
        self.projects_path = os.getcwd() + '/storage/json/projects.json'


    def add(self, project_id: int, user_story_data: UserStoryRequest) -> [dict, RespMsg]:
        """
        Add a User Story to a project's user stories.

        Args:
            project_id (int): The identifier of the project to which the User Story will be added.
            user_story_data (UserStoryRequest): Data containing information to create the User Story.

        Returns:
            Union[dict, RespMsg]: The added User Story if successful, or a RespMsg indicating the outcome.
            - If successful, it returns the added User Story.
            - If not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.projects_path)
        user_story: UserStory = self.__construct_user_story_object(user_story_data)

        for project in data['projects']:
            if project['id'] == project_id:
                project['user_stories'].append(user_story.__dict__)
                Json.update_json_file(self.projects_path, data)
                return user_story
        return RespMsg.NOT_FOUND
        

    def get(self, project_id: int) -> [list[dict], RespMsg]:
        """
        Retrieve the user stories of a project.

        Args:
            project_id (int): The identifier of the project for which to retrieve the user stories from.

        Returns:
            Union[List[dict], RespMsg]: A list of user stories as dictionaries if found, or a RespMsg indicating the outcome.
            - If found, it returns a list of user stories as dictionaries.
            - If not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.projects_path)
        
        for project in data['projects']:
            if project['id'] == project_id:
                return project['user_stories']
        return RespMsg.NOT_FOUND


    def get_by_id(self, project_id: int, user_story_id: int) -> [dict, RespMsg]:
        """
        Retrieve a specific User Story from a project's user stories by its unique identifier.

        Args:
            project_id (int): The identifier of the project to search for the User Story.
            user_story_id (int): The unique identifier of the User Story to retrieve.

        Returns:
            Union[dict, RespMsg]: The requested User Story as a dictionary if found, or a RespMsg indicating the outcome.
            - If found, it returns the specific User Story as a dictionary.
            - If not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.projects_path)
        
        for project in data['projects']:
            if project['id'] == project_id:
                for user_story in project['user_stories']:
                    if user_story['id'] == user_story_id:
                        return user_story
                return RespMsg.NOT_FOUND
        return RespMsg.NOT_FOUND


    def update(self, project_id: int, user_story_id: int, story_data: UserStoryRequest) -> [dict, RespMsg]:
        """
        Update a specific User Story in a project's user stories.

        Args:
            project_id (int): The identifier of the project to which the User Story belongs.
            user_story_id (int): The unique identifier of the User Story to update.
            story_data (UserStoryRequest): Updated data for the User Story.

        Returns:
            Union[dict, RespMsg]: The updated User Story as a dictionary if successful, or a RespMsg indicating the outcome.
            - If successful, it returns the updated User Story as a dictionary.
            - If not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.projects_path)
        
        for project in data['projects']:
            if project['id'] == project_id:
                for user_story in project['user_stories']:
                    if user_story['id'] == user_story_id:
                        updated_user_story = self.__update_item(user_story, story_data)
                        Json.update_json_file(self.projects_path, data)
                        return updated_user_story
                return RespMsg.NOT_FOUND
        return RespMsg.NOT_FOUND


    def delete(self, project_id: int, user_story_id: int) -> RespMsg:
        """
        Delete a specific User Story from a project's user stories.

        Args:
            project_id (int): The identifier of the project from which to remove the User Story.
            user_story_id (int): The unique identifier of the User Story to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the deletion.
            - If the deletion is successful, it returns RespMsg.OK.
            - If the User Story or project is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.projects_path)
        
        for project in data['projects']:
            if project['id'] == project_id:
                for user_story in project['user_stories']:
                    if user_story['id'] == user_story_id:
                        project['user_stories'].remove(user_story)
                        Json.update_json_file(self.projects_path, data)
                        return RespMsg.OK
                return RespMsg.NOT_FOUND
        return RespMsg.NOT_FOUND


    def __construct_user_story_object(self, user_story_data: UserStoryRequest) -> UserStory:
        """
        Construct a User Story object based on the provided data.

        Args:
            user_story_data (UserStoryRequest): Data containing information to create the User Story.

        Returns:
            UserStory: A newly constructed User Story object with the provided data.
        """
        id = IdGenerator.ID('userStory')
        return UserStory(id, user_story_data.name, user_story_data.priority, 
                         user_story_data.estimated_time, user_story_data.as_a_description, 
                         user_story_data.i_want_description, user_story_data.so_that_description)
    

    def __update_item(self, current_user_story: dict, new_user_story: UserStoryRequest) -> dict:
        current_user_story['name'] = new_user_story.name
        current_user_story['priority'] = new_user_story.priority
        current_user_story['estimated_time'] = new_user_story.estimated_time
        current_user_story['as_a_description'] = new_user_story.as_a_description
        current_user_story['i_want_description'] = new_user_story.i_want_description
        current_user_story['so_that_description'] = new_user_story.so_that_description
        return current_user_story