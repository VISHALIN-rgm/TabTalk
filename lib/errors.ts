import { NextResponse } from 'next/server'
export type ErrorCode = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'LIMIT_REACHED' | 'SERVICE_UNAVAILABLE' | 'INTERNAL_ERROR'
export function apiError(code: ErrorCode, message: string, status: number): NextResponse { return NextResponse.json({ error: { code, message } }, { status }) }
