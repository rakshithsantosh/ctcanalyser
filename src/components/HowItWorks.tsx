import React, { useRef, useEffect, useState } from 'react';

const HowItWorks: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const steps = [
        {
            step: "01",
            title: "Enter Salary Details",
            desc: "Input your Basic Pay, HRA, Special Allowance, and other components from your offer letter.",
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            )
        },
        {
            step: "02",
            title: "Compare Regimes",
            desc: "We automatically calculate taxes under both Old and New regimes to find your best option.",
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            step: "03",
            title: "Reveal True Value",
            desc: "See your actual monthly in-hand salary and uncover hidden deductions affecting your pay.",
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 px-6 sm:px-12 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Analysis in 3 Simple Steps
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        No complex forms or signups. Just straight answers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-0"></div>

                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className={`relative z-10 flex flex-col items-center text-center transition-all duration-700 transform ${isVisible ? `opacity-100 translate-y-0 delay-${(index + 1) * 200}` : 'opacity-0 translate-y-10'
                                }`}
                        >
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-slate-50 shadow-sm mb-6">
                                <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                                    {item.icon}
                                </div>
                            </div>

                            <div className="text-xs font-bold text-indigo-600 tracking-widest mb-2 uppercase">Step {item.step}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed max-w-xs">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
