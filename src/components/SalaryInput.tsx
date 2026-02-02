import React from 'react';
import type { SalaryInputs } from '../utils/taxCalculator';

interface SalaryInputProps {
    inputs: SalaryInputs;
    setInputs: React.Dispatch<React.SetStateAction<SalaryInputs>>;
    onAnalyze: () => void;
}

const SalaryInput: React.FC<SalaryInputProps> = ({ inputs, setInputs, onAnalyze }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const inputFields = [
        { label: 'Basic Pay', name: 'basic', placeholder: 'e.g. 600000' },
        { label: 'HRA', name: 'hra', placeholder: 'e.g. 300000' },
        { label: 'Special Allowance', name: 'special', placeholder: 'e.g. 400000' },
        { label: 'Variable / Bonus', name: 'variable', placeholder: 'e.g. 100000' },
        { label: 'Employer PF', name: 'employerPF', placeholder: 'e.g. 21600' },
        { label: 'Employee PF', name: 'employeePF', placeholder: 'e.g. 21600' },
        { label: 'Gratuity', name: 'gratuity', placeholder: 'e.g. 10000' },
        { label: 'Other Allowances', name: 'otherAllowances', placeholder: 'e.g. 0' },
    ];

    const deductionFields = [
        { label: 'Rent Paid (Annual)', name: 'rentPaid', placeholder: 'e.g. 120000' },
        { label: '80C Investments', name: 'deduction80C', placeholder: 'e.g. 150000' },
    ];

    return (
        <div id="salary-input" className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-slate-900 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">Enter Salary Details</h2>
                <p className="text-slate-400 text-sm mt-1">Provide annual figures from your offer letter.</p>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">Earnings</h3>
                        <div className="space-y-4">
                            {inputFields.map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">{field.label}</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                        <input
                                            type="number"
                                            name={field.name}
                                            value={inputs[field.name as keyof SalaryInputs] || ''}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">Deductions</h3>
                        <div className="space-y-4">
                            {deductionFields.map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">{field.label}</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                        <input
                                            type="number"
                                            name={field.name}
                                            value={inputs[field.name as keyof SalaryInputs] || ''}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="bg-indigo-50 p-4 rounded-lg mt-8">
                                <h4 className="text-sm font-bold text-indigo-900 mb-2">Did you know?</h4>
                                <p className="text-xs text-indigo-700 leading-relaxed">
                                    Rent Paid is critical for HRA exemption in Old Regime. 80C is capped at 1.5L.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pt-6 border-t border-slate-100">
                    <button
                        onClick={onAnalyze}
                        className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        Calculate Take Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalaryInput;
