<script setup lang="ts">
import { reactive, ref } from "vue";

import BaseInfo from "@/components/info/BaseInfo/BaseInfo.vue";
import MemberInfo from "@/components/info/MemberInfo/MemberInfo.vue";
import EquipmentInfo from "@/components/info/EquipmentInfo/EquipmentInfo.vue";
import CriticalPersonnel from "@/components/info/CriticalPersonnel/CriticalPersonnel.vue";
import Mission from "@/components/info/Mission/Mission.vue";
import ECharts from "@/components/info/ECharts/ECharts.vue";

import { infoStore } from "@/stores/treeTab.ts";

// defineProps<{ msg: string }>();

const defaultProps = {
  children: "children",
  label: "name",
  id: "id",
};

const count = ref(0);
const info = infoStore();
console.log(info, "info");

const state = reactive({
  // activeName: "baseInfo",
  input: "",
  baseInfo: {
    left: [
      {
        label: "B种类别",
        val: "航空部D",
      },
      {
        label: "J种类别",
        val: "战略支援部D",
      },
      {
        label: "B队类别",
        val: "应急机动ZZBD",
      },
      {
        label: "B队级别",
        val: "1",
      },
      {
        label: "JZ类别",
        val: "643",
      },
      {
        label: "编成类别",
        val: "",
      },
      {
        label: "ZB等级",
        val: "",
      },
      {
        label: "训练等级",
        val: "",
      },
      {
        label: "简述",
        val: "",
      },
    ],
    right: [
      {
        label: "编成类别细分",
        val: "wweq",
      },
      {
        label: "WZ力量区分",
        val: "",
      },
      {
        label: "SFCZ",
        val: "",
      },
      {
        label: "所在ZQ",
        val: "",
      },
      {
        label: "保障区",
        val: "",
      },
      {
        label: "供应性质",
        val: "",
      },
      {
        label: "BD代号",
        val: "",
      },
      {
        label: "BZ代号",
        val: "",
      },
      {
        label: "备注",
        val: "",
      },
    ],
  },
  memberInfo: {
    tableData: [
      {
        date: 1,
        name: "333",
      },
    ],
  },
  equipmentInfo: {
    tableData: [],
  },
});

// const handleClick = (data: any) => {
//   console.log(data);
// };
</script>

<template>
  <el-tabs
    v-model="info.activeTabName"
    type="card"
    class="demo-tabs"
    @tab-click="info.activeTabNameChange"
  >
    <el-tab-pane label="基本信息" name="baseInfo">
      <BaseInfo></BaseInfo>
    </el-tab-pane>
    <el-tab-pane label="人员信息" name="memberInfo">
      <MemberInfo></MemberInfo>
    </el-tab-pane>
    <el-tab-pane label="装备信息" name="equipmentInfo">
      <EquipmentInfo></EquipmentInfo>
    </el-tab-pane>
    <el-tab-pane label="关键人员" name="criticalPersonnel">
      <CriticalPersonnel></CriticalPersonnel>
    </el-tab-pane>
    <el-tab-pane label="担负任务" name="mission">
      <Mission></Mission>
    </el-tab-pane>
    <el-tab-pane label="统计信息" name="echarts">
      <ECharts></ECharts>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="less">
:deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active){
  border: none;
}
.demo-tabs {
  height: 100%;
  :deep(.el-tabs__content) {
    // padding: 32px;
    margin: 32px;
    //-header 41px    - header的margin-bottom  15px  - padding*2 32px*2
    height: calc(100% - 41px - 15px - 64px);
    // color: #6b778c;
    .el-tab-pane {
      height: 100%;
      // overflow: auto;
    }
  }
  :deep(.el-tabs__header) {
    border-bottom: 1px solid black;
  }

  :deep(.el-tabs__nav) {
    border: none !important;
  }
  :deep(.el-tabs__item) {
    border: none !important;
  }

  :deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active) {
    border: none !important;
  }
}
</style>
