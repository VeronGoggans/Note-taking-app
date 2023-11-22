import hashlib

class Hash:

    @staticmethod
    def hashify(password: str):
        h = hashlib.new("SHA256")
        h.update(password.encode())
        password_hash = h.hexdigest()
        return password_hash
    
    
    @staticmethod
    def compare(password_hash, user_input_hash):
        return password_hash == user_input_hash