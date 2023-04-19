<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { DCaret } from "@element-plus/icons-vue";
const props = defineProps(["height"]);
const emit = defineEmits(["update:height"]);
// let selectValue = ref(props.height);
const state = reactive({
  upDivHeight: props.height,
});

// 当值发生变化，更新值
// watch(
//   () => props.height,
//   (newValue, oldValue) => {
//     selectValue = newValue;
//     console.log(newValue);

//     debugger;
//   },
//   {
//     immediate: true, // 深度监听
//   }
// );
onMounted(() => {});

let flag = false;
let lastE: any;
let lastHeight: any;
function iconMouseDown(e: any) {
  console.log(11111, e);
  flag = true;
  lastE = e;
  lastHeight = props.height + 0;
}

function mousemove(e: any) {
  if (flag) {
    // console.log(e, lastE);
    let offsetY = e.y - lastE.y;
    // console.log(offsetY);
    emit("update:height", lastHeight + offsetY);
    // props.height = lastHeight + offsetY;
  }
}

document.addEventListener("mousemove", function (e) {
  mousemove(e);
});

document.addEventListener("mouseup", function (e) {
  flag = false;
});

//先不用父组件去控制mousemove事件，直接整个屏幕范围都可以移动分割器
//后面可以从父组件传mousemove，只在指定div内移动分割器
// defineExpose({ mousemove });
</script>

<template>
  <div class="split" :style="{top:props.height + 20 +'px'}">
    <el-icon @mousedown="iconMouseDown">
      <DCaret />
    </el-icon>
  </div>
</template>

<style scoped lang="less">
.split {
  user-select: none;
  display: flex;
  height: 4px;
  width: 100%;
  background: black;
  margin-top: 20px;
  position: absolute;
  z-index: 10;
  .el-icon {
    font-size: 22px;
    color: #409efc;
    margin: auto;
    position: relative;
    top: -11px;
    border: 1px solid #409efc;
    border-radius: 15px;
    cursor: pointer;
  }
}
</style>
