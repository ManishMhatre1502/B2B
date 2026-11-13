export const KPI_TEMPLATES = [
  { name: "Revenue", type: "currency" as const, isRequired: true },
  { name: "Expenses", type: "currency" as const, isRequired: false },
  { name: "Orders", type: "number" as const, isRequired: false },
  { name: "Website traffic", type: "number" as const, isRequired: false },
];

export type KpiType = "currency" | "number" | "percentage" | "text";
export type KpiInput = { name: string; type: KpiType; isRequired: boolean };
