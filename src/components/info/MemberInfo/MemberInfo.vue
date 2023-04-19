<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import split from "@/components/common/split.vue";
import qtClient from "@/qt.ts";
import { tableChartStore } from "@/stores/tableChart.ts";
// defineProps<{ msg: string }>();

const defaultProps = {
  children: "children",
  label: "name",
  id: "id",
};
console.log(222222222);

const tableChart = tableChartStore();

const splitCom = ref(null);
const count = ref(0);
const state = reactive({
  input: "",
  tableData: [],
  tableColumn: [
    {
      key: "RYLBNM",
      label: "人员类别",
    },
    {
      key: "TWSJ",
      label: "天文时间",
    },
    {
      key: "BZS",
      label: "编制数",
    },
    {
      key: "SYS",
      label: "实有数",
    },
    {
      key: "ZWS",
      label: "在位数",
    },
    {
      key: "KCDS",
      label: "可出动数",
    },
    {
      key: "SJCJRY",
      label: "数据采集时间",
    },
  ],
  detailTableData: [],
  detailTableColumn: [
    {
      key: "MC",
      label: "姓名",
    },
    {
      key: "JXNM",
      label: "J衔",
    },
    {
      key: "RXZWSJ",
      label: "任现职务时间",
    },
    {
      key: "ZWJBNM",
      label: "职务级别",
    },
    {
      key: "RXZJSJ",
      label: "任现职级时间",
    },
    {
      key: "JSZJNM",
      label: "技术职级",
    },
    {
      key: "RXJSZJSJ",
      label: "任现技术职级时间",
    },
    {
      key: "XBNM",
      label: "性别",
    },
    {
      key: "SFZHM",
      label: "身份找号码",
    },
    {
      key: "CSNY",
      label: "出生年月",
    },
    {
      key: "RWSJ",
      label: "入伍时间",
    },
    {
      key: "MZNM",
      label: "民族",
    },
    {
      key: "DMNM",
      label: "籍贯",
    },
    {
      key: "ZZMMNM",
      label: "政治面貌",
    },
    {
      key: "WHCDNM",
      label: "文化程度",
    },
    {
      key: "DYXL",
      label: "第一学历（全日制）",
    },
    {
      key: "JSYXPXQK",
      label: "院校培训情况",
    },
    {
      key: "SJCJSJ",
      label: "数据采集时间",
    },
  ],
  upDivHeight: 412,
  selectColumn: "", //当前选中的列
});

onMounted(() => {
  // qtClient.queryPeopleInfoByID("711200013");
  qtClient &&
    qtClient.queryPeopleInfo.connect(function (jsonStr: any) {
      let data = JSON.parse(jsonStr);
      data.people.map((item: any, index: any) => {
        item["index"] = index + 1;
      });
      state.tableData = data.people;
      console.log("人员信息表", data);
    });

  // qtClient.queryPeopleDetailInfoByID('711200013');
  qtClient &&
    qtClient.queryPeopleDetailInfo.connect(function (jsonStr: any) {
      let data = JSON.parse(jsonStr);
      data.peopleDetail.map((item: any, index: any) => {
        item["index"] = index + 1;
      });
      state.detailTableData = data.peopleDetail;
      console.log("人员详细信息表", data);
    });
});

function toChart() {
  if (state.selectColumn != "") {
    tableChart.columnData2Chart(
      "人员详细信息",
      state.detailTableData,
      state.detailTableColumn.find((item) => {
        return item.key == state.selectColumn;
      })
    );
  }
}

function mousemove(e: any) {
  // splitCom.value.mousemove(e);
}
</script>

<template>
  <div class="container-info-member" @mousemove="mousemove">
    <el-table
      :data="state.tableData"
      class="my-table"
      border
      :style="{ height: state.upDivHeight + 'px' , overflow:'auto',width: '100%'}"
      header-cell-class-name="my-table-header"
      cell-class-name="my-table-cell"
      row-class-name="my-table-row"
    >
      <el-table-column prop="index" label="N" width="50" align="center" />
      <el-table-column
        v-for="(item,index) in state.tableColumn"
        :key="index"
        :prop="item.key"
        :label="item.label"
        align="center"
      ></el-table-column>
    </el-table>

    <split ref="splitCom" v-model:height.sync="state.upDivHeight"></split>

    <div class="flex-start down-div-title">
      <div>人员详细信息</div>
      <!-- 增加下拉框 -->
      <el-select v-model="state.selectColumn" placeholder="请选择">
        <el-option
          v-for="(item,index) in state.detailTableColumn"
          :key="index"
          :value="item.key"
          :label="item.label"
        ></el-option>
      </el-select>
      <el-button @click="toChart">统计</el-button>
    </div>
    <el-table
      class="down-div my-table"
      :data="state.detailTableData"
      border
      header-cell-class-name="my-table-header"
      cell-class-name="my-table-cell"
      row-class-name="my-table-row"
    >
      <el-table-column prop="index" label="N" width="50" align="center" />
      <el-table-column
        v-for="(item,index) in state.detailTableColumn"
        :key="index"
        :prop="item.key"
        :label="item.label"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="less">
@import "../../baseTable.less";
.container-info-member {
  user-select: none;
  display: flex;
  // flex-flow: column;
  flex-direction: column;
  height: 100%;

  .down-div-title {
    margin-top: 70px;
    color: white;
    .el-select {
      width: 120px;
      margin-left: 30px;
    }
    .el-button {
      margin-left: 30px;
    }
  }
  .down-div {
    flex: 1;
    // overflow: auto;

    :deep(.el-tabs__content) {
      padding: 10px !important;
      height: 100% !important;
    }
  }
}
</style>
