export interface SalaryInputs {
    basic: number;
    hra: number;
    special: number;
    variable: number;
    employerPF: number;
    employeePF: number;
    gratuity: number; // Monthly equivalent or Annual? Usually inputs are Annual or Monthly. Will assume Annual for calculation engine for precision, but form might be monthly. Let's assume Annual for inputs to this utility for now.
    otherAllowances: number;
    rentPaid: number;
    deduction80C: number;
}

export interface TaxResult {
    taxableIncome: number;
    tax: number;
    cess: number;
    totalTax: number;
    inHandAnnual: number;
    inHandMonthly: number;
    breakdown?: { label: string; amount: number; rate: string }[];
    rebate?: number;
    standardDeduction?: number;
}

// Tax Slabs FY 2024-25 (AY 2025-26)
export const calculateNewRegime = (income: number): TaxResult => {
    // Standard Deduction
    const standardDeduction = 75000;
    let taxable = Math.max(0, income - standardDeduction);

    // Rebate u/s 87A (Limit increased to 60,000 in FY 25-26)
    // This effectively makes taxable income up to 12L tax-free.
    // (Calculation: 0-4L Nil, 4-8L @ 5% = 20k, 8-12L @ 10% = 40k. Total = 60k. Rebate covers full 60k).

    let tax = 0;
    const breakdown: { label: string; amount: number; rate: string }[] = [];

    if (taxable <= 400000) {
        tax = 0;
        breakdown.push({ label: '0 - 4L', amount: 0, rate: 'Nil' });
    } else if (taxable <= 800000) {
        const slabTax = (taxable - 400000) * 0.05;
        tax = slabTax;
        breakdown.push({ label: '0 - 4L', amount: 0, rate: 'Nil' });
        breakdown.push({ label: '4L - 8L', amount: slabTax, rate: '5%' });
    } else if (taxable <= 1200000) {
        const slabTax = (400000 * 0.05) + (taxable - 800000) * 0.10;
        tax = slabTax;
        breakdown.push({ label: '0 - 4L', amount: 0, rate: 'Nil' });
        breakdown.push({ label: '4L - 8L', amount: 400000 * 0.05, rate: '5%' });
        breakdown.push({ label: '8L - 12L', amount: (taxable - 800000) * 0.10, rate: '10%' });
    } else if (taxable <= 1600000) {
        const slabTax = (400000 * 0.05) + (400000 * 0.10) + (taxable - 1200000) * 0.15;
        tax = slabTax;
        breakdown.push({ label: '0 - 4L', amount: 0, rate: 'Nil' });
        breakdown.push({ label: '4L - 8L', amount: 20000, rate: '5%' });
        breakdown.push({ label: '8L - 12L', amount: 40000, rate: '10%' });
        breakdown.push({ label: '12L - 16L', amount: (taxable - 1200000) * 0.15, rate: '15%' });
    } else if (taxable <= 2000000) {
        const slabTax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + (taxable - 1600000) * 0.20;
        tax = slabTax;
        breakdown.push({ label: '0 - 4L', amount: 0, rate: 'Nil' });
        breakdown.push({ label: '4L - 8L', amount: 20000, rate: '5%' });
        breakdown.push({ label: '8L - 12L', amount: 40000, rate: '10%' });
        breakdown.push({ label: '12L - 16L', amount: 60000, rate: '15%' });
        breakdown.push({ label: '16L - 20L', amount: (taxable - 1600000) * 0.20, rate: '20%' });
    } else if (taxable <= 2400000) {
        const slabTax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + (400000 * 0.20) + (taxable - 2000000) * 0.25;
        tax = slabTax;
        breakdown.push({ label: '0 - 4L', amount: 0, rate: 'Nil' });
        breakdown.push({ label: '4L - 8L', amount: 20000, rate: '5%' });
        breakdown.push({ label: '8L - 12L', amount: 40000, rate: '10%' });
        breakdown.push({ label: '12L - 16L', amount: 60000, rate: '15%' });
        breakdown.push({ label: '16L - 20L', amount: 80000, rate: '20%' });
        breakdown.push({ label: '20L - 24L', amount: (taxable - 2000000) * 0.25, rate: '25%' });
    } else {
        const slabTax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + (400000 * 0.20) + (400000 * 0.25) + (taxable - 2400000) * 0.30;
        tax = slabTax;
        breakdown.push({ label: '0 - 4L', amount: 0, rate: 'Nil' });
        breakdown.push({ label: '4L - 8L', amount: 20000, rate: '5%' });
        breakdown.push({ label: '8L - 12L', amount: 40000, rate: '10%' });
        breakdown.push({ label: '12L - 16L', amount: 60000, rate: '15%' });
        breakdown.push({ label: '16L - 20L', amount: 80000, rate: '20%' });
        breakdown.push({ label: '20L - 24L', amount: 100000, rate: '25%' });
        breakdown.push({ label: '> 24L', amount: (taxable - 2400000) * 0.30, rate: '30%' });
    }

    // 87A Rebate check (Strict limit: Taxable <= 12,00,000)
    let rebate = 0;
    if (taxable <= 1200000) {
        rebate = tax;
        tax = 0;
    }

    const cess = tax * 0.04;
    return {
        taxableIncome: taxable,
        tax: tax,
        cess: cess,
        totalTax: tax + cess,
        inHandAnnual: 0, // Calculated later
        inHandMonthly: 0,
        breakdown: breakdown,
        rebate: rebate,
        standardDeduction: standardDeduction
    };
};

