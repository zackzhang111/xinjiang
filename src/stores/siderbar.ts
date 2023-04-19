import { defineStore } from 'pinia';
interface State {
	activeName: String,
}
export const siderbarStore = defineStore({
	id: 'siderbar',
	state: (): State => ({
    activeName: 'layer',
  }),
	actions: {
		tabClick(tab: any) {
			console.log(tab.paneName);
		}
	}
})