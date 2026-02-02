import React, { useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 px-6 sm:px-12 py-20">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div
                    className={`transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
                        Know Your <br />
                        <span className="text-indigo-600">Real Salary.</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-slate-500 mb-10 max-w-lg leading-relaxed font-light">
                        Decode your CTC. Uncover hidden taxes. Understand your true take-home pay with 100% transparency.
                    </p>

                    <button
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-slate-900 rounded-full overflow-hidden transition-all duration-300 hover:bg-slate-800 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                        onClick={() => {
                            const element = document.getElementById('salary-input');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <span className="relative z-10">Analyze My Salary</span>
                        <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </button>

                    <div className="mt-8 flex items-center space-x-4 text-sm text-slate-400">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                                    {['₹', '%', '✓'][i - 1]}
                                </div>
                            ))}
                        </div>
                        <span>Trusted by Indian professionals</span>
                    </div>
                </div>

                {/* Right Visual - Abstract UI */}
                <div
                    className={`relative transform transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                        }`}
                >
                    <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-100 max-w-md mx-auto lg:ml-auto lg:mr-0 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                        {/* Pseudo Dashboard UI */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="h-4 w-24 bg-slate-100 rounded"></div>
                            <div className="h-8 w-8 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">₹</div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Annual Take-home</div>
                                    <div className="text-3xl font-bold text-slate-900">₹ 14,20,000</div>
                                </div>
                                <div className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+5% vs Old</div>
                            </div>

                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                <div className="bg-indigo-600 h-2 rounded-full w-[70%]"></div>
                            </div>

                            <div className="pt-4 grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-xs text-slate-400 mb-1">Monthly</div>
                                    <div className="font-semibold text-slate-700">₹ 1,18,333</div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-xs text-slate-400 mb-1">Tax Paid</div>
                                    <div className="font-semibold text-slate-700">₹ 1,50,000</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-10 -right-10 w-24 h-24 bg-indigo-100 rounded-full opacity-50 blur-2xl animate-pulse"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-slate-200 rounded-full opacity-50 blur-3xl"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
