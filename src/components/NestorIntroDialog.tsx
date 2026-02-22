import { X } from "lucide-react";
import nestorWaving from "@/assets/nestor-waving.png";

interface NestorIntroDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NestorIntroDialog = ({ open, onOpenChange }: NestorIntroDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col overflow-y-auto">
      {/* Close button */}
      <button
        onClick={() => onOpenChange(false)}
        className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pt-12 pb-0">
        {/* Title */}
        <h1 className="text-[2.8rem] font-black text-white leading-none tracking-tight">
          I'M Nestor
        </h1>
        <p className="text-white/60 text-sm italic mt-1 mb-8">nice to meet you</p>

        {/* Body text */}
        <div className="space-y-5 text-[0.95rem] leading-relaxed text-white/90">
          <p>
            I'm your personal financial beaver.
            <br />
            Yes, a beaver. Don't ask.
          </p>
          <p>
            My job is to help you understand your finances in a simple way.
          </p>
          <p>No drama or weird jargon.</p>
          <p>I analyze your portfolio</p>
          <p>I answer your questions</p>
          <p>
            I monitor your financial health
            <br />
            That little color bar you see up there? That's my doing.
          </p>
          <p>
            Activate my mode by tapping the toggle and watch things come to life.
          </p>
        </div>
      </div>

      {/* Beaver image at bottom */}
      <div className="flex justify-center mt-auto">
        <img
          src={nestorWaving}
          alt="Nestor the beaver waving"
          className="w-64 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default NestorIntroDialog;
