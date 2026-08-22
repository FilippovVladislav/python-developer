# Сначала выполняется and, потом or.
print(True or False and False)

# Скобки меняют порядок вычислений.
print((True or False) and False)

# not выполняется раньше and.
print(not False and True)
