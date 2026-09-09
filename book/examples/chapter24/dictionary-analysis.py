stock = {
    "Ноутбук": 4,
    "Монитор": 0,
    "Клавиатура": 12,
    "Мышь": 0,
    "Наушники": 7
}

total_quantity = 0

for product, quantity in stock.items():
    total_quantity += quantity

    if quantity > 0:
        print(product, "есть в наличии")

print("Всего единиц:", total_quantity)

webcam = stock.get("Веб-камера", 0)

print("Веб-камер:", webcam)

stock.update({
    "Монитор": 3,
    "Веб-камера": 5
})

removed = stock.pop("Мышь", 0)

print("Удалено мышей:", removed)
print(stock)
