age = int(input("Введите возраст: "))

if age < 6:
    price = 0
elif age < 18:
    price = 300
else:
    price = 500

print("Стоимость билета:", price)
