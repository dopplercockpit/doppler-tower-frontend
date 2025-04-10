
// src/App.tsx
import React from 'react';
import IndexPage from "@/pages/Index";
import { Toaster } from "@/components/ui/toaster";
import "./styles/ff7-theme.css";
import "./styles/weather-components.css";

function App() {
  return (
    <main className="min-h-screen bg-gray-100">
      <IndexPage />
      <Toaster />
    </main>
  );
}

export default App;
