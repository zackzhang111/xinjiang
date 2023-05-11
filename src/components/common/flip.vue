<script setup lang="ts">
import { flipStore } from '@/stores/flipSwitch.ts';
const flip = flipStore();
function preClick() {
  // alert(1);
  flip.preChange();
  console.log(flip.pre);
}
function nextClick() {
  // alert(1);
  flip.nextChange();
  console.log(flip.next);
}
</script>
<template>
  <div>
    <div class="slids" @click="preClick">
      <img src="../../assets/up.svg" alt />
      <span>上一页</span>
    </div>
    <div class="slids" @click="nextClick">
      <img src="../../assets/down.svg" alt />
      <span>下一页</span>
    </div>
  </div>
</template>
<style scoped lang="less">
.slids {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  font-size: 14px;
  cursor: pointer;
  img {
    width: 13px;
    margin-right: 5px;
  }
}
</style>