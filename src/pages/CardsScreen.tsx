import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Snowflake, Settings, Eye, EyeOff, Copy } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useNestorMode } from "@/contexts/NestorModeContext";
import NestorInsightPanel from "@/components/NestorInsightPanel";

const cards = [
  {
    name: "Main Card",
    number: "•••• •••• •••• 4829",
    expiry: "09/27",
    type: "Visa",
    balance: "12,026.00 €",
    color: "from-foreground to-foreground/80",
  },
  {
    name: "Savings Card",
    number: "•••• •••• •••• 7153",
    expiry: "03/28",
    type: "Mastercard",
    balance: "3,882.00 €",
    color: "from-primary to-primary/70",
  },
];

const recentCardActivity = [
  { merchant: "Apple Store", amount: "-149.00 €", date: "Today", card: "Main Card" },
  { merchant: "Uber Eats", amount: "-23.40 €", date: "Today", card: "Main Card" },
  { merchant: "Lidl", amount: "-45.87 €", date: "Yesterday", card: "Main Card" },
];

type InsightTarget = "card-main" | "card-savings" | "spending" | null;

const insightData: Record<Exclude<InsightTarget, null>, { context: string; questions: { label: string; question: string }[] }> = {
  "card-main": {
    context: "Main Card (Visa) – Balance: 12,026.00 €",
    questions: [
      { label: "¿En qué consiste el gasto de esta tarjeta?", question: "Break down the typical spending categories and patterns for this Visa card with a 12,026€ balance. What are the main expenses?" },
      { label: "¿Estoy gastando demasiado?", question: "Analyze if spending 1,124€ out of a 2,000€ monthly limit on this card is healthy. Am I overspending?" },
      { label: "¿Debería tener otra tarjeta?", question: "Should I consider having a second card for specific expenses? What are the pros and cons of splitting spending across cards?" },
    ],
  },
  "card-savings": {
    context: "Savings Card (Mastercard) – Balance: 3,882.00 €",
    questions: [
      { label: "¿Para qué debería usar esta tarjeta?", question: "What's the best strategy for using a dedicated savings card with 3,882€? Should I reserve it for specific purchases?" },
      { label: "¿Cómo optimizar los beneficios?", question: "How can I maximize the benefits of a Mastercard savings card? What rewards or cashback programs should I look into?" },
      { label: "¿Conviene consolidar tarjetas?", question: "Is it better to consolidate my spending into one card or keep two separate cards for different purposes?" },
    ],
  },
  spending: {
    context: "Monthly Spending – 1,124 € of 2,000 € limit used (56%)",
    questions: [
      { label: "¿Cómo reducir mis gastos mensuales?", question: "I've spent 1,124€ out of my 2,000€ monthly limit. What practical tips can help me reduce monthly card spending?" },
      { label: "¿Es saludable mi límite de gasto?", question: "Is a 2,000€ monthly spending limit appropriate? How should I set my limit based on income and savings goals?" },
      { label: "¿Qué patrones de gasto debo vigilar?", question: "What spending patterns should I watch out for? Common traps like subscriptions, impulse purchases, etc." },
    ],
  },
};

const CardsScreen = () => {
  const navigate = useNavigate();
  const { isNestorMode } = useNestorMode();
  const [activeCard, setActiveCard] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [insightTarget, setInsightTarget] = useState<InsightTarget>(null);

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Cards</h1>
            <button className={`w-8 h-8 rounded-full bg-secondary flex items-center justify-center ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
              <Plus className="w-4 h-4 text-foreground" />
            </button>
          </div>

          {/* Card carousel */}
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">
            {cards.map((card, i) => (
              <button
                key={i}
                onClick={() => {
                  if (isNestorMode) {
                    setInsightTarget(i === 0 ? "card-main" : "card-savings");
                  } else {
                    setActiveCard(i);
                  }
                }}
                className={`flex-shrink-0 w-[85%] snap-center rounded-2xl p-5 bg-gradient-to-br ${card.color} text-primary-foreground transition-all ${
                  activeCard === i ? "scale-100" : "scale-95 opacity-70"
                } ${isNestorMode ? "ring-2 ring-primary/50 animate-pulse cursor-pointer opacity-100" : ""}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <p className="text-sm font-medium opacity-80">{card.name}</p>
                  <p className="text-xs font-bold">{card.type}</p>
                </div>
                <p className="text-lg font-mono tracking-wider mb-6">{card.number}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] opacity-60">EXPIRES</p>
                    <p className="text-sm font-medium">{card.expiry}</p>
                  </div>
                  <p className="text-xl font-bold">{card.balance}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Card actions */}
          <div className={`flex gap-3 mb-6 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
            {[
              { icon: <Snowflake className="w-4 h-4" />, label: "Freeze" },
              { icon: showNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />, label: showNumber ? "Hide" : "Show", action: () => setShowNumber(!showNumber) },
              { icon: <Copy className="w-4 h-4" />, label: "Copy" },
              { icon: <Settings className="w-4 h-4" />, label: "Settings" },
            ].map((action) => (
              <button
                key={action.label}
                onClick={action.action}
                className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl bg-secondary"
              >
                <div className="text-muted-foreground">{action.icon}</div>
                <span className="text-[10px] font-medium text-foreground">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Spending limits */}
          <button
            onClick={() => isNestorMode && setInsightTarget("spending")}
            className={`w-full text-left bg-secondary rounded-xl p-4 mb-6 transition-all ${
              isNestorMode ? "ring-2 ring-primary/50 animate-pulse cursor-pointer" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-foreground">Monthly Spending</p>
              <p className="text-xs text-muted-foreground">1,124 € / 2,000 €</p>
            </div>
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "56%" }} />
            </div>
          </button>

          {/* Recent activity */}
          <div>
            <p className="font-bold text-foreground mb-3">Recent Transactions</p>
            <div className={`space-y-1 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
              {recentCardActivity.map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{tx.merchant}</p>
                    <p className="text-xs text-muted-foreground">{tx.card} · {tx.date}</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{tx.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>

      {/* Nestor Insight Panel */}
      {insightTarget && insightData[insightTarget] && (
        <NestorInsightPanel
          context={insightData[insightTarget].context}
          questions={insightData[insightTarget].questions}
          onClose={() => setInsightTarget(null)}
          onNavigate={(route) => { setInsightTarget(null); navigate(route); }}
        />
      )}
    </div>
  );
};

export default CardsScreen;
