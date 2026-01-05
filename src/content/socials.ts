import type { I18nText } from '../i18n/strings';

export type SocialKey = 'telegram' | 'tiktok' | 'linkedin' | 'youtube';

export type SocialLink = {
	key: SocialKey;
	label: I18nText;
	href: string;
	external: true;
};

// TODO: заполнить реальные ссылки
export const SOCIAL_LINKS: SocialLink[] = [
	{
		key: 'telegram',
		label: { ru: 'Telegram', en: 'Telegram' },
		href: 'https://t.me/poligorn_journal',
		external: true,
	},
	{
		key: 'tiktok',
		label: { ru: 'TikTok', en: 'TikTok' },
		href: 'https://www.tiktok.com/@poli_gorn',
		external: true,
	},
	{
		key: 'linkedin',
		label: { ru: 'LinkedIn', en: 'LinkedIn' },
		href: 'https://www.linkedin.com/in/poligorn/',
		external: true,
	},
	{
		key: 'youtube',
		label: { ru: 'YouTube', en: 'YouTube' },
		href: 'https://www.youtube.com/@Poli_gorn',
		external: true,
	},
];


