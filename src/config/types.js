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
    label: "Liabilities",
    options: [
      { classification: "Liabilities", value: "Credit card" },
      { classification: "Liabilities", value: "Accounts Payable" },
      { classification: "Liabilities", value: "Other Current Liability" },
      { classification: "Liabilities", value: "Long Term Liability" },
      { classification: "Liabilities", value: "Other Liability" },
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
      { classification: "Income", value: "Other income" },
    ],
  },
  {
    label: "Expenses",
    options: [
      { classification: "Expense", value: "Expense" },
      { classification: "Expense", value: "Other expense" },
    ],
  },
];
export const cashFlowType = ["Operating", "Investing", "Financing"];
