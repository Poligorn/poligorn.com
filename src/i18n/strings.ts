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
			ru: 'Проекты с Itch.io, резюме и работа студии Tea Agency Games.',
			en: 'Itch.io projects, resume, and Tea Agency Games studio work.',
		},
		ctaProjects: { ru: 'Смотреть проекты', en: 'View projects' },
		ctaContact: { ru: 'Контакты', en: 'Contact' },
		ctaStudio: { ru: 'Проекты студии', en: 'Studio projects' },
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
	},
	timeline: {
		career: { ru: 'Карьера', en: 'Career' },
		current: { ru: 'по настоящее время', en: 'present' },
		months: { ru: 'мес.', en: 'mo' },
		years: { ru: 'лет', en: 'y' },
		year: { ru: 'год', en: 'y' },
	},
} as const;

export function t(text: I18nText, lang: Lang): string {
	return text[lang];
}


