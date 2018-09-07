import { Store } from 'svelte/store.js';
import models from '../data-models';

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


export default store;
