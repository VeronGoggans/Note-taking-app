from datetime import datetime

def get_recent_posts(post_list):
    # Convert the last_edit strings to datetime objects within the dict
    for post in post_list:
        post['last_edit_dt'] = datetime.strptime(post['last_edit'], "%d/%m/%Y %H:%M")
    
    # Sort the posts by the datetime objects in descending order
    post_list.sort(key=lambda post: post['last_edit_dt'], reverse=True)
    
    # Get the 5 most recent posts
    recent_posts = post_list[:5]
    
    # Clean up by removing the temporary datetime objects
    for post in post_list:
        del post['last_edit_dt']
    
    return recent_posts

# Example usage
post_list = [
    {'id': 'n-692', 'name': 'Neutron Bugs', 'content': 'storage/notes/note-n-692.txt', 'bookmark': True, 'favorite': False, 'last_edit': '09/08/2024 18:47', 'creation': '30/07/2024'},
    {'id': 'n-589', 'name': 'Compliance Checking', 'content': 'storage/notes/note-n-589.txt', 'bookmark': False, 'favorite': False, 'last_edit': '27/06/2024 17:54', 'creation': '14/05/2024'},
    {'id': 'n-590', 'name': 'Compliant engineering', 'content': 'storage/notes/note-n-590.txt', 'bookmark': False, 'favorite': False, 'last_edit': '04/06/2024 19:30', 'creation': '14/05/2024'},
    {'id': 'n-625', 'name': 'Intro to Software Architecture', 'content': 'storage/notes/note-n-625.txt', 'bookmark': False, 'favorite': False, 'last_edit': '03/08/2024 00:35', 'creation': '03/06/2024'},
    {'id': 'n-626', 'name': 'Packages and Dependencies', 'content': 'storage/notes/note-n-626.txt', 'bookmark': False, 'favorite': False, 'last_edit': '28/06/2024 03:03', 'creation': '03/06/2024'},
    {'id': 'n-627', 'name': 'Logical Components', 'content': 'storage/notes/note-n-627.txt', 'bookmark': False, 'favorite': False, 'last_edit': '26/06/2024 18:05', 'creation': '03/06/2024'},
    {'id': 'n-628', 'name': 'Logical Layers', 'content': 'storage/notes/note-n-628.txt', 'bookmark': False, 'favorite': False, 'last_edit': '26/06/2024 18:06', 'creation': '03/06/2024'},
    {'id': 'n-629', 'name': 'Software Architecture Reconstruction', 'content': 'storage/notes/note-n-629.txt', 'bookmark': False, 'favorite': False, 'last_edit': '26/06/2024 18:07', 'creation': '03/06/2024'},
    {'id': 'n-630', 'name': 'Architecture Activities', 'content': 'storage/notes/note-n-630.txt', 'bookmark': False, 'favorite': False, 'last_edit': '09/08/2024 19:10', 'creation': '03/06/2024'},
    {'id': 'n-466', 'name': 'CICQ1 exam summary', 'content': 'storage/notes/note-n-466.txt', 'bookmark': False, 'favorite': False, 'last_edit': '27/07/2024 20:03', 'creation': '20/03/2024'},
    {'id': 'n-609', 'name': 'Maintainability', 'content': 'storage/notes/note-n-609.txt', 'bookmark': False, 'favorite': False, 'last_edit': '30/06/2024 16:24', 'creation': '30/05/2024'},
    {'id': 'n-610', 'name': 'Static analysis en metrics', 'content': 'storage/notes/note-n-610.txt', 'bookmark': False, 'favorite': False, 'last_edit': '10/07/2024 19:49', 'creation': '30/05/2024'},
    {'id': 'n-611', 'name': 'Declarative Code', 'content': 'storage/notes/note-n-611.txt', 'bookmark': False, 'favorite': False, 'last_edit': '30/06/2024 16:23', 'creation': '30/05/2024'},
    {'id': 'n-612', 'name': 'Authentication & Authorization', 'content': 'storage/notes/note-n-612.txt', 'bookmark': False, 'favorite': False, 'last_edit': '30/06/2024 16:24', 'creation': '30/05/2024'},
    {'id': 'n-613', 'name': 'Websecurity & Web Performance', 'content': 'storage/notes/note-n-613.txt', 'bookmark': False, 'favorite': False, 'last_edit': '31/07/2024 16:27', 'creation': '30/05/2024'},
    {'id': 'n-615', 'name': 'Operations', 'content': 'storage/notes/note-n-615.txt', 'bookmark': False, 'favorite': False, 'last_edit': '08/08/2024 15:34', 'creation': '30/05/2024'},
    {'id': 'n-585', 'name': 'Mogelijke bijbaan', 'content': 'storage/notes/note-n-585.txt', 'bookmark': False, 'favorite': False, 'last_edit': '12/08/2024 15:30', 'creation': '04/05/2024'}
]

recent_posts = get_recent_posts(post_list)
for post in recent_posts:
    print(post)
