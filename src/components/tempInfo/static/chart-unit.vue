<script setup lang="ts">
import equip1 from '@/assets/stats/equip-1.png';
import equip2 from '@/assets/stats/equip-2.png';
import equip3 from '@/assets/stats/equip-3.png';
import { flipStore } from '@/stores/flipSwitch.ts';
import { storeToRefs } from 'pinia';
import { ref, reactive, watch, computed } from 'vue';
const flip = flipStore();
const { pre, next } = storeToRefs(flip);
let flager = ref(true);

watch(pre, (value) => {
  flager.value = !flager.value;
});
watch(next, (value) => {
  flager.value = !flager.value;
});
</script>
<template>
  <div class="static">
    <div v-if="flager" style="marginRight:40px;">
      <img :src="equip1" alt />
    </div>
    <div v-if="flager">
      <img :src="equip1" alt />
    </div>
    <div v-if="!flager">
      <img :src="equip1" alt />
    </div>
  </div>
</template>
<style scoped lang="less">
.static {
  color: #fff;
  height: calc(100vh - 42px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>