<script setup lang="ts">
import { reactive, ref } from "vue";
import img_flag from "@/assets/flag.svg";
// defineProps<{ msg: string }>();

const defaultProps = {
  children: "children",
  label: "name",
  id: "id",
};

const count = ref(0);
const state = reactive({
  missions: [
    {
      label: "任务类型1",
      id: 1,
    },
    {
      label: "任务类型2",
      id: 1,
    },
  ],
  tableData: [],
});
</script>

<template>
  <div class="critical-personnel flex-start">
    <div class="container-left">
      <div v-for="(item,index) in state.missions" :key="index" class="flex-space-between item">
        <span class="label">{{item.label}}</span>
        <img :src="img_flag" />
      </div>
    </div>
    <div class="container-right">
      <el-table
        class="my-table"
        :data="state.tableData"
        border
        header-cell-class-name="my-table-header"
        cell-class-name="my-table-cell"
        row-class-name="my-table-row"
      >
        <el-table-column prop="index" label="序号" align="center" />
        <el-table-column prop="name" label="任务名称" align="center" />
        <el-table-column prop="index" label="任务BD" align="center" />
        <el-table-column prop="index" label="任务地点" align="center" />
        <el-table-column prop="index" label="出动人数" align="center" />
        <el-table-column prop="index" label="负责人" align="center" />
        <el-table-column prop="index" label="任务来源" align="center" />
        <el-table-column prop="index" label="开始时间" align="center" />
        <el-table-column prop="index" label="结束时间" align="center" />
        <el-table-column prop="index" label="任务状态" align="center" />
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../../baseTable.less";
.critical-personnel {
  align-items: start;
  height: 100%;
  .container-left {
    width: 200px;
    height: 100%;
    margin-right: 20px;
    background: black;
    .item {
      height: 30px;
      padding: 0 10px;

      &:nth-child(1) {
        padding: 10px 10px 0 10px;
      }
    }
    .label {
      color: white;
    }
  }
  .container-right {
    flex-grow: 1;
    width: calc(100% - 200px);
  }
}
</style>
