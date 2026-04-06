export type Lang = 'en' | 'ru';

export type I18nText = {
	ru: string;
	en: string;
};

export const UI = {
	brand: 'Poligorn',
	status: {
		openForWork: { ru: 'Открыт к предложениям', en: 'Open for work' },
	},
	topbar: {
		contactMe: { ru: 'Связаться со мной', en: 'Contact me' },
	},
	nav: {
		projects: { ru: 'Проекты', en: 'Projects' },
		resume: { ru: 'Резюме', en: 'Resume' },
		about: { ru: 'Обо мне', en: 'About' },
		studio: { ru: 'Студия', en: 'Studio' },
		contact: { ru: 'Контакты', en: 'Contact' },
	},
	lang: {
		switchToRu: { ru: 'Русский', en: 'Русский' },
		switchToEn: { ru: 'English', en: 'English' },
	},
	hero: {
		hi: { ru: 'Привет, я', en: "Hi, I'm" },
		title: { ru: 'Разработчик игр', en: 'Game Developer' },
		subtitle: {
			ru: 'Разрабатываю игры и графику, обучаю детей программированию и занимаюсь продвижением игр.',
			en: 'I build games and visuals, teach kids programming, and help games find their audience.',
		},
		ctaProjects: { ru: 'Смотреть проекты', en: 'View projects' },
		ctaContact: { ru: 'Контакты', en: 'Contact' },
		ctaStudio: { ru: 'Проекты студии', en: 'Studio projects' },
	},
	resume: {
		backHome: { ru: 'На главную', en: 'Back home' },
		downloadCv: { ru: 'Скачать CV', en: 'Download CV' },
	},
	sections: {
		projects: { ru: 'Проекты', en: 'Projects' },
		tea: { ru: 'Tea Agency Games', en: 'Tea Agency Games' },
		about: { ru: 'Обо мне', en: 'About' },
		resume: { ru: 'Резюме', en: 'Resume' },
		social: { ru: 'Соцсети', en: 'Social' },
		hobbies: { ru: 'Увлечения', en: 'Hobbies' },
		favorites: { ru: 'Избранные проекты', en: 'My Favorite Projects' },
		updates: { ru: 'Что нового', en: "More of what I've been up to" },
	},
	footer: {
		tagline: {
			ru: 'Больше проектов и историй — скоро. Давай на связи.',
			en: "More projects and experiences are always on the way. Let's keep in touch!",
		},
		connect: { ru: 'Связаться', en: 'Connect' },
		version: { ru: 'Версия', en: 'Version' },
		stable: { ru: 'Сайт стабильно работает', en: 'Website is stable' },
	},
	timeline: {
		career: { ru: 'Карьера', en: 'Career' },
		title: { ru: 'Опыт работы', en: 'Work Experience' },
		current: { ru: 'по настоящее время', en: 'present' },
		months: { ru: 'мес.', en: 'mo' },
		years: { ru: 'лет', en: 'y' },
		year: { ru: 'год', en: 'y' },
	},
} as const;

export function t(text: I18nText, lang: Lang): string {
	return text[lang];
}


