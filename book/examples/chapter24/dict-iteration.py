settings = {
    "theme": "dark",
    "language": "ru",
    "notifications": True
}

for key in settings:
    print(key, "=", settings[key])

# Если нужны и ключ, и значение, items() обычно понятнее.
