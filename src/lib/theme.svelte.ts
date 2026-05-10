export const THEMES = {
	ivory: {
		bg: '#FAF8F4',
		surface: '#FFFFFF',
		text: '#171717',
		sub: '#737373',
		faint: '#ECEAE4',
		accent: '#3F3F46',
		line: 'rgba(0,0,0,0.07)',
	},
	slate: {
		bg: '#15171A',
		surface: '#1C1F23',
		text: '#F2F1EE',
		sub: '#9AA0A6',
		faint: '#2A2E33',
		accent: '#D4B58C',
		line: 'rgba(255,255,255,0.08)',
	},
} as const;

export type ThemeName = keyof typeof THEMES;
export type Theme = (typeof THEMES)[ThemeName];

let _name = $state<ThemeName>('ivory');

export const theme = {
	get name(): ThemeName {
		return _name;
	},
	get c(): Theme {
		return THEMES[_name];
	},
	toggle() {
		_name = _name === 'ivory' ? 'slate' : 'ivory';
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('bible-theme', _name);
		}
	},
	init() {
		if (typeof localStorage === 'undefined') return;
		const saved = localStorage.getItem('bible-theme');
		if (saved === 'ivory' || saved === 'slate') _name = saved;
	},
};
