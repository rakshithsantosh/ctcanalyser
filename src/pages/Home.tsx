import React, { useState } from 'react';
import HeroInput from '../components/HeroInput';
import SmartResult from '../components/SmartResult';
import ProblemSection from '../components/ProblemSection';
import HowItWorks from '../components/HowItWorks';
import TrustSection from '../components/TrustSection';

const Home: React.FC = () => {
    const [ctc, setCtc] = useState<number | null>(null);

    const handleCalculate = (value: number) => {
        setCtc(value);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Hero / Calculator Area */}
            <div className="flex flex-col items-center">
                {!ctc ? (
                    <HeroInput onCalculate={handleCalculate} />
                ) : (
                    <div className="w-full py-12 px-4 transition-all duration-500">
                        <div className="text-center mb-8">
                            <button
                                onClick={() => setCtc(null)}
                                className="text-slate-400 hover:text-slate-600 text-sm font-medium mb-2"
                            >
                                ← Start Over
                            </button>
                            <h1 className="text-3xl font-bold text-slate-900">
                                CTC: ₹ {ctc.toLocaleString('en-IN')}
                            </h1>
                        </div>
                        <SmartResult ctc={ctc} />
                    </div>
                )}
            </div>

            {/* Restored Landing Page Content */}
            <ProblemSection />
            <HowItWorks />
            <TrustSection />
        </div>
    );
};

export default Home;
