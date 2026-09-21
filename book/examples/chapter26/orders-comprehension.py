orders = [
    {"id": 101, "total": 4500, "paid": True},
    {"id": 102, "total": 7300, "paid": False},
    {"id": 103, "total": 12000, "paid": True},
    {"id": 104, "total": 2800, "paid": True},
    {"id": 105, "total": 9500, "paid": False}
]

paid_ids = [
    order["id"]
    for order in orders
    if order["paid"]
]

large_totals = [
    order["total"]
    for order in orders
    if order["total"] > 5000
]

large_paid_ids = [
    order["id"]
    for order in orders
    if order["paid"] and order["total"] > 5000
]

print("Оплаченные:", paid_ids)
print("Суммы > 5000:", large_totals)
print("Оплаченные > 5000:", large_paid_ids)
