class JsonCache:
    def __init__(self):
        self.cache = {}


    def get(self, path: str):
        json_data = self.cache.get(path)
        if json_data:
            return json_data
        return None
    

    def add(self, path: str, json_data):
        self.cache.setdefault(path, json_data)


    def update(self, path: str, json_data):
        self.cache.update({path: json_data})