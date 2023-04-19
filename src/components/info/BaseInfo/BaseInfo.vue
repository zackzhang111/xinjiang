<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import qtClient from "@/qt.ts";
import split from "@/components/common/split.vue";
// import { WMFJS, EMFJS, RTFJS } from "rtf.js";
// defineProps<{ msg: string }>();

const defaultProps = {
  children: "children",
  label: "name",
  id: "id",
};

const count = ref(0);
const rtfContainer = ref();
const state = reactive({
  baseInfo: {
    left: [
      {
        label: "B种类别",
        val: "",
        key: "BZNM",
      },
      {
        label: "J种类别",
        val: "",
        key: "JZNM",
      },
      {
        label: "B队类别",
        val: "",
        key: "BDLBNM",
      },
      {
        label: "B队级别",
        val: "",
        key: "BDJBNM",
      },
      {
        label: "JZ类别",
        val: "",
        key: "JZLBNM",
      },
      {
        label: "编成类别",
        val: "",
        key: "BCLBNM",
      },
      {
        label: "ZB等级",
        val: "",
        key: "ZBDJNM",
      },
      {
        label: "训练等级",
        val: "",
        key: "XLDJNM",
      },
      {
        label: "简述",
        val: "",
        key: "JS",
      },
    ],
    right: [
      {
        label: "编成类别细分",
        val: "",
        key: "BCLBXFNM",
      },
      {
        label: "WZ力量区分",
        val: "",
        key: "LLQFNM",
      },
      {
        label: "SFCZ",
        val: "",
        key: "SFCZ",
      },
      {
        label: "所在ZQ",
        val: "",
        key: "ZQNM",
      },
      {
        label: "保障区",
        val: "",
        key: "BZQNM",
      },
      {
        label: "供应性质",
        val: "",
        key: "GYXZNM",
      },
      {
        label: "BD代号",
        val: "",
        key: "BDDH",
      },
      {
        label: "BZ代号",
        val: "",
        key: "BZDH",
      },
      {
        label: "备注",
        val: "",
        key: "BZ",
      },
    ],
  },
  activeName: "first",
  upDivHeight: 412,

  gpsInfo: {},
  missionTable: [
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    {
      BDNM: 111,
    },
    // {
    //   BDNM: 111,
    // },
  ],
  missionTableColumn: [
    {
      label: "部队编码",
      key: "BDNM",
    },
    {
      label: "TW时间",
      key: "TWSJ",
    },
    {
      label: "作战时间",
      key: "ZZSJ",
    },
    {
      label: "担负任务",
      key: "DFRW",
    },
  ],
});

function stringToBinaryArray(string: String) {
  var buffer = new ArrayBuffer(string.length);
  var bufferView = new Uint8Array(buffer);
  for (var i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i);
  }
  return buffer;
}

function rtf2html(data: String) {
  rtfContainer.value.innerHTML = "";
  var settings = {
    onPicture: function (isLegacy: any, create: Function) {
      // isLegacy is null if it's the only available picture (e.g. legacy rtf)
      if (isLegacy === null || isLegacy === true) {
        //  var elem = create();
        // var elem = $(create()).attr("class", "rtfpict"); // WHY does addClass not work on <svg>?!
        // return setPictBorder(elem, showPicBorder)[0];
        return create();
      }
    },
  };
  WMFJS.loggingEnabled(false);
  EMFJS.loggingEnabled(false);
  RTFJS.loggingEnabled(false);

  //解析rtf数据为html
  var doc = new RTFJS.Document(stringToBinaryArray(data), settings);
  doc
    .render()
    .then((html) => {
      rtfContainer.value.append(...html);
    })
    .catch((error) => {
      console.error(error);
    });
}

onMounted(() => {
  //基本信息
  qtClient &&
    qtClient.queryBasicInfo.connect(function (json: any) {
      const jsonData = JSON.parse(json);
      Object.values(state.baseInfo)
        .flat()
        .forEach((item: any) => {
          if (jsonData.hasOwnProperty(item.key)) {
            item.val = jsonData[item.key];
          } else {
            console.assert(false, "基本信息字段对不上，检查：" + item.key);
          }
        });
    });

  //位置信息
  qtClient &&
    qtClient.queryGPSInfo.connect(function (jsonStr: any) {
      console.log("位置信息", jsonStr);
      state.gpsInfo = JSON.parse(jsonStr);
    });

  //历史沿革
  qtClient &&
    qtClient.queryLSYGInfo.connect(function (jsonStr: any) {
      // console.log(jsonStr);
      let data = JSON.parse(jsonStr).LSYG;
      rtf2html(data);
    });

  // qtClient.queryDFRWInfoByID('711200013');
  //担负任务
  qtClient &&
    qtClient.queryDFRWInfo.connect(function (jsonStr: any) {
      let data = JSON.parse(jsonStr);
      console.log("担负任务", data);
      data.tasks.map((item: any, index: any) => {
        item["index"] = index + 1;
      });
      state.missionTable = data.tasks;
    });
});
</script>

