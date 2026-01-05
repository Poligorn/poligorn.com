import type { I18nText } from '../i18n/strings';

export type Workplace = {
	id: string;
	company: I18nText;
	startDate: Date;
	endDate: Date | null; // null означает "по настоящее время"
	role?: I18nText;
};

// Пример данных - замените на реальные
export const WORKPLACES: Workplace[] = [
	{
		id: 'workplace-1',
		company: { ru: 'Компания А', en: 'Company A' },
		startDate: new Date('2020-01-01'),
		endDate: new Date('2021-06-30'),
		role: { ru: 'Разработчик игр', en: 'Game Developer' },
	},
	{
		id: 'workplace-2',
		company: { ru: 'Компания Б', en: 'Company B' },
		startDate: new Date('2021-07-01'),
		endDate: new Date('2023-12-31'),
		role: { ru: 'Lead Developer', en: 'Lead Developer' },
	},
	{
		id: 'workplace-3',
		company: { ru: 'Tea Agency Games', en: 'Tea Agency Games' },
		startDate: new Date('2024-01-01'),
		endDate: null, // текущее место работы
		role: { ru: 'Основатель', en: 'Founder' },
	},
].sort((a, b) => a.startDate.getTime() - b.startDate.getTime()); // Сортируем по дате начала

