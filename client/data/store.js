import { Store } from 'svelte/store.js';
import models from '../data-models';

const rand = percent => Math.floor(Math.random() * (percent + 1));


class GameStore extends Store {
	goto (locationId) {
		const day = this.get().day + 1;




		this.set({ locationId, day });
	}
}


const store = new GameStore({
	day: 1,
	locationId: 'london',
	log: [],
	cargo: [
		{ id: 'wheat', amount: 25, price: 0 },
	],
	cash: 0,
	bank: 0,
	models
});

store.compute('location', ['locationId'], (loc) => models.locations[loc]);
store.compute('getItemPrice', [], () => {
	return item => {
		let price = item.price;

		if (Math.random() < 0.23) price = Math.ceil(price * 0.75);
		if (Math.random() < 0.15) price = Math.ceil(price * 1.5);

		item.price = price;
		return price;
	};
});


export default store;
