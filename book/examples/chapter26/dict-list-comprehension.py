products = [
    {"name": "Ноутбук", "price": 85000},
    {"name": "Монитор", "price": 32000},
    {"name": "Мышь", "price": 2500}
]

names = [
    product["name"]
    for product in products
]

print(names)
