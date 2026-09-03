allowed_roles = {"admin", "editor", "moderator"}

role = "editor"

if role in allowed_roles:
    print("Роль разрешена")
else:
    print("Роль не разрешена")
