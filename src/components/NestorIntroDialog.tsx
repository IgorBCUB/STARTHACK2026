import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import nestorHappy from "@/assets/nestor-happy.png";
import { X } from "lucide-react";

interface NestorIntroDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NestorIntroDialog = ({ open, onOpenChange }: NestorIntroDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[380px] rounded-2xl p-0 overflow-hidden border-primary/30">
        {/* Header with Nestor */}
        <div className="bg-primary/10 px-6 pt-6 pb-4 flex flex-col items-center gap-3">
          <img src={nestorHappy} alt="Nestor" className="w-28 h-28 object-contain drop-shadow-lg" />
          <DialogTitle className="text-xl font-bold text-foreground text-center">
            ¡Hola! Soy Nestor 🦫
          </DialogTitle>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 pt-2 space-y-4 max-h-[50vh] overflow-y-auto">
          <p className="text-sm text-foreground leading-relaxed">
            Soy tu castor financiero personal. Sí, un castor. No preguntes. 😅
          </p>

          <p className="text-sm text-foreground leading-relaxed">
            Mi trabajo es ayudarte a entender tus finanzas de forma simple, sin dramas ni tecnicismos raros.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            🔍 <strong>Analizo tu cartera</strong> — Te digo cómo van tus inversiones y qué podrías mejorar.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            💬 <strong>Respondo tus dudas</strong> — Pregúntame lo que quieras sobre tus finanzas. Sin juicio.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            📊 <strong>Vigilo tu salud financiera</strong> — Esa barrita de colores que ves arriba es cosa mía.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            💡 <strong>Te doy ideas</strong> — Si veo algo interesante, te lo cuento. Soy así de majo.
          </p>

          <p className="text-sm text-foreground leading-relaxed">
            Activa mi modo tocando el interruptor y verás cómo las cosas cobran vida. ✨
          </p>

          <p className="text-xs text-muted-foreground text-center italic">
            PD: Construyo presas en mi tiempo libre. 🪵
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NestorIntroDialog;
