import type { I18nText } from '../i18n/strings';

export type UpdateItem = {
	id: string;
	text: I18nText;
	// Optional: ISO date string (YYYY-MM-DD)
	date?: string;
};

// TODO: заменить на реальные новости/достижения Poligorn и Tea Agency Games
export const UPDATES: UpdateItem[] = [
	{
		id: 'site-wip',
		text: {
			ru: 'Собираем новый минималистичный сайт‑портфолио (RU/EN) с витриной проектов.',
			en: 'Building a new minimal RU/EN portfolio site with a project showcase.',
		},
	},
	{
		id: 'tea-itch',
		text: {
			ru: 'Добавили проекты Tea Agency Games с витрины Itch.io.',
			en: 'Added Tea Agency Games projects from the Itch.io showcase.',
		},
	},
];



