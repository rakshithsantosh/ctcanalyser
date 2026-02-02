import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import InsightPreview from './components/InsightPreview';
import TrustSection from './components/TrustSection';
import SalaryAnalyzer from './components/SalaryAnalyzer';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-800">
      <HeroSection />
      <ProblemSection />
      <HowItWorks />
      <InsightPreview />
      <TrustSection />
      <SalaryAnalyzer />
      <Footer />
    </div>
  );
}

export default App;
