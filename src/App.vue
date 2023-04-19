<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from "./components/layer/index.vue";
import siderbar from '@/components/siderbar/index.vue'
import info from "@/components/info/index.vue";
import tempInfo from '@/components/tempInfo/index.vue'
import {siderbarStore} from '@/stores/siderbar.ts'

const siderbarData = siderbarStore()
// import qt from "@/qt.ts";
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>-->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <!-- <router-view></router-view> -->
  <div class="container">
    <siderbar class="siderbar"></siderbar>
    <info class="info" v-if="siderbarData.activeName === 'layer'"></info>
    <tempInfo v-if="siderbarData.activeName === 'temp'"></tempInfo>
  </div>
</template>

<style scoped lang="less">
.container {
  height: 100%;
  align-items: flex-start;
  display: flex;
  .siderbar {
    height: 100%;
    width: 400px;
    overflow: auto;
    // margin-right: 100px;
    // background-color: rgba(24, 31, 51, 1);
    // color: white;
  }
  .info {
    background: rgba(43, 57, 88, 1);
    width: calc(100% - 400px);
  }
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
