def calculate_total(price, quantity):
    return price * quantity


def calculate_discount(total):
    if total >= 3000:
        return total * 0.1

    return 0


price = float(input("Цена товара: "))
quantity = int(input("Количество: "))

total = calculate_total(price, quantity)
discount = calculate_discount(total)
final_price = total - discount

print("Сумма:", total)
print("Скидка:", discount)
print("К оплате:", final_price)
