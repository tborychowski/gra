export default {
	id: 'london',
	name: 'London',
	description: 'Smelly old wharf, crowded with beggars, whores and drunks, welcomes you.',
	prices: [
		{ id: 'wheat',   price: 10 },
		{ id: 'tools',   price: 50 },

		{ id: 'spices',  price: 110 },
		{ id: 'tea',     price: 70 },

		{ id: 'silk',    price: 200 },

		{ id: 'sugar',   price: 60 },
		{ id: 'tobacco', price: 40 },
	],
	weather: {
		q1: { temp: 8,  precipitation: 0.7, sun: 0.2 },
		q2: { temp: 17, precipitation: 0.4, sun: 0.7 },
		q3: { temp: 20, precipitation: 0.4, sun: 0.7 },
		q4: { temp: 10, precipitation: 0.5, sun: 0.2 },
	}
};
