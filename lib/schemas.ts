import { z } from 'zod'
export const extractedEntrySchema = z.object({ customer: z.string().min(1).max(160), item: z.string().max(500), amount: z.number().finite().nonnegative(), type: z.enum(['credit', 'paid']), confidence: z.number().min(0).max(1), source_line: z.string().max(2000), detected_language: z.string().min(2).max(16), bbox: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional() })
export const extractionSchema = z.object({ entries: z.array(extractedEntrySchema).max(200) })
export const extractRequestSchema = z.object({ mode: z.enum(['text', 'image']), text: z.string().max(50000).optional(), imageBase64: z.string().max(5_500_000).optional(), shopId: z.string().uuid() }).refine((value) => value.mode === 'text' ? Boolean(value.text?.trim()) : Boolean(value.imageBase64), { message: 'Provide text or an image.' })
export const saveEntriesSchema = z.object({ shopId: z.string().uuid(), idempotencyKey: z.string().min(8).max(128).optional(), entries: z.array(extractedEntrySchema.extend({ source: z.enum(['voice', 'photo', 'text', 'manual']) })).max(200) })
export const reminderRequestSchema = z.object({ customerId: z.string().uuid(), language: z.string().min(2).max(16) })
export const transcribeResponseSchema = z.object({ transcript: z.string(), detected_language: z.string().optional() })
export type ExtractedEntry = z.infer<typeof extractedEntrySchema>
