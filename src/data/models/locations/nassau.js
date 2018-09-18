export default {
	id: 'nassau',
	name: 'Nassau',
	description: 'Light breeze cools the hot air from the west. Pirate\'s nest welcomes you.',
	prices: [
		{ id: 'wheat',   price: 8  },
		{ id: 'tools',   price: 60 },

		{ id: 'spices',  price: 110 },
		{ id: 'tea',     price: 60 },

		{ id: 'silk',    price: 200 },

		{ id: 'sugar',   price: 40  },
		{ id: 'tobacco', price: 20  },
	],
	weather: {
		q1: { temp: 18, precipitation: 0.3, sun: 0.8 },
		q2: { temp: 27, precipitation: 0.4, sun: 1.0 },
		q3: { temp: 30, precipitation: 0.4, sun: 1.0 },
		q4: { temp: 20, precipitation: 0.3, sun: 0.8 },
	}
};
