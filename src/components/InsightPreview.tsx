import React, { useRef, useEffect, useState } from 'react';

const InsightPreview: React.FC = () => {
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

    const insights = [
        {
            title: "High Variable Pay Risk",
            desc: "30% of your CTC is variable. This affects your guaranteed monthly inflow.",
            color: "border-amber-500 bg-amber-50 text-amber-900",
            iconColor: "text-amber-600"
        },
        {
            title: "CTC Inflation Detected",
            desc: "Employer PF is included in your CTC, reducing your expected take-home by ~₹21,600.",
            color: "border-orange-500 bg-orange-50 text-orange-900",
            iconColor: "text-orange-600"
        },
        {
            title: "Tax Efficiency Opportunity",
            desc: "Switching to the Old Regime could save you ₹12,500 with your current 80C projection.",
            color: "border-green-500 bg-green-50 text-green-900",
            iconColor: "text-green-600"
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 px-6 sm:px-12 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div
                    className={`text-center mb-16 max-w-2xl transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Insights, Not Just Numbers
                    </h2>
                    <p className="text-slate-500">
                        We don't just calculate tax. We analyze your salary structure for risks and inefficiencies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {insights.map((item, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all duration-500 ${item.color} ${isVisible ? `opacity-100 translate-x-0 delay-${(index + 1) * 150}` : 'opacity-0 translate-x-10'
                                }`}
                        >
                            <h3 className={`font-bold text-lg mb-2 ${item.iconColor}`}>{item.title}</h3>
                            <p className="text-sm opacity-90 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InsightPreview;
