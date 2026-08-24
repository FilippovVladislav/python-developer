correct_password = "python123"

password = input("Введите пароль: ")

while password != correct_password:
    print("Неверный пароль")
    password = input("Попробуйте ещё раз: ")

print("Доступ разрешён")
