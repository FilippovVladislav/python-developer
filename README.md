# Путь Python-разработчика

Quarto-книга для начинающих Python-разработчиков: от базового мышления программиста до первых backend-проектов и подготовки к работе.

## Сборка

```bash
quarto render
```

HTML и PDF попадают в каталог `build/`.

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
- `.github/workflows/quarto.yml` - автоматическая сборка HTML/PDF в GitHub Actions.
