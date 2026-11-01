amount = 3

try:
    if amount <= 0:
        raise ValueError("Количество должно быть больше нуля")
except ValueError as error:
    print("Ошибка:", error)
else:
    print("Можно продолжить. Количество:", amount)
