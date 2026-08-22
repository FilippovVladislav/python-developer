correct_password = "python123"

password = input("Введите пароль: ")
is_blocked = False

if password == correct_password and not is_blocked:
    print("Вход выполнен")
else:
    print("Вход запрещён")
