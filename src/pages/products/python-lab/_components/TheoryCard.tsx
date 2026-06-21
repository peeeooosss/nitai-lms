import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TheoryCardProps {
  title: string;
  content: string;
  onComplete?: () => void;
}

function renderMarkdown(text: string): string {
  let html = text
    .replace(/^### (.+)$/gm, "<h3 class='text-base font-bold text-foreground mt-4 mb-2'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-lg font-bold text-foreground mt-5 mb-2'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-xl font-bold text-foreground mt-5 mb-3'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='font-semibold'>$1</strong>")
    .replace(/`(.+?)`/g, "<code class='bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary'>$1</code>")
    .replace(/^>>> (.+)$/gm, "<div class='pl-4 border-l-2 border-primary/40 text-muted-foreground italic text-sm my-2'>$1</div>");

  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class='bg-muted/50 border border-border rounded-lg p-3 my-3 overflow-x-auto text-sm font-mono leading-relaxed'>${code
      .trim()
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</pre>`;
  });

  html = html.replace(/```/g, "");

  const lines = html.split("\n");
  const result: string[] = [];
  let inParagraph = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (
      !trimmed ||
      trimmed.startsWith("<h") ||
      trimmed.startsWith("<pre") ||
      trimmed.startsWith("<div") ||
      trimmed === "</pre>" ||
      trimmed === "</div>"
    ) {
      if (inParagraph) {
        result.push("</p>");
        inParagraph = false;
      }
      if (trimmed) result.push(line);
      continue;
    }

    if (!inParagraph) {
      result.push("<p class='text-sm text-muted-foreground leading-relaxed mb-3'>");
      inParagraph = true;
    }
    result.push(line);
  }

  if (inParagraph) result.push("</p>");

  return result.join("\n");
}

export default function TheoryCard({ title, content, onComplete }: TheoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setIsExpanded(false);
    onComplete?.();
  };

  return (
    <div
      className={`rounded-xl border transition-all ${
        isCompleted ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20" : "border-border bg-card"
      }`}
    >
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="cursor-pointer w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">
            {isCompleted ? "Theory — Done!" : title}
          </h3>
          {isCompleted && <CheckCircle2 className="w-4 h-4 text-green-500" />}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
              />
              {!isCompleted && (
                <button
                  onClick={handleComplete}
                  className="cursor-pointer mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Got it!
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
