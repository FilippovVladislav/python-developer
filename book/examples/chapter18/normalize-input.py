answer = input("Продолжить? yes/no: ")

answer = answer.strip().lower()

if answer == "yes":
    print("Продолжаем")
else:
    print("Останавливаемся")
