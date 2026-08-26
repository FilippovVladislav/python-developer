text = input("Введите текст: ")
count = 0

for letter in text:
    if letter == "a":
        count += 1

print("Количество:", count)
