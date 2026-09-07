device = {
    "name": "Sensor A",
    "status": "online"
}

if "temperature" in device:
    print(device["temperature"])
else:
    print("Температура неизвестна")