<template>
  <div class="container">
    <el-scrollbar class="up-div" :style="{ height: state.upDivHeight + 'px' , overflow:'auto'}">
      <div>
        <div>
          <span class="title-baseinfo">XXJ区基本信息</span>
        </div>
        <div class="container-info-base flex-space-around">
          <div class="left">
            <div
              class="row flex-space-around"
              v-for="(item,index) in state.baseInfo.left"
              :key="index"
            >
              <span class="label">{{item.label}}：</span>
              <div class="val">
                <el-input v-model="item.val" placeholder />
              </div>
            </div>
          </div>
          <div class="right">
            <div
              class="row flex-space-around"
              v-for="(item,index) in state.baseInfo.right"
              :key="index"
            >
              <span class="label">{{item.label}}：</span>
              <div class="val">
                <el-input v-model="item.val" placeholder />
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>

    <split v-model:height.sync="state.upDivHeight"></split>
    <!-- <el-scrollbar></el-scrollbar> -->
    <div class="down-div">
      <el-tabs v-model="state.activeName" type="card">
        <el-tab-pane label="位置信息" name="first">
          <el-scrollbar>
            <div class="location-info flex-column">
              <span class="label">基本位置：{{state.gpsInfo.MC}}</span>
              <span class="label">扩展位置：{{state.gpsInfo.KZDM}}</span>
              <span class="label">经度：{{state.gpsInfo.JD}}</span>
              <span class="label">纬度：{{state.gpsInfo.WD}}</span>
              <span class="label">高程：{{state.gpsInfo.GC}}</span>
            </div>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="历史沿革" name="second">
          <el-scrollbar>
            <div class="lsyg" ref="rtfContainer"></div>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="担负任务" name="third">
          <el-table
            class="my-table"
            :data="state.missionTable"
            border
            header-cell-class-name="my-table-header"
            cell-class-name="my-table-cell"
            row-class-name="my-table-row"
          >
            <el-table-column prop="index" label="N" width="50" align="center" />
            <el-table-column
              v-for="(item,index) in state.missionTableColumn"
              :key="index"
              :prop="item.key"
              :label="item.label"
              align="center"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../../baseTable.less";
.container {
  user-select: none;
  display: flex;
  flex-flow: column;
  height: 100%;
  .label {
    width: 150px;
    text-align: left;
    color: white;
    white-space: nowrap;
    user-select: none;
  }
}
.up-div {
  .title-baseinfo {
    color: white;
  }
  .container-info-base {
    width: 100%;
    .left,
    .right {
      width: 40%;
      .row {
        margin: 10px;
      }
    }

    .val {
      width: 100%;
      .el-input {
        background: white;

        :deep(.el-input__wrapper) {
          border-radius: 0;
        }
        :deep(.el-input__inner) {
          color: black;
        }
      }
    }
  }
}

.down-div {
  margin-top: 50px;
  flex: 1;
  overflow: auto;
  .el-tabs {
    height: 100%;
  }

  :deep(.el-tabs__content) {
    margin: 0 !important;
    padding: 10px !important;
    // 100% - tab的header - downdiv的margintop
    height: calc(100% - 41px - 50px) !important;
    overflow: auto;
  }
  :deep(.el-tabs__header) {
    border-bottom: 1px solid black;
  }

  :deep(.el-tabs__nav){
    border: none !important;
  }
  :deep(.el-tabs--card>.el-tabs__header .el-tabs__item){
    border: none;
  }
  
  :deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active){
    border: none;
  }
  
  .location-info {
    span {
      margin-top: 20px;
      &:nth-child(1) {
        margin-top: 0;
      }
    }
  }
  .lsyg {
    color: white;
  }
  .my-table {
    height: 100%;
  }
}
</style>
