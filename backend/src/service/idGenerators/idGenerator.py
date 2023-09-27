import os


class IdGenerator:
    def __init__(self):
        self.path_to_id_file = os.getcwd() + "/storage/ID.txt"



    def id(self, component_name):
        """This function will generate a unique ID for the created component"""
        return self.__find_id(component_name)
        



    def __find_id(self, component_name):
        text_to_find = None

        # Using the component_name parameter to let the function know what 
        # piece of text to look for.
        if component_name == "Note":
            text_to_find = '-- Note'
        if component_name == 'Category':
            text_to_find = '-- Category'
        if component_name == 'Subcategory':
            text_to_find = '-- Subcategory'


        # Then the function will read the ID.txt file for the corrisponding text.
        with open(self.path_to_id_file, 'r') as file:
            lines = file.readlines()

        target_line = None
        for line in lines:
            if text_to_find in line:
                target_line = line.strip()
                break

        # The function will return it, if the corrisponding text is found.
        # Otherwise the function will return a error message.
        if target_line is not None:
            return self.__update_id(target_line, component_name)
        else:
            return '[ERROR] ID file is corrupted'
    


    def __update_id(self, found_text: str, component_name: str):
        updated_id = self.__increment_id(found_text)

        # read the file
        with open(self.path_to_id_file, 'r') as file:
            lines = file.readlines()


        for i, line in enumerate(lines):
            if found_text in line:
                # Update the line
                lines[i] = line.replace(found_text, f"-- {component_name} {updated_id}")
                break  

        # Write the modified line back to the file
        with open(self.path_to_id_file, 'w') as file:
            file.writelines(lines)
        return updated_id



    def __increment_id(self, found_text: str):
        # this function recieves a string that looks something like this
        # "-- Note 0" and takes the number, turns it into a Integer and increments it by one 
        id = int(found_text.split()[-1])
        id += 1
        return id