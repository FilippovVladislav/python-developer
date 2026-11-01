text = "18"

try:
    number = int(text)
except ValueError:
    print("Введите целое число")
else:
    print("Успешно получено:", number)
finally:
    print("Проверка завершена")
