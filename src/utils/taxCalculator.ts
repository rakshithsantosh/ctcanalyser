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
}

// Tax Slabs FY 2024-25 (AY 2025-26)
export const calculateNewRegime = (income: number): TaxResult => {
    // Standard Deduction
    const standardDeduction = 75000;
    let taxable = Math.max(0, income - standardDeduction);

    // Rebate u/s 87A (Income <= 7L is tax free)
    // Note: If income is slightly above 7L, marginal relief applies, but for simplicity V1 usually standard.
    // Actually, New Regime 87A rebate is up to 25,000 tax, which covers income up to 7L.

    let tax = 0;

    if (taxable <= 300000) {
        tax = 0;
    } else if (taxable <= 700000) {
        tax = (taxable - 300000) * 0.05;
    } else if (taxable <= 1000000) {
        tax = (400000 * 0.05) + (taxable - 700000) * 0.10;
    } else if (taxable <= 1200000) {
        tax = (400000 * 0.05) + (300000 * 0.10) + (taxable - 1000000) * 0.15;
    } else if (taxable <= 1500000) {
        tax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (taxable - 1200000) * 0.20;
    } else {
        tax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (300000 * 0.20) + (taxable - 1500000) * 0.30;
    }

    // 87A Rebate check
    if (taxable <= 700000) {
        tax = 0;
    }

    const cess = tax * 0.04;
    return {
        taxableIncome: taxable,
        tax: tax,
        cess: cess,
        totalTax: tax + cess,
        inHandAnnual: 0, // Calculated later based on CTC - Deductions - Tax
        inHandMonthly: 0
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
