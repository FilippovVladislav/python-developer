products = ["Хлеб", "Молоко", "Сыр"]

product = input("Что ищем? ")

if product in products:
    print("Товар найден")
else:
    print("Такого товара нет")
