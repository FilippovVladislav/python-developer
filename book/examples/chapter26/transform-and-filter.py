numbers = [1, 2, 3, 4, 5, 6]

squares = [
    number ** 2
    for number in numbers
    if number % 2 == 0
]

print(squares)
