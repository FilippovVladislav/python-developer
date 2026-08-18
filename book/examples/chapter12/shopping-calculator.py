price = float(input("Цена товара: "))
quantity = int(input("Количество: "))
delivery = float(input("Стоимость доставки: "))

total = price * quantity + delivery

print("Итого:", total)
