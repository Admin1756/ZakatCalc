import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FaraidPage from './pages/FaraidCalculator';
import WasiyyahPage from './pages/WasiyyahWriter';
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
          <Route path="/faraid" element={<FaraidPage />} />
          <Route path="/wasiyyah" element={<WasiyyahPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
