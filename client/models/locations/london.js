export default {
	name: 'London',
	description: 'Smelly old wharf, crowded with beggars, whores and drunks, welcomes you.',
	prices: [
		{ id: 'cargo_wheat',   supply: 120, demand: 80,  },
		{ id: 'cargo_corn',    supply: 100, demand: 100, },
		{ id: 'cargo_potato',  supply: 200, demand: 50,  },
		{ id: 'cargo_spices',  supply: 50,  demand: 150, },
		{ id: 'cargo_silk',    supply: 50,  demand: 170, },
		{ id: 'cargo_coffee',  supply: 50,  demand: 120, },
		{ id: 'cargo_tea',     supply: 100, demand: 180, },
		{ id: 'cargo_tools',   supply: 200, demand: 40,  },
		{ id: 'cargo_tabacco', supply: 80,  demand: 120, },
		{ id: 'cargo_sugar',   supply: 50,  demand: 100, },
		{ id: 'cargo_rum',     supply: 200, demand: 100, },
		{ id: 'cargo_water',   supply: 200, demand: 20,  },
	],
	weather: {
		q1: { temp: 8,  precipitation: 0.7, sun: 0.2 },
		q2: { temp: 17, precipitation: 0.4, sun: 0.7 },
		q3: { temp: 20, precipitation: 0.4, sun: 0.7 },
		q4: { temp: 10, precipitation: 0.5, sun: 0.2 },
	}
};
