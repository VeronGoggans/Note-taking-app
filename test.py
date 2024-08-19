
class JsonCache:
    def __init__(self):
        """
        This class provides the app with faster GET requests
        Allowing the app to have less lag. 

        This optimisation is made by caching the json data, 
        so that the data is in memory. 

        If the json data is in memory, the app doesn't need to perform IO 
        operations everytime a GET request is made. 
        """
        self.cache = {}

 
    def get(self, path: str) -> (dict | None):
        """
        This method returns the cached data for a specified key
        This method is called everytime a GET request is made.

        Args:
            path (str) The key for the data you want to retrieve
        """
        json_data = self.cache.get(path)
        if json_data:
            return json_data
        return None
    

    def add(self, path: str, json_data) -> None:
        """
        This method will add a key value pair to the cache.
        This method is only called when the application starts

        Args:
            path (str): The key to the cached data. 
            json_data: The actual data for that key. 
        """
        self.cache.setdefault(path, json_data)


    def update(self, path: str, json_data) -> None:
        """
        This method will update the current data in the cache 
        This method is called when the user updates the following

        Args: 
            path (str): The key to the cached data. 
            json_data: The actual updated data. 
        """
        self.cache.update({path: json_data})



myCache = JsonCache()
myCache.add('home', '[1, 2, 3, 4, 5]')
print(myCache.get('home'))
print(myCache.get('niggers'))

