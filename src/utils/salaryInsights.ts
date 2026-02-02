import type { SalaryInputs, TaxResult } from './taxCalculator';

export interface Insight {
    title: string;
    description: string;
    type: 'danger' | 'warning' | 'success' | 'info';
}

export const generateInsights = (inputs: SalaryInputs, oldRegime: TaxResult, newRegime: TaxResult): Insight[] => {
    const insights: Insight[] = [];
    const totalCTC = inputs.basic + inputs.hra + inputs.special + inputs.variable + inputs.employerPF + inputs.gratuity + inputs.otherAllowances; // Simplified CTC sum

    // 1. Variable Pay Risk
    const variablePortion = inputs.variable / totalCTC;
    if (variablePortion > 0.15) {
        insights.push({
            title: 'High Variable Pay Risk',
            description: `${(variablePortion * 100).toFixed(0)}% of your CTC is variable. This means your monthly guaranteed income is significantly lower than your CTC suggests.`,
            type: 'warning'
        });
    }

    // 2. PF Inflation
    if (inputs.employerPF > 0) {
        insights.push({
            title: 'CTC Inflated by Employer PF',
            description: `Your CTC includes ₹${inputs.employerPF.toLocaleString('en-IN')} as Employer PF. This isn't take-home pay, but a retirement corpus locked with the government.`,
            type: 'info'
        });
    }

    // 3. Tax Regime Optimization
    const diff = oldRegime.totalTax - newRegime.totalTax; // Positive means Old is higher (New is better)

    if (diff > 5000) {
        insights.push({
            title: 'New Regime is Better',
            description: `You save ₹${diff.toLocaleString('en-IN')} by choosing the New Tax Regime. The Old Regime's deductions aren't enough to beat the lower tax rates.`,
            type: 'success'
        });
    } else if (diff < -5000) {
        insights.push({
            title: 'Old Regime is Better',
            description: `You save ₹${Math.abs(diff).toLocaleString('en-IN')} by choosing the Old Tax Regime. Your rent and 80C deductions make it more efficient.`,
            type: 'success'
        });
    } else {
        insights.push({
            title: 'Tax Check',
            description: 'Both regimes result in similar tax liability for your current input.',
            type: 'info'
        });
    }

    // 4. HRA Inefficiency
    if (inputs.hra > 0 && inputs.rentPaid === 0) {
        insights.push({
            title: 'HRA is Fully Taxable',
            description: 'You are receiving HRA but not claiming rent deductions. This makes your HRA fully taxable.',
            type: 'danger'
        });
    }

    // 5. 80C potential
    if (inputs.deduction80C < 150000 && (newRegime.totalTax > oldRegime.totalTax || Math.abs(diff) < 20000)) {
        // Suggest 80C only if it matters (usually relevant for Old Regime or if switching could help)
        // Actually simple check:
        insights.push({
            title: 'Underutilized 80C',
            description: `You have claimed ₹${inputs.deduction80C.toLocaleString('en-IN')} in 80C. Maximizing this to ₹1.5L could save more tax in the Old Regime.`,
            type: 'warning'
        });
    }

    return insights;
};
