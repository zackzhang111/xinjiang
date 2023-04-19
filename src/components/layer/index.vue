<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import data from "./data.json";
import qtClient from "@/qt.ts";
import img_file from "@/assets/file.svg";
import img_flag from "@/assets/flag.svg";
import img_leaf from "@/assets/leaf.svg";
import img_expand from "@/components/icons/expand.vue";
import { infoStore } from "@/stores/treeTab.ts";
// console.log(data);
// defineProps<{ msg: string }>();

const defaultProps = {
  children: "children",
  label: "name",
  id: "id",
};

const count = ref(0);
const info = infoStore();
const state = reactive({
  data: [data],
  // data: [],
});

onMounted(() => {
  // 测试连接信息，接受命令处理结果
  // setTimeout(()=>{
  // 			qtWebChannel.SigSendMessageToJS.connect((response:any) => {
  // 				alert("response: " + response);
  // 				let result = JSON.parse(response);
  //         state.data=result;
  // 				// if (result.code == "0") {
  // 				// } else {
  // 				// }
  // 			});
  // 		}, 1000);

  // qtClient.then((e: any) => {
  //   e.sendTree.connect(function (jsonStr: any) {
  //     debugger
  //     state.data = [JSON.parse(jsonStr)];
  //     // $("#chart").orgchart({
  //     //   data: JSON.parse(jsonStr),
  //     //   pan: true,
  //     //   zoom: true,
  //     // });
  //   });
  // });
  qtClient &&
    qtClient.queryTree.connect(function (json: any) {
      state.data = [JSON.parse(json)];
    });

  qtClient && qtClient.refreshTree();
});

// function cc(node, data) {
//   console.log(node, data);
// }
// const handleNodeClick = (data: any) => {
//   console.log(data);
//   qtClient && qtClient.queryBasicInfoByID("711200013");
//   // qtClient.queryBasicInfoByID(data.id);
// };
</script>

<template>
  <!-- :indent="0" -->
  <el-tree
    class="my-tree"
    :data="state.data"
    :props="defaultProps"
    :indent="0"
    @node-click="info.layerNodeClick"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <img v-if="data.children.length>0" :src="img_file" class="img-file" />
        <img v-else :src="img_leaf" class="img-leaf" />
        <span>{{ node.label }}</span>
        <img :src="img_flag" class="img-flag" />
      </span>
    </template>
  </el-tree>
</template>

<style scoped lang="less">
@backgroundcolor: rgba(24, 31, 51, 1);
:deep(.el-tree-node__content) {
  &:hover {
    .img-flag {
      display: inline-block;
    }
  }
}

.my-tree {
  //配置虚线
  :deep(.el-tree-node) {
    position: relative;
    padding-left: 12px; // 缩进量
  }
  :deep(.el-tree-node__children) {
    padding-left: 12px; // 缩进量
  }
  :deep(.el-tree-node__expand-icon) {
    //展开按钮位置调整
    position: relative;
    left: 10px;
  }

  :deep(.el-tree-node__children) {
    // overflow: visible !important;
  }
  // 竖线
  // :deep(.el-tree-node::before) {
  //   content: "";
  //   height: 100%;
  //   width: 1px;
  //   position: absolute;
  //   // left: -3px;
  //   left: 32px;
  //   top: -32 px;
  //   border-width: 1px;
  //   border-left: 1px dashed #02a5ee;
  // }
  // 当前层最后一个节点的竖线高度固定
  :deep(.el-tree-node:last-child::before) {
    height: 18px; // 可以自己调节到合适数值
    top: -6px;
  }

  // 横线
  // :deep(.el-tree-node::after) {
  //   content: "";
  //   // width: 24px;
  //   width: 13px;
  //   height: 20px;
  //   position: absolute;
  //   // left: -3px;
  //   left: 4px;
  //   top: 12px;
  //   border-width: 1px;
  //   border-top: 1px dashed #02a5ee;
  // }

  //竖线
  :deep(.el-tree-node) {
    &:before {
      content: "";
      // height: calc(100% + 18px);
      height: 100%;
      width: 1px;
      position: absolute;
      left: 30px;
      // top: -6px;
      border-width: 1px;
      border-left: 1px dashed #02a5ee;
    }
  }

  // 去掉最顶层的虚线，放最下面样式才不会被上面的覆盖了
  & > :deep(.el-tree-node::after) {
    border-top: none;
  }

  & > :deep(.el-tree-node::before) {
    border-left: none;
  }

  // 展开关闭的icon
  :deep(.el-tree-node__expand-icon) {
    font-size: 24px;
    // 叶子节点（无子节点）
    &.is-leaf {
      color: transparent;
      // display: none; // 也可以去掉
    }
  }

  // 隐藏自带的展开svg图标
  :deep(.el-tree-node__expand-icon) {
    margin-right: 12px;
    padding: 0;
    & svg {
      display: none;
    }
    // 插入自定义展开图标
    &:before {
      content: "";
      width: 14px;
      height: 14px;
      background-color: @backgroundcolor;
      background-image: url("../../assets/expand.svg");
      position: relative;
    }
    // 连接线
    &:after {
      content: "";
      background: transparent;
      border-top: 1px dashed #02a5ee;
      position: relative;
      left: 1px;
      top: 6px;
      width: 8px;
      height: 14px;
    }
    // 收缩图标
    &.expanded {
      // -webkit-transform: rotate(0deg);
      // transform: rotate(0deg);
      transform: initial;
      transition: auto;
      &:before {
        background-image: url("../../assets/collapse.svg");
      }
    }
    // 叶子节点无图标,修改为--- 连接到叶子节点
    &.is-leaf {
      background: transparent;
      &:before {
        background: transparent;
        border-top: 1px dashed #02a5ee;
        position: relative;
        left: 4px;
        top: 6px;
        width: 17px;
      }
      &:after {
        display: none;
      }
    }
  }
}

.img-leaf,
.img-file {
  margin-right: 6px;
  vertical-align: middle;
}
.img-flag {
  display: none;
  position: absolute;
  right: 10px;
  top: 6px;
}
.read-the-docs {
  color: #888;
}
</style>
