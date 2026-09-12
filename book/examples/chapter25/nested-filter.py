products = [
    {"name": "Ноутбук", "price": 85000},
    {"name": "Монитор", "price": 32000},
    {"name": "Мышь", "price": 2500}
]

for product in products:
    if product["price"] >= 30000:
        print(product["name"])
