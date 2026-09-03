python_students = {
    "Анна",
    "Максим",
    "Игорь",
    "София",
    "Денис"
}

sql_students = {
    "Игорь",
    "София",
    "Мария",
    "Алексей"
}

both = python_students & sql_students
all_students = python_students | sql_students
only_python = python_students - sql_students
only_sql = sql_students - python_students
one_course = python_students ^ sql_students

print("Оба курса:", both)
print("Всего уникальных студентов:", len(all_students))
print("Только Python:", only_python)
print("Только SQL:", only_sql)
print("Один курс:", one_course)
