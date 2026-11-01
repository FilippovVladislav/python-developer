try:
    print("Выполняется операция")
    number = int("не число")
except ValueError:
    print("Операцию не удалось выполнить")
finally:
    print("Этот блок выполняется в любом случае")
