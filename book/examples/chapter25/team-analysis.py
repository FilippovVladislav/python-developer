team = {
    "name": "Backend",
    "members": [
        {"name": "Анна", "experience": 3},
        {"name": "Максим", "experience": 5},
        {"name": "Олег", "experience": 2}
    ]
}

print("Команда:", team["name"])

total_experience = 0

for member in team["members"]:
    total_experience += member["experience"]

    if member["experience"] >= 3:
        print(
            "Опытный участник:",
            member["name"]
        )

average = total_experience / len(team["members"])

print("Средний опыт:", average)

for member in team["members"]:
    if member["name"] == "Олег":
        member["experience"] += 1

print(team)
