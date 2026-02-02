import React from 'react';
import type { TaxResult } from '../utils/taxCalculator';
import type { Insight } from '../utils/salaryInsights';

interface ResultsDashboardProps {
    oldRegime: TaxResult;
    newRegime: TaxResult;
    insights: Insight[];
    monthlyInHand: number;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ oldRegime, newRegime, insights, monthlyInHand }) => {
    const bestRegime = oldRegime.totalTax < newRegime.totalTax ? 'Old Regime' : 'New Regime';
    const taxSaved = Math.abs(oldRegime.totalTax - newRegime.totalTax);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-12 animate-fade-in-up">

            {/* Primary Result */}
            <div className="text-center space-y-4">
                <h2 className="text-xl text-slate-500 font-medium">Your Monthly Take-Home (Approx)</h2>
                <div className="text-6xl sm:text-7xl font-bold text-slate-900 tracking-tight">
                    ₹ {Math.round(monthlyInHand).toLocaleString('en-IN')}
                </div>
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-semibold">
                    <span>Best Option: {bestRegime}</span>
                    {taxSaved > 0 && <span>(Save ₹{taxSaved.toLocaleString('en-IN')})</span>}
                </div>
            </div>

            {/* Comparisons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-8 rounded-2xl border-2 ${bestRegime === 'Old Regime' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-900">Old Regime</h3>
                        {bestRegime === 'Old Regime' && <span className="bg-indigo-600 text-white md:px-3 px-2 py-1 rounded text-xs uppercase font-bold">Recommended</span>}
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-slate-600">
                            <span>Taxable Income</span>
                            <span className="font-semibold">₹ {oldRegime.taxableIncome.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Tax + Cess</span>
                            <span className="font-semibold text-red-600">₹ {oldRegime.totalTax.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                <div className={`p-8 rounded-2xl border-2 ${bestRegime === 'New Regime' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-900">New Regime</h3>
                        {bestRegime === 'New Regime' && <span className="bg-indigo-600 text-white px-3 py-1 rounded text-xs uppercase font-bold">Recommended</span>}
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-slate-600">
                            <span>Taxable Income</span>
                            <span className="font-semibold">₹ {newRegime.taxableIncome.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Tax + Cess</span>
                            <span className="font-semibold text-red-600">₹ {newRegime.totalTax.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Insights Grid */}
            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Salary Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {insights.map((insight, idx) => {
                        const colors = {
                            danger: 'bg-red-50 border-red-200 text-red-900',
                            warning: 'bg-amber-50 border-amber-200 text-amber-900',
                            success: 'bg-green-50 border-green-200 text-green-900',
                            info: 'bg-blue-50 border-blue-200 text-blue-900'
                        };

                        return (
                            <div key={idx} className={`p-6 rounded-xl border ${colors[insight.type]}`}>
                                <h4 className="font-bold text-lg mb-2">{insight.title}</h4>
                                <p className="text-sm opacity-90">{insight.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ResultsDashboard;
