import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Snowflake, Settings, Eye, EyeOff, Copy } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import nestorCabeza from "@/assets/nestor-cabeza.png";
import { useNestorMode } from "@/contexts/NestorModeContext";
import NestorInsightPanel from "@/components/NestorInsightPanel";
import InlineNestorQuestions from "@/components/InlineNestorQuestions";

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

const buildAIContext = (card: typeof cards[0]) => {
  const catBreakdown = card.spending.categories.map(c => `  - ${c.name}: ${c.amount} €`).join("\n");
  return `${card.name} (${card.type}) – Saldo: ${card.balance}
Usuario: ${userProfile.name} | Ingresos: ${userProfile.monthlyIncome} €/mes | Objetivo ahorro: ${userProfile.monthlySavingsGoal} €/mes
Gasto este mes: ${card.spending.total} € | Mes anterior: ${card.spending.lastMonth} € | Media mensual: ${card.spending.avgMonthly} €
Desglose por categoría:
${catBreakdown}`;
};

const insightData: Record<string, { context: string; questions: { label: string; question: string }[] }> = {
  "card-0": {
    context: "Main Card (Visa) – Balance: 12,026.00 €",
    questions: [
      { label: "¿En qué estoy gastando más?", question: `Context del usuario: ${buildAIContext(cards[0])}\n\nPregunta: ¿Cuáles son las categorías donde más gasto? Analiza el desglose y compara con el mes anterior.` },
      { label: "¿Estoy gastando demasiado?", question: `Context del usuario: ${buildAIContext(cards[0])}\n\nPregunta: Con mis ingresos y objetivo de ahorro, ¿estoy gastando demasiado? Sé específico con los números.` },
      { label: "¿Cómo puedo reducir suscripciones?", question: `Context del usuario: ${buildAIContext(cards[0])}\n\nPregunta: Pago 89€/mes en suscripciones (Netflix, Spotify, iCloud, gym). ¿Cómo puedo optimizar esto? Da estimaciones concretas de ahorro.` },
    ],
  },
  "card-1": {
    context: "Savings Card (Mastercard) – Balance: 3,882.00 €",
    questions: [
      { label: "¿Estoy ahorrando suficiente?", question: `Context del usuario: ${buildAIContext(cards[1])}\n\nPregunta: Con mi saldo actual y mis transferencias mensuales a inversión, ¿estoy ahorrando lo suficiente? ¿Qué porcentaje de mis ingresos debería destinar?` },
      { label: "¿Debería invertir más desde esta tarjeta?", question: `Context del usuario: ${buildAIContext(cards[1])}\n\nPregunta: Actualmente transfiero 150€/mes a ETFs. ¿Debería aumentar? ¿Cuál es un buen fondo de emergencia antes de invertir más?` },
      { label: "¿Cómo optimizar los gastos fijos?", question: `Context del usuario: ${buildAIContext(cards[1])}\n\nPregunta: Pago 65€/mes de seguro médico y 25€/mes en donaciones. ¿Son razonables? ¿Cómo puedo optimizar sin perder cobertura?` },
    ],
  },
  spending: {
    context: "Monthly Spending – 1,124 € of 2,000 € limit used (56%)",
    questions: [
      { label: "¿Cómo reducir mis gastos mensuales?", question: `Context del usuario: ${userProfile.name}, ingresos ${userProfile.monthlyIncome}€/mes, objetivo ahorro ${userProfile.monthlySavingsGoal}€/mes. Gasto total este mes: 1,364€ (Main: 1,124€ + Savings: 240€). Mes anterior: 1,602€. Top gastos: Supermercados 312€, Compras online 214€, Restaurantes 198€, Transporte 156€, Ocio 155€.\n\nPregunta: ¿Cómo puedo reducir mis gastos? Dame consejos específicos para cada categoría.` },
      { label: "¿Mi límite de gasto es adecuado?", question: `Context del usuario: ${userProfile.name}, ingresos ${userProfile.monthlyIncome}€/mes, límite 2,000€, usado 68% (1,364€), objetivo ahorro ${userProfile.monthlySavingsGoal}€/mes.\n\nPregunta: ¿Mi límite de gasto es demasiado alto, bajo o adecuado? ¿Cuál es la ratio ideal gasto/ingresos?` },
      { label: "¿Qué patrones debo vigilar?", question: `Context del usuario: Compras online subieron a 214€ (media ~150€), restaurantes/delivery estable a 198€, suscripciones fijas 89€. Mes anterior total 1,602€, este mes 1,364€.\n\nPregunta: ¿Qué patrones de gasto son preocupantes? ¿Qué es gasto impulsivo vs esencial? Dame análisis mes a mes.` },
    ],
  },
};

