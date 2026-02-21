import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Info, CreditCard, Plus, Monitor, ChevronRight, Home, BarChart3, Search, CreditCard as CardIcon, TrendingUp, Bitcoin } from "lucide-react";

const FinanceScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="px-5 pt-14 pb-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Finances</h1>
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-muted-foreground" />
              <Info className="w-5 h-5 text-muted-foreground" />
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">
                AB
              </div>
            </div>
          </div>

          {/* Spaces */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-1">Spaces</p>
            <p className="text-3xl font-bold text-foreground">12,026.00 €</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-6 mb-6">
            <button
              onClick={() => navigate("/explore")}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xs text-foreground font-medium">New Space</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                <Monitor className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-xs text-foreground font-medium">Automations</span>
            </button>
          </div>

          {/* Main account */}
          <div className="bg-secondary rounded-xl p-4 flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <div className="w-6 h-6 rounded bg-primary/30" />
              </div>
              <span className="font-semibold text-foreground">Main Account</span>
            </div>
            <span className="font-semibold text-foreground">12,026.00 €</span>
          </div>

          {/* Investments */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-foreground">Investments</p>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">3,882.00 €</p>
            <p className="text-xs text-muted-foreground mb-4">Last updated 12:05</p>

            {/* Stocks & ETFs */}
            <button
              onClick={() => navigate("/explore")}
              className="w-full bg-secondary rounded-xl p-4 flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">Stocks & ETFs</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">2,620.00 €</p>
                <p className="text-xs text-success font-medium">▲ 6 %</p>
              </div>
            </button>

            {/* Crypto */}
            <div className="w-full bg-secondary rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Bitcoin className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-semibold text-foreground">Crypto</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">1,262.00 €</p>
                <p className="text-xs text-success font-medium">▲ 12 %</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="mt-auto border-t border-border">
          <div className="flex justify-around py-3">
            <NavItem icon={<Home className="w-5 h-5" />} label="Home" />
            <NavItem icon={<BarChart3 className="w-5 h-5" />} label="Finances" active />
            <NavItem icon={<Search className="w-5 h-5" />} label="Explore" />
            <NavItem icon={<CardIcon className="w-5 h-5" />} label="Cards" />
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <div className={`flex flex-col items-center gap-1 ${active ? "text-primary" : "text-muted-foreground"}`}>
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </div>
);

export default FinanceScreen;
