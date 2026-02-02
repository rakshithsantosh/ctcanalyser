import React, { useState, useEffect } from 'react';
import { calculateTakeHome, calculateNewRegime, calculateOldRegime } from '../utils/taxCalculator';
import type { SalaryInputs } from '../utils/taxCalculator';
import { generateInsights } from '../utils/salaryInsights';
import { Link } from 'react-router-dom';

interface SmartResultProps {
    ctc: number;
}

const SmartResult: React.FC<SmartResultProps> = ({ ctc }) => {
    // Initial default state based on standard market standards
    const [inputs, setInputs] = useState<SalaryInputs>({
        basic: ctc * 0.4,
        hra: ctc * 0.2, // 50% of Basic
        special: ctc * 0.35, // Remainder placeholder
        variable: 0,
        employeePF: 21600, // 1800 * 12 default cap
        employerPF: 0,
        gratuity: 0,
        otherAllowances: 0,
        rentPaid: 0,
        deduction80C: 0
    });

    const [regime, setRegime] = useState<'OLD' | 'NEW'>('NEW');

    // Feature Toggles for simple view
    const [hasRent, setHasRent] = useState(false);
    const [hasPF, setHasPF] = useState(true);
    const [hasVariable, setHasVariable] = useState(false);
    const [has80C, setHas80C] = useState(false);

    // Advanced Edit Mode
    const [isEditing, setIsEditing] = useState(false);

    // Sync Toggles to Inputs
    useEffect(() => {
        setInputs(prev => ({
            ...prev,
            rentPaid: hasRent ? (prev.rentPaid || 15000 * 12) : 0,
            variable: hasVariable ? (prev.variable || ctc * 0.1) : 0,
            employeePF: hasPF ? (prev.employeePF || 21600) : 0,
            deduction80C: has80C ? 150000 : 0
        }));
    }, [hasRent, hasPF, hasVariable, has80C, ctc]);

    // Recalculate Balance (Special Allowance) whenever components change
    // This ensures CTC remains constant (or we allow it to float? "Customize Salary Structure" usually implies rebalancing)
    // For simplicity, we'll auto-balance 'Special Allowance' to match CTC if possible.
    // Gross Earnings = Basic + HRA + Special + Variable. (Ignoring Employer PF for simplicity in "Instant" view)

    // Derived Calculations using simplified logic for display
    const inputsForCalc: SalaryInputs = {
        ...inputs
    };

    // Calculate Tax for BOTH regimes to show comparison
    const grossForCalc = inputsForCalc.basic + inputsForCalc.hra + inputsForCalc.special + inputsForCalc.variable + inputsForCalc.otherAllowances;
    const oldRegimeResult = calculateOldRegime(inputsForCalc);
    const newRegimeResult = calculateNewRegime(grossForCalc);

    const activeTax = regime === 'NEW' ? newRegimeResult.totalTax : oldRegimeResult.totalTax;
    const takeHome = calculateTakeHome(inputsForCalc, activeTax);

    const betterRegime = newRegimeResult.totalTax < oldRegimeResult.totalTax ? 'NEW' : 'OLD';
    const savings = Math.abs(newRegimeResult.totalTax - oldRegimeResult.totalTax);

    // Generate Insights
    const insights = generateInsights(inputsForCalc, oldRegimeResult, newRegimeResult);

    return (
        <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Main Result Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 mb-8">
                <div className="bg-slate-900 p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
                    <p className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-2">Estimated Monthly Take Home</p>
                    <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4">
                        ₹ {takeHome.monthly.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </h2>

                    {/* Insights / Regime Badge */}
                    <div className="inline-flex items-center space-x-2 bg-slate-800 rounded-full px-4 py-1 mb-4">
                        <span className="text-xs text-slate-400">{regime === 'NEW' ? 'New Regime' : 'Old Regime'}</span>
                        {betterRegime !== regime && (
                            <span className="text-xs text-yellow-400 font-bold">• Switch to {betterRegime} Save ₹{savings.toLocaleString('en-IN')}</span>
                        )}
                        {betterRegime === regime && (
                            <span className="text-xs text-green-400 font-bold">• Optimal Regime</span>
                        )}
                    </div>

                    <div className="flex justify-center flex-wrap items-center gap-4 text-slate-400 text-sm">
                        <span>Annual: ₹ {takeHome.annual.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        <span>•</span>
                        <span>Tax: ₹ {activeTax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                </div>

                {/* Refinement Bar */}
                <div className="p-4 bg-slate-50 border-b border-slate-200 overflow-x-auto">
                    <div className="flex space-x-3 items-center min-w-max px-2">
                        <span className="text-xs font-bold text-slate-400 uppercase mr-2">Quick Refine:</span>

                        <button
                            onClick={() => setRegime(r => r === 'NEW' ? 'OLD' : 'NEW')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${regime === 'NEW' ? 'bg-indigo-100 border-indigo-200 text-indigo-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                        >
                            <span>Regime: {regime}</span>
                        </button>

                        <button
                            onClick={() => setHasRent(!hasRent)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${hasRent ? 'bg-indigo-100 border-indigo-200 text-indigo-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                        >
                            <span>{hasRent ? 'Rent Enabled' : 'Pay Rent?'}</span>
                        </button>
                        <button
                            onClick={() => setHasPF(!hasPF)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${hasPF ? 'bg-indigo-100 border-indigo-200 text-indigo-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                        >
                            <span>{hasPF ? 'PF Enabled' : 'Skip PF?'}</span>
                        </button>
                        <button
                            onClick={() => setHasVariable(!hasVariable)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${hasVariable ? 'bg-indigo-100 border-indigo-200 text-indigo-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                        >
                            <span>{hasVariable ? 'Variable Pay' : 'Add Variable'}</span>
                        </button>

                        {/* 80C Toggle (Only effective in Old Regime) */}
                        {regime === 'OLD' && (
                            <button
                                onClick={() => setHas80C(!has80C)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${has80C ? 'bg-indigo-100 border-indigo-200 text-indigo-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                            >
                                <span>{has80C ? '80C Included' : 'Include 80C'}</span>
                            </button>
                        )}

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 text-sm font-medium ml-4 font-bold"
                        >
                            <span>{isEditing ? 'Hide Details' : 'Edit Salary Structure'}</span>
                        </button>
                    </div>
                </div>

                {/* Advanced Inputs Drawer */}
                {isEditing && (
                    <div className="p-6 bg-white border-t border-slate-100 animate-in slide-in-from-top-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase mb-4">Earnings</h3>
                                <div className="space-y-3">
                                    {/* Basic */}
                                    <div>
                                        <label className="block text-xs text-slate-500 font-medium mb-1">Basic Salary</label>
                                        <input
                                            type="number"
                                            value={inputs.basic}
                                            onChange={e => setInputs({ ...inputs, basic: parseFloat(e.target.value) || 0 })}
                                            className="w-full p-2 border rounded text-sm"
                                        />
                                    </div>
                                    {/* HRA */}
                                    <div>
                                        <label className="block text-xs text-slate-500 font-medium mb-1">HRA</label>
                                        <input
                                            type="number"
                                            value={inputs.hra}
                                            onChange={e => setInputs({ ...inputs, hra: parseFloat(e.target.value) || 0 })}
                                            className="w-full p-2 border rounded text-sm"
                                        />
                                    </div>
                                    {/* Special */}
                                    <div>
                                        <label className="block text-xs text-slate-500 font-medium mb-1">Special Allowance</label>
                                        <input
                                            type="number"
                                            value={inputs.special}
                                            onChange={e => setInputs({ ...inputs, special: parseFloat(e.target.value) || 0 })}
                                            className="w-full p-2 border rounded text-sm"
                                        />
                                    </div>
                                    {/* Variable */}
                                    <div>
                                        <label className="block text-xs text-slate-500 font-medium mb-1">Variable Pay</label>
                                        <input
                                            type="number"
                                            value={inputs.variable}
                                            onChange={e => setInputs({ ...inputs, variable: parseFloat(e.target.value) || 0 })}
                                            className="w-full p-2 border rounded text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase mb-4">Deductions & Exemptions</h3>
                                <div className="space-y-3">
                                    {/* Rent Paid */}
                                    <div>
                                        <label className="block text-xs text-slate-500 font-medium mb-1">Annual Rent Paid</label>
                                        <input
                                            type="number"
                                            value={inputs.rentPaid}
                                            onChange={e => setInputs({ ...inputs, rentPaid: parseFloat(e.target.value) || 0 })}
                                            className="w-full p-2 border rounded text-sm"
                                            placeholder="Annual rent"
                                        />
                                    </div>
                                    {/* 80C */}
                                    <div>
                                        <label className="block text-xs text-slate-500 font-medium mb-1">80C Investments</label>
                                        <input
                                            type="number"
                                            value={inputs.deduction80C}
                                            onChange={e => setInputs({ ...inputs, deduction80C: parseFloat(e.target.value) || 0 })}
                                            className="w-full p-2 border rounded text-sm"
                                            placeholder="Max 1.5L"
                                        />
                                    </div>
                                    {/* PF */}
                                    <div>
                                        <label className="block text-xs text-slate-500 font-medium mb-1">Employee PF (Annual)</label>
                                        <input
                                            type="number"
                                            value={inputs.employeePF}
                                            onChange={e => setInputs({ ...inputs, employeePF: parseFloat(e.target.value) || 0 })}
                                            className="w-full p-2 border rounded text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Insights Section */}
                {insights.length > 0 && (
                    <div className="bg-slate-50 p-6 border-t border-slate-200">
                        <h4 className="text-sm font-bold text-slate-900 uppercase mb-4">AI Smart Insights</h4>
                        <div className="grid gap-3">
                            {insights.map((insight, idx) => (
                                <div key={idx} className={`p-4 rounded-xl border ${insight.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-green-50 border-green-200 text-green-900'}`}>
                                    <h5 className="font-bold text-sm mb-1">{insight.title}</h5>
                                    <p className="text-sm opacity-90">{insight.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-slate-50 p-4 text-center border-t border-slate-200">
                    <Link to="/breakdown" className="text-indigo-600 font-semibold hover:text-indigo-800 text-sm flex items-center justify-center">
                        See detailed calculation logic <span className="ml-1">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SmartResult;
