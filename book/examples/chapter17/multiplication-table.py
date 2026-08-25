number = int(input("Введите число: "))

for multiplier in range(1, 11):
    result = number * multiplier

    print(number, "*", multiplier, "=", result)
