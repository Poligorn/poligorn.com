import type { I18nText } from '../i18n/strings';

export type ProjectOrigin = 'itch' | 'tea-agency' | 'other';

export type ProjectLink = {
	label: I18nText;
	href: string;
	external: true;
	kind?: 'play' | 'download' | 'presskit' | 'source' | 'video' | 'other';
};

export type ProjectMedia = {
	cover?: {
		src: string;
		alt: I18nText;
	};
	trailer?: {
		provider: 'youtube' | 'vimeo' | 'other';
		idOrUrl: string;
	};
	screenshots?: Array<{
		src: string;
		alt: I18nText;
	}>;
};

export type Project = {
	slug: string;
	origin: ProjectOrigin;
	title: string; // бренд/название проекта (не локализуем по умолчанию)
	summary: I18nText;
	year?: number;
	role?: I18nText;
	team?: I18nText;
	tech?: string[];
	platforms?: string[];
	tags?: string[];
	links: ProjectLink[];
	media?: ProjectMedia;
};

// Tea Agency Games — projects from itch.io profile:
// https://tea-agency.itch.io/ (manual source of truth)
export const PROJECTS: Project[] = [
	{
		slug: 'lumo-and-gaia',
		origin: 'tea-agency',
		title: 'LUMO & GAIA',
		summary: {
			ru: 'Управляй солнечным лучом и помоги маленькому роботу LUMO выполнить миссию.',
			en: 'Control the sunbeam and help little robot LUMO fulfill its mission.',
		},
		platforms: ['Browser'],
		tags: ['Puzzle'],
		links: [
			{
				label: { ru: 'Открыть на Itch.io', en: 'Open on Itch.io' },
				href: 'https://tea-agency.itch.io/lumo-and-gaia',
				external: true,
				kind: 'play',
			},
		],
	},
	{
		slug: 'burnshift',
		origin: 'tea-agency',
		title: 'Burnshift',
		summary: {
			ru: 'Пожарный никогда не знает, станет ли следующая смена последней.',
			en: 'As a firefighter, you never know if your next shift will be your last.',
		},
		platforms: ['Browser'],
		tags: ['Puzzle'],
		links: [
			{
				label: { ru: 'Открыть на Itch.io', en: 'Open on Itch.io' },
				href: 'https://tea-agency.itch.io/burnshift',
				external: true,
				kind: 'play',
			},
		],
	},
	{
		slug: 'therapea',
		origin: 'tea-agency',
		title: 'Therapeía',
		summary: {
			ru: 'Познавай тело. Исцеляй дух.',
			en: 'Know the body. Heal the spirit.',
		},
		platforms: ['Browser'],
		tags: ['Puzzle'],
		links: [
			{
				label: { ru: 'Открыть на Itch.io', en: 'Open on Itch.io' },
				href: 'https://tea-agency.itch.io/therapea',
				external: true,
				kind: 'play',
			},
		],
	},
	{
		slug: 'rouletum-demo',
		origin: 'tea-agency',
		title: 'Rouletum Demo',
		summary: {
			ru: 'Balatro‑like на базе рулетки и мистических сил.',
			en: 'A Balatro-like game based on roulette and mystical powers.',
		},
		platforms: ['Browser'],
		tags: ['Card Game'],
		links: [
			{
				label: { ru: 'Открыть на Itch.io', en: 'Open on Itch.io' },
				href: 'https://tea-agency.itch.io/rouletum-demo',
				external: true,
				kind: 'play',
			},
		],
	},
	{
		slug: 'fox-method',
		origin: 'tea-agency',
		title: 'Fox’s Method 🔎',
		summary: {
			ru: 'Мистер Фокс испытывает новый метод допроса.',
			en: 'Mr. Fox experiments with a new interrogation method.',
		},
		platforms: ['Browser'],
		tags: ['Puzzle'],
		links: [
			{
				label: { ru: 'Открыть на Itch.io', en: 'Open on Itch.io' },
				href: 'https://tea-agency.itch.io/fox-method',
				external: true,
				kind: 'play',
			},
		],
	},
	{
		slug: 'rouletum-alpha',
		origin: 'tea-agency',
		title: 'Rouletum [Alpha]',
		summary: {
			ru: 'Погружение в мир фишек и ставок.',
			en: 'Dive into the mysterious world of chips and bets.',
		},
		tags: ['Card Game'],
		links: [
			{
				label: { ru: 'Открыть на Itch.io', en: 'Open on Itch.io' },
				href: 'https://tea-agency.itch.io/rouletum-alpha',
				external: true,
				kind: 'other',
			},
		],
	},
	{
		slug: 'third-shift',
		origin: 'tea-agency',
		title: 'Third Shift 🛒',
		summary: {
			ru: 'Работник узнаёт, на какой он смене, только когда закончит её.',
			en: "The worker doesn't know what shift he's on until he finishes it.",
		},
		platforms: ['Browser'],
		tags: ['Simulation'],
		links: [
			{
				label: { ru: 'Открыть на Itch.io', en: 'Open on Itch.io' },
				href: 'https://tea-agency.itch.io/third-shift',
				external: true,
				kind: 'play',
			},
		],
	},
	{
		slug: 'sand-sweat',
		origin: 'tea-agency',
		title: 'Sand & Sweat ☀️',
		summary: {
			ru: 'Построй пирамиду для любимого фараона.',
			en: 'Build a pyramid for your favorite pharaoh.',
		},
		platforms: ['Browser'],
		tags: ['Simulation'],
		links: [
			{
				label: { ru: 'Открыть на Itch.io', en: 'Open on Itch.io' },
				href: 'https://tea-agency.itch.io/sand-sweat',
				external: true,
				kind: 'play',
			},
		],
	},
	{
		slug: 'frostborn-odyssey',
		origin: 'tea-agency',
		title: 'Frostborn Odyssey',
		summary: {
			ru: 'Выживание в среде, не предназначенной для тебя.',
			en: 'Survive in an environment not meant for you.',
		},
		tags: ['Adventure'],
		links: [
			{
				label: { ru: 'Открыть на Itch.io', en: 'Open on Itch.io' },
				href: 'https://tea-agency.itch.io/frostborn-odyssey',
				external: true,
				kind: 'other',
			},
		],
	},
	{
		slug: 'fatal-tavern',
		origin: 'tea-agency',
		title: 'Fatal Tavern 🍻',
		summary: {
			ru: 'Зайдя за порог таверны, они оказываются на грани жизни и смерти.',
			en: 'Once they cross the tavern’s threshold, they’re on the edge of life and death.',
		},
		platforms: ['Browser'],
		tags: ['Strategy'],
		links: [
			{
				label: { ru: 'Открыть на Itch.io', en: 'Open on Itch.io' },
				href: 'https://tea-agency.itch.io/fatal-tavern',
				external: true,
				kind: 'play',
			},
		],
	},
];


