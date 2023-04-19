<script setup lang="ts">
</script>
<template>
	<div class="cover-page">
		<div class="cover-pan">
			<div class="title">文档标题</div>
			<div class="date">二O二三年二月二十四日</div>
		</div>
	</div>
</template>
<style scoped lang="less">
.cover-page {
	display: flex;
	justify-content: center;
	margin: 20px auto;

	.cover-pan {
		width: 595px;
		height: 850px;
		background-color: #fff;
		color: #000;
		.title {
			margin: 150px auto;
			width: 430px;
			height: 60px;
			border: 1px dotted rgb(51, 51, 51);
			text-align: center;
			line-height: 60px;
			font-family: "Arial Negreta", "Arial Normal", Arial;
			font-weight: 700;
			font-style: normal;
			font-size: 36px;
			color:  rgb(51, 51, 51);
		}
		.date {
			margin: 450px auto;
			width: 300px;
			height: 60px;
			border: 1px dotted rgb(51, 51, 51);
			text-align: center;
			line-height: 60px;
			font-size: 20px;
		}
	}
}
</style>