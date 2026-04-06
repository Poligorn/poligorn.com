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
			ru: 'Управляй солнечным лучом и помоги маленькому роботу LUMO выполнить миссию. Пазлы построены на свете и точном позиционировании — короткие уровни с ясной целью.',
			en: 'Control the sunbeam and help little robot LUMO to fulfill his mission. Light-and-shadow puzzles with precise positioning — short levels with clear goals.',
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
		media: {
			cover: {
				src: 'https://img.itch.zone/aW1hZ2UvMjE3NjUyMC8xMjg1ODU1My5wbmc=/347x500/3%2B%2B%2B%2B%2B.png',
				alt: { ru: 'Обложка LUMO & GAIA', en: 'LUMO & GAIA cover' },
			},
		},
	},
	{
		slug: 'burnshift',
		origin: 'tea-agency',
		title: 'Burnshift',
		summary: {
			ru: 'Пожарный никогда не знает, станет ли следующая смена последней. Небольшая история с напряжённой атмосферой и решениями “на грани”.',
			en: 'As a firefighter you never know when your next shift will be your last. A short story-driven experience with a tense atmosphere and “on-the-edge” decisions.',
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
			ru: 'Познавай тело. Исцеляй дух. Медитативный пазл‑опыт: спокойный темп, символика и ощущение “лечения” через понимание.',
			en: 'Know the body. Heal the spirit. A meditative puzzle experience — calm pace, symbolism, and a “healing through understanding” feel.',
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
			ru: 'Balatro‑like на базе рулетки и мистических сил. Делай ставки, используй “подпольные” фишки и мистические сигилы, чтобы подняться на вершину казино Rouletum.',
			en: 'Balatro-like game based on roulette and the use of mystical powers. Place your bets, use under-the-table chips and mystical sigils to rise to the top of the Rouletum Casino.',
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
		media: {
			cover: {
				src: '/Capsule Export 1.1 from Rouletum.png',
				alt: { ru: 'Обложка Rouletum', en: 'Rouletum capsule' },
			},
		},
	},
	{
		slug: 'fox-method',
		origin: 'tea-agency',
		title: 'Fox’s Method 🔎',
		summary: {
			ru: 'Мистер Фокс испытывает новый метод допроса. Дедуктивный пазл: наблюдай реакции, задавай вопросы и собирай верную картину происходящего.',
			en: 'Mr. Fox experiments with a new interrogation method. A deduction puzzle: read reactions, choose questions, and piece together the truth.',
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
			ru: 'Погружение в мир фишек и ставок. Ранний альфа‑прототип: быстрый взгляд на идеи, механику и настроение Rouletum до полировки.',
			en: 'Dive into the mysterious world of chips and bets. An early alpha prototype — a fast look at Rouletum’s ideas, mechanics, and vibe before polish.',
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
			ru: 'Работник узнаёт, на какой он смене, только когда закончит её. Симуляция‑история о рутине, странных правилах и маленьких выборах, которые меняют исход.',
			en: "The worker doesn't know what shift he's on until he finishes it. A simulation-story about routine, weird rules, and small choices that change the outcome.",
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
			ru: 'Построй пирамиду для любимого фараона. Лёгкий менеджмент: ресурсы, темп и приоритеты, пока солнце и песок давят на сроки.',
			en: 'Build a pyramid for your favorite pharaoh. Light management: resources, pacing, and priorities while the sun and sand pressure your schedule.',
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
			ru: 'Выживание в среде, не предназначенной для тебя. Приключение про холод, риск и поиск пути вперёд — когда сама среда становится противником.',
			en: 'Survive in an environment not meant for you. An adventure about cold, risk, and pushing forward — where the world itself is the enemy.',
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
			ru: 'Зайдя за порог таверны, они на грани жизни и смерти. Тактические решения и “цена ошибки” в компактной истории — одна сцена, много напряжения.',
			en: "Once they cross the tavern’s threshold, they’re on the edge of life and death. Tactical choices and high stakes in a compact story — one scene, a lot of tension.",
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


