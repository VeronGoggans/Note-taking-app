# import json
# import time

# # Example JSON data
# data = {
#     "folders": [
#         {
#             "id": f"f-{i}",
#             "name": f"Folder {i}",
#             "color": "#ffffff",
#             "notes": [
#                 {
#                     "id": f"n-{j}",
#                     "title": f"Note {j}",
#                     "content": f"storage/notes/note-n-{j}.txt",
#                     "bookmark": False,
#                     "last_edit": "08/05/2024 10:30",
#                     "creation": "09/01/2024",
#                     "color": "white"
#                 } for j in range(10)  # 10 notes per folder
#             ],
#             "subfolders": []
#         } for i in range(100)  # 1000 folders
#     ]
# }

# # Serialization benchmark
# start_time = time.time()
# json_string = json.dumps(data)
# end_time = time.time()
# print(f"Serialization took {end_time - start_time:.5f} seconds")

# # Deserialization benchmark
# start_time = time.time()
# loaded_data = json.loads(json_string)
# end_time = time.time()
# print(f"Deserialization took {end_time - start_time:.5f} seconds")
# import string
# import os
# import secrets
# art = """
#                                            _ 
#  _ __   __ _ ___ _____      _____  _ __ __| |
# | '_ \ / _` / __/ __\ \ /\ / / _ \| '__/ _` |
# | |_) | (_| \__ \__ \\ V  V / (_) | | | (_| |
# | .__/ \__,_|___/___/ \_/\_/ \___/|_|  \__,_|
# |_|                                          
# """
# digits = string.digits
# letters = string.ascii_letters
# puncuation = string.punctuation
# characters = digits + letters + puncuation
# looping = True

# def colorize_char(char):
#     digit_color = 111
#     puncuation_color = 79
#     if char in digits:
#         return f'\033[38;5;{digit_color}m{char}\033[0m'
#     elif char in puncuation:
#         return f'\033[38;5;{puncuation_color}m{char}\033[0m'
#     return char

# def colorize_string(string, code):
#     """
#     light purple: 141
#     light blue: 111
#     light red: 167
#     """
#     return f'\033[38;5;{code}m{string}\033[0m'


# def generate_password(iteration):
#     password = ''
#     for _ in range(password_len):
#         char = characters[secrets.randbelow(len(characters))]
#         password += colorize_char(char)

#     print(f'Password {iteration}: {password}\n')
    

# print(colorize_string(art, 111))
# while looping:
#     password_len = int(input(colorize_string('What length should your password be: ', 111)))
#     password_repeats = int(input(colorize_string('How many passwords do you want to create?: ', 111)))
#     if password_len > 0:
#         if password_len > 8:
#             for i in range(1, password_repeats + 1):
#                 generate_password(i)
#         else:
#             print(colorize_string('To weak, insert a number higher then 8.', 167))
#     else:
#         looping = False


fruits = ['cranberry', 'peach', 'watermelon', 'strawberry', 'banana']

for fruit in fruits:
    if fruit == 'strawberry':
        print('favorite')
        continue
    print('Good')