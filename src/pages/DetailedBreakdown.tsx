import React from 'react';
import TrustSection from '../components/TrustSection';
import { Link } from 'react-router-dom';

const DetailedBreakdown: React.FC = () => {
    // In a real app, we'd pass state via context or URL params. 
    // For this V2 demo, let's show a static example or "Simulation Mode" since state isn't persistent across routes yet.
    // Or better, let's just show the Logic/Trust section and a generic example.

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link to="/" className="text-indigo-600 font-medium hover:text-indigo-800">← Back to Calculator</Link>
                    <h1 className="text-3xl font-bold text-slate-900 mt-4">Detailed Breakdown</h1>
                    <p className="text-slate-500 mt-2">Understanding how your tax is calculated.</p>
                </div>

                <TrustSection />

                <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Tax Regime Comparison Logic</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                            <h3 className="font-semibold text-slate-700 mb-2">New Regime (Default)</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                                <li>Lower tax rates.</li>
                                <li>Standard Deduction: ₹75,000.</li>
                                <li>No HRA or 80C exemptions.</li>
                                <li>Best for those with fewer investments/rent.</li>
                            </ul>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                            <h3 className="font-semibold text-slate-700 mb-2">Old Regime</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                                <li>Higher tax rates.</li>
                                <li>Allows HRA Exemption.</li>
                                <li>Allows 80C Deduction (up to 1.5L).</li>
                                <li>Best for those with high rent and investments.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedBreakdown;
