config = {
    "theme": "dark"
}

theme = config.get("theme", "light")
font_size = config.get("font_size", 14)

print(theme)
print(font_size)
