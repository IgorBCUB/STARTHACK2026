import { Heart } from "lucide-react";

interface HealthHeartProps {
  /** 0 to 100 — portfolio health score */
  score: number;
}

const HealthHeart = ({ score }: HealthHeartProps) => {
  const getBarColor = () => {
    if (score >= 75) return "bg-emerald-500";
    if (score >= 50) return "bg-yellow-400";
    if (score >= 25) return "bg-orange-400";
    return "bg-red-500";
  };

  const getTrackColor = () => {
    if (score >= 75) return "bg-emerald-500/20";
    if (score >= 50) return "bg-yellow-400/20";
    if (score >= 25) return "bg-orange-400/20";
    return "bg-red-500/20";
  };

  const getLabel = () => {
    if (score >= 75) return "Excelente";
    if (score >= 50) return "Bueno";
    if (score >= 25) return "Regular";
    return "Bajo";
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{getLabel()}</span>
        <span className="text-xs font-bold text-foreground">{score}%</span>
      </div>
      <div className={`w-20 h-2 rounded-full ${getTrackColor()} overflow-hidden`}>
        <div className={`h-full rounded-full ${getBarColor()} transition-all duration-500`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );




};

export default HealthHeart;