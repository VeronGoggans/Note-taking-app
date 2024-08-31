class FolderStructure:
    @staticmethod
    def find_note_location(folders: list, note_id: str):
        """
        Given a note_id, this function returns a list of dictionaries 
        containing the ids and names of its parent folders up to the note's folder,
        including the note itself as the last item.

        :param folders: List of dictionaries representing the folder structure.
        :param note_id: The note ID to search for.
        :return: List of dictionaries with 'id' and 'name' of parent folders leading to the note's folder and the note itself.
        """

        def traverse_folders_for_note(folders, note_id, path):
            for folder in folders:
                # Create a copy of the current path and add the current folder's id and name
                current_path = path.copy()
                current_path.append({'id': folder["id"], 'name': folder["name"]})

                # Check if the note is directly within this folder
                notes = folder.get("notes", [])
                for note in notes:
                    if note["id"] == note_id:
                        # If the target note is found, append it to the current path and return
                        current_path.append({'id': note["id"], 'name': note["name"]})
                        return current_path
                
                # Check in subfolders recursively
                subfolders = folder.get("subfolders", [])
                if subfolders:
                    result = traverse_folders_for_note(subfolders, note_id, current_path)
                    if result:
                        return result
            
            # Return None if the note_id is not found in this branch
            return None

        # Start traversal from the root level with an empty path
        return traverse_folders_for_note(folders, note_id, [{'id': 'f-1', 'name': 'Home'}])

