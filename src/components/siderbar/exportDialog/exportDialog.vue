<script setup lang="ts">
import { ref, defineEmits, defineExpose } from "vue";
import type { TabsPaneContext } from "element-plus";

const emit = defineEmits(["confirmDia"]);
let showDia = ref<boolean>(false);
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const openDia = (): void => {
  showDia.value = true;
};

const closeDia = (): void => {
  showDia.value = false;
};

const confirmDia = (): void => {
  emit("confirmDia", "弹窗内容事件处理完毕，信息传给父组件。");
};
// vue3中规定，使用了 <script setup> 的组件是默认私有的：
// 一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西，除非子组件在其中通过 defineExpose 宏显式暴露
defineExpose({
  openDia,
  closeDia,
});
</script>

<template>
  <el-dialog
    custom-class="export-tabs"
    title="格式化文件导出"
    @close="closeDia"
    v-model="showDia"
  >
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="综合文档" name="first">User</el-tab-pane>
      <el-tab-pane label="统计表" name="second">Config</el-tab-pane>
    </el-tabs>
    <template v-slot:footer>
      <el-button @click="confirmDia" type="primary">确定</el-button>
      <el-button @click="closeDia" type="primary" plain>取消</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less">
.export-tabs {
  // width: 80% !important;
  .el-dialog__body {
    padding: 0;
    // margin: 0 !important;
  }
}
</style>
