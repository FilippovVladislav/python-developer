products = [
    {"name": "Ноутбук", "price": 85000},
    {"name": "Монитор", "price": 32000},
    {"name": "Мышь", "price": 2500}
]

expensive_names = [
    product["name"]
    for product in products
    if product["price"] > 10000
]

print(expensive_names)
