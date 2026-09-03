required = {"Python", "Git", "SQL", "Docker"}
candidate = {"Python", "Git", "Linux"}

missing = required - candidate

print(missing)
