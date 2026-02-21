import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NestorModeProvider } from "@/contexts/NestorModeContext";
import NestorToggle from "@/components/NestorToggle";
import FinanceScreen from "./pages/FinanceScreen";
import ExploreScreen from "./pages/ExploreScreen";
import AssetDetailScreen from "./pages/AssetDetailScreen";
import InvestPreviewScreen from "./pages/InvestPreviewScreen";
import NotFound from "./pages/NotFound";

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
            <Route path="/explore" element={<ExploreScreen />} />
            <Route path="/asset" element={<AssetDetailScreen />} />
            <Route path="/invest" element={<InvestPreviewScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NestorModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
