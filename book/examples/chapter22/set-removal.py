blocked = {"alex", "maria", "john"}

blocked.remove("maria")
blocked.discard("anna")

print(blocked)

# remove() для отсутствующего элемента приведет к KeyError.
# discard() для отсутствующего элемента ошибки не вызывает.
