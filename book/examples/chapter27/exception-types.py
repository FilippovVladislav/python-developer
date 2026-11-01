try:
    int("пять")
except ValueError:
    print("ValueError: значение нельзя преобразовать в int")

try:
    10 / 0
except ZeroDivisionError:
    print("ZeroDivisionError: нельзя делить на ноль")

try:
    5 + "5"
except TypeError:
    print("TypeError: число нельзя сложить со строкой")

try:
    {"name": "Анна"}["age"]
except KeyError:
    print("KeyError: такого ключа нет")

try:
    ["Python"][3]
except IndexError:
    print("IndexError: такого индекса нет")
