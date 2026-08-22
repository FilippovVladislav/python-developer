total = float(input("Сумма заказа: "))
has_subscription = input("Есть подписка? yes/no: ") == "yes"

if total >= 3000 or has_subscription:
    print("Доставка бесплатная")
else:
    print("Доставка платная")
