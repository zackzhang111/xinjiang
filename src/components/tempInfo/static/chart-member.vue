<script setup lang="ts">
import person from '@/assets/stats/person.png';
</script>
<template>
  <div class="static">
    <div>
      <img :src="person" alt />
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