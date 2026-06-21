import { useRef, useEffect, useCallback } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { indentOnInput, syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholderText?: string;
  readOnly?: boolean;
  minHeight?: string;
}

export default function CodeEditor({
  value,
  onChange,
  placeholderText = "Write your Python code here...",
  readOnly = false,
  minHeight = "200px",
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const handleChange = useCallback(
    (v: string) => {
      onChange(v);
    },
    [onChange]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    if (viewRef.current) {
      viewRef.current.destroy();
    }

    const startState = EditorState.create({
      doc: value,
      extensions: [
        python(),
        oneDark,
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        indentOnInput(),
        keymap.of(defaultKeymap),
        placeholder(placeholderText),
        EditorView.editable.of(!readOnly),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            handleChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          "&": { height: "100%", minHeight },
          ".cm-scroller": { fontFamily: '"JetBrains Mono", "Fira Code", monospace', fontSize: "14px" },
          ".cm-content": { caretColor: "#528bff" },
          ".cm-cursor": { borderLeftColor: "#528bff" },
        }),
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const currentCode = view.state.doc.toString();
    if (currentCode !== value) {
      view.dispatch({
        changes: { from: 0, to: currentCode.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-border overflow-hidden bg-[#1e1e1e]"
      style={{ minHeight }}
    />
  );
}