const CardsScreen = () => {
  const navigate = useNavigate();
  const { isNestorMode } = useNestorMode();
  const [activeCard, setActiveCard] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [insightTarget, setInsightTarget] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<{ context: string; questions: { label: string; question: string }[]; selected: { label: string; question: string } } | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const spendingRef = useRef<HTMLButtonElement>(null);

  const handleBoxClick = (target: string) => {
    if (isNestorMode) {
      setInsightTarget((prev) => (prev === target ? null : target));
    }
  };

  const handleQuestionSelect = (q: { label: string; question: string }) => {
    if (insightTarget && insightData[insightTarget]) {
      setActiveQuestion({
        context: insightData[insightTarget].context,
        questions: insightData[insightTarget].questions,
        selected: q,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col">
        <div className="px-5 pt-14 pb-4 relative">
          {isNestorMode && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2">
              <img
                src={nestorCabeza}
                alt="Nestor"
                className="w-16 h-16 object-contain"
                style={{ transform: "rotate(180deg)" }}
              />
            </div>
          )}
          <div className={`flex items-center justify-between mb-6 transition-opacity duration-300 ${insightTarget ? "opacity-20 pointer-events-none" : ""}`}>
            <h1 className="text-2xl font-bold text-foreground">Cards</h1>
            <button className={`w-8 h-8 rounded-full bg-secondary flex items-center justify-center ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
              <Plus className="w-4 h-4 text-foreground" />
            </button>
          </div>

          {/* Card carousel */}
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">
            {cards.map((card, i) => {
              const targetKey = `card-${i}`;
              const isSelected = insightTarget === targetKey;
              const isDimmed = insightTarget && !isSelected;
              return (
                <div key={i} className={`flex-shrink-0 w-[85%] snap-center flex flex-col transition-opacity duration-300 ${isDimmed ? "opacity-20 pointer-events-none" : ""}`}>
                  <button
                    ref={(el) => { cardRefs.current[i] = el; }}
                    onClick={() => {
                      if (isNestorMode) {
                        handleBoxClick(targetKey);
                      } else {
                        setActiveCard(i);
                      }
                    }}
                    className={`w-full rounded-2xl p-5 bg-gradient-to-br ${card.color} text-primary-foreground transition-all ${
                      activeCard === i ? "scale-100" : "scale-95 opacity-70"
                    } ${isNestorMode
                      ? isSelected
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background cursor-pointer opacity-100"
                        : "ring-2 ring-primary/50 cursor-pointer opacity-100"
                      : ""
                    }`}
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
                  {isSelected && (
                    <InlineNestorQuestions
                      questions={insightData[targetKey].questions}
                      onSelect={handleQuestionSelect}
                      anchorRef={{ current: cardRefs.current[i] }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Card actions */}
          <div className={`flex gap-3 mb-6 transition-opacity duration-300 ${isNestorMode ? "opacity-30 pointer-events-none" : ""} ${insightTarget ? "opacity-20 pointer-events-none" : ""}`}>
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
          <div className={`mb-6 flex flex-col transition-opacity duration-300 ${insightTarget && insightTarget !== "spending" ? "opacity-20 pointer-events-none" : ""}`}>
            <button
              ref={spendingRef}
              onClick={() => handleBoxClick("spending")}
              className={`w-full text-left bg-secondary rounded-xl p-4 transition-all ${
                isNestorMode
                  ? insightTarget === "spending"
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background cursor-pointer"
                    : "ring-2 ring-primary/50 cursor-pointer"
                  : ""
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
            {insightTarget === "spending" && (
              <InlineNestorQuestions questions={insightData["spending"].questions} onSelect={handleQuestionSelect} anchorRef={spendingRef} />
            )}
          </div>

          {/* Recent activity */}
          <div className={`transition-opacity duration-300 ${insightTarget ? "opacity-20 pointer-events-none" : ""}`}>
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

      {activeQuestion && (
        <NestorInsightPanel
          context={activeQuestion.context}
          questions={activeQuestion.questions}
          initialQuestion={activeQuestion.selected}
          onClose={() => { setActiveQuestion(null); setInsightTarget(null); }}
          onNavigate={(route) => { setActiveQuestion(null); setInsightTarget(null); navigate(route); }}
        />
      )}
    </div>
  );
};

export default CardsScreen;
