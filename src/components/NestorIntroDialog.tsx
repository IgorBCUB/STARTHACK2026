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
      <div className="relative bg-[#1a1a1a] rounded-2xl w-full max-w-[380px] max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 z-10 text-white/60 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pt-10 pb-4">
          <h1 className="text-[2.4rem] font-black text-white leading-none tracking-tight">
            I'M Nestor
          </h1>
          <p className="text-white/50 text-xs italic mt-1 mb-6">nice to meet you</p>

          <div className="space-y-4 text-[0.9rem] leading-relaxed text-white/85">
            <p>
              I'm your personal financial beaver.
              <br />
              Yes, a beaver. Don't ask.
            </p>
            <p>My job is to help you understand your finances in a simple way.</p>
            <p>No drama or weird jargon.</p>
            <p>I analyze your portfolio</p>
            <p>I answer your questions</p>
            <p>
              I monitor your financial health
              <br />
              That little color bar you see up there? That's my doing.
            </p>
            <p>Activate my mode by tapping the toggle and watch things come to life.</p>
          </div>
        </div>

        {/* Beaver image */}
        <div className="flex justify-center px-4 pb-2">
          <img
            src={nestorWaving}
            alt="Nestor the beaver waving"
            className="w-48 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default NestorIntroDialog;
