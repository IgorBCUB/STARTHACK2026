import { X } from "lucide-react";
import nestorWaving from "@/assets/nestor-waving.png";

interface NestorIntroDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NestorIntroDialog = ({ open, onOpenChange }: NestorIntroDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="relative bg-[#1a1a1a] rounded-2xl w-full max-w-[380px] overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 z-10 text-white/60 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-6 pt-8 pb-4">
          <h1 className="text-[2.2rem] font-black text-white leading-none tracking-tight">
            I'M Nestor
          </h1>
          <p className="text-white/40 text-xs italic mt-1 mb-5">nice to meet you</p>

          <div className="space-y-3 text-[0.85rem] leading-snug">
            <p className="text-white/80">
              Your personal financial beaver. Yes, a beaver. Don't ask.
            </p>
            <p className="text-primary font-medium">I analyze your portfolio</p>
            <p className="text-primary font-medium">I answer your questions</p>
            <p className="text-primary font-medium">I monitor your financial health</p>
            <p className="text-white/50 text-[0.8rem]">
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
