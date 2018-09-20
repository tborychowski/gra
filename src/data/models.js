const events = {
	storm: { name: 'Storm', damage: 100, description: 'Wind blows as fuck!', }
};

const locations = {
	london:    { name: 'London',    priceMod: 1.1, description: 'Smelly old wharf, crowded with beggars, whores and drunks, welcomes you.', },
	amsterdam: { name: 'Amsterdam', priceMod: 1.0, description: 'Nice looking port, covered with stores and shops.', },
	hamburg:   { name: 'Hamburg',   priceMod: 1.0, description: 'Nice looking port, covered with stores and shops.', },
	nassau:    { name: 'Nassau',    priceMod: 0.9, description: 'Light breeze cools the hot air from the west. Pirate\'s nest welcomes you.', },
	macau:     { name: 'Macau',     priceMod: 1.0, description: 'Place is crowded with weirdly dressed people.', },
	bombay:    { name: 'Bombay',    priceMod: 0.8, description: 'Smell of oriental spices fills your nose.', },
};

const distances = {
	london:    { amsterdam: 200, hamburg: 400,  nassau: 3700,  bombay: 10500, macau: 13200 },
	amsterdam: { hamburg:   250, nassau: 4000,  bombay: 10700, macau: 13400 },
	hamburg:   { nassau:   4100, bombay: 10900, macau: 13600 },
	nassau:    { bombay:  11000, macau:   13500 },
	bombay:    { macau:   3700 }
};

// - london-bombay: 10500
// - london-brest: 250
// - brest-acoruna: 350
// - acoruna-dakar: 1800
// - dakar-capetown: 3600
// - capetown-bombay: 4500
// - capetown-srilanka: 4400
// - srilanka-singapore: 1500
// - bombay-srilanka: 900
// - singapore-macau: 1300
// - bombay-macau: 3700


const wares = {
	wheat   : { name: 'Wheat',   showChance: 0.99, price: { min: 10,   max: 15   }},
	corn    : { name: 'Corn',    showChance: 0.70, price: { min: 12,   max: 17   }},
	tea     : { name: 'Tea',     showChance: 0.98, price: { min: 20,   max: 30   }},
	sugar   : { name: 'Sugar',   showChance: 0.90, price: { min: 50,   max: 70   }},
	tobacco : { name: 'Tobacco', showChance: 0.85, price: { min: 110,  max: 140  }},
	coffee  : { name: 'Coffee',  showChance: 0.60, price: { min: 150,  max: 160  }},
	spices  : { name: 'Spices',  showChance: 0.90, price: { min: 350,  max: 400  }},
	silk    : { name: 'Silk',    showChance: 0.70, price: { min: 500,  max: 550  }},
	tools   : { name: 'Tools',   showChance: 0.95, price: { min: 1000, max: 1050 }},
};

const ships = {
	sloop: {
		type: 'sloop',
		description: 'Small vessel, but it floats.',
		travelCostMod: 1,
		stats: {
			cargo:  { current: 0, max: 25 },
			guns:   { current: 0, max: 4 },
			damage: { current: 0, max: 10 },
			crew:   { current: 0, max: 25, min: 5 },
			speed:  { empty: 80, full: 40 },
		}
	},
};


export default {
	locations,
	distances,
	ships,
	events,
	wares,
};
