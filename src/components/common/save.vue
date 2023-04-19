<script setup lang="ts"></script>
<template>
	<div class="tool">
		<div class="save-btn">保存</div>
		<div class="arrow-icon">
			<img class="arrow" src="../../assets/arrows.svg" alt="">
		</div>
	</div>
</template>
<style scoped lang="less">
	.tool {
		width: 130px;
		height: 28px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.save-btn {
			width: 80px;
			height: 28px;
			background-color: rgb(22, 155, 213);
			color: white;
			border-radius: 5px;
			font-size: 14px;
			text-align: center;
			line-height: 28px;
		}
		.arrow-icon {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 36px;
			height: 36px;
			border-radius: 50%;
			background: linear-gradient(to top right, #fff,  rgb(22, 155, 213));
			.arrow {
				width: 22px;
			}
		}
	}
</style>