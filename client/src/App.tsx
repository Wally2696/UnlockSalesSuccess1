import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { ThemeProvider } from "@/components/theme-provider";
import CustomCursor from "./components/custom-cursor";

import AdminFeedback from "@/pages/admin-feedback";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/feedback" component={AdminFeedback} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="razorpayx-theme">
        <TooltipProvider>
          <CustomCursor />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
