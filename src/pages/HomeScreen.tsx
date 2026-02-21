import { useNavigate } from "react-router-dom";
import { Bell, Settings, TrendingUp, ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useNestorMode } from "@/contexts/NestorModeContext";

const transactions = [
  { name: "Spotify", category: "Subscription", amount: "-9.99 €", date: "Today", icon: "🎵" },
  { name: "Salary", category: "Income", amount: "+2,450.00 €", date: "Yesterday", icon: "💼", positive: true },
  { name: "Rewe", category: "Groceries", amount: "-34.12 €", date: "Yesterday", icon: "🛒" },
  { name: "Amazon", category: "Shopping", amount: "-67.50 €", date: "Feb 18", icon: "📦" },
  { name: "Netflix", category: "Subscription", amount: "-12.99 €", date: "Feb 17", icon: "🎬" },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const { isNestorMode } = useNestorMode();

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="px-5 pt-14 pb-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Good morning 👋</p>
              <h1 className="text-2xl font-bold text-foreground">Alex</h1>
            </div>
            <div className={`flex items-center gap-3 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
              <Bell className="w-5 h-5 text-muted-foreground" />
              <Settings className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Balance overview */}
          <div className={`bg-secondary rounded-2xl p-5 mb-6 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
            <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
            <p className="text-3xl font-bold text-foreground mb-3">15,908.00 €</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-success" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Income</p>
                  <p className="text-xs font-semibold text-foreground">+2,450 €</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-danger/20 flex items-center justify-center">
                  <ArrowDownRight className="w-3.5 h-3.5 text-danger" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Expenses</p>
                  <p className="text-xs font-semibold text-foreground">-1,124 €</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className={`flex gap-4 mb-6 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
            {[
              { icon: <Wallet className="w-5 h-5" />, label: "Send" },
              { icon: <ArrowDownRight className="w-5 h-5" />, label: "Request" },
              { icon: <TrendingUp className="w-5 h-5" />, label: "Invest", action: () => navigate("/explore") },
            ].map((action) => (
              <button
                key={action.label}
                onClick={action.action}
                className="flex-1 flex flex-col items-center gap-2 py-3 rounded-xl bg-secondary"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {action.icon}
                </div>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Recent transactions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-foreground">Recent Activity</p>
              <button className={`text-xs text-primary font-medium ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
                See all
              </button>
            </div>
            <div className={`space-y-1 ${isNestorMode ? "opacity-30 pointer-events-none" : ""}`}>
              {transactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                      {tx.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{tx.name}</p>
                      <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${tx.positive ? "text-success" : "text-foreground"}`}>
                    {tx.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default HomeScreen;
