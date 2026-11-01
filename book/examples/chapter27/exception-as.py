text = "12x"

try:
    number = int(text)
except ValueError as error:
    print("Не удалось преобразовать значение:", error)
else:
    print("Получено число:", number)
