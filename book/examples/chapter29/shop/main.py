from pricing import calculate_total
from validation import validate_quantity

try:
    quantity = 3
    validate_quantity(quantity)
    total = calculate_total(1200, quantity)
except ValueError as error:
    print("Ошибка:", error)
else:
    print("Стоимость заказа:", total)
