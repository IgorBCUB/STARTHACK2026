import { useState } from "react";
import { useNestorMode } from "@/contexts/NestorModeContext";
import { Brain } from "lucide-react";
import NestorIntroDialog from "@/components/NestorIntroDialog";

const NestorToggle = () => {
  const { isNestorMode, toggleNestorMode, isPanelOpen } = useNestorMode();
  const [introOpen, setIntroOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed top-3 left-3 right-3 z-50 flex items-center justify-between transition-all duration-300 ${
          isPanelOpen ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <button
          onClick={toggleNestorMode}
          disabled={isPanelOpen}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
            isNestorMode
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40 scale-105"
              : "bg-secondary text-muted-foreground hover:bg-accent border border-border"
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          {isNestorMode ? "Nestor ON" : "Nestor"}
        </button>

        <button
          onClick={() => setIntroOpen(true)}
          className="text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors"
        >
          Soy Nestor! Conóceme
        </button>
      </div>

      <NestorIntroDialog open={introOpen} onOpenChange={setIntroOpen} />
    </>
  );
};

export default NestorToggle;
