const events = {
	pirates_small: { name: 'Pirates', chance: 0.10, effect: { min: .1, max: 0.5, type: 'reduce-cargo' }, description: 'A pirate ship attacks and steals some of your cargo.', },
	pirates_large: { name: 'Pirates', chance: 0.05, effect: { min: .4, max: 0.9, type: 'reduce-cargo' }, description: 'Pirate ships raided your fleet. They steal some of your cargo.', },
	storm:         { name: 'Storm',   chance: 0.20, effect: { min: .2, max: 0.8, type: 'reduce-cargo' }, description: 'Wind blows as fuck! It destroys some of your cargo.', }
};

const locations = {
	london:    { name: 'London',    priceMod: 1.1, description: 'Smelly old wharf, crowded with beggars, whores and drunks, welcomes you.', },
	amsterdam: { name: 'Amsterdam', priceMod: 1.0, description: 'Nice looking port, covered with stores and shops.', },
	hamburg:   { name: 'Hamburg',   priceMod: 1.0, description: 'Nice looking port, covered with stores and shops.', },
	nassau:    { name: 'Nassau',    priceMod: 0.8, description: 'Light breeze cools the hot air from the west. Pirate\'s nest welcomes you.', },
	dakar:     { name: 'Dakar',     priceMod: 0.9, description: 'Extremely hot. Extremely loud. Dangerous even.', },
	capetown:  { name: 'Cape Town', priceMod: 0.8, description: 'Hot but also wet. Fells like in a cauldron. Or a microwave.', },
	bombay:    { name: 'Bombay',    priceMod: 0.8, description: 'Smell of oriental spices fills your nose.', },
	macau:     { name: 'Macau',     priceMod: 1.1, description: 'Place is crowded with weirdly dressed people.', },
};

const distances = {
	london:    { amsterdam: 200, hamburg: 400, dakar: 2400, nassau: 3700, capetown: 6000, bombay: 10500, macau: 13200 },
	amsterdam: {                 hamburg: 250, dakar: 2600, nassau: 4000, capetown: 6200, bombay: 10700, macau: 13400 },
	hamburg:   {                               dakar: 2800, nassau: 4100, capetown: 6400, bombay: 10900, macau: 13600 },
	dakar:     {                               	            nassau: 3500, capetown: 3600, bombay:  8100, macau: 10800 },
	nassau:    {                                                          capetown: 6500, bombay: 11000, macau: 13500 },
	capetown:  {                                                                          bombay:  4500, macau:  7200 },
	bombay:    {                                                                                         macau:  3700 },
};

// https://www.distance-cities.com/
// london - brest - acoruna - dakar - capetown - srilanka - singapore - macau
//       250     350      1800    3600        4400       1500       1300
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
	coffee  : { name: 'Coffee',  showChance: 0.60, price: { min: 150,  max: 180  }},
	spices  : { name: 'Spices',  showChance: 0.90, price: { min: 350,  max: 400  }},
	silk    : { name: 'Silk',    showChance: 0.70, price: { min: 500,  max: 550  }},
	tools   : { name: 'Tools',   showChance: 0.95, price: { min: 1000, max: 1080 }},
};

const inventory = {
	sloop:       { name: 'Sloop',            travelCostMod: 1,  cargo: 25,   price: 1000,  description: 'Small vessel, but it floats.' },
	schooner:    { name: 'Schooner',         travelCostMod: 2,  cargo: 100,  price: 4000,  description: 'A biggger ship. Can take more cargo.' },
	brig:        { name: 'Brig',             travelCostMod: 6,  cargo: 300,  price: 12000, description: 'Formidable vessel. Decent storage.' },
	frigatelite: { name: 'Light  Frigate',   travelCostMod: 16, cargo: 800,  price: 32000, description: 'Big ship. Can take loads of cargo.' },
	frigate:     { name: 'Frigate',          travelCostMod: 24, cargo: 1200, price: 48000, description: 'Huge ship. Can take loads of cargo.' },
	galleon:     { name: 'Galleon',          travelCostMod: 32, cargo: 1600, price: 64000, description: 'Huge ship. Can take loads of cargo.' },
	line:        { name: 'Ship-of-the-Line', travelCostMod: 40, cargo: 2000, price: 80000, description: 'Enormous ship. Can take everything!' },
};



export default {
	locations,
	distances,
	inventory,
	events,
	wares,
};
