price = float(input("Цена товара: "))
money = float(input("Ваши деньги: "))

if money >= price:
    remaining = money - price

    print("Покупка возможна")
    print("Остаток:", remaining)
else:
    print("Недостаточно денег")
