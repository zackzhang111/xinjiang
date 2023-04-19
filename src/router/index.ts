import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import layer from "../components/siderbar/layer/index.vue";
import info from "../components/info/index.vue";

const router = createRouter({
  //解决路由router-view不显示：createWebHistory改为createWebHashHistory
  history: createWebHashHistory(), //import.meta.env.BASE_URL
  routes: [
    {
      path: "/layer",
      name: "layer",
      component: layer,
    },
    {
      path: "/info",
      name: "info",
      component: info,
    },
    
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
    // {
    //   path: "/layer",
    //   name: "layer",
    //   component: layer,
    // },
  ],
});

export default router;
