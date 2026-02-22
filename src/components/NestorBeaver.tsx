import nestorBeaver from "@/assets/nestor-beaver-peeking.png";

interface NestorBeaverProps {
  visible: boolean;
}

const NestorBeaver = ({ visible }: NestorBeaverProps) => {
  if (!visible) return null;

  return (
    <div
      className="absolute -top-10 right-4 z-10 transition-all duration-500 animate-in slide-in-from-bottom-4"
      style={{ pointerEvents: "none" }}
    >
      <img
        src={nestorBeaver}
        alt="Nestor the Beaver"
        className="w-16 h-16 object-contain drop-shadow-lg"
      />
    </div>
  );
};

export default NestorBeaver;
