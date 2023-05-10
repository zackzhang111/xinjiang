<script setup lang="ts">
import { ref, defineEmits, defineExpose } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import cat1 from '@/assets/cat1.png';
import cat2 from '@/assets/cat2.png';

const emit = defineEmits(['confirmDia']);
let showDia = ref<boolean>(false);
let activeName = ref('first');
let titleCheck = ref(false);
let catalogCheck = ref(false);
let levelsCheck = ref(false);
let titleInput = ref('');
let dateInput = ref('');
let catalogInput = ref('');
let catalogInitInput = ref('');
let levelsInput = ref('');
let personStatusCheck = ref('');
let equipStatusCheck = ref('');
let tableCheck = ref('');

const catalogOptions = [
  {
    value: 'label1',
    label: '编目1',
  },
  {
    value: 'label2',
    label: '编目2',
  },
  {
    value: 'label3',
    label: '编目3',
  },
];
const levelsOptions = [
  {
    value: 'currLevel',
    label: '本级导出',
  },
];
const tableData = [
  {
    N: '2016-05-03',
    equip: 'Tom',
    ifEquip: '是',
  },
  {
    N: '2016-05-02',
    equip: 'Tom',
    ifEquip: '是',
  },
  {
    N: '2016-05-04',
    equip: 'Tom',
    ifEquip: '否',
  },
  {
    N: '2016-05-01',
    equip: 'Tom',
    ifEquip: '否',
  },
];

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
  emit('confirmDia', '弹窗内容事件处理完毕，信息传给父组件。');
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
    width="60%"
    custom-class="export-tabs"
    title="格式化文件导出"
    @close="closeDia"
    v-model="showDia"
  >
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="综合文档" name="first">
        <div>
          <div style="margin: 0 10px">
            <el-checkbox v-model="titleCheck" label="封面" size="large" />
            <div
              style="
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-bottom: 16px;
              "
            >
              <div style="width: 88px">标题：</div>
              <el-input style="width: 450px" v-model="titleInput" />
            </div>
            <div
              style="
                display: flex;
                justify-content: space-around;
                align-items: center;
              "
            >
              <div style="width: 88px">日期：</div>
              <el-date-picker style="width: 450px" v-model="dateInput" type="date" />
            </div>
          </div>
          <div style="margin: 0 10px">
            <el-checkbox v-model="catalogCheck" label="编目" size="large" />
            <div
              style="
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-bottom: 16px;
              "
            >
              <div style="width: 88px">编目：</div>
              <div
                style="
                  width: 450px;
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                "
              >
                <div style="width:140px;">
                  <img style="width:100%;" :src="cat1" alt />
                </div>
                <div style="width:140px;">
                  <img style="width:100%;" :src="cat2" alt />
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-around;
                align-items: center;
              "
            >
              <div style="width: 88px">编目初始值：</div>
              <el-select v-model="catalogInitInput" style="width: 450px">
                <el-option
                  v-for="item in catalogOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div style="margin: 0 10px">
            <el-checkbox v-model="levelsCheck" label="多级配置" size="large" />
            <div
              style="
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-bottom: 16px;
              "
            >
              <div style="width: 88px">最低层级：</div>
              <el-select v-model="levelsInput" style="width: 450px">
                <el-option
                  v-for="item in levelsOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="统计表" name="second">
        <div>
          <div style="margin: 0 10px">
            <div>
              <el-checkbox v-model="personStatusCheck" label="人员统计" size="large" />
            </div>
            <div>
              <el-checkbox v-model="equipStatusCheck" label="根据单位统计装备类型" size="large" />
            </div>
            <div>
              <el-checkbox v-model="tableCheck" label="根据装备类型统计单位表配置" size="large" />
            </div>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="N" label="N" width="180" />
            <el-table-column prop="equip" label="装备类型" width="180" />
            <el-table-column prop="ifEquip" label="是否装备" />
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <template v-slot:footer>
      <el-button @click="confirmDia" type="primary">确定</el-button>
      <el-button @click="closeDia" type="primary" plain>取消</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less">
.export-tabs {
  .el-dialog__body {
    padding: 0;
    // margin: 0 !important;
  }
}
</style>
