export const taxType = [
  "No ABN/TFN",
  "Import Duty",
  "Sales Tax",
  "Goods & Services Tax",
  "Input Taxed",
  "Luxury Car Tax",
  "Withholdings Tax",
];

export const accountType = [
  {
    label: "Assets",
    options: [
      { classification: "Assets", value: "Bank" },
      { classification: "Assets", value: "Account Receivable" },
      { classification: "Assets", value: "Current Asset" },
      { classification: "Assets", value: "Fixed Asset" },
      { classification: "Assets", value: "Other Asset" },
    ],
  },
  {
    label: "Equity",
    options: [{ classification: "Equity", value: "Equity" }],
  },
  {
    label: "Income",
    options: [
      { classification: "Income", value: "Income" },
      { classification: "Income", value: "Other Income" },
    ],
  },
  {
    label: "Expenses",
    options: [
      { classification: "Expense", value: "Expense" },
      { classification: "Expense", value: "Other Expense" },
    ],
  },
];
export const cashFlowType = ["Operating", "Investing", "Financing"];
