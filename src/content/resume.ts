import type { I18nText } from '../i18n/strings';

export type ResumeSection = {
	id: string;
	title: I18nText;
	description: I18nText;
	icon?: string; // SVG path или название иконки
	items: ResumeItem[];
};

export type ResumeItem = {
	title: I18nText;
	description?: I18nText;
	value?: I18nText | string | number;
	icon?: string;
};

export const RESUME_SECTIONS: ResumeSection[] = [
	{
		id: 'experience',
		title: { ru: 'Опыт', en: 'Experience' },
		description: { ru: 'Роли, ответственность, результаты.', en: 'Roles, responsibilities, outcomes.' },
		icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
		items: [
			{
				title: { ru: 'Obelisk Interactive', en: 'Obelisk Interactive' },
				description: {
					ru: 'Гейм-дизайнер. Разработка игровых механик, прототипирование, балансировка геймплея.',
					en: 'Game Designer. Game mechanics development, prototyping, gameplay balancing.',
				},
				value: { ru: '1 год 3 мес.', en: '1y 3mo' },
			},
			{
				title: { ru: 'Glera Games', en: 'Glera Games' },
				description: {
					ru: 'Технический Гейм-дизайнер. Создание технических спецификаций, работа с движками, интеграция систем.',
					en: 'Technical Game Designer. Technical specifications, engine work, system integration.',
				},
				value: { ru: '4 мес.', en: '4mo' },
			},
			{
				title: { ru: 'Tea Agency Games', en: 'Tea Agency Games' },
				description: {
					ru: 'Продюсер, Геймдизайнер. Управление проектами, разработка концепций, координация команды.',
					en: 'Producer, Game Designer. Project management, concept development, team coordination.',
				},
				value: { ru: '1 год 9 мес.', en: '1y 9mo' },
			},
			{
				title: { ru: 'Softintermob LLC', en: 'Softintermob LLC' },
				description: {
					ru: 'Game Designer. Разработка игровых систем и механик для мобильных проектов.',
					en: 'Game Designer. Game systems and mechanics development for mobile projects.',
				},
				value: { ru: '6 мес.', en: '6mo' },
			},
		],
	},
	{
		id: 'skills',
		title: { ru: 'Навыки', en: 'Skills' },
		description: { ru: 'Геймплей, инструменты, продакшен, коммуникация.', en: 'Gameplay, tools, production, collaboration.' },
		icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
		items: [
			{
				title: { ru: 'Гейм-дизайн', en: 'Game Design' },
				description: { ru: 'Механики, балансировка, прототипирование', en: 'Mechanics, balancing, prototyping' },
			},
			{
				title: { ru: 'Технический дизайн', en: 'Technical Design' },
				description: { ru: 'Спецификации, интеграция систем', en: 'Specifications, system integration' },
			},
			{
				title: { ru: 'Продюсирование', en: 'Production' },
				description: { ru: 'Управление проектами, планирование', en: 'Project management, planning' },
			},
			{
				title: { ru: 'Коммуникация', en: 'Communication' },
				description: { ru: 'Работа в команде, документация', en: 'Team collaboration, documentation' },
			},
		],
	},
	{
		id: 'tools',
		title: { ru: 'Инструменты', en: 'Tools' },
		description: { ru: 'Движки, DCC, пайплайны, сборка.', en: 'Engines, DCC, pipelines, build tools.' },
		icon: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z',
		items: [
			{
				title: { ru: 'Игровые движки', en: 'Game Engines' },
				description: { ru: 'Unity, Unreal Engine, Godot', en: 'Unity, Unreal Engine, Godot' },
			},
			{
				title: { ru: 'Прототипирование', en: 'Prototyping' },
				description: { ru: 'Figma, Miro, бумажные прототипы', en: 'Figma, Miro, paper prototypes' },
			},
			{
				title: { ru: 'Управление проектами', en: 'Project Management' },
				description: { ru: 'Jira, Trello, Notion', en: 'Jira, Trello, Notion' },
			},
			{
				title: { ru: 'Версионирование', en: 'Version Control' },
				description: { ru: 'Git, Perforce', en: 'Git, Perforce' },
			},
		],
	},
];
