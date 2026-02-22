import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NestorModeProvider } from "@/contexts/NestorModeContext";
import NestorToggle from "@/components/NestorToggle";
import HomeScreen from "./pages/HomeScreen";
import FinanceScreen from "./pages/FinanceScreen";
import ExploreScreen from "./pages/ExploreScreen";
import AssetDetailScreen from "./pages/AssetDetailScreen";
import InvestPreviewScreen from "./pages/InvestPreviewScreen";
import CardsScreen from "./pages/CardsScreen";
import NotFound from "./pages/NotFound";
import PortfolioFutureScreen from "./pages/PortfolioFutureScreen";
import AssetFutureDetail from "./pages/AssetFutureDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NestorModeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NestorToggle />
          <Routes>
            <Route path="/" element={<FinanceScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/explore" element={<ExploreScreen />} />
            <Route path="/asset" element={<AssetDetailScreen />} />
            <Route path="/invest" element={<InvestPreviewScreen />} />
            <Route path="/cards" element={<CardsScreen />} />
            <Route path="/portfolio-future" element={<PortfolioFutureScreen />} />
            <Route path="/portfolio-future/:assetId" element={<AssetFutureDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NestorModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
