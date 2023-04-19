<script setup lang="ts"></script>
<template>
	<div>
		<div class="up">
			<img src="../../assets/up.svg" alt="">
			<span> 上一页 </span>
		</div>
		<div class="down">
			<img src="../../assets/down.svg" alt="">
			<span> 下一页 </span>
		</div>
	</div>
</template>
<style scoped lang="less">
	.up,.down {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #aaa;
		font-size: 14px;
		img {
			width: 13px;
			margin-right: 5px
		}
	}
</style>