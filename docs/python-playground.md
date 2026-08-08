# Python-playground в книге

HTML-версия книги использует Pyodide, чтобы запускать небольшие Python-примеры прямо в браузере читателя. Код не отправляется на сервер и выполняется локально в браузере.

## Как добавить пример

1. Создайте `.py`-файл в `book/examples/`.

Например:

```text
book/examples/chapter07/hello.py
```

2. В HTML-блоке укажите путь к этому файлу относительно текущей `.qmd`-главы.

```markdown
::: {.content-visible when-format="html"}
::: {.python-playground data-source="../examples/chapter07/hello.py" data-title="Первая программа"}
:::
:::
```

3. Для PDF добавьте статический вариант из того же `.py`-файла.

````markdown
::: {.content-visible when-format="pdf"}
```{.python filename="hello.py"}
{{< include ../examples/chapter07/hello.py >}}
```
:::
````

## Ограничения

- Pyodide загружается в HTML лениво после первого нажатия «Запустить».
- Runtime загружается с CDN: `https://cdn.jsdelivr.net/pyodide/v0.29.2/full/`.
- Пример должен быть небольшим: песочница предназначена для учебных фрагментов, а не для больших программ.
- В PDF попадает только статический код, без кнопок и JavaScript.
- Если нужен полностью offline-режим, сборку Pyodide нужно будет положить в репозиторий и изменить `PYODIDE_BASE_URL` в `book/assets/js/python-playground.js`.

## Локальная проверка

```bash
quarto render --to html
quarto preview
```

Откройте HTML-страницу с примером, нажмите «Запустить», измените код и проверьте «Сбросить».

Для PDF:

```bash
quarto render --to pdf
```

На Windows для PDF со встроенными SVG нужен `rsvg-convert` в `PATH`.
