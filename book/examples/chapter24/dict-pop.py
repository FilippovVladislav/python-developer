user = {
    "name": "Анна",
    "age": 25,
    "city": "Казань"
}

city = user.pop("city")

print(city)
print(user)

missing = user.pop("email", "Не указан")

print(missing)
