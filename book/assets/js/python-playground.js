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

  function setInputWaiting(inputArea, waiting) {
    inputArea.hidden = !waiting;
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
      text: stderr ? stdout + stderr : stdout,
      isError: Boolean(stderr),
    };
  }

  function createInputController(inputArea, inputPrompt, inputField, inputButton, status) {
    var pendingResolve = null;

    function submit() {
      if (!pendingResolve) {
        return;
      }

      var value = inputField.value;
      var resolve = pendingResolve;
      pendingResolve = null;
      inputField.value = '';
      inputField.disabled = true;
      inputButton.disabled = true;
      setInputWaiting(inputArea, false);
      status.textContent = 'Выполняется…';
      resolve(value);
    }

    inputButton.addEventListener('click', submit);
    inputField.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        submit();
      }
    });

    return {
      request: function (prompt) {
        return new Promise(function (resolve) {
          pendingResolve = resolve;
          inputPrompt.dataset.prompt = prompt || '';
          inputPrompt.textContent = prompt || 'Введите значение';
          inputField.disabled = false;
          inputButton.disabled = false;
          setInputWaiting(inputArea, true);
          status.textContent = 'Ожидается ввод…';
          window.setTimeout(function () {
            inputField.focus();
          }, 0);
        });
      },
      reset: function () {
        if (pendingResolve) {
          pendingResolve('');
        }
        pendingResolve = null;
        inputField.value = '';
        inputField.disabled = true;
        inputButton.disabled = true;
        inputPrompt.dataset.prompt = '';
        setInputWaiting(inputArea, false);
      },
    };
  }

  async function runPython(code, callbacks) {
    var pyodide = await getPyodide();
    var stdout = '';
    var stderr = '';

    function appendStdout(text) {
      stdout += text;
      callbacks.onOutput(stdout, false);
    }

    function appendStderr(text) {
      stderr += text;
      callbacks.onOutput(stdout + stderr, true);
    }

    pyodide.globals.set('__playground_code', code);
    pyodide.globals.set('__playground_input', function (prompt) {
      var promptText = prompt == null ? '' : String(prompt);
      return callbacks.onInput(promptText).then(function (value) {
        appendStdout(promptText + value + '\n');
        return value;
      });
    });
    pyodide.setStdout({ batched: appendStdout });
    pyodide.setStderr({ batched: appendStderr });

    try {
      await pyodide.runPythonAsync([
      'import ast',
      'import traceback',
      '',
      'class _InputTransformer(ast.NodeTransformer):',
      '    def visit_FunctionDef(self, node):',
      '        return node',
      '',
      '    def visit_AsyncFunctionDef(self, node):',
      '        return node',
      '',
      '    def visit_ClassDef(self, node):',
      '        return node',
      '',
      '    def visit_Call(self, node):',
      '        self.generic_visit(node)',
      '        if isinstance(node.func, ast.Name) and node.func.id == "input":',
      '            return ast.copy_location(',
      '                ast.Await(',
      '                    value=ast.Call(',
      '                        func=ast.Name(id="__playground_input", ctx=ast.Load()),',
      '                        args=node.args,',
      '                        keywords=node.keywords,',
      '                    )',
      '                ),',
      '                node,',
      '            )',
      '        return node',
      '',
      'try:',
      '    _tree = ast.parse(__playground_code, filename="<playground>")',
      '    _tree = _InputTransformer().visit(_tree)',
      '    _main = ast.AsyncFunctionDef(',
      '        name="__playground_main",',
      '        args=ast.arguments(posonlyargs=[], args=[], vararg=None, kwonlyargs=[], kw_defaults=[], kwarg=None, defaults=[]),',
      '        body=_tree.body or [ast.Pass()],',
      '        decorator_list=[],',
      '        returns=None,',
      '        type_comment=None,',
      '    )',
      '    if hasattr(_main, "type_params"):',
      '        _main.type_params = []',
      '    _module = ast.Module(',
      '        body=[',
      '            _main,',
      '            ast.Expr(',
      '                value=ast.Await(',
      '                    value=ast.Call(',
      '                        func=ast.Name(id="__playground_main", ctx=ast.Load()),',
      '                        args=[],',
      '                        keywords=[],',
      '                    )',
      '                )',
      '            ),',
      '        ],',
      '        type_ignores=[],',
      '    )',
      '    ast.fix_missing_locations(_module)',
      '    _namespace = {"__name__": "__main__", "__playground_input": __playground_input}',
      '    _compiled = compile(_module, "<playground>", "exec", flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)',
      '    await eval(_compiled, _namespace)',
      'except BaseException:',
      '    traceback.print_exc()',
      ].join('\n'));
    } finally {
      pyodide.setStdout();
      pyodide.setStderr();
      pyodide.globals.delete('__playground_code');
      pyodide.globals.delete('__playground_input');
    }

    return {
      stdout: stdout,
      stderr: stderr,
    };
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

    var inputArea = createElement('div', 'python-playground__input');
    inputArea.hidden = true;
    var inputPrompt = createElement('div', 'python-playground__input-prompt');
    var inputControls = createElement('div', 'python-playground__input-controls');
    var inputField = createElement('input', 'python-playground__input-field');
    inputField.type = 'text';
    inputField.autocomplete = 'off';
    inputField.disabled = true;
    inputField.setAttribute('aria-label', 'Ввод для Python input');
    var inputButton = createElement('button', 'python-playground__button', 'Отправить');
    inputButton.type = 'button';
    inputButton.disabled = true;
    inputControls.appendChild(inputField);
    inputControls.appendChild(inputButton);
    inputArea.appendChild(inputPrompt);
    inputArea.appendChild(inputControls);

    block.appendChild(header);
    block.appendChild(textarea);
    block.appendChild(actions);
    block.appendChild(resultHeader);
    block.appendChild(inputArea);
    block.appendChild(output);

    var inputController = createInputController(
      inputArea,
      inputPrompt,
      inputField,
      inputButton,
      status
    );

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
      var runId = String(Date.now()) + String(Math.random());
      block.dataset.runId = runId;
      inputController.reset();
      setOutput(output, '', false);
      setBusy(runButton, true, pyodideReadyPromise ? 'Выполняется…' : 'Загрузка Python…');
      status.textContent = pyodideReadyPromise ? 'Выполняется…' : 'Загрузка Python…';

      try {
        var result = await runPython(textarea.value, {
          onInput: inputController.request,
          onOutput: function (text, isError) {
            if (block.dataset.runId === runId) {
              setOutput(output, text, isError);
            }
          },
        });
        var formatted = formatResult(result);
        if (block.dataset.runId !== runId) {
          return;
        }
        setOutput(output, formatted.text, formatted.isError);
        status.textContent = formatted.isError ? 'Python сообщил об ошибке.' : 'Готово.';
      } catch (error) {
        if (block.dataset.runId === runId) {
          setOutput(output, error.message, true);
          status.textContent = 'Не удалось выполнить код.';
        }
      } finally {
        if (block.dataset.runId === runId) {
          inputController.reset();
          setBusy(runButton, false, 'Запустить');
        }
      }
    });

    resetButton.addEventListener('click', function () {
      block.dataset.runId = '';
      inputController.reset();
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
