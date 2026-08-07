# Путь Python-разработчика

Quarto-книга для начинающих Python-разработчиков: от базового мышления программиста до первых backend-проектов и подготовки к работе.

## Читать книгу

HTML-версия публикуется через GitHub Pages после каждого push в `main` или `master`.

Перед первым запуском включите публикацию через Actions:

1. Откройте **Settings** репозитория: <https://github.com/FilippovVladislav/python-developer/settings/pages>.
2. Перейдите в **Pages**.
3. В блоке **Build and deployment** выберите **Source: GitHub Actions**.

Откройте страницу проекта:

```text
https://filippovvladislav.github.io/python-developer/
```

PDF-файл доступен в артефактах последней сборки GitHub Actions:

1. Откройте вкладку **Actions** в репозитории: <https://github.com/FilippovVladislav/python-developer/actions>.
2. Выберите последнюю успешную сборку **Build and publish Quarto book**.
3. В разделе **Artifacts** скачайте `quarto-book-pdf`.

После локальной сборки PDF также появляется в каталоге `build/`.

## Сборка

```bash
quarto render
```

HTML и PDF попадают в каталог `build/`:

- `build/index.html` - HTML-версия книги;
- `build/Путь-Python-разработчика.pdf` - PDF-версия книги.

Для локальной разработки удобно запускать предпросмотр:

```bash
quarto preview
```

## Структура

- `_quarto.yml` - основной конфиг книги.
- `index.qmd` - титульная страница.
- `book/preface.qmd` - предисловие.
- `book/chapters/` - главы книги.
- `theme/book.scss` - HTML-тема.
- `theme/pdf-header.tex` - PDF-типографика.
- `.github/workflows/quarto.yml` - сборка Quarto, публикация GitHub Pages и загрузка PDF-артефакта.
