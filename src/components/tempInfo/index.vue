<script setup lang="ts">
import docJUN from '@/components/tempInfo/doc/doc-JUN.vue';
import doccJUN from '@/components/tempInfo/doc/doc-c-JUN.vue';
import docSHI from '@/components/tempInfo/doc/doc-SHI.vue';
import doccSHI from '@/components/tempInfo/doc/doc-c-SHI.vue';
import docLV from '@/components/tempInfo/doc/doc-LV.vue';
import docTUAN from '@/components/tempInfo/doc/doc-TUAN.vue';
import doccTUAN from '@/components/tempInfo/doc/doc-c-TUAN.vue';
import picdoc1 from '@/components/tempInfo/pic/pic-doc1.vue';
import picdoc2 from '@/components/tempInfo/pic/pic-doc2.vue';
import picdoc2s from '@/components/tempInfo/pic/pic-doc2-s.vue';
import chartmember from '@/components/tempInfo/static/chart-member.vue';
import chartunique from '@/components/tempInfo/static/chart-unique.vue';
import chartunit from '@/components/tempInfo/static/chart-unit.vue';
import save from '@/components/common/save.vue';
import flip from '../common/flip.vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { tempInfoStore } from '@/stores/tempTab.ts';
import { reactive, watch, ref } from 'vue';
// import {useRouter} from 'vue-router'
const tempInfo = tempInfoStore();
const components: any = reactive({
  docJUN,
  doccJUN,
  docSHI,
  doccSHI,
  docLV,
  docTUAN,
  doccTUAN,
  picdoc1,
  picdoc2,
  picdoc2s,
  chartmember,
  chartunique,
  chartunit,
});
const currentComponent = ref(components['docJUN']);
watch(
  () => tempInfo.keyword,
  () => {
    currentComponent.value =
      components[tempInfo.keyword.toString().replace(/-/g, '')];
  }
);
</script>

<template>
  <div class="temp-info">
    <div class="header">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in tempInfo.crumb" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
      <save class="save"></save>
    </div>
    <div class="container">
      <component :is="currentComponent"></component>
      <flip class="flip"></flip>
    </div>
  </div>
</template>

<style scoped lang="less">
.temp-info {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgb(43, 57, 88);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid #000;

    .el-breadcrumb {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      ::v-deep .el-breadcrumb__inner {
        color: #fff;
      }
      ::v-deep .el-breadcrumb__separator {
        margin: 0;
        color: #fff;
      }
    }
  }
  .container {
    height: 100%;
    width: 100%;
    .flip {
      position: absolute;
      right: 90px;
      bottom: 0;
    }
  }
}
</style>