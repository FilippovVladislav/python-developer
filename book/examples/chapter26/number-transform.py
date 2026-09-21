celsius = [0, 10, 20, 30]

fahrenheit = [
    temperature * 9 / 5 + 32
    for temperature in celsius
]

print(fahrenheit)
