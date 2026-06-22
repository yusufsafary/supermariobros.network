import React from "react";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import Home from "@/pages/Home";
import Play from "@/pages/Play";
import About from "@/pages/About";
import HowToPlay from "@/pages/HowToPlay";
import CookiePolicy from "@/pages/CookiePolicy";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <Router hook={useHashLocation}>
      <TooltipProvider>
        <Switch>
          <Route path="/play" component={Play} />
          <Route>
            <>
              <Navbar />
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/how-to-play" component={HowToPlay} />
                <Route path="/cookie-policy" component={CookiePolicy} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/terms" component={Terms} />
                <Route component={NotFound} />
              </Switch>
            </>
          </Route>
        </Switch>
        <Toaster />
      </TooltipProvider>
    </Router>
  );
}

export default App;
