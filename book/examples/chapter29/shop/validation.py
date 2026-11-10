def validate_quantity(quantity):
    if quantity <= 0:
        raise ValueError("Количество должно быть положительным")
