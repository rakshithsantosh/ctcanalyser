import React, { useRef, useEffect, useState } from 'react';

const ProblemSection: React.FC = () => {
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

    return (
        <section ref={sectionRef} className="py-24 px-6 sm:px-12 bg-white flex flex-col items-center">
            <div
                className={`max-w-4xl text-center transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                    The 20 LPA Illusion
                </h2>
                <p className="text-xl text-slate-500 mb-16 leading-relaxed">
                    You negotiated a <span className="font-medium text-slate-800">20 Lakh</span> package.
                    Your bank account sees <span className="font-medium text-slate-800">1.1 Lakh</span> per month.
                    <br className="hidden sm:block" />
                    Where did the rest go?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                {[
                    {
                        title: "Inflated Components",
                        desc: "Employer PF, Gratuity, and Insurance are part of your 'Cost to Company', not your salary.",
                        delay: "delay-100"
                    },
                    {
                        title: "Inefficient Structure",
                        desc: "Taxable allowances vs flexible benefits can mean a difference of ₹50k+ in taxes annually.",
                        delay: "delay-200"
                    },
                    {
                        title: "Old vs New Regime",
                        desc: "Picking the wrong tax regime blindly can cost you significant unnecessary tax outflow.",
                        delay: "delay-300"
                    }
                ].map((item, index) => (
                    <div
                        key={index}
                        className={`p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-500 transform ${isVisible ? `opacity-100 translate-y-0 ${item.delay}` : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <div className="h-2 w-12 bg-indigo-600 rounded mb-6"></div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProblemSection;
