orders = [
    {
        "id": 101,
        "customer": "Анна",
        "total": 4500,
        "paid": True
    },
    {
        "id": 102,
        "customer": "Максим",
        "total": 7300,
        "paid": False
    },
    {
        "id": 103,
        "customer": "Мария",
        "total": 2100,
        "paid": True
    }
]

total = 0

for order in orders:
    total += order["total"]

    if not order["paid"]:
        print(
            "Не оплачен:",
            order["id"],
            order["customer"]
        )

print("Сумма заказов:", total)
