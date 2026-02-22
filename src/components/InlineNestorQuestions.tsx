import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";

interface InlineNestorQuestionsProps {
  questions: { label: string; question: string }[];
  onSelect: (q: { label: string; question: string }) => void;
  /** Ref to the parent box element to measure position */
  anchorRef?: React.RefObject<HTMLElement>;
}

const InlineNestorQuestions = ({ questions, onSelect, anchorRef }: InlineNestorQuestionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<"below" | "above">("below");

  const calculatePlacement = useCallback(() => {
    const anchor = anchorRef?.current;
    if (!anchor) {
      // Fallback: use the container itself
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.top;
      const estimatedHeight = questions.length * 56 + (questions.length - 1) * 8 + 16;
      setPlacement(spaceBelow < estimatedHeight && rect.top > estimatedHeight ? "above" : "below");
      return;
    }

    const anchorRect = anchor.getBoundingClientRect();
    const estimatedHeight = questions.length * 56 + (questions.length - 1) * 8 + 16;
    const spaceBelow = window.innerHeight - anchorRect.bottom;
    const spaceAbove = anchorRect.top;

    if (spaceBelow >= estimatedHeight) {
      setPlacement("below");
    } else if (spaceAbove >= estimatedHeight) {
      setPlacement("above");
    } else {
      // Default to whichever has more space
      setPlacement(spaceBelow >= spaceAbove ? "below" : "above");
    }
  }, [anchorRef, questions.length]);

  useEffect(() => {
    calculatePlacement();
  }, [calculatePlacement]);

  return (
    <div
      ref={containerRef}
      className={`space-y-2 animate-in fade-in duration-200 ${
        placement === "above"
          ? "mb-3 slide-in-from-bottom-2"
          : "mt-3 slide-in-from-top-2"
      }`}
      style={{ order: placement === "above" ? -1 : 1 }}
    >
      {questions.map((q) => (
        <button
          key={q.label}
          onClick={(e) => { e.stopPropagation(); onSelect(q); }}
          className="w-full text-left px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 hover:border-primary hover:bg-primary/15 transition-all text-sm text-foreground font-medium flex items-center justify-between group"
        >
          {q.label}
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      ))}
    </div>
  );
};

export default InlineNestorQuestions;
