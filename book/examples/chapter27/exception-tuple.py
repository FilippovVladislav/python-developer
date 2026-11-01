text = "12"
divisor_text = "0"

try:
    number = int(text)
    divisor = int(divisor_text)
    result = number / divisor
except (ValueError, ZeroDivisionError) as error:
    print("Расчёт не выполнен:", error)
else:
    print("Результат:", result)
