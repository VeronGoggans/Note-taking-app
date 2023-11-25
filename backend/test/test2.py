def find_subfolder_by_id(folders, target_id):
    for folder in folders:
        if folder.get("id") == target_id:
            return folder
        elif "subfolders" in folder:
            subfolder = find_subfolder_by_id(folder["subfolders"], target_id)
            if subfolder:
                return subfolder
    return None


# Function to get folder notes
def get_folder_notes(folder):
    folder_info = {
        "subfolders": [],
        "notes": folder.get("notes", [])
    }

    for subfolder in folder["subfolders"]:
        subfolder_info = {
            "id": subfolder["id"],
            "name": subfolder["name"],
        }
        folder_info["subfolders"].append(subfolder_info)

    return folder_info


def find_note_by_id(folders, target_note_id):
    for folder in folders:
        for note in folder["notes"]:
            if note.get("id") == target_note_id:
                return note
    
            note_in_subfolder = find_note_by_id(folder["subfolders"], target_note_id)
            if note_in_subfolder:
                return note_in_subfolder
    return None


# Example usage:
json_data = {
    "folders": [
        {
            "id": 76,
            "name": "Test-folder",
            "password_protected": True,
            "password": "7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9",
            "notes": [
                {
                    "id": 141,
                    "title": "Testing notes",
                    "content": "C:\\Users\\jsvgo\\Web Dev\\Note Taking App/storage/notes/note-141.html",
                    "bookmark": False,
                    "password_protected": True,
                    "last_edit": "22/11/2023 14:43:53",
                    "creation": "22/11/2023",
                    "password": "3a70bd27789226bda74f6e05680dde8e0971aeec40a9d3e03e587b963468f3a4"
                },
                {
                    "id": 142,
                    "title": "Testing notes",
                    "content": "C:\\Users\\jsvgo\\Web Dev\\Note Taking App/storage/notes/note-141.html",
                    "bookmark": False,
                    "password_protected": True,
                    "last_edit": "22/11/2023 14:43:53",
                    "creation": "22/11/2023",
                    "password": "3a70bd27789226bda74f6e05680dde8e0971aeec40a9d3e03e587b963468f3a4"
                }
            ],
            "subfolders": [
                {
                    "id": 8,
                    "name": "Test-subfolder",
                    "password_protected": True,
                    "password": "59f7348c803829ef6c64f27a52ae616dd24c8114ebaeb7efae0ed82ac18e8cba",
                    "notes": [
                        {
                            "id": 143,
                            "title": "Testing notes",
                            "content": "C:\\Users\\jsvgo\\Web Dev\\Note Taking App/storage/notes/note-143.html",
                            "bookmark": False,
                            "password_protected": False,
                            "last_edit": "22/11/2023 14:49:50",
                            "creation": "22/11/2023",
                            "password": ""
                        }
                    ],
                    "subfolders": [
                        {
                            "id": 10,
                            "name": "Sub-subfolder",
                            "password_protected": False,
                            "notes": [
                                {
                                    "id": 146,
                                    "title": "Testing notes",
                                    "content": "C:\\Users\\jsvgo\\Web Dev\\Note Taking App/storage/notes/note-146.html",
                                    "bookmark": False,
                                    "password_protected": False,
                                    "last_edit": "22/11/2023 15:30:00",
                                    "creation": "22/11/2023",
                                    "password": ""
                                }
                            ],
                            "subfolders": []
                        }
                    ]
                }
            ]
        },
        {
            "id": 77,
            "name": "School",
            "password_protected": True,
            "password": "7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9",
            "notes": []
        }       
    ]
}




# Get folder notes
# target_folder_id = 76  # Replace with the desired folder ID
# target_folder = find_subfolder_by_id(json_data["folders"], target_folder_id)
# if target_folder:
#     folder_notes_info = get_folder_notes(target_folder)
#     print("Folder Notes:", folder_notes_info)
# else:
#     print(f"Folder with ID {target_folder_id} not found.")
print(find_note_by_id(json_data['folders'], 142))
