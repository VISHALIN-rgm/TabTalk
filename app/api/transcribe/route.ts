import { NextResponse } from 'next/server'
import { transcribeAudio } from '@/lib/meta'
export const maxDuration = 60
export async function POST(request: Request) { try { const form = await request.formData(); const audio = form.get('audio'); if (!(audio instanceof File) || audio.size > 32 * 1024 * 1024) return NextResponse.json({ error: 'Audio file is missing or too large' }, { status: 400 }); return NextResponse.json(await transcribeAudio(audio)) } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Transcription failed' }, { status: 400 }) } }
