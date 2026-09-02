def analyze_numbers(numbers):
    minimum = min(numbers)
    maximum = max(numbers)
    average = sum(numbers) / len(numbers)

    return minimum, maximum, average


numbers = [10, 20, 30, 40]

minimum, maximum, average = analyze_numbers(numbers)

print("Минимум:", minimum)
print("Максимум:", maximum)
print("Среднее:", average)
