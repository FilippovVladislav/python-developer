numbers = []

for i in range(5):
    number = float(input("Введите число: "))
    numbers.append(number)

print("Список:", numbers)
print("Количество:", len(numbers))
print("Сумма:", sum(numbers))
print("Минимум:", min(numbers))
print("Максимум:", max(numbers))

average = sum(numbers) / len(numbers)

print("Среднее:", average)
