def get_min_max(numbers):
    return min(numbers), max(numbers)


numbers = [12, 5, 30, 8]

minimum, maximum = get_min_max(numbers)

print("Минимум:", minimum)
print("Максимум:", maximum)
print(type(get_min_max(numbers)))
