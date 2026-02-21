import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, ArrowRight, Info } from "lucide-react";

const InvestPreviewScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => navigate("/asset")} className="text-foreground">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-base font-bold text-foreground">Transaction Preview</h1>
            <button onClick={() => navigate("/")} className="text-foreground">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Transfer visual */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
              <div className="w-6 h-6 rounded bg-muted-foreground/30" />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
              <span className="text-[7px] font-bold text-primary-foreground leading-tight text-center">iShares</span>
            </div>
          </div>

          {/* Amount */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">You're about to invest</p>
            <p className="text-5xl font-bold text-foreground">150 €</p>
          </div>

          {/* Info pill */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-foreground font-medium">
              📋 What you need to know
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-8">
            <DetailRow label="ETF" value="Core DAX iShares" />
            <DetailRow label="Shares" value="≈ 1.17 EXS1" />
            <DetailRow label="Price per share" value="≈ 127.90 €" hasInfo />
            <div className="border-t border-border pt-4">
              <DetailRow label="Total" value="150.00 €" bold />
            </div>
            <DetailRow label="Commission" value="0.90 €" hasInfo />
          </div>

          {/* Cost document link */}
          <button className="text-primary text-sm font-medium mb-8 flex items-center gap-1.5">
            📄 Cost information document
          </button>

          {/* CTA */}
          <button className="w-full py-4 bg-primary text-primary-foreground rounded-xl text-base font-semibold mb-3">
            Invest Now
          </button>
          <p className="text-[10px] text-muted-foreground text-center leading-tight px-4">
            By continuing, you instruct N26 to send the order to Upvest for execution on Tradegate Exchange when available.
          </p>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  bold = false,
  hasInfo = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  hasInfo?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-1.5">
      <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>{label}</span>
      {hasInfo && <Info className="w-3.5 h-3.5 text-muted-foreground" />}
    </div>
    <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-foreground"}`}>{value}</span>
  </div>
);

export default InvestPreviewScreen;
