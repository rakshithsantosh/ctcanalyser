import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24 px-6 sm:px-12">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

                <div className="space-y-6 text-slate-600 leading-relaxed">
                    <p>
                        Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">1. No Data Collection</h2>
                        <p>
                            The "Indian Payslip / CTC Analyzer" is a client-side only application.
                            <strong> We do not store, process, or transmit your salary data to any server.</strong>
                        </p>
                        <p className="mt-2">
                            All calculations happen directly in your browser. When you close the tab, your data is gone.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">2. Local Storage</h2>
                        <p>
                            We do not use Cookies or LocalStorage to persist your data across sessions.
                            Each visit is a fresh start to ensure maximum privacy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">3. Analytics</h2>
                        <p>
                            We may use basic, anonymous usage analytics (like pages visited) to improve the application structure.
                            No personally identifiable information (PII) or financial data is ever attached to these metrics.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">4. Open Source</h2>
                        <p>
                            The code for this application is visible for audit. You can verify our privacy claims by inspecting the source code on GitHub.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
