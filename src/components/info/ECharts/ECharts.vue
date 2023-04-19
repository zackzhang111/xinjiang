<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { tableChartStore } from "@/stores/tableChart.ts";
// defineProps<{ msg: string }>();
import { chartItem } from "@/stores/interfaces.ts";

const defaultProps = {
  children: "children",
  label: "name",
  id: "id",
};
const tableChartState = tableChartStore();
const myChartsEl = ref();

onMounted(() => {
  window.onresize = function () {
    tableChartState.currentChart && tableChartState.currentChart.resize();
  };
  tableChartState.myChartsEl = myChartsEl.value;
});

onUnmounted(() => {
  tableChartState.destroyChart();
});
</script>

<template>
  <div class="echarts-container">
    <select v-model="tableChartState.seltectChartType" @change="tableChartState.selectChange">
      <option value="bar">柱状图</option>
      <option value="pie">饼图</option>
    </select>
    <div class="echarts-container" ref="myChartsEl"></div>
  </div>
</template>

<style scoped lang="less">
@import "../../baseTable.less";
.echarts-container {
  height: 600px;
  width: 100%;
}
</style>
