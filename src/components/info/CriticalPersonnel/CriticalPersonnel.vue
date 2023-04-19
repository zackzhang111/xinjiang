<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import qtClient from "@/qt.ts";
// defineProps<{ msg: string }>();

const defaultProps = {
  children: "children",
  label: "name",
  id: "id",
};

const count = ref(0);
const state = reactive({
  tableData: [],
  header: {
    img: "",
    left: [
      {
        label: "姓名",
        value: "",
        key: "MC",
      },
      {
        label: "姓别",
        value: "",
        key: "XBNM",
      },
      {
        label: "政治面貌",
        value: "",
        key: "ZZMMNM",
      },
      {
        label: "身份证号",
        value: "",
        key: "SFZHM",
      },
    ],
    // {
    //   name: "",
    //   sex: "",
    //   politicalUutlook: "",
    //   id: "",
    // }
    right: [
      {
        label: "职务",
        value: "",
        key: "ZWNM",
      },
      {
        label: "J衔",
        value: "",
        key: "JXNM",
      },
      {
        label: "S长代号",
        value: "",
        key: "XH",
      },
      {
        label: "任职经历",
        value: "",
        key: "RZJL",
      },
    ],
    // job: "",
    // jx: "",
    // code: "",
    // experience: "",
    bottom: [
      {
        label: "现岗时间",
        value: "",
        key: "XGSJ",
      },
      {
        label: "任现职务时间",
        value: "",
        key: "RXZWSJ",
      },
      {
        label: "职务级别",
        value: "",
        key: "ZWJBNM",
      },
      {
        label: "任现职级时间",
        value: "",
        key: "RXZJSJ",
      },
      {
        label: "技术职级",
        value: "",
        key: "JSZJNM",
      },
      {
        label: "任现技术职级时间",
        value: "",
        key: "RXJSZJSJ",
      },
      {
        label: "入伍时间",
        value: "",
        key: "RWSJ",
      },
      {
        label: "民族",
        value: "",
        key: "MZNM",
      },
      {
        label: "籍贯",
        value: "",
        key: "DMNM",
      },
      {
        label: "文化程度",
        value: "",
        key: "WHCDNM",
      },
      {
        label: "第一学历（全日制）",
        value: "",
        key: "DYXL",
      },
      {
        label: "院校培训情况",
        value: "",
        key: "JSYXPXQK",
      },
    ],
  },
});

onMounted(() => {
  // qtClient.queryKeyPeopleListByID("711200013");
  qtClient &&
    qtClient.queryKeyPeopleList.connect(function (jsonStr: any) {
      let data = JSON.parse(jsonStr);
      state.tableData = data.peopleList;
      console.log("关键人员列表", data);
    });

  // qtClient.queryKeyPeopleInfoByID('711200013');
  qtClient &&
    qtClient.queryKeyPeopleInfo.connect(function (jsonStr: any) {
      let data = JSON.parse(jsonStr);
      console.log("关键人员信息", data);

      state.header.left
        .concat(state.header.right)
        .concat(state.header.bottom)
        .forEach((item) => {
          let key = item.key;
          if (data.hasOwnProperty(key)) {
            item.value = data[key];
          } else {
            console.assert(false, "基本信息字段对不上，检查：" + item.key);
          }
        });
      state.header.img = "data:image/png;base64," + data.MTDX;
    });
});

function rowClick(data: any) {
  console.log(data);
  qtClient && qtClient.queryKeyPeopleInfoByID(data.JLBM);
}
</script>

<template>
  <el-scrollbar>
    <div class="critical-personnel flex-start">
      <div class="container-left">
        <el-table
          :data="state.tableData"
          @row-click="rowClick"
          header-cell-class-name="my-table-header"
          cell-class-name="my-table-cell"
          row-class-name="my-table-row"
        >
          <el-table-column prop="MC" label="姓名" align="center" />
          <el-table-column prop="ZWNM" label="职务" align="center" />
          <!-- JLBM -->
        </el-table>
      </div>
      <div class="container-right">
        <div class="header flex-space-between">
          <img :src="state.header.img" />
          <div class="left">
            <div v-for="(item,index) in state.header.left" :key="index" class="flex-start">
              <span>{{item.label}}</span>
              <span>：</span>
              <span>{{item.value}}</span>
            </div>
          </div>
          <div class="right">
            <div v-for="(item,index) in state.header.right" :key="index" class="flex-start">
              <span>{{item.label}}</span>
              <span>：</span>
              <span>{{item.value}}</span>
            </div>
          </div>
        </div>
        <div class="container">
          <div v-for="(item,index) in state.header.bottom" :key="index" class="container-item">
            <span>{{item.label}}</span>
            <span>：</span>
            <el-input v-model="item.value" />
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="less">
.critical-personnel {
  align-items: start;
  // overflow: auto;
  height: 100%;
  .container-left {
    width: 400px;
    height: 100%;
    margin-right: 20px;
    background: black;
    :deep(.my-table-header) {
      color: white;
      background: transparent !important;
    }
    :deep(.my-table-cell) {
      color: white;
      background: transparent !important;
    }
  }
  .container-right {
    flex-grow: 1;
    .header {
      height: 200px;

      img {
        width: 150px;
        height: 200px;
        object-fit: contain;
        border: 1px solid;
        margin-right: 35px;
      }
      .left,
      .right {
        width: 50%;
        height: 100%;

        div {
          &:nth-child(n + 2) {
            margin-top: 30px;
          }
        }
        span {
          color: white;
          white-space: nowrap;
          &:nth-child(1) {
            width: 90px;
            text-align-last: justify;
          }
          &:nth-child(3) {
            flex-grow: 1;
            border-bottom: 1px solid;
          }
        }
      }
      .right {
        margin-left: 50px;
      }
    }
    .container {
      .container-item {
        display: flex;
        margin-top: 15px;
        span {
          color: white;
          white-space: nowrap;
          &:nth-child(1) {
            width: 190px;
            text-align: right;
            display: inline-block;
          }
        }
        .el-input {
          flex-grow: 1;
          background-color: white;
          :deep(.el-input__inner) {
            color: black;
          }
          :deep(.el-input__wrapper) {
            border-radius: 0;
          }
        }
      }
    }
  }
}
</style>
