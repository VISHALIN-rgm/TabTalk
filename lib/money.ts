export function formatMoney(value: number | string, currency: string): string { return new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 2 }).format(Number(value)) }
