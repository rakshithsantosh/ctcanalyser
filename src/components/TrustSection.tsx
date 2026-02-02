import React from 'react';

const TrustSection: React.FC = () => {
    return (
        <section className="py-24 px-6 sm:px-12 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        100% Math.<br />
                        0% Hallucination.
                    </h2>
                    <p className="text-xl text-slate-400 mb-8 leading-relaxed font-light">
                        AI is great for writing cover letters, not for calculating your taxes.
                        We use a strictly rule-based engine encoded with the latest Indian Tax Laws (FY 2024-25).
                    </p>

                    <ul className="space-y-4">
                        <li className="flex items-center space-x-3">
                            <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-sm">✓</span>
                            <span className="text-slate-300">Updated for Budget 2024</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-sm">✓</span>
                            <span className="text-slate-300">Deterministic Calculations</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-sm">✓</span>
                            <span className="text-slate-300">Privacy First - No Data Stored</span>
                        </li>
                    </ul>
                </div>

                <div className="relative group">
                    {/* Background Effects */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

                    <div className="relative bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl flex flex-col items-center space-y-6">

                        {/* Input Node */}
                        <div className="flex flex-col items-center">
                            <div className="bg-slate-700 p-3 rounded-xl border border-slate-600 shadow-sm">
                                <span className="text-white font-medium">Input Data</span>
                            </div>
                            <div className="h-6 w-0.5 bg-slate-600 my-1"></div>
                            <div className="text-slate-500 text-xs">▼</div>
                        </div>

                        {/* Rules Engine Node */}
                        <div className="w-full bg-slate-700/50 rounded-xl p-4 border border-slate-600 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-semibold">Tax Rules Engine</div>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="px-3 py-1 bg-slate-600 rounded-full text-xs text-blue-200 border border-slate-500">Standard Deduction</span>
                                <span className="px-3 py-1 bg-slate-600 rounded-full text-xs text-blue-200 border border-slate-500">PF Cap</span>
                                <span className="px-3 py-1 bg-slate-600 rounded-full text-xs text-blue-200 border border-slate-500">HRA Exemption</span>
                                <span className="px-3 py-1 bg-slate-600 rounded-full text-xs text-blue-200 border border-slate-500">80C Limits</span>
                            </div>
                        </div>

                        {/* Connector */}
                        <div className="flex flex-col items-center">
                            <div className="h-6 w-0.5 bg-slate-600 my-1"></div>
                            <div className="text-slate-500 text-xs">▼</div>
                        </div>

                        {/* Output Node */}
                        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 p-4 rounded-xl shadow-lg w-full max-w-[200px] text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="text-indigo-100 text-xs mb-1">Precise Output</div>
                            <div className="text-white font-bold text-lg">Tax Calculated</div>
                            <div className="flex justify-center mt-2">
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[10px] text-white">✓</div>
                            </div>
                        </div>

                    </div>

                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-600 rounded-full opacity-20 blur-2xl animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
