import string
import random

class Keyboard:

    @staticmethod
    def characters():
        return list(string.ascii_letters)
    
    @staticmethod
    def symbols():
        return list(string.punctuation)
    
    @staticmethod
    def numbers():
        return list(string.digits)
    

class PasswordGenerator:
    def __init__(self):
        self.unwanted_charachters: list = []
        self.unique_neighbour: bool = False
        self.number_amount: int = 0
        self.symbol_amount: int = 0
        self.char_amount: int = 0
        self.password_length = 0
        self.characters: list = Keyboard.characters()
        self.symbols: list = Keyboard.symbols()
        self.numbers: list = Keyboard.numbers()


    def run(self):
        self.__user_input()
        return self.__generate()


    def __user_input(self):
        self.password_length = int(input('Password length: '))
        self.char_amount = int(input('Character amount: '))
        self.symbol_amount = int(input('Symbol amount: '))
        self.number_amount = int(input('Number amount: '))

    
    def __generate(self):
        password = []

        for _ in range(self.char_amount):
            password.append(random.choice(self.characters))

        for _ in range(self.symbol_amount):
            password.append(random.choice(self.symbols))

        for _ in range(self.number_amount):
            password.append(random.choice(self.numbers))

        random.shuffle(password)

        return ''.join(password)

    

my_password_generator = PasswordGenerator()
print(my_password_generator.run())
