import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
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
          {/* Faraid, Wasiyyah & About moved to separate pages/apps */}
          <Route path="/faraid" element={<Navigate to="/" replace />} />
          <Route path="/wasiyyah" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
