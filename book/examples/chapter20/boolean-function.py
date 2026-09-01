def is_adult(age):
    return age >= 18


print(is_adult(20))
print(is_adult(15))

age = int(input("Введите возраст: "))

if is_adult(age):
    print("Доступ разрешён")
else:
    print("Доступ запрещён")
