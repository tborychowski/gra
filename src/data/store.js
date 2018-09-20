import { Store } from 'svelte/store.js';
import models from './models';
import {rand} from '../util';

const data = {
	day: 1,
	locationId: 'london',
	cash: 100,
	bank: 0,
	shipId: 'sloop',
	cargo: {
		wheat: { amount: 25, price: 0 },
	},
	prices: {},
	models
};

const COST_OF_LIVING_PER_DAY = 3;
const TRAVEL_COST_PER_MILE = 0.1;

const getDistance = (from, to) => models.distances[from] && models.distances[from][to] || models.distances[to][from] || 0;
const getLivingCost = (locationId) => Math.floor(models.locations[locationId].priceMod * COST_OF_LIVING_PER_DAY);


class GameStore extends Store {

	generateItemPrice (item, loc) {
		let price = Math.round(rand(item.price.max, item.price.min) * loc.priceMod);

		if (Math.random() < 0.15) price = Math.ceil(price * 0.75);
		if (Math.random() < 0.05) price = Math.ceil(price * 1.5);

		return price;
	}

	generatePrices (locationId) {
		locationId = locationId || this.get().locationId;
		const loc = models.locations[locationId];
		const prices = JSON.parse(JSON.stringify(models.wares));
		for (const [, ware] of Object.entries(prices)) {
			ware.price = this.generateItemPrice(ware, loc);
			ware.show = Math.random() < ware.showChance;
		}
		this.set({ prices });
	}


	goto (locationId) {
		// INCREASE DAY
		const day = this.get().day + 1;

		// GENERATE PRICES FOR A LOCATION
		this.generatePrices(locationId);

		// CALCULATE BANK FEES
		let bank = this.get().bank;
		if (bank < 0) bank = Math.ceil(bank * 1.15);

		// SUBTRACT COST OF LIVING
		let cash = this.get().cash;
		let cost = getLivingCost(locationId);
		if (cash > cost) cash -= cost;
		else {
			cost -= cash;
			cash = 0;
			bank -= cost;
		}

		this.set({ locationId, day, cash, bank });
	}

	buy (itemId, amount) {
		let {cash, cargo, prices} = this.get();
		let price = prices[itemId].price;
		const newTotal = price * amount;										// price of new cargo
		cash -= newTotal;
		if (cargo[itemId]) {
			const oldTotal = cargo[itemId].price * cargo[itemId].amount;		// price of old cargo
			amount += cargo[itemId].amount;
			price = Math.round((oldTotal + newTotal) / amount);					// avg price of all cargo
		}
		cargo[itemId] = { amount, price };
		this.set({ cash, cargo });
	}

	sell (itemId, amount) {
		let {cash, cargo, prices} = this.get();
		const price = prices[itemId].price;
		cash += price * amount;
		if (cargo[itemId]) cargo[itemId].amount -= amount;
		if (cargo[itemId].amount <= 0) delete cargo[itemId];

		this.set({ cash, cargo });
	}

	deposit (amount) {
		let {cash, bank} = this.get();
		cash -= amount;
		bank += amount;
		this.set({ cash, bank });
	}

	withdraw (amount) {
		let {cash, bank} = this.get();
		cash += amount;
		bank -= amount;
		this.set({ cash, bank });
	}
}


const store = new GameStore(data);

store.compute('location', ['locationId'], loc => models.locations[loc]);
store.compute('ship', ['shipId'], ship => models.ships[ship]);
store.compute('cargoLoad', ['cargo'], cargo => Object.values(cargo).map(i => i.amount).reduce((p, c) => (p += c), 0));
store.compute('getDistance', ['locationId'], from => to => getDistance(from, to));
store.compute('getTravelCost', ['locationId'], from => to => getDistance(from, to) * TRAVEL_COST_PER_MILE);
store.compute('livingCost', ['locationId'], loc => getLivingCost(loc));


export default store;
