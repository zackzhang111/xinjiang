import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./style.css";

// import "element-plus/theme-chalk/dark/css-vars.css";
import router from "./router";
import qtClient from "@/qt.ts";
// import { DCaret } from "@element-plus/icons-vue";
// import * as Icons from '@element-plus/icons-vue'
import { createPinia } from "pinia";

console.log(qtClient, "qtClient");
// qtClient.then((e) => {
//   console.log("链接成功", e);
// });

//提前初始化qt
// console.log(qtClient, 333333333333);
const pinia = createPinia();
const app = createApp(App);
// Object.keys(Icons).forEach((key) => {
//     app.component(key, Icons[key]);
// });

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }
// app.component("DCaret", DCaret);

app.use(router).use(ElementPlus).use(pinia).mount("#app");
