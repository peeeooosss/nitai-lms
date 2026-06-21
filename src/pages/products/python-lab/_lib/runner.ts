const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v314.0.0/full/";

type PyodideModule = {
  runPython: (code: string) => unknown;
  loadPackage?: (names: string[]) => Promise<void>;
  globals: {
    get: (key: string) => unknown;
    set: (key: string, value: unknown) => void;
  };
  FS?: {
    writeFile: (path: string, content: string) => void;
    readFile: (path: string, opts: { encoding: string }) => string;
  };
};

let pyodideInstance: PyodideModule | null = null;
let isLoaded = false;
let loadPromise: Promise<PyodideModule> | null = null;

export async function loadPyodideInstance(): Promise<PyodideModule> {
  if (pyodideInstance) return pyodideInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      const { loadPyodide } = await import(
        /* @vite-ignore */ `${PYODIDE_CDN}pyodide.mjs`
      );
      const pyodide = await loadPyodide({
        indexURL: PYODIDE_CDN,
        stdin: () => prompt("Python needs input:") ?? "",
      });
      pyodideInstance = pyodide as unknown as PyodideModule;
      isLoaded = true;
      return pyodideInstance;
    } catch (err) {
      loadPromise = null;
      throw err;
    }
  })();

  return loadPromise;
}

export type RunResult = {
  success: boolean;
  output: string;
  error: string | null;
};

let stdoutRedirectSetup = false;

function initStdoutCapture(pyodide: PyodideModule) {
  if (stdoutRedirectSetup) return;
  pyodide.runPython(`
import sys
from io import StringIO
_sys_stdout = sys.stdout
sys.stdout = StringIO()
`);
  stdoutRedirectSetup = true;
}

function getCapturedOutput(pyodide: PyodideModule): string {
  const output = pyodide.runPython("sys.stdout.getvalue()") as string;
  pyodide.runPython("sys.stdout = StringIO()");
  return output;
}

function restoreStdout(pyodide: PyodideModule) {
  if (!stdoutRedirectSetup) return;
  pyodide.runPython("sys.stdout = _sys_stdout");
  stdoutRedirectSetup = false;
}

export async function runPythonCode(code: string): Promise<RunResult> {
  try {
    const pyodide = await loadPyodideInstance();
    initStdoutCapture(pyodide);
    pyodide.runPython(code);
    const output = getCapturedOutput(pyodide);
    return { success: true, output, error: null };
  } catch (err: unknown) {
    if (pyodideInstance) restoreStdout(pyodideInstance);
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, output: "", error: message };
  }
}

export async function runTestCode(
  code: string,
  testCode: string
): Promise<RunResult & { passed: boolean }> {
  const combined = `${code}\n\n${testCode}`;
  const result = await runPythonCode(combined);
  return {
    ...result,
    passed: result.success && !result.error,
  };
}

export function isPyodideLoaded(): boolean {
  return isLoaded;
}