export const calculateOldRegime = (inputs: SalaryInputs): TaxResult => {
    const annualGross = inputs.basic + inputs.hra + inputs.special + inputs.variable + inputs.otherAllowances; // Excluding Employer PF/Gratuity from Gross Taxable usually, as they are exempt or separate.
    // WAIT: CTC includes Employer PF. Gross Salary (Taxable base) = CTC - Employer PF - Gratuity (if exempt/not paid monthly).
    // Assuming inputs are "Annual Components".

    // HRA Exemption Logic
    // Min of:
    // 1. Actual HRA Received
    // 2. Rent Paid - 10% of Basic
    // 3. 50% of Basic (Metro) or 40% (Non-Metro). Assuming 50% for V1 or ask user. Let's assume 40% (safer/common) or 50%. Let's use 50% as default for major cities or add toggle later. For now 50%.

    const basic = inputs.basic;
    const hraReceived = inputs.hra;
    const rentPaid = inputs.rentPaid;

    let hraExemption = 0;
    if (rentPaid > 0) {
        const condition1 = hraReceived;
        const condition2 = Math.max(0, rentPaid - (0.10 * basic));
        const condition3 = basic * 0.50; // Assuming metro
        hraExemption = Math.min(condition1, condition2, condition3);
    }

    const standardDeduction = 50000;
    const professionalTax = 2400; // Approx average

    let taxable = annualGross - hraExemption - inputs.deduction80C - standardDeduction - professionalTax;
    taxable = Math.max(0, taxable);

    let tax = 0;
    if (taxable <= 250000) {
        tax = 0;
    } else if (taxable <= 500000) {
        tax = (taxable - 250000) * 0.05;
    } else if (taxable <= 1000000) {
        tax = (250000 * 0.05) + (taxable - 500000) * 0.20;
    } else {
        tax = (250000 * 0.05) + (500000 * 0.20) + (taxable - 1000000) * 0.30;
    }

    // 87A Rebate (Old)
    if (taxable <= 500000) {
        tax = 0;
    }

    const cess = tax * 0.04;

    return {
        taxableIncome: taxable,
        tax: tax,
        cess: cess,
        totalTax: tax + cess,
        inHandAnnual: 0,
        inHandMonthly: 0
    };
};

export const calculateTakeHome = (inputs: SalaryInputs, tax: number): { annual: number, monthly: number } => {
    // In-hand = CTC - Employer PF - Gratuity - Employee PF - Professional Tax - Income Tax
    // Note: CTC is sum of all inputs + Employer PF + Gratuity
    // So In-hand = (Basic+HRA+Special+Variable) - Employee PF - Prof Tax - Income Tax

    const professionalTax = 2400;
    const grossEarnings = inputs.basic + inputs.hra + inputs.special + inputs.variable + inputs.otherAllowances;
    const deductions = inputs.employeePF + professionalTax + tax;

    const annualInHand = grossEarnings - deductions;
    return {
        annual: annualInHand,
        monthly: annualInHand / 12
    };
};
