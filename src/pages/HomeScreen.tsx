import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowRight, CalendarDays, Lightbulb, Eye, List, Bookmark } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useNestorMode } from "@/contexts/NestorModeContext";
import NestorInsightPanel from "@/components/NestorInsightPanel";
import InlineNestorQuestions from "@/components/InlineNestorQuestions";
import nestorDudando from "@/assets/nestor-dudando.png";
import HealthHeart from "@/components/HealthHeart";

const transactions = [
{ name: "Spotify", category: "Subscription", amount: "-9.99 €", date: "Today", icon: "🎵" },
{ name: "Salary", category: "Income", amount: "+2,450.00 €", date: "Yesterday", icon: "💼", positive: true },
{ name: "Rewe", category: "Groceries", amount: "-34.12 €", date: "Yesterday", icon: "🛒" },
{ name: "Amazon", category: "Shopping", amount: "-67.50 €", date: "Feb 18", icon: "📦" },
{ name: "Netflix", category: "Subscription", amount: "-12.99 €", date: "Feb 17", icon: "🎬" }];


const groupedTransactions = transactions.reduce<Record<string, typeof transactions>>((acc, tx) => {
  const key = tx.date.toUpperCase();
  if (!acc[key]) acc[key] = [];
  acc[key].push(tx);
  return acc;
}, {});

type InsightTarget = "main-account" | "spending" | null;

