<script setup  lang="ts">
import CombinedDoc from '../../common/combinedDoc.vue';
import flip from '../../common/flip.vue'

</script>
<template>
	<div class="doc-TUAN">
		<CombinedDoc></CombinedDoc>
		<flip class="flip"></flip>
	</div>
</template>
<style scoped lang="less">
	.doc-TUAN {
		position: relative;
		color: #fff;
		.flip {
			position: absolute;
			right: 90px;
			bottom: 0
		}
	}
</style>