import type { Lang } from '../i18n/strings';

export const SUPPORTED_LANGS: readonly Lang[] = ['en', 'ru'] as const;
export const DEFAULT_LANG: Lang = 'en';

export function isLang(maybe: string): maybe is Lang {
	return (SUPPORTED_LANGS as readonly string[]).includes(maybe);
}

export function getLangFromPathname(pathname: string): Lang | null {
	// Expected: /en/... or /ru/...
	const seg = pathname.split('/').filter(Boolean)[0];
	if (!seg) return null;
	return isLang(seg) ? seg : null;
}

export function swapLangInPathname(pathname: string, nextLang: Lang): string {
	const parts = pathname.split('/');
	// parts[0] = '' because pathname starts with '/'
	const seg = parts[1] ?? '';
	if (isLang(seg)) {
		parts[1] = nextLang;
		return parts.join('/') || `/${nextLang}/`;
	}
	return `/${nextLang}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}



