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
        special: ctc * 0.4, // Remainder to make it 100% (40+20+40)
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
    const [showBreakdown, setShowBreakdown] = useState(false);

    // Advanced Edit Mode
    const [isEditing, setIsEditing] = useState(false);

    // Sync Toggles AND CTC changes to Inputs
    useEffect(() => {
        setInputs(prev => ({
            ...prev,
            // Recalculate base components if CTC changed (and user hasn't heavily customized? We assume restart on CTC change)
            // But we must preserve toggles.
            // Actually, simpler logic: If CTC implies a reset, we should maybe reset. 
            // For now, let's just ensure the 'variable' and rent logic respects toggles, 
            // and we fix the initial state issue above. 
            // If we want to support dynamic CTC updates without remount, we need more logic. 
            // Assuming for now the inputs are stable unless edited.

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

    const activeResult = regime === 'NEW' ? newRegimeResult : oldRegimeResult;
    const activeTax = activeResult.totalTax;
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
                    <div className="flex justify-center gap-2 mb-4">
                        <div className="inline-flex items-center space-x-2 bg-slate-800 rounded-full px-4 py-1">
                            <span className="text-xs text-slate-400">Regime:</span>
                            <span className={`text-xs font-bold ${regime === 'NEW' ? 'text-green-400' : 'text-blue-400'}`}>
                                {regime === 'NEW' ? 'New (FY 25-26 Proposed)' : 'Old'}
                            </span>
                        </div>
                        {betterRegime !== regime && (
                            <div className="inline-flex items-center space-x-2 bg-yellow-900/30 border border-yellow-700/50 rounded-full px-4 py-1">
                                <span className="text-xs text-yellow-400 font-bold">• Switch to {betterRegime} Save ₹{savings.toLocaleString('en-IN')}</span>
                            </div>
                        )}
                        {betterRegime === regime && savings > 0 && (
                            <div className="inline-flex items-center space-x-2 bg-green-900/30 border border-green-700/50 rounded-full px-4 py-1">
                                <span className="text-xs text-green-400 font-bold">• Optimal Regime Selected</span>
                            </div>
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
                        {/* Regime Switcher Segmented Control */}
                        <div className="bg-white border border-slate-300 rounded-full p-1 flex items-center mr-2">
                            <button
                                onClick={() => setRegime('NEW')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${regime === 'NEW' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                New Regime
                            </button>
                            <button
                                onClick={() => setRegime('OLD')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${regime === 'OLD' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                Old Regime
                            </button>
                        </div>

                        <div className="h-6 w-px bg-slate-200 mx-2"></div>

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
                            <span>{isEditing ? 'Hide Details' : 'Edit Structure'}</span>
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

                {/* Tax Breakdown Section */}
                <div className="border-t border-slate-100">
                    <button
                        onClick={() => setShowBreakdown(!showBreakdown)}
                        className="w-full p-4 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
                    >
                        <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform transition-transform ${showBreakdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            Tax Calculation Breakdown
                        </span>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            {regime === 'NEW' ? 'FY 25-26 Proposed' : 'Old Regime'}
                        </span>
                    </button>

                    {showBreakdown && (
                        <div className="p-6 bg-slate-50/50 animate-in slide-in-from-top-2">
                            <div className="space-y-4 max-w-2xl mx-auto">
                                <div className="flex justify-between text-sm py-2 border-b border-dashed border-slate-200">
                                    <span className="text-slate-500">Gross Earnings</span>
                                    <span className="font-semibold text-slate-900">₹ {Math.round(grossForCalc).toLocaleString('en-IN')}</span>
                                </div>

                                {regime === 'NEW' ? (
                                    <>
                                        <div className="flex justify-between text-sm py-2 border-b border-dashed border-slate-200">
                                            <span className="text-slate-500">Standard Deduction</span>
                                            <span className="font-semibold text-green-600">- ₹ {activeResult.standardDeduction?.toLocaleString('en-IN') || '0'}</span>
                                        </div>
                                        <div className="flex justify-between text-base font-bold py-2 bg-slate-100 px-3 rounded">
                                            <span className="text-slate-700">Taxable Income</span>
                                            <span className="text-slate-900">₹ {Math.round(activeResult.taxableIncome).toLocaleString('en-IN')}</span>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Slab Breakdown</p>
                                            {activeResult.breakdown?.map((slab, idx) => (
                                                <div key={idx} className="flex justify-between text-xs py-1">
                                                    <span className="text-slate-500">{slab.label} (@ {slab.rate})</span>
                                                    <span className="font-medium text-slate-700">₹ {Math.round(slab.amount).toLocaleString('en-IN')}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {activeResult.rebate && activeResult.rebate > 0 ? (
                                            <div className="flex justify-between text-sm py-2 border-y border-dashed border-slate-200 mt-2 bg-green-50 px-2 rounded">
                                                <span className="text-green-700 font-medium">Rebate u/s 87A</span>
                                                <span className="font-bold text-green-700">- ₹ {Math.round(activeResult.rebate).toLocaleString('en-IN')}</span>
                                            </div>
                                        ) : null}

                                        {activeResult.marginalRelief && activeResult.marginalRelief > 0 ? (
                                            <div className="flex justify-between text-sm py-2 border-y border-dashed border-slate-200 mt-2 bg-blue-50 px-2 rounded">
                                                <span className="text-blue-700 font-medium">Marginal Relief</span>
                                                <span className="font-bold text-blue-700">- ₹ {Math.round(activeResult.marginalRelief).toLocaleString('en-IN')}</span>
                                            </div>
                                        ) : null}
                                    </>
                                ) : (
                                    <>
                                        {/* Old Regime Summary - Simplified for now since we didn't add breakdown to Old Regime Calc yet */}
                                        <div className="flex justify-between text-base font-bold py-2 bg-slate-100 px-3 rounded">
                                            <span className="text-slate-700">Taxable Income</span>
                                            <span className="text-slate-900">₹ {Math.round(activeResult.taxableIncome).toLocaleString('en-IN')}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2 italic">Detailed breakdown view currently optimized for New Regime due to complex exemptions in Old Regime.</p>
                                    </>
                                )}

                                <div className="flex justify-between text-sm py-1 mt-2">
                                    <span className="text-slate-500">Health & Education Cess (4%)</span>
                                    <span className="font-medium text-slate-900">₹ {Math.round(activeResult.cess).toLocaleString('en-IN')}</span>
                                </div>

                                <div className="flex justify-between text-lg font-extrabold py-3 border-t-2 border-slate-200 mt-2">
                                    <span className="text-indigo-900">Net Tax Payable</span>
                                    <span className="text-indigo-600">₹ {Math.round(activeResult.totalTax).toLocaleString('en-IN')}</span>
                                </div>

                                <p className="text-[10px] text-slate-400 text-center mt-6">
                                    Disclaimer: Tax calculations are indicative and based on FY 2025-26 proposed rules / current laws. Please consult a qualified tax professional before filing.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

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
                    <Link to="/breakdown" className="text-indigo-600 font-semibold hover:text-indigo-800 text-sm flex items-center justify-center opacity-50">
                        Full Breakdown Page <span className="ml-1">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SmartResult;
