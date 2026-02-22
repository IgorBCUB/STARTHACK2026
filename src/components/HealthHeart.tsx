import { Heart } from "lucide-react";

interface HealthHeartProps {
  /** 0 to 100 — portfolio health score */
  score: number;
}

const HealthHeart = ({ score }: HealthHeartProps) => {
  // Determine color intensity based on score
  const getHeartColor = () => {
    if (score >= 75) return "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]";
    if (score >= 50) return "text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]";
    if (score >= 25) return "text-red-300/60 drop-shadow-none";
    return "text-red-200/40 drop-shadow-none";
  };

  const getLabel = () => {
    if (score >= 75) return "Excelente";
    if (score >= 50) return "Bueno";
    if (score >= 25) return "Regular";
    return "Bajo";
  };

  return;









};

export default HealthHeart;