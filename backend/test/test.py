def loop(list, index = 0):
    if index != len(list):
        print(list[index])
        index += 1
        loop(list, index)


print(loop([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))