# Example usage
data = [
    {
        "id": "f-1",
        "name": "Home",
        "color": "rgb(255, 255, 255)",
        "last_visit": "31/08/2024 23:56:42",
        "notes": [],
        "subfolders": []
    },
    {
        "id": "f-99",
        "name": "School",
        "color": "rgb(217, 237, 255)",
        "last_visit": "31/08/2024 23:56:58",
        "notes": [],
        "subfolders": [
            {
                "id": "s-191",
                "name": "Year 2",
                "color": "rgb(255, 255, 255)",
                "last_visit": "31/08/2024 23:18:36",
                "notes": [],
                "subfolders": [
                    {
                        "id": "s-181",
                        "name": "Software Architecture",
                        "color": "rgb(255, 255, 255)",
                        "last_visit": "31/08/2024 23:17:27",
                        "notes": [
                            {
                                "id": "n-589",
                                "name": "Compliance Checking",
                                "content": "storage/notes/note-n-589.txt",
                                "bookmark": False,
                                "last_edit": "27/06/2024 17:54",
                                "creation": "14/05/2024"
                            },
                            {
                                "id": "n-590",
                                "name": "Compliant engineering",
                                "content": "storage/notes/note-n-590.txt",
                                "bookmark": False,
                                "last_edit": "27/08/2024 15:59",
                                "creation": "14/05/2024"
                            },
                            {
                                "id": "n-625",
                                "name": "Intro to Software Architecture",
                                "content": "storage/notes/note-n-625.txt",
                                "bookmark": False,
                                "last_edit": "29/08/2024 17:10",
                                "creation": "03/06/2024"
                            },
                            {
                                "id": "n-626",
                                "name": "Packages and Dependencies",
                                "content": "storage/notes/note-n-626.txt",
                                "bookmark": False,
                                "last_edit": "22/08/2024 21:59",
                                "creation": "03/06/2024"
                            },
                            {
                                "id": "n-627",
                                "name": "Logical Components",
                                "content": "storage/notes/note-n-627.txt",
                                "bookmark": False,
                                "last_edit": "26/06/2024 18:05",
                                "creation": "03/06/2024"
                            },
                            {
                                "id": "n-628",
                                "name": "Logical Layers",
                                "content": "storage/notes/note-n-628.txt",
                                "bookmark": False,
                                "last_edit": "29/08/2024 17:10",
                                "creation": "03/06/2024"
                            },
                            {
                                "id": "n-629",
                                "name": "Software Architecture Reconstruction",
                                "content": "storage/notes/note-n-629.txt",
                                "bookmark": False,
                                "last_edit": "26/06/2024 18:07",
                                "creation": "03/06/2024"
                            },
                            {
                                "id": "n-630",
                                "name": "Architecture Activities",
                                "content": "storage/notes/note-n-630.txt",
                                "bookmark": False,
                                "last_edit": "12/08/2024 17:01",
                                "creation": "03/06/2024"
                            }
                        ],
                        "subfolders": []
                    },
                    {
                        "id": "s-183",
                        "name": "CISC1",
                        "color": "rgb(255, 255, 255)",
                        "last_visit": "30/08/2024 22:08:12",
                        "notes": [
                            {
                                "id": "n-466",
                                "name": "CICQ1 exam summary",
                                "content": "storage/notes/note-n-466.txt",
                                "bookmark": False,
                                "last_edit": "27/07/2024 20:03",
                                "creation": "20/03/2024"
                            }
                        ],
                        "subfolders": []
                    },
                    {
                        "id": "s-182",
                        "name": "CISC2",
                        "color": "rgb(255, 255, 255)",
                        "last_visit": "31/08/2024 23:18:35",
                        "notes": [
                            {
                                "id": "n-609",
                                "name": "Maintainability",
                                "content": "storage/notes/note-n-609.txt",
                                "bookmark": False,
                                "last_edit": "27/08/2024 16:00",
                                "creation": "30/05/2024"
                            },
                            {
                                "id": "n-610",
                                "name": "Static analysis en metrics",
                                "content": "storage/notes/note-n-610.txt",
                                "bookmark": False,
                                "last_edit": "10/07/2024 19:49",
                                "creation": "30/05/2024"
                            },
                            {
                                "id": "n-611",
                                "name": "Declarative Code",
                                "content": "storage/notes/note-n-611.txt",
                                "bookmark": False,
                                "last_edit": "17/08/2024 13:46",
                                "creation": "30/05/2024"
                            },
                            {
                                "id": "n-612",
                                "name": "Authentication & Authorization",
                                "content": "storage/notes/note-n-612.txt",
                                "bookmark": False,
                                "last_edit": "27/08/2024 16:00",
                                "creation": "30/05/2024"
                            },
                            {
                                "id": "n-613",
                                "name": "Websecurity & Web Performance",
                                "content": "storage/notes/note-n-613.txt",
                                "bookmark": False,
                                "last_edit": "28/08/2024 23:49",
                                "creation": "30/05/2024"
                            },
                            {
                                "id": "n-615",
                                "name": "Operations",
                                "content": "storage/notes/note-n-615.txt",
                                "bookmark": False,
                                "last_edit": "08/08/2024 15:34",
                                "creation": "30/05/2024"
                            }
                        ],
                        "subfolders": []
                    }
                ]
            },
            {
                "id": "s-192",
                "name": "Year 3",
                "color": "rgb(255, 255, 255)",
                "last_visit": "31/08/2024 23:56:59",
                "notes": [
                    {
                        "id": "n-780",
                        "name": "Kkr bot 2",
                        "content": "storage/notes/note-n-780.txt",
                        "bookmark": False,
                        "last_edit": "31/08/2024 23:27",
                        "creation": "31/08/2024"
                    }
                ],
                "subfolders": [
                    {
                        "id": "s-193",
                        "name": "Innovation",
                        "color": "rgb(255, 255, 255)",
                        "last_visit": "31/08/2024 23:17:12",
                        "notes": [],
                        "subfolders": []
                    },
                    {
                        "id": "s-196",
                        "name": "Backend Specialisation",
                        "color": "rgb(217, 237, 255)",
                        "last_visit": "31/08/2024 23:17:06",
                        "notes": [],
                        "subfolders": []
                    }
                ]
            }
        ]
    },
    {
        "id": "f-181",
        "name": "Test Folder",
        "color": "rgb(225, 175, 209)",
        "last_visit": "31/08/2024 23:27:50",
        "notes": [
            {
                "id": "n-772",
                "name": "untitled",
                "content": "storage/notes/note-n-772.txt",
                "bookmark": True,
                "last_edit": "29/08/2024 23:32",
                "creation": "29/08/2024"
            },
            {
                "id": "n-779",
                "name": "Kkr bot",
                "content": "storage/notes/note-n-779.txt",
                "bookmark": False,
                "last_edit": "31/08/2024 23:27",
                "creation": "31/08/2024"
            }
        ],
        "subfolders": []
    },
    {
        "id": "f-182",
        "name": "Test folder 69",
        "color": "rgb(255, 255, 255)",
        "last_visit": "31/08/2024 23:56:38",
        "notes": [],
        "subfolders": []
    }
]

note_id = "n-7800"
note_path = FolderStructure.find_note_location(data, note_id)

print("Note Path:", note_path)
