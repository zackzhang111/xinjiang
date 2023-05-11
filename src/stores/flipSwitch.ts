import { defineStore } from "pinia";

export const flipStore = defineStore({
  id: "flip",
  state: () => ({
    pre: true, //当前显示页面
    next: true, //点击的节点id
  }),

  actions: {
    preChange() {
      this.pre = !this.pre;
    },
    nextChange() {
      this.next = !this.next;
    },
  },
});

