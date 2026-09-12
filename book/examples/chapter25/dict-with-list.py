course = {
    "title": "Python",
    "topics": [
        "Переменные",
        "Условия",
        "Циклы"
    ]
}

print(course["topics"][0])

course["topics"].append("Функции")

for topic in course["topics"]:
    print(topic)
