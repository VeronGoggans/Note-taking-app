class Hello:
    def __init__(self) -> None:
        self.say_hello = ''


my_hello = Hello()
my_hello.say_hello = 'Hello There'
print(my_hello.say_hello)