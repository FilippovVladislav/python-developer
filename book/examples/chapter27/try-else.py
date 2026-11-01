text = "36"

try:
    number = int(text)
except ValueError:
    print("Это не целое число")
else:
    print("Преобразование прошло успешно:", number)
