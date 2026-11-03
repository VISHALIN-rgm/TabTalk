import { TESTED_LANGUAGES, SPEECH_SUPPORTED } from '@/lib/config'

export type LanguageTier = 'verified' | 'speech' | 'best_effort'
export type LanguageOption = { code: string; nativeName: string; localizedName: string; tier: LanguageTier }
const languageCodes = ['en','es','hi','ta','pt','fr','ar','sw','id','bn','fil','de','it','ja','ko','zh','mr','te','th','tr','vi','nl','he','kn','ms','pl'] as const
function display(locale: string, code: string): string { try { return new Intl.DisplayNames([locale], { type: 'language' }).of(code) ?? code } catch { return code } }
export function languageTier(code: string): LanguageTier { const normalized = code.toLowerCase().split('-')[0]; if (TESTED_LANGUAGES.some((name) => display('en', normalized).toLowerCase() === name.toLowerCase())) return 'verified'; if (SPEECH_SUPPORTED.some((name) => display('en', normalized).toLowerCase() === name.toLowerCase())) return 'speech'; return 'best_effort' }
export function getLanguages(locale = 'en'): LanguageOption[] { return languageCodes.map((code) => ({ code, nativeName: display(code, code), localizedName: display(locale, code), tier: languageTier(code) })) }
export const tierCopy: Record<LanguageTier, string> = { verified: 'Verified in TabTalk testing.', speech: 'Supported by Muse Voice Transcribe; recognition quality varies.', best_effort: 'Photo and text are attempted; quality is not guaranteed.' }
