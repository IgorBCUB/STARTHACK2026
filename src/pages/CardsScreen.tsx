import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Snowflake, Settings, Eye, EyeOff, Copy } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useNestorMode } from "@/contexts/NestorModeContext";
import NestorInsightPanel from "@/components/NestorInsightPanel";

const userProfile = {
  name: "Carlos Martínez",
  monthlyIncome: 3200,
  monthlySavingsGoal: 600,
};

const cards = [
  {
    name: "Main Card",
    number: "•••• •••• •••• 4829",
    expiry: "09/27",
    type: "Visa",
    balance: "12,026.00 €",
    color: "from-foreground to-foreground/80",
    spending: {
      total: 1124,
      categories: [
        { name: "Supermercados (Mercadona, Lidl)", amount: 312 },
        { name: "Restaurantes y delivery (Uber Eats, Glovo)", amount: 198 },
        { name: "Transporte (gasolina, parking)", amount: 156 },
        { name: "Suscripciones (Netflix, Spotify, iCloud, gym)", amount: 89 },
        { name: "Compras online (Amazon, Zara)", amount: 214 },
        { name: "Ocio y salidas", amount: 155 },
      ],
      lastMonth: 1387,
      avgMonthly: 1250,
    },
  },
  {
    name: "Savings Card",
    number: "•••• •••• •••• 7153",
    expiry: "03/28",
    type: "Mastercard",
    balance: "3,882.00 €",
    color: "from-primary to-primary/70",
    spending: {
      total: 240,
      categories: [
        { name: "Transferencia a inversión (ETFs)", amount: 150 },
        { name: "Seguro médico privado", amount: 65 },
        { name: "Donación mensual (ONG)", amount: 25 },
      ],
      lastMonth: 215,
      avgMonthly: 230,
    },
  },
];

const recentCardActivity = [
  { merchant: "Apple Store", amount: "-149.00 €", date: "Today", card: "Main Card" },
  { merchant: "Uber Eats", amount: "-23.40 €", date: "Today", card: "Main Card" },
  { merchant: "Lidl", amount: "-45.87 €", date: "Yesterday", card: "Main Card" },
];

const buildCardContext = (card: typeof cards[0]) => {
  const catBreakdown = card.spending.categories.map(c => `  - ${c.name}: ${c.amount} €`).join("\n");
  return `${card.name} (${card.type}) – Saldo: ${card.balance}
Usuario: ${userProfile.name} | Ingresos: ${userProfile.monthlyIncome} €/mes | Objetivo ahorro: ${userProfile.monthlySavingsGoal} €/mes
Gasto este mes: ${card.spending.total} € | Mes anterior: ${card.spending.lastMonth} € | Media mensual: ${card.spending.avgMonthly} €
Desglose por categoría:
${catBreakdown}`;
};

const insightData: Record<string, { context: string; questions: { label: string; question: string }[] }> = {
  "card-0": {
    context: buildCardContext(cards[0]),
    questions: [
      { label: "¿En qué estoy gastando más?", question: `Given this user's exact spending breakdown this month (Supermercados: 312€, Restaurantes/delivery: 198€, Transporte: 156€, Suscripciones: 89€, Compras online: 214€, Ocio: 155€ — total 1,124€), which categories are above average and where can they cut back? Compare with last month's 1,387€.` },
      { label: "¿Estoy gastando demasiado?", question: `This user earns 3,200€/month and spent 1,124€ on their main card this month (vs 1,387€ last month). Their savings goal is 600€/month. Analyze if their spending is sustainable and what adjustments they should make. Be specific with numbers.` },
      { label: "¿Cómo puedo reducir suscripciones?", question: `The user pays 89€/month in subscriptions: Netflix, Spotify, iCloud, and gym membership. Are there ways to optimize this? Shared plans, alternatives, or subscriptions they might not need? Give specific savings estimates.` },
    ],
  },
  "card-1": {
    context: buildCardContext(cards[1]),
    questions: [
      { label: "¿Estoy ahorrando suficiente?", question: `The user has 3,882€ in their savings card and invests 150€/month in ETFs with a 600€/month savings goal. They earn 3,200€. Is their savings rate healthy? What percentage of income should go to savings and investment?` },
      { label: "¿Debería invertir más desde esta tarjeta?", question: `The user currently transfers 150€/month from their savings card to ETFs. With a balance of 3,882€ and monthly income of 3,200€, should they increase their investment amount? What's a good emergency fund target before investing more?` },
      { label: "¿Cómo optimizar los gastos fijos?", question: `The user pays 65€/month for private health insurance and 25€/month in donations from their savings card. Are these amounts reasonable? Any ways to optimize fixed expenses while maintaining coverage?` },
    ],
  },
  spending: {
    context: `Gasto mensual total: 1,364 € (Main: 1,124€ + Savings: 240€) de un límite de 2,000€ (68% usado)
Usuario: ${userProfile.name} | Ingresos: ${userProfile.monthlyIncome} €/mes | Objetivo ahorro: ${userProfile.monthlySavingsGoal} €/mes
Top gastos: Supermercados 312€, Compras online 214€, Restaurantes 198€, Transporte 156€, Ocio 155€
Mes anterior total: 1,602€ | Media mensual: 1,480€`,
    questions: [
      { label: "¿Cómo reducir mis gastos mensuales?", question: `The user spent 1,364€ total this month (down from 1,602€ last month). Top categories: groceries 312€, online shopping 214€, restaurants 198€, transport 156€, entertainment 155€. They earn 3,200€ and want to save 600€/month. Give specific, actionable tips for each category.` },
      { label: "¿Mi límite de gasto es adecuado?", question: `The user has a 2,000€ monthly limit and used 68% (1,364€). They earn 3,200€/month with a 600€ savings goal. Is this limit too high, too low, or just right? What's the ideal spending-to-income ratio?` },
      { label: "¿Qué patrones debo vigilar?", question: `Analyzing the user's spending: online shopping jumped to 214€ (was ~150€ avg), restaurants/delivery at 198€ is consistent. Subscriptions are 89€ fixed. What patterns are concerning? What's likely impulse spending vs essential? Give month-over-month insights.` },
    ],
  },
};

const CardsScreen = () => {
  const navigate = useNavigate();
  const { isNestorMode } = useNestorMode();
  const [activeCard, setActiveCard] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [insightTarget, setInsightTarget] = useState<string | null>(null);

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
                    setInsightTarget(`card-${i}`);
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
