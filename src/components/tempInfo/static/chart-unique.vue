<script setup lang="ts">
import unit from '@/assets/stats/unit.png';
</script>
<template>
  <div class="static">
    <div>
      <img :src="unit" alt />
    </div>
  </div>
</template>
<style scoped lang="less">
.static {
  color: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>