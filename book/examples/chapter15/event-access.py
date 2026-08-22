age = int(input("Возраст: "))
has_ticket = input("Есть билет? yes/no: ") == "yes"

if age >= 18 and has_ticket:
    print("Вход разрешён")
else:
    print("Вход запрещён")
