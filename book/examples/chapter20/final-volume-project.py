def calculate_average(numbers):
    return sum(numbers) / len(numbers)


def count_positive(numbers):
    count = 0

    for number in numbers:
        if number > 0:
            count += 1

    return count


numbers = []

for i in range(5):
    number = float(input("Введите число: "))
    numbers.append(number)


average = calculate_average(numbers)
positive_count = count_positive(numbers)

print("Список:", numbers)
print("Среднее:", average)
print("Положительных:", positive_count)
print("Минимум:", min(numbers))
print("Максимум:", max(numbers))
