import { useNestorMode } from "@/contexts/NestorModeContext";
import { Brain } from "lucide-react";

const NestorToggle = () => {
  const { isNestorMode, toggleNestorMode, isPanelOpen } = useNestorMode();

  return (
    <button
      onClick={toggleNestorMode}
      disabled={isPanelOpen}
      className={`fixed top-3 left-3 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
        isPanelOpen ? "opacity-0 pointer-events-none" : ""
      } ${
        isNestorMode
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40 scale-105"
          : "bg-secondary text-muted-foreground hover:bg-accent border border-border"
      }`}
    >
      <Brain className="w-3.5 h-3.5" />
      {isNestorMode ? "Nestor ON" : "Nestor"}
    </button>
  );
};

export default NestorToggle;
