<script setup lang="ts">
import equip1 from '@/assets/stats/equip-1.png';
import equip2 from '@/assets/stats/equip-2.png';
import equip3 from '@/assets/stats/equip-3.png';
</script>
<template>
  <div class="static">
    <div>
      <img :src="equip1" alt />
    </div>
    <div>
      <img :src="equip1" alt />
    </div>
    <!-- <div>
      <img :src="equip1" alt />
    </div>-->
  </div>
</template>
<style scoped lang="less">
.static {
  color: #fff;
  height: calc(100vh - 42px);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>