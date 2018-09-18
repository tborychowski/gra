export default {
	id: 'macau',
	name: 'Macau',
	description: 'Place is crowded with weirdly dressed people.',
	prices: [
		{ id: 'wheat',   price: 9  },
		{ id: 'tools',   price: 50 },

		{ id: 'spices',  price: 105  },
		{ id: 'tea',     price: 50  },

		{ id: 'silk',    price: 170 },

		{ id: 'sugar',   price: 50 },
		{ id: 'tobacco', price: 30 },
	],
	weather: {
		q1: { temp: 18, precipitation: 0.3, sun: 0.8 },
		q2: { temp: 27, precipitation: 0.4, sun: 1.0 },
		q3: { temp: 30, precipitation: 0.4, sun: 1.0 },
		q4: { temp: 20, precipitation: 0.3, sun: 0.8 },
	}
};
