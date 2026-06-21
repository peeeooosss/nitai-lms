import { Terminal, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import type { RunResult } from "../_lib/runner.ts";

interface OutputPanelProps {
  result: RunResult | null;
  isRunning: boolean;
}

export default function OutputPanel({ result, isRunning }: OutputPanelProps) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b bg-muted/30">
        <Terminal className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Output
        </span>
        {isRunning && (
          <div className="ml-auto flex items-center gap-1.5 text-xs text-primary">
            <Loader2 className="w-3 h-3 animate-spin" />
            Running...
          </div>
        )}
        {result && !isRunning && (
          <div className="ml-auto flex items-center gap-1.5 text-xs">
            {result.success ? (
              <span className="text-green-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Success
              </span>
            ) : (
              <span className="text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Error
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 p-4 min-h-[150px] max-h-[300px] overflow-auto">
        {!result && !isRunning && (
          <p className="text-muted-foreground text-sm italic">
            Click "Run Code" to see output here
          </p>
        )}

        {isRunning && !result && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {result && result.output && (
          <pre className="text-sm font-mono text-foreground whitespace-pre-wrap break-words">
            {result.output}
          </pre>
        )}

        {result && result.error && (
          <pre className="text-sm font-mono text-destructive whitespace-pre-wrap break-words mt-2">
            {result.error}
          </pre>
        )}

        {result && !result.output && !result.error && result.success && (
          <p className="text-muted-foreground text-sm">Code ran successfully (no output)</p>
        )}
      </div>
    </div>
  );
}
