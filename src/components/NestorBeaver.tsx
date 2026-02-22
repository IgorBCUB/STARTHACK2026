import nestorHappy from "@/assets/nestor-happy.png";
import nestorNeutral from "@/assets/nestor-neutral.png";
import nestorSad from "@/assets/nestor-sad.png";

interface NestorBeaverProps {
  visible: boolean;
  /** 0-100 health score */
  score?: number;
}

const getMoodImage = (score: number) => {
  if (score >= 65) return nestorHappy;
  if (score >= 35) return nestorNeutral;
  return nestorSad;
};

const getMoodLabel = (score: number) => {
  if (score >= 65) return "Your portfolio is doing great!";
  if (score >= 35) return "Your portfolio is holding steady";
  return "Your portfolio needs attention";
};

const NestorBeaver = ({ visible, score = 78 }: NestorBeaverProps) => {
  if (!visible) return null;

  return (
    <div className="flex flex-col items-center gap-2 animate-in fade-in duration-500">
      <img
        src={getMoodImage(score)}
        alt="Nestor the Beaver"
        className="w-24 h-24 object-contain drop-shadow-lg"
      />
      <p className="text-xs font-medium text-muted-foreground">{getMoodLabel(score)}</p>
    </div>
  );
};

export default NestorBeaver;
