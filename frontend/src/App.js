import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/About';
import { Toaster } from './components/ui/sonner';

function App() {
  useEffect(() => {
    document.title = 'Zamzam Capital · Zakat Calculator';
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Faraid & Wasiyyah moved to a separate app (Zamzam Capital Inheritance & Will Calculator) */}
          <Route path="/faraid" element={<Navigate to="/" replace />} />
          <Route path="/wasiyyah" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
