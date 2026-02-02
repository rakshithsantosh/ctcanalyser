import React, { useState } from 'react';

interface HeroInputProps {
    onCalculate: (ctc: number) => void;
}

const HeroInput: React.FC<HeroInputProps> = ({ onCalculate }) => {
    const [ctc, setCtc] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const value = parseFloat(ctc.replace(/,/g, ''));
        if (!isNaN(value) && value > 0) {
            onCalculate(value);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
                What’s your annual CTC?
            </h1>

            <form onSubmit={handleSubmit} className="w-full max-w-xl relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-2 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow">
                    <span className="pl-6 text-2xl text-slate-400 font-medium">₹</span>
                    <input
                        type="text" // Using text to handle commas if needed later, but standard number parsing works
                        value={ctc}
                        onChange={(e) => setCtc(e.target.value)}
                        placeholder="15,00,000"
                        className="w-full h-16 sm:h-20 text-3xl sm:text-4xl font-bold text-slate-800 placeholder-slate-300 border-none focus:ring-0 focus:outline-none px-4"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!ctc}
                        className="hidden sm:block absolute right-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        Reveal Salary
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={!ctc}
                    className="sm:hidden w-full mt-4 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                    Reveal My Salary
                </button>
            </form>

            <p className="mt-8 text-slate-500 text-sm font-medium">
                Instant calculation. 100% Private.
            </p>
        </div>
    );
};

export default HeroInput;
