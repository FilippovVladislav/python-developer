try:
    import nonexistent_training_module
except ModuleNotFoundError:
    print("Модуль не найден")

try:
    from math import unknown_function
except ImportError:
    print("Имя не найдено в модуле")
