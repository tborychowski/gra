export default {
	type: 'sloop',
	description: 'Small vessel. But it floats.',
	stats: {
		cargo: { current: 0, max: 25 },
		guns: { current: 0, max: 4 },
		damage: { current: 0, max: 10 },
		speed: { empty: 80, full: 40 },
		crew: { min: 5, max: 25 },
	},
};
