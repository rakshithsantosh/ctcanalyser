import React from 'react';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import HowItWorks from '../components/HowItWorks';
import InsightPreview from '../components/InsightPreview';
import TrustSection from '../components/TrustSection';
import SalaryAnalyzer from '../components/SalaryAnalyzer';

const Home: React.FC = () => {
    return (
        <>
            <HeroSection />
            <ProblemSection />
            <HowItWorks />
            <InsightPreview />
            <TrustSection />
            <SalaryAnalyzer />
        </>
    );
};

export default Home;
