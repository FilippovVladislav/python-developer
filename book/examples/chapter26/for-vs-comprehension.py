numbers = [1, 2, 3, 4, 5]

squares_loop = []

for number in numbers:
    squares_loop.append(number ** 2)

squares_comprehension = [
    number ** 2
    for number in numbers
]

print(squares_loop)
print(squares_comprehension)
