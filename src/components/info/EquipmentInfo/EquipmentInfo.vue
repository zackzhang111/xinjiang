<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import qtClient from "@/qt.ts";
import split from "@/components/common/split.vue";
// defineProps<{ msg: string }>();

const defaultProps = {
  children: "children",
  label: "name",
  id: "id",
};

const count = ref(0);
const state = reactive({
  tableData: [],
  tableColumn: [
    {
      key: "MC",
      label: "装备类型",
    },
    {
      key: "qqq",
      label: "是否ZZ装备",
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
      key: "XYS",
      label: "现有数",
    },
    {
      key: "KYS",
      label: "可用数",
    },
    {
      key: "NZJS",
      label: "拟增加数",
    },
    {
      key: "BZ",
      label: "备注",
    },
    {
      key: "SJCJSJ",
      label: "数据采集时间",
    },
  ],
  upDivHeight: 412,
  equipmentInfo: {
    imgs: [],
  },
});

onMounted(() => {
  // qtClient.queryEquipmentInfoByID("711200013");
  qtClient &&
    qtClient.queryEquipmentInfo.connect(function (jsonStr: any) {
      let data = JSON.parse(jsonStr);
      data.equipment.map((item: any, index: any) => {
        item["index"] = index + 1;
      });
      state.tableData = data.equipment;
    });

  qtClient &&
    qtClient.queryEquipmentImages.connect(function (jsonStr: any) {
      let data = JSON.parse(jsonStr);
      console.log(data, "装备图片");
      if (data.hasOwnProperty("imgs")) {
        data.imgs.splice(4);
        if (data.imgs.length < 5) {
          for (let i = 0; i < 5 - data.imgs.length; i++) {
            data.imgs.push({
              IsPrimary: 0,
              JLBM: "",
              MT: "",
              justFillImg: true,
            });
          }
        }
        let res = data.imgs.find((item: any) => {
          return item.IsPrimary == 1;
        });
        //保证有一个主图
        if (!res) {
          data.imgs[0].IsPrimary = 1;
        }
      }
      debugger;
      state.equipmentInfo = data;
      // state.imgList = data.imgs;
      // state.decs = data.ZJSZB;
    });
});

function rowClick(row: any, column: any, event: any) {
  console.log(row, column, event);
  console.log(row.ZBNM);
  // qtClient.queryEquipmentImagesByID(row.ZBNM);
  qtClient.queryEquipmentImagesByID("003");
}

function upload(item: any) {}
</script>

<template>
  <div class="container-info-member">
    <el-table
      :data="state.tableData"
      header-cell-class-name="my-table-header"
      cell-class-name="my-table-cell"
      row-class-name="my-table-row"
      class="my-table"
      :highlight-current-row="true"
      border
      :style="{ height: state.upDivHeight + 'px', width: '100%' }"
      @row-click="rowClick"
    >
      <el-table-column prop="index" label="N" width="50" align="center" />
      <el-table-column
        v-for="(item, index) in state.tableColumn"
        :key="index"
        :prop="item.key"
        :label="item.label"
        align="center"
      />
    </el-table>
    <split v-model:height.sync="state.upDivHeight"></split>
    <div class="down-div">
      <div class="flex-space-between">
        <div>装备性能</div>
        <div>
          <el-button>保存</el-button>
          <el-button>删除</el-button>
        </div>
      </div>
      <div class="flex-start" style="align-items: stretch">
        <div class="equipment-image-container">
          <span>装备图片:</span>
          <div class="imgs-container">
            <!-- <img class="equipment-image-main equipment-image-active equipment-image" /> -->
            <div
              v-for="(item, index) in state.equipmentInfo.imgs"
              :key="index"
              class="img-container"
              :class="{
                'equipment-image-main': item.IsPrimary == 1,
                'equipment-image-active': item.isActive,
                'equipment-image': true,
                'equipment-image-null': item.justFillImg,
              }"
            >
              <div
                class="upload-div"
                @click="
                  state.equipmentInfo.imgs.forEach((e) => (e.isActive = false));
                  item.isActive = true;
                "
              >
                <span @click="upload">上传</span>
              </div>
              <img
                :src="
                  item.justFillImg ? '' : 'data:image/png;base64,' + item.MT
                "
                alt="请上传"
              />
            </div>
          </div>
        </div>
        <div class="equipment-desc-container">
          <span>装备描述:</span>
          <el-input
            class="equipment-desc"
            type="textarea"
            :rows="9"
            placeholder="请输入内容"
            v-model="state.equipmentInfo.ZJSZB"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../../baseTable.less";
@img-border-width: 2px;
@img-margin-width: 4px;
.container-info-member {
  display: flex;
  flex-direction: column;
  height: 100%;
  .down-div {
    margin-top: 70px;
    color: white;
    flex: 1;
    overflow: auto;
    .equipment-image-container {
      width: 56%;

      .imgs-container {
        margin-top: 10px;
        .img-container {
          position: relative;
          .upload-div {
            display: none;
            color: #048fce;
            span {
              cursor: pointer;
            }
          }
          &:hover {
            .upload-div {
              width: 100%;
              height: 100%;
              background: #cccccc22;
              position: absolute;
              // opacity: 0.3;
              display: flex;
              span {
                margin: auto;
              }
            }
          }
        }
        .equipment-image {
          width: calc(25% - @img-margin-width * 2 - @img-border-width * 2);
          height: 100px;
          float: left;
          margin: 0 @img-margin-width @img-margin-width @img-margin-width;
          border: @img-border-width solid transparent;
          // background: #ccc;
          img {
            object-fit: contain;
            width: 100%;
            height: 100%;
          }
        }
        .equipment-image-main {
          width: calc(50% - @img-margin-width * 2 - @img-border-width * 2);
          height: 200px + @img-margin-width + @img-border-width * 2;
        }
        .equipment-image-active {
          border: @img-border-width solid #048fce;
        }
        .equipment-image-null {
          background: transparent;
        }
      }
    }
    .equipment-desc-container {
      width: calc(44% - 20px);
      margin-left: 20px;
      .equipment-desc {
        margin-top: 10px;
        // border: 1px solid #ccc;
        height: calc(100% - 30px - 10px);
      }
    }
  }
}
</style>
