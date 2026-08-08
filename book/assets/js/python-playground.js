(function () {
  'use strict';

  var PYODIDE_BASE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.29.2/full/';
  var pyodideReadyPromise = null;

  function getPyodide() {
    if (!pyodideReadyPromise) {
      pyodideReadyPromise = loadPyodideScript().then(function () {
        return window.loadPyodide({ indexURL: PYODIDE_BASE_URL });
      });
    }

    return pyodideReadyPromise;
  }

  function loadPyodideScript() {
    if (window.loadPyodide) {
      return Promise.resolve();
    }

    var existing = document.querySelector('script[data-python-playground-pyodide]');
    if (existing) {
      return new Promise(function (resolve, reject) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      });
    }

    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = PYODIDE_BASE_URL + 'pyodide.js';
      script.defer = true;
      script.dataset.pythonPlaygroundPyodide = 'true';
      script.addEventListener('load', resolve, { once: true });
      script.addEventListener('error', function () {
        reject(new Error('Не удалось загрузить Pyodide.'));
      }, { once: true });
      document.head.appendChild(script);
    });
  }

  function createElement(tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (typeof text === 'string') {
      element.textContent = text;
    }
    return element;
  }

  function fitEditorHeight(textarea) {
    var lines = Math.max(4, textarea.value.split('\n').length + 1);
    textarea.style.minHeight = Math.min(18, lines * 1.65) + 'rem';
  }

  function setBusy(runButton, busy, label) {
    runButton.disabled = busy;
    runButton.textContent = label;
  }

  function setOutput(output, text, isError) {
    output.textContent = text || '';
    output.classList.toggle('python-playground__output--error', Boolean(isError));
  }

  function formatResult(resultValue) {
    var stdout = '';
    var stderr = '';

    if (resultValue && typeof resultValue.get === 'function') {
      stdout = resultValue.get('stdout') || '';
      stderr = resultValue.get('stderr') || '';
    } else if (resultValue) {
      stdout = resultValue.stdout || '';
      stderr = resultValue.stderr || '';
    }

    return {
      text: stderr ? stderr : stdout,
      isError: Boolean(stderr),
    };
  }

  async function runPython(code) {
    var pyodide = await getPyodide();
    pyodide.globals.set('__playground_code', code);

    var result = await pyodide.runPythonAsync([
      'import contextlib',
      'import io',
      'import traceback',
      '',
      '_stdout = io.StringIO()',
      '_stderr = io.StringIO()',
      '_namespace = {}',
      '',
      'try:',
      '    with contextlib.redirect_stdout(_stdout), contextlib.redirect_stderr(_stderr):',
      '        exec(__playground_code, _namespace)',
      'except BaseException:',
      '    traceback.print_exc(file=_stderr)',
      '',
      "{'stdout': _stdout.getvalue(), 'stderr': _stderr.getvalue()}",
    ].join('\n'));

    pyodide.globals.delete('__playground_code');
    return result;
  }

  async function loadSource(block, textarea, output, status) {
    var source = block.dataset.source;
    if (!source) {
      return;
    }

    status.textContent = 'Загрузка примера…';

    try {
      var response = await fetch(source, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error('Не удалось загрузить пример: ' + response.status);
      }

      var code = await response.text();
      block.dataset.initialCode = code;
      textarea.value = code;
      fitEditorHeight(textarea);
      status.textContent = 'Код выполняется локально в браузере с помощью Pyodide.';
    } catch (error) {
      setOutput(output, error.message, true);
      status.textContent = 'Пример не загружен.';
    }
  }

  function enhancePlayground(block, index) {
    var title = block.dataset.title || 'Пример';
    var source = block.dataset.source || '';
    block.innerHTML = '';

    var header = createElement('div', 'python-playground__header');
    header.appendChild(createElement('div', '', title));
    header.appendChild(createElement('div', 'python-playground__hint', source));

    var editorId = 'python-playground-editor-' + index;
    var textarea = createElement('textarea', 'python-playground__editor');
    textarea.id = editorId;
    textarea.spellcheck = false;
    textarea.setAttribute('aria-label', 'Редактор Python-кода: ' + title);

    var actions = createElement('div', 'python-playground__actions');
    var runButton = createElement('button', 'python-playground__button', 'Запустить');
    runButton.type = 'button';
    runButton.setAttribute('aria-label', 'Запустить Python-код: ' + title);

    var resetButton = createElement('button', 'python-playground__button python-playground__button--secondary', 'Сбросить');
    resetButton.type = 'button';
    resetButton.setAttribute('aria-label', 'Сбросить Python-код: ' + title);

    actions.appendChild(runButton);
    actions.appendChild(resetButton);

    var resultHeader = createElement('div', 'python-playground__result-header');
    resultHeader.appendChild(createElement('div', '', 'Результат'));
    var status = createElement('div', 'python-playground__status', 'Код выполняется локально в браузере с помощью Pyodide.');
    resultHeader.appendChild(status);

    var output = createElement('pre', 'python-playground__output');
    output.setAttribute('aria-live', 'polite');

    block.appendChild(header);
    block.appendChild(textarea);
    block.appendChild(actions);
    block.appendChild(resultHeader);
    block.appendChild(output);

    textarea.addEventListener('input', function () {
      fitEditorHeight(textarea);
    });

    textarea.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') {
        return;
      }

      event.preventDefault();
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      textarea.value = textarea.value.slice(0, start) + '    ' + textarea.value.slice(end);
      textarea.selectionStart = textarea.selectionEnd = start + 4;
      fitEditorHeight(textarea);
    });

    runButton.addEventListener('click', async function () {
      setOutput(output, '', false);
      setBusy(runButton, true, pyodideReadyPromise ? 'Выполняется…' : 'Загрузка Python…');
      status.textContent = pyodideReadyPromise ? 'Выполняется…' : 'Загрузка Python…';

      try {
        var result = await runPython(textarea.value);
        var formatted = formatResult(result.toJs());
        result.destroy();
        setOutput(output, formatted.text, formatted.isError);
        status.textContent = formatted.isError ? 'Python сообщил об ошибке.' : 'Готово.';
      } catch (error) {
        setOutput(output, error.message, true);
        status.textContent = 'Не удалось выполнить код.';
      } finally {
        setBusy(runButton, false, 'Запустить');
      }
    });

    resetButton.addEventListener('click', function () {
      textarea.value = block.dataset.initialCode || '';
      fitEditorHeight(textarea);
      setOutput(output, '', false);
      status.textContent = 'Код восстановлен. Можно запустить снова.';
      textarea.focus();
    });

    loadSource(block, textarea, output, status);
  }

  function initPlaygrounds() {
    document.querySelectorAll('.python-playground[data-source]').forEach(enhancePlayground);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlaygrounds);
  } else {
    initPlaygrounds();
  }
})();
