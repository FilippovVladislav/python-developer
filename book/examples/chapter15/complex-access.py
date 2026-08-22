is_admin = False
is_owner = True
is_blocked = False

can_access = is_admin or (is_owner and not is_blocked)

print(can_access)
