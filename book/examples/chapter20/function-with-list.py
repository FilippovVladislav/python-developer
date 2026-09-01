def calculate_sum(numbers):
    total = 0

    for number in numbers:
        total += number

    return total


values = [10, 20, 30]

print(calculate_sum(values))
