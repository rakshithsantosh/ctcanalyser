import React from 'react';

const About: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24 px-6 sm:px-12">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-6">About the Project</h1>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        The <strong>Indian Payslip / CTC Analyzer</strong> was built to solve a common frustration among Indian professionals:
                        the disconnect between the "CTC" number on an offer letter and the actual amount hitting the bank account.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        Tax laws are complex, and salary structures are often designed to mask the actual in-hand value.
                        This tool aims to decode these complexities using a transparent, rule-based engine.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-indigo-900 p-8 rounded-2xl text-white">
                        <h2 className="text-xl font-bold mb-4">Our Mission</h2>
                        <p className="text-indigo-200 leading-relaxed">
                            To empower every employee with financial clarity. We believe you shouldn't need a CA just to understand your offer letter.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Tech Stack</h2>
                        <ul className="space-y-2 text-slate-600">
                            <li>• React & TypeScript</li>
                            <li>• Tailwind CSS for Styling</li>
                            <li>• Vite for Build Tooling</li>
                            <li>• 100% Client-Side Logic</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
