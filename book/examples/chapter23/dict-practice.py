spaceship = {
    "name": "Odyssey",
    "fuel": 80,
    "crew": 4,
    "active": True
}

spaceship["fuel"] = spaceship["fuel"] - 15
spaceship["destination"] = "Mars"

if "autopilot" not in spaceship:
    spaceship["autopilot"] = False

print("Корабль:", spaceship["name"])
print("Топливо:", spaceship["fuel"])
print("Характеристик:", len(spaceship))
print(spaceship)
