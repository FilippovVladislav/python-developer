user = {
    "name": "Анна",
    "contact": {
        "email": "anna@example.com",
        "city": "Казань"
    }
}

print(user["contact"]["email"])

user["contact"]["city"] = "Москва"

print(user)
