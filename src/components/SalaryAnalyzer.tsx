import React, { useState } from 'react';
import SalaryInput from './SalaryInput';
import ResultsDashboard from './ResultsDashboard';
import { calculateNewRegime, calculateOldRegime, calculateTakeHome } from '../utils/taxCalculator';
import type { SalaryInputs, TaxResult } from '../utils/taxCalculator';
import { generateInsights } from '../utils/salaryInsights';
import type { Insight } from '../utils/salaryInsights';

const SalaryAnalyzer: React.FC = () => {
    const [inputs, setInputs] = useState<SalaryInputs>({
        basic: 0,
        hra: 0,
        special: 0,
        variable: 0,
        employerPF: 0,
        employeePF: 0,
        gratuity: 0,
        otherAllowances: 0,
        rentPaid: 0,
        deduction80C: 0
    });

    const [results, setResults] = useState<{
        oldRegime: TaxResult;
        newRegime: TaxResult;
        insights: Insight[];
        monthlyInHand: number;
        analyzed: boolean;
    } | null>(null);

    const handleAnalyze = () => {
        // 1. Calculate Tax for both regimes
        const oldRegimeResult = calculateOldRegime(inputs);
        // NewRegime input is just income usually, but let's calculate Gross first.
        // Gross for New Regime = Sum of all earnings (basic+hra+special...) - Standard Deduction (handled in calc).
        // Note: Employer PF is NOT part of taxable income usually if within limits (7.5L).
        // We need to pass "Taxable Income before deductions" to the utility or let utility handle it.
        // My utility `calculateNewRegime` takes `income`. I need to compute Gross Taxable Income for New Regime.

        // Gross Earnings = Basic + HRA + Special + Variable + Other
        // Note: Deduct Professional Tax (2400) even in New Regime? Yes, Standard Deduction (75k) covers it or is it separate?
        // As per new rules, Standard Deduction of 75k is allowed.
        // Professional Tax is allowed in New Regime? No, usually only Std Deduction and Employer NPS.
        // But for simplicity in V1, let's assume `income` passed to `calculateNewRegime` is (Gross Earnings - Exemptions if any).
        // New Regime has almost no exemptions.

        const grossEarnings = inputs.basic + inputs.hra + inputs.special + inputs.variable + inputs.otherAllowances;
        const newRegimeResult = calculateNewRegime(grossEarnings);

        // 2. Generate Insights
        const insights = generateInsights(inputs, oldRegimeResult, newRegimeResult);

        // 3. Calculate Take Home
        // We need to decide which tax to use for Take Home. Usually the lower one.
        const actualTax = Math.min(oldRegimeResult.totalTax, newRegimeResult.totalTax);

        // Calculate sum of CTC for 'inflation' check logic passed to TakeHome? 
        // Actually calculateTakeHome needs CTC to subtract deductions? No, it needs Earnings - Deductions.
        // Logic: In-hand = Earnings - EmployeePF - PT - Tax.
        // (Employer PF is not deducted from Earnings because it wasn't added to Earnings in the first place, it's above Earnings).
        // Wait, my input form asks for "Employer PF". Is it part of the entered "Basic/HRA..."? usually NO.
        // Usually CTC = Basic + ... + Employer PF.
        // So "Earnings" = Basic + ...
        // So my calc is correct.

        const takeHome = calculateTakeHome(inputs, actualTax);

        setResults({
            oldRegime: oldRegimeResult,
            newRegime: newRegimeResult,
            insights: insights,
            monthlyInHand: takeHome.monthly,
            analyzed: true
        });

        // Scroll to results
        setTimeout(() => {
            document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-16">
                <SalaryInput
                    inputs={inputs}
                    setInputs={setInputs}
                    onAnalyze={handleAnalyze}
                />

                {results && (
                    <div id="results-dashboard" className="pt-12 border-t border-slate-200">
                        <ResultsDashboard
                            oldRegime={results.oldRegime}
                            newRegime={results.newRegime}
                            insights={results.insights}
                            monthlyInHand={results.monthlyInHand}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalaryAnalyzer;
