text = "42"

try:
    number = int(text)
except ValueError:
    print("Введите целое число")
else:
    print("Получено число:", number)
