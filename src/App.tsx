import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import WeeklyBrief from "@/pages/WeeklyBrief";
import PipelinePreview from "@/pages/PipelinePreview";
import PhaseMap from "@/pages/PhaseMap";
import WeeklyCheckins from "@/pages/WeeklyCheckins";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<WeeklyBrief />} />
            <Route path="/pipeline" element={<PipelinePreview />} />
            <Route path="/phase" element={<PhaseMap />} />
            <Route path="/weekly" element={<WeeklyCheckins />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
