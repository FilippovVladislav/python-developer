text = "12"
divisor_text = "0"

try:
    number = int(text)
    divisor = int(divisor_text)
    result = number / divisor
except ValueError:
    print("Введите целые числа")
except ZeroDivisionError:
    print("Делитель не должен быть нулём")
else:
    print("Результат:", result)
