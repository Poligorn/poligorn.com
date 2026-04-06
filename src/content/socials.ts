import type { I18nText } from '../i18n/strings';

export type SocialKey = 'telegram' | 'tiktok' | 'linkedin' | 'youtube';

export type SocialLink = {
	key: SocialKey;
	label: I18nText;
	description: I18nText;
	href: string;
	external: true;
};

// TODO: заполнить реальные ссылки
export const SOCIAL_LINKS: SocialLink[] = [
	{
		key: 'telegram',
		label: { ru: 'Telegram', en: 'Telegram' },
		description: {
			ru: 'Личный блог о достижениях и саморазвитии.',
			en: 'Personal blog about progress and self-improvement.',
		},
		href: 'https://t.me/poligorn_journal',
		external: true,
	},
	{
		key: 'tiktok',
		label: { ru: 'TikTok', en: 'TikTok' },
		description: {
			ru: 'Развлекательно‑познавательный канал о играх и анимациях.',
			en: 'Edutainment channel about games and animation.',
		},
		href: 'https://www.tiktok.com/@poli_gorn',
		external: true,
	},
	{
		key: 'linkedin',
		label: { ru: 'LinkedIn', en: 'LinkedIn' },
		description: {
			ru: 'Рабочий профиль и профессиональный блог.',
			en: 'Work profile and professional blog.',
		},
		href: 'https://www.linkedin.com/in/poligorn/',
		external: true,
	},
	{
		key: 'youtube',
		label: { ru: 'YouTube', en: 'YouTube' },
		description: {
			ru: 'Развлекательно‑познавательный канал о играх и анимациях.',
			en: 'Edutainment channel about games and animation.',
		},
		href: 'https://www.youtube.com/@Poli_gorn',
		external: true,
	},
];


