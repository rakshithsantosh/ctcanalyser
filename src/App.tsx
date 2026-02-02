import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DetailedBreakdown from './pages/DetailedBreakdown';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-800 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/breakdown" element={<DetailedBreakdown />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
