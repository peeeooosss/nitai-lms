type PyodideModule = {
  runPython: (code: string) => unknown;
  setStdout?: (cb: (text: string) => void) => void;
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
      const { loadPyodide } = await import("pyodide");
      const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/",
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

export async function runPythonCode(code: string): Promise<RunResult> {
  const outputLines: string[] = [];

  try {
    const pyodide = await loadPyodideInstance();
    if (pyodide.setStdout) {
      pyodide.setStdout((text: string) => {
        outputLines.push(text);
      });
    }

    pyodide.runPython(code);
    return { success: true, output: outputLines.join("\n"), error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, output: outputLines.join("\n"), error: message };
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
