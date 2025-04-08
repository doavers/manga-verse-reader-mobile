
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./pages/HomePage";
import MangaDetailPage from "./pages/MangaDetailPage";
import ChapterPage from "./pages/ChapterPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  const handleSplashFinished = () => {
    setShowSplash(false);
    setAppReady(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {showSplash && <SplashScreen onFinish={handleSplashFinished} />}
        
        {appReady && (
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/manga/:id" element={<MangaDetailPage />} />
                <Route path="/manga/:id/chapter/:chapterId" element={<ChapterPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              <BottomNavigation />
            </div>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
