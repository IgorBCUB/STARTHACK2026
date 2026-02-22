import { X } from "lucide-react";
import { useNestorMode } from "@/contexts/NestorModeContext";
import nestorWaving from "@/assets/nestor-waving.png";

interface NestorIntroDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NestorIntroDialog = ({ open, onOpenChange }: NestorIntroDialogProps) => {
  const { isNestorMode } = useNestorMode();

  if (!open) return null;

  const dark = isNestorMode;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className={`relative rounded-2xl w-full max-w-[380px] overflow-hidden shadow-2xl ${dark ? "bg-[#1a1a1a]" : "bg-background"}`}>
        <button
          onClick={() => onOpenChange(false)}
          className={`absolute top-3 right-3 z-10 transition-colors ${dark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-6 pt-8 pb-4">
          <h1 className={`text-[2.2rem] font-black leading-none tracking-tight ${dark ? "text-white" : "text-foreground"}`}>
            I'M Nestor
          </h1>
          <p className={`text-xs italic mt-1 mb-5 ${dark ? "text-white/40" : "text-muted-foreground"}`}>nice to meet you</p>

          <div className="space-y-3 text-[0.85rem] leading-snug">
            <p className={dark ? "text-white/80" : "text-foreground/80"}>
              Your personal financial beaver. Yes, a beaver. Don't ask.
            </p>
            <p className="text-primary font-medium">I analyze your portfolio</p>
            <p className="text-primary font-medium">I answer your questions</p>
            <p className="text-primary font-medium">I monitor your financial health</p>
            <p className={`text-[0.8rem] ${dark ? "text-white/50" : "text-muted-foreground"}`}>
              Tap the toggle to activate my mode.
            </p>
          </div>

          <div className="flex justify-center mt-4">
            <img
              src={nestorWaving}
              alt="Nestor the beaver waving"
              className="w-44 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NestorIntroDialog;
