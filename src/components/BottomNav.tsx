import { useNavigate, useLocation } from "react-router-dom";
import { Home, BarChart3, Search, CreditCard } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: BarChart3, label: "Finances", path: "/" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: CreditCard, label: "Cards", path: "/cards" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background border-t border-border z-30">
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 ${active ? "text-primary" : "text-muted-foreground"}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
