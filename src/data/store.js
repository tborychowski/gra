import { Store } from 'svelte/store.js';
import models from './models';
import {rand} from '../util';

const data = {
	day: 0,
	locationId: 'london',
	cash: 0,
	bank: 0,
	cargo: {
		wheat: { amount: 25, price: 0 },
	},
	prices: {},
	models
};


class GameStore extends Store {

	generateItemPrice (item, loc) {
		let price = Math.round(rand(item.price.max, item.price.min) * loc.priceMod);

		if (Math.random() < 0.15) price = Math.ceil(price * 0.75);
		if (Math.random() < 0.05) price = Math.ceil(price * 1.5);

		return price;
	}


	goto (locationId) {
		// INCREASE DAY
		const day = this.get().day + 1;

		// GENERATE PRICES FOR A LOCATION
		const loc = models.locations[locationId];
		const prices = JSON.parse(JSON.stringify(models.wares));
		for (const [, ware] of Object.entries(prices)) {
			ware.price = this.generateItemPrice(ware, loc);
			ware.show = Math.random() < ware.showChance;
		}

		// CALCULATE BANK FEES
		let bank = this.get().bank;
		if (bank < 0) bank = Math.ceil(bank * 1.15);

		this.set({ locationId, day, bank, prices });
	}

	buy (itemId, amount) {
		let {cash, cargo, prices} = this.get();
		let price = prices[itemId].price;
		cash -= price * amount;
		if (cargo[itemId]) {
			amount += cargo[itemId].amount;
			price = (cargo[itemId].price + price) / amount;
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

store.compute('location', ['locationId'], (loc) => models.locations[loc]);

store.compute('cargoLoad', ['cargo'], (cargo) => Object.values(cargo).map(i => i.amount).reduce((p, c) => (p += c), 0));


export default store;
