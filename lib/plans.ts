export type Plan = 'free' | 'pro'
export const PLAN_LIMITS: Record<Plan, { extractions: number; shops: number }> = { free: { extractions: 30, shops: 1 }, pro: { extractions: 500, shops: 5 } }
export function canUseExtraction(plan: Plan, used: number): boolean { return used < PLAN_LIMITS[plan].extractions }
