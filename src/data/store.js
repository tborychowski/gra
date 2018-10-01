import { Store } from 'svelte/store.js';
import models from './models';
import {rand} from '../util';

const PRICE_TWEAK = 1.4;
const DEPRECIATION = 0.85;
const TRAVEL_COST_PER_MILE = 0.03;
const TRAVEL_SPEED_MILES_PER_DAY = 500;


const data = {
	day: 1,
	locationId: 'london',
	cash: 1000,
	bank: 0,
	damage: 0,
	inventory: {
		sloop: { amount: 1, price: 1000 }
	},
	cargo: {
		wheat: { amount: 25, price: 0 },
	},
	prices: {},
	depreciation: DEPRECIATION,
	models
};


const getDistance = (from, to) => models.distances[from] && models.distances[from][to] || models.distances[to][from] || 0;


class GameStore extends Store {

	generateItemPrice (item, loc) {
		let price = Math.round(rand(item.price.max, item.price.min) * loc.priceMod * PRICE_TWEAK);

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
		// GENERATE PRICES FOR A LOCATION
		this.generatePrices(locationId);

		// CALCULATE BANK FEES
		let bank = this.get().bank;
		if (bank < 0) bank = Math.ceil(bank * 1.05);

		const currentLocationId = this.get().locationId;
		let cash = this.get().cash;

		// SUBTRACT COST OF TRAVEL
		if (currentLocationId !== locationId) cash -= this.get().getTravelCost(locationId);

		this.set({ locationId, cash, bank });
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

	sellInventory (itemId) {
		let  {cash, inventory, depreciation} = this.get();
		const price = models.inventory[itemId].price  * depreciation;
		cash += price;
		if (inventory[itemId].amount < 2) delete inventory[itemId];
		else inventory[itemId].amount -= 1;
		this.set({ cash, inventory });
	}

	buyInventory (itemId) {
		let  {cash, inventory} = this.get();
		const price = models.inventory[itemId].price;
		cash -= price;
		if (!inventory[itemId]) inventory[itemId] = {amount: 1, price};
		else inventory[itemId].amount += 1;
		this.set({ cash, inventory });
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
store.compute('fullInventory', ['inventory'], inventory => {
	const fullinv =  [];
	for (const [id, item] of Object.entries(inventory)) {
		fullinv.push(Object.assign({}, models.inventory[id], item, {id}));
	}
	return fullinv;
});
store.compute('cargoLoad', ['cargo'], cargo => Object.values(cargo).map(i => i.amount).reduce((p, c) => (p += c), 0));
store.compute('maxCargoLoad', ['fullInventory'], inv => inv.map(i => i.amount * i.cargo).reduce((p, c) => (p += c), 0));
store.compute('totalWealth', ['fullInventory', 'depreciation'], (inv, depreciation) => {
	return inv.map(i => i.amount * i.price * depreciation).reduce((p, c) => (p += c), 0);
});


store.compute('getDistance', ['locationId'], from => to => getDistance(from, to));
store.compute('getTravelDays', ['locationId'], from => to => Math.ceil(getDistance(from, to) / TRAVEL_SPEED_MILES_PER_DAY));

store.compute('getTravelCost', ['locationId', 'fullInventory'], (from, inv) => to => {
	const baseCost = Math.floor(getDistance(from, to) * TRAVEL_COST_PER_MILE);
	const totalCost = inv
		.filter(i => i.cargo)
		.map(i => i.amount * (baseCost * i.travelCostMod))
		.reduce((p, c) => c += p, 0);
	return Math.floor(totalCost);
});


export default store;
