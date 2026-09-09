prices = {
    "Мышь": 2500,
    "Клавиатура": 7000,
    "Монитор": 32000,
    "Кабель": 800
}

for product, price in prices.items():
    if price >= 5000:
        print(product, "→", price)
