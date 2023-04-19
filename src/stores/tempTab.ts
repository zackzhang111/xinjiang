import { defineStore } from 'pinia';
interface State {
	keyword: String,
	crumb: any,
}
export const tempInfoStore = defineStore({
	id: 'tempTab',
	state: (): State => ({
		crumb: ['模板管理','综合文档','综合文档-JUN'],
    keyword: 'doc-JUN',
  }),
	actions: {
		tabClick(type:String, tab: any) {
			this.$state.keyword = tab.keyword
			this.$state.crumb.splice(0)
			this.$state.crumb.push('模板管理', type, tab.title)
		}
	}
})