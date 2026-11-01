balance = 8500

try:
    amount = float(input("Сумма перевода: "))
    if amount <= 0:
        raise ValueError("Сумма перевода должна быть положительной")
    if amount > balance:
        raise ValueError("Недостаточно средств")
except ValueError as error:
    print("Перевод не выполнен:", error)
except (EOFError, KeyboardInterrupt):
    print("Ввод отменён")
else:
    balance -= amount
    print("Перевод выполнен. Остаток:", balance)
