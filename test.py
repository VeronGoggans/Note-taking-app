import json
import time

# Example JSON data
data = {
    "folders": [
        {
            "id": f"f-{i}",
            "name": f"Folder {i}",
            "color": "#ffffff",
            "notes": [
                {
                    "id": f"n-{j}",
                    "title": f"Note {j}",
                    "content": f"storage/notes/note-n-{j}.txt",
                    "bookmark": False,
                    "last_edit": "08/05/2024 10:30",
                    "creation": "09/01/2024",
                    "color": "white"
                } for j in range(10)  # 10 notes per folder
            ],
            "subfolders": []
        } for i in range(100)  # 1000 folders
    ]
}

# Serialization benchmark
start_time = time.time()
json_string = json.dumps(data)
end_time = time.time()
print(f"Serialization took {end_time - start_time:.5f} seconds")

# Deserialization benchmark
start_time = time.time()
loaded_data = json.loads(json_string)
end_time = time.time()
print(f"Deserialization took {end_time - start_time:.5f} seconds")
