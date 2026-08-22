number = float(input("Введите положительное число: "))

while number <= 0:
    print("Нужно число больше нуля")
    number = float(input("Попробуйте ещё раз: "))

print("Принято:", number)
