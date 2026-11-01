budget = 12000

try:
    ticket_count = int(input("Количество билетов: "))
    ticket_price = float(input("Цена билета: "))
    if ticket_count <= 0:
        raise ValueError("Количество билетов должно быть больше нуля")
    if ticket_price < 0:
        raise ValueError("Цена не может быть отрицательной")
    total = ticket_count * ticket_price
    if total > budget:
        raise ValueError("Недостаточно средств")
except ValueError as error:
    print("Покупка не выполнена:", error)
except (EOFError, KeyboardInterrupt):
    print("Ввод отменён")
else:
    budget -= total
    print("Покупка оформлена. Остаток:", budget)
