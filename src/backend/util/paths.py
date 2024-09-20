from os import getcwd

CWD = getcwd()
SETTINGS_PATH = f'{CWD}/storage/json/settings.json'


# import sqlite3

# # Connect to SQLite database (or create it)
# connection = sqlite3.connect('database.db')

# # Create a cursor object
# cursor = connection.cursor()

# # SQL commands to create the tables
# sql_create_folders_table = '''
# CREATE TABLE IF NOT EXISTS folders (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name VARCHAR NOT NULL,
#     color VARCHAR DEFAULT 'rgb(255, 255, 255)',
#     last_visit VARCHAR NOT NULL DEFAULT CURRENT_TIMESTAMP,
#     parent_id INTEGER,
#     FOREIGN KEY (parent_id) REFERENCES folders (id) ON DELETE CASCADE
# );
# '''

# sql_create_notes_table = '''
# CREATE TABLE IF NOT EXISTS notes (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name VARCHAR NOT NULL,
#     content VARCHAR,
#     bookmark BOOLEAN DEFAULT 0,
#     last_edit VARCHAR NOT NULL DEFAULT CURRENT_TIMESTAMP,
#     creation VARCHAR NOT NULL DEFAULT CURRENT_DATE,
#     folder_id INTEGER,
#     FOREIGN KEY (folder_id) REFERENCES folders (id) ON DELETE CASCADE
# );
# '''

# sql_create_sticky_notes_table = '''
# CREATE TABLE IF NOT EXISTS sticky_notes (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name VARCHAR,
#     content VARCHAR
# );
# '''

# sql_create_templates_table = '''
# CREATE TABLE IF NOT EXISTS templates (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name VARCHAR,
#     content VARCHAR,
#     last_edit VARCHAR NOT NULL DEFAULT CURRENT_TIMESTAMP,
#     creation VARCHAR NOT NULL DEFAULT CURRENT_DATE,
#     uses INTEGER DEFAULT 0
# );
# '''

# sql_create_taskboards_table = '''
# CREATE TABLE IF NOT EXISTS taskboards (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name VARCHAR,
#     description VARCHAR,
#     board_sections JSON DEFAULT '["todo", "inprogress", "done"]'
# );
# '''

# sql_create_tasks_table = '''
# CREATE TABLE IF NOT EXISTS tasks (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name VARCHAR,
#     description VARCHAR,
#     due_date VARCHAR,
#     section VARCHAR NOT NULL DEFAULT 'todo',
#     taskboard_id INTEGER,
#     FOREIGN KEY (taskboard_id) REFERENCES taskboards (id) ON DELETE CASCADE
# );
# '''

# sql_create_flashcard_sets_table = '''
# CREATE TABLE IF NOT EXISTS flashcard_sets (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name VARCHAR,
#     last_study VARCHAR NOT NULL DEFAULT 'Not studied yet.'
# );
# '''

# sql_create_flashcards_table = '''
# CREATE TABLE IF NOT EXISTS flashcards (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     term VARCHAR,
#     description VARCHAR,
#     rating VARCHAR NOT NULL DEFAULT 'idle',
#     flascard_set_id INTEGER,
#     FOREIGN KEY (flascard_set_id) REFERENCES flashcard_sets (id) ON DELETE CASCADE
# );
# '''

# # Execute the SQL commands using the cursor
# cursor.execute(sql_create_folders_table)
# cursor.execute(sql_create_notes_table)
# cursor.execute(sql_create_sticky_notes_table)
# cursor.execute(sql_create_templates_table)
# cursor.execute(sql_create_taskboards_table)
# cursor.execute(sql_create_tasks_table)
# cursor.execute(sql_create_flashcard_sets_table)
# cursor.execute(sql_create_flashcards_table)

# # Commit the changes
# connection.commit()

# # Close the connection
# connection.close()

# print("Tables created successfully.")
