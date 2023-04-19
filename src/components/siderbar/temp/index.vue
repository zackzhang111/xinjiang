<script setup lang="ts">
	import {reactive,} from 'vue'
	import {tempInfoStore} from '@/stores/tempTab.ts'
	import wendang from '../../../assets/wendang.svg'
	import tongji from '../../../assets/tongji.svg'
	import fengmian from '../../../assets/fengmian.svg'
	const tempData = reactive([
		{
			type: '综合文档',
			icon: wendang,
			contain: [
				{
					title: '综合文档-JUN',
					visible: true,
					keyword: 'doc-JUN',
				},
				{
					title: '综合文档-副JUN',
					visible: false,
					keyword: 'doc-c-JUN',
				},
				{
					title: '综合文档-SHI',
					visible: false,
					keyword: 'doc-SHI',
				},
				{
					title: '综合文档-副SHI',
					visible: false,
					keyword: 'doc-c-SHI',
				},
				{
					title: '综合文档-LV',
					visible: false,
					keyword: 'doc-LV',
				},
				{
					title: '综合文档-TUAN',
					visible: false,
					keyword: 'doc-TUAN',
				},
				{
					title: '综合文档-副TUAN',
					visible: false,
					keyword: 'doc-c-TUAN',
				},
			],
		},
		{
			type: '统计表',
			icon: tongji,
			contain: [
				{
					title: '人员统计表',
					visible: false,
					keyword: 'chart-member',
				},
				{
					title: '根据单位统计装备类型表',
					visible: false,
					keyword: 'chart-unique',
				},
				{
					title: '根据装备类型统计单位表',
					visible: false,
					keyword: 'chart-unit',
				},
			],
		},
		{
			type: '封面',
			icon: fengmian,
			contain: [
				{
					title: '文档一封面',
					visible: false,
					keyword: 'pic-doc1',
				},
				{
					title: '文档二封面',
					visible: false,
					keyword: 'pic-doc2',
				},
				{
					title: '文档二子封面',
					visible: false,
					keyword: 'pic-doc2-s',
				},
			],
		},
	])
	const tempInfo = tempInfoStore()
	const tabClick = (type: string, tab: any) => {
		clearVisible(tab.keyword)
		tempInfo.tabClick(type, tab)
	}
	const clearVisible = (keyword: String) => {
		tempData.forEach(item => {
			item.contain.forEach(tab => {
				tab.visible = false
				if (keyword === tab.keyword) {
					tab.visible = true
				} 
			})
		})
	}

</script>

<template>
	<div class="template">
		<div v-for="(item, index) in tempData" :key="index">
			<div class="type">
				<img :src="item.icon" alt="" class="type-img">
				<span>{{ item.type }}</span>
			</div>
			<p v-for="(tab, key) in item.contain" :key="key" class="contain" :class="{'tab-visible' : tab.visible}" @click="tabClick(item.type, tab)"> {{ tab.title }}</p>
		</div>
	</div>
</template>

<style scoped lang="less">
	.template {
		color: white;
		font-size: 14px;
		font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
		margin-top: -15px;
		.type{
			display: flex;
			height: 60px;
			line-height: 60px;
			padding-left: 30px;
			.type-img {
				margin-right: 6px;
				width: 16px;
			}
		}
		.contain {
			margin: 8px 0;
			padding-left: 45px;
			cursor: pointer;
		}
	  .tab-visible {
			color: rgb(61, 143, 255);
		}
	}

</style>