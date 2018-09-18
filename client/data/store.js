import { Store } from 'svelte/store.js';
import models from './models';
import {formatNumber} from '../util';

const data = {
	day: 1,
	locationId: 'london',
	log: [],
	cargo: [
		{ id: 'wheat', amount: 25, price: 0 },
	],
	cash: 0,
	bank: 0,
	models
};


class GameStore extends Store {

	goto (locationId, event) {
		if (event) event.preventDefault();

		// INCREASE DAY
		const day = this.get().day + 1;

		// GENERATE PRICES FOR A LOCATION
		const {generateItemPrice} = this.get();
		models.locations[locationId].prices.forEach(generateItemPrice);

		//TODO: CALCULATE BANK FEES
		let bank = this.get().bank;
		if (bank < 0) bank = Math.ceil(bank * 1.1);

		this.set({ locationId, day, bank });
	}

	buy (item, amount) {
		let {getItemPrice, cash, cargo} = this.get();
		const price = getItemPrice(item);
		cash -= price * amount;
		const cargoItem = cargo.find(i => i.id === item.id);
		if (!cargoItem) cargo.push(Object.assign({}, item, {amount}));
		else cargo.forEach(i => { if (i.id === item.id) i.amount += amount; });
		this.set({ cash, cargo });
	}

	sell (item, amount) {
		let {getItemPrice, cash, cargo} = this.get();
		const price = getItemPrice(item);
		cash += price * amount;
		cargo = cargo
			.map(i => {
				if (i.id === item.id) i.amount -= amount;
				return i;
			})
			.filter(i => !!i.amount);

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

store.compute('cargoLoad', ['cargo'], (cargo) => cargo.reduce((p, c) => (p += c.amount), 0));

store.compute('generateItemPrice', [], () => {
	return item => {
		let price = item.price;

		if (Math.random() < 0.2) price = Math.ceil(price * 0.85);
		if (Math.random() < 0.1) price = Math.ceil(price * 1.25);

		item.price = price;
		return formatNumber(price);
	};
});


store.compute('getItemPrice', ['locationId'], (loc) => {
	return item => {
		const location = models.locations[loc];
		const locationItem = location.prices.find(p => p.id === item.id);
		return formatNumber(locationItem.price);
	};
});


export default store;
