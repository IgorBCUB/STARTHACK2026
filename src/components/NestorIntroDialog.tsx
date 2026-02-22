import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import nestorHappy from "@/assets/nestor-happy.png";

interface NestorIntroDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NestorIntroDialog = ({ open, onOpenChange }: NestorIntroDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[380px] rounded-2xl p-0 overflow-hidden border-primary/30">
        <div className="bg-primary/10 px-6 pt-6 pb-4 flex flex-col items-center gap-3">
          <img src={nestorHappy} alt="Nestor" className="w-28 h-28 object-contain drop-shadow-lg" />
          <DialogTitle className="text-xl font-bold text-foreground text-center">
            Hi! I'm Nestor
          </DialogTitle>
        </div>

        <div className="px-6 pb-6 pt-2 space-y-4 max-h-[50vh] overflow-y-auto">
          <p className="text-sm text-foreground leading-relaxed">
            I'm your personal financial beaver. Yes, a beaver. Don't ask.
          </p>

          <p className="text-sm text-foreground leading-relaxed">
            My job is to help you understand your finances in a simple way, no drama or weird jargon.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            <strong>I analyze your portfolio</strong> — I tell you how your investments are doing and what you could improve.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            <strong>I answer your questions</strong> — Ask me anything about your finances. No judgment.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            <strong>I monitor your financial health</strong> — That little color bar you see up there? That's my doing.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            <strong>I give you ideas</strong> — If I spot something interesting, I'll let you know. I'm nice like that.
          </p>

          <p className="text-sm text-foreground leading-relaxed">
            Activate my mode by tapping the toggle and watch things come to life.
          </p>

          <p className="text-xs text-muted-foreground text-center italic">
            PS: I build dams in my free time.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NestorIntroDialog;
