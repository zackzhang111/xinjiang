<script setup lang="ts">
	import layer from '@/components/siderbar/layer/index.vue'
	import temp from '@/components/siderbar/temp/index.vue'
	import {ref, } from 'vue'
	import {siderbarStore} from '@/stores/siderbar.ts'
	
	const siderbar = siderbarStore()
	
</script>

<template>
	<el-tabs v-model="siderbar.activeName" @tab-click="siderbar.tabClick">
    <el-tab-pane label="组织信息" name="layer">
			<layer></layer>
		</el-tab-pane>
    <el-tab-pane label="模板管理" name="temp">
			<temp></temp>
		</el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="less">
::v-deep .el-tabs__item.is-top {
	font-size: 16px;
}
</style>