const insightQuestions: Record<string, {context: string;questions: {label: string;question: string;}[];}> = {
  "main-account": {
    context: "Main Account (15,908.00 €)",
    questions: [
    { label: "💰 Am I saving enough?", question: "Based on a main account balance of €15,908 with monthly income of €2,450 and expenses of €1,124, am I saving enough? What benchmarks should I compare against for someone in Europe?" },
    { label: "📊 How should I allocate my money?", question: "I have €15,908 in my main account. My monthly income is €2,450 and expenses are €1,124. How should I allocate between savings, investments, and emergency fund?" },
    { label: "⚡ What's the opportunity cost?", question: "I have €15,908 sitting in my main account earning no interest. What is the opportunity cost of not investing this money? What are the safest options available in Europe right now?" }]

  },
  spending: {
    context: "Monthly Spending (€1,124 expenses, €2,450 income)",
    questions: [
    { label: "🔍 Where am I overspending?", question: "My monthly expenses are €1,124 with spending on subscriptions (Spotify €9.99, Netflix €12.99), groceries (Rewe €34.12), and shopping (Amazon €67.50). Where might I be overspending and what could I optimize?" },
    { label: "📈 How does my spending compare?", question: "I spend about €1,124/month with an income of €2,450. How does my spending ratio compare to recommended benchmarks like the 50/30/20 rule? Am I on track?" },
    { label: "💡 Tips to save more each month?", question: "With €2,450 income and €1,124 expenses, give me practical, easy-to-follow tips to save more each month. What subscriptions or habits should I review?" }]

  }
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const { isNestorMode } = useNestorMode();
  const [insightTarget, setInsightTarget] = useState<InsightTarget>(null);
  const [activeQuestion, setActiveQuestion] = useState<{context: string;questions: {label: string;question: string;}[];selected: {label: string;question: string;};} | null>(null);
  const mainAccountRef = useRef<HTMLButtonElement>(null);
  const spendingRef = useRef<HTMLButtonElement>(null);

  const handleBoxClick = (target: InsightTarget) => {
    if (isNestorMode) {
      setInsightTarget((prev) => prev === target ? null : target);
    }
  };

  const handleQuestionSelect = (q: {label: string;question: string;}) => {
    if (insightTarget && insightQuestions[insightTarget]) {
      setActiveQuestion({
        context: insightQuestions[insightTarget].context,
        questions: insightQuestions[insightTarget].questions,
        selected: q
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col">
        <div className="px-5 pt-14 pb-16">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-bold text-foreground">Home</h1>
            <div className={`flex items-center gap-4 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
              <Eye className="w-5 h-5 text-muted-foreground" />
              <List className="w-5 h-5 text-muted-foreground" />
              <Bookmark className="w-5 h-5 text-muted-foreground" />
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">ND</div>
            </div>
          </div>

          {/* Main account card */}
          <div className={`relative mb-6 flex flex-col transition-opacity duration-300 ${insightTarget && insightTarget !== "main-account" ? "opacity-20 pointer-events-none" : ""}`}>
            <button
              ref={mainAccountRef}
              onClick={() => handleBoxClick("main-account")}
              className={`w-full text-left bg-primary/15 border rounded-2xl p-5 transition-all overflow-hidden ${
              isNestorMode ?
              insightTarget === "main-account" ?
              "border-2 border-primary ring-2 ring-primary/30 pb-0" :
              "border-2 border-primary/60 hover:border-primary cursor-pointer pb-0" :
              "border-primary/30"}`
              }>

              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-foreground">Main account</p>
                  <span className="text-muted-foreground">⚙</span>
                </div>
                {isNestorMode && <HealthHeart score={78} />}
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground">Personal</p>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">15,908.00 €</p>
              {isNestorMode &&
              <div className="mt-3 flex items-end gap-4">
                  <img src={nestorDudando} alt="Nestor" className="w-40 h-40 object-contain drop-shadow-lg flex-shrink-0 translate-y-6" />
                  <div className="flex-1 bg-primary/10 rounded-xl p-3 mb-4">
                    <p className="text-sm font-medium text-foreground leading-snug">¡Hola! Tu cartera está en buen estado 💪</p>
                    <p className="text-xs text-muted-foreground mt-1">Sigue así, estás ahorrando un 54% de tus ingresos.</p>
                  </div>
                </div>
              }
            </button>
            {insightTarget === "main-account" &&
            <InlineNestorQuestions questions={insightQuestions["main-account"].questions} onSelect={handleQuestionSelect} anchorRef={mainAccountRef} />
            }
          </div>

          {/* Quick actions - hidden in Nestor mode */}
          {!isNestorMode &&
          <div className="flex justify-between px-2 mb-8">
              {[
            { icon: <Plus className="w-5 h-5" />, label: "Add money", outlined: true },
            { icon: <ArrowRight className="w-5 h-5" />, label: "Send money", filled: true },
            { icon: <CalendarDays className="w-5 h-5" />, label: "Scheduled" },
            { icon: <Lightbulb className="w-5 h-5" />, label: "Insights" }].
            map((action) =>
            <div key={action.label} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              action.filled ? "bg-primary text-primary-foreground" : action.outlined ? "border-2 border-primary text-primary" : "border border-border text-foreground"}`
              }>{action.icon}</div>
                  <span className="text-[10px] font-medium text-foreground text-center leading-tight w-16">{action.label}</span>
                </div>
            )}
            </div>
          }

          {/* Spending summary */}
          <div className={`flex flex-col transition-opacity duration-300 ${insightTarget && insightTarget !== "spending" ? "opacity-20 pointer-events-none" : ""}`}>
            <button
              ref={spendingRef}
              onClick={() => handleBoxClick("spending")}
              className={`w-full text-left bg-secondary rounded-xl p-4 mb-3 transition-all ${
              isNestorMode ?
              insightTarget === "spending" ?
              "border-2 border-primary ring-2 ring-primary/30" :
              "border-2 border-primary/60 hover:border-primary cursor-pointer" :
              ""}`
              }>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">Monthly Spending</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Income: +2,450 € · Expenses: -1,124 €</p>
                </div>
                <p className="text-lg font-bold text-success">+54%</p>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden mt-3">
                <div className="h-full bg-primary rounded-full" style={{ width: "46%" }} />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">46% of income spent</p>
            </button>
            {insightTarget === "spending" &&
            <InlineNestorQuestions questions={insightQuestions["spending"].questions} onSelect={handleQuestionSelect} anchorRef={spendingRef} />
            }
          </div>

          {/* Transaction list */}
          <div className={`transition-opacity duration-300 ${insightTarget ? "opacity-20 pointer-events-none" : ""}`}>
            {Object.entries(groupedTransactions).map(([date, txs]) =>
            <div key={date} className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{date}</p>
                  {date === "TODAY" &&
                <button className={`text-xs text-primary font-medium ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>see all</button>
                }
                </div>
                <div className={isNestorMode ? "opacity-30 pointer-events-none" : ""}>
                  {txs.map((tx, i) =>
                <div key={i} className="flex items-center justify-between py-3.5 border-b border-border last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-sm">{tx.icon}</div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{tx.name}</p>
                          <p className="text-xs text-muted-foreground">{tx.category}</p>
                        </div>
                      </div>
                      <p className={`text-sm font-medium ${tx.positive ? "text-success" : "text-foreground"}`}>{tx.amount}</p>
                    </div>
                )}
                </div>
              </div>
            )}
          </div>
        </div>

        <BottomNav />

        {activeQuestion &&
        <NestorInsightPanel
          context={activeQuestion.context}
          questions={activeQuestion.questions}
          onClose={() => {setActiveQuestion(null);setInsightTarget(null);}}
          onNavigate={(route) => {setActiveQuestion(null);setInsightTarget(null);navigate(route);}} />

        }
      </div>
    </div>);

};

export default HomeScreen;