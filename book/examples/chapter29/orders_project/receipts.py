from discounts import apply_discount


def create_receipt(product, price, discount):
    final_price = apply_discount(price, discount)
    return {"product": product, "total": final_price}
