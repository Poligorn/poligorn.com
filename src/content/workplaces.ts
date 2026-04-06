import type { I18nText } from '../i18n/strings';

export type Workplace = {
	id: string;
	company: I18nText;
	startDate: Date;
	endDate: Date | null; // null означает "по настоящее время"
	role?: I18nText;
};

export const WORKPLACES: Workplace[] = [
	{
		id: 'obelisk-interactive',
		company: { ru: 'Obelisk Interactive', en: 'Obelisk Interactive' },
		startDate: new Date('2020-09-01'),
		endDate: new Date('2021-11-30'),
		role: { ru: 'Гейм-дизайнер', en: 'Game Designer' },
	},
	{
		id: 'softintermob',
		company: { ru: 'Softintermob LLC', en: 'Softintermob LLC' },
		startDate: new Date('2025-08-01'),
		endDate: new Date('2026-01-31'),
		role: { ru: 'Game Designer', en: 'Game Designer' },
	},
	{
		id: 'glera-games',
		company: { ru: 'Glera Games', en: 'Glera Games' },
		startDate: new Date('2024-08-01'),
		endDate: new Date('2024-11-30'),
		role: { ru: 'Технический Гейм-дизайнер', en: 'Technical Game Designer' },
	},
	{
		id: 'tea-agency-games',
		company: { ru: 'Tea Agency Games', en: 'Tea Agency Games' },
		startDate: new Date('2024-05-01'),
		endDate: null, // текущее место работы
		role: { ru: 'Продюсер, Геймдизайнер', en: 'Producer, Game Designer' },
	},
].sort((a, b) => a.startDate.getTime() - b.startDate.getTime()); // Сортируем по дате начала



