export default {
	id: 'bombay',
	name: 'Bombay',
	description: 'Smell of occidental spices fills your nose.',
	prices: [
		{ id: 'wheat',   price: 12  },
		{ id: 'tools',   price: 55 },

		{ id: 'spices',  price: 100  },
		{ id: 'tea',     price: 50  },

		{ id: 'silk',    price: 190 },

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
