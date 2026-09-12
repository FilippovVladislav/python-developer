users = [
    {
        "name": "Анна",
        "city": "Казань"
    },
    {
        "name": "Максим"
    }
]

for user in users:
    city = user.get("city", "Не указан")
    print(user["name"], "→", city)
