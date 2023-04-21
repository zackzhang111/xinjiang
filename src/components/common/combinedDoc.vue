<script setup lang="ts">
import { reactive, ref } from "vue";
import { QuillEditor, Delta, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
let index = -1;
const myEditor = ref(null);
const content = ref<Delta>(
  new Delta([
    { insert: "一、“单位名称”单位" },
    { insert: "\n" },
    { insert: "1.基本情况", attributes: { color: "#ccc", bold: true } },
    { insert: "\n" },
    {
      insert:
        "“单位名称”基本部署于“单位地址”，BD代号“BD代号”，“单位级别）”级，下辖“单位类别数”个（“单位简称”）；“编制人员XXX人（其中军官XXX人、士官XXX人、义务兵XXX人、文职人员XXX人”，“现有人员XXX人（其中军官XXX人、士官XXX人、义务兵XXX人、文职人员XXX人”。",
      attributes: { color: "#ccc", bold: true },
    },
    { insert: "\n" },
    { insert: "2.担负任务" },
    { insert: "\n" },
    { insert: "1）“任务类型：任务名称”（例如：XXX：1.AAA；2.AAA）。" },
    { insert: "\n" },
    { insert: "3.主要装备" },
    { insert: "\n" },
    { insert: "”装备类型（编制数，现有数）“。" },
    { insert: "\n" },
    { insert: "4.主要领导" },
    { insert: "\n" },
    {
      insert:
        "“主官职务：姓名J衔，出生日期，民族，地址，入伍时间”。 政治委员：姓名J衔，出生日期，民族，地址，入伍时间”。",
    },
  ])
);
let options = {
  modules: {
    toolbar: [
      { list: "ordered" },
      { list: "bullet" },
      { align: [] },
      { color: [] },
    ],
  },
  placeholder: "",
  theme: "snow",
};
const detailData = reactive([
  {
    type: "1.基本情况",
    contain: [
      {
        title: "单位名称",
      },
      {
        title: "单位地址",
      },
      {
        title: "BD代号",
      },
      {
        title: "单位级别",
      },
      {
        title: "单位类别",
      },
      {
        title: "单位简称",
      },
      {
        title: "单位类别数",
      },
      {
        title:
          "编制人员XXX人（其中军官XXX人、士官XXX人、义务兵XXX人）、文职人员XXX人）",
        noPadding: true,
      },
      {
        title:
          "现有人员XXX人（其中军官XXX人、士官XXX人、义务兵XXX人）、文职人员XXX人）",
        noPadding: true,
      },
    ],
  },
  {
    type: "2.担负任务",
    contain: [
      {
        title: "任务类型：任务名称",
      },
    ],
  },
  {
    type: "3.主要装备",
    contain: [
      {
        title: "装备类型（编制数，现有数）",
      },
    ],
  },
  {
    type: "4.主要领导",
    contain: [
      {
        title: "主官：J衔，出生日期，民族，地址，入伍时间",
      },
      {
        title: "政治委员：J衔，出生日期，民族，地址，入伍时间",
      },
    ],
  },
]);

function handleClick(item: any) {
  console.log(item);
  myEditor.value.getQuill().insertText(index, item.title, { color: "red" });
  index += item.title.length;
}
function selectionChange(item: any) {
  if (!item.range) {
    index = item.oldRange.index;
  }
}

function ready() {
  index = myEditor.value.getText().length - 1;
}
</script>

<template>
  <div class="combined-box">
    <div class="detail">
      <div class="section" v-for="(sect, index) in detailData" :key="index">
        <h3 class="type">{{ sect.type }}</h3>
        <div class="contain-box">
          <div
            v-for="(item, ind) in sect.contain"
            :key="ind"
            class="contain"
            :class="{ 'no-padding': item.noPadding }"
          >
            <span @click="handleClick(item)">{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div class="insert">插入</div>
    </div>
    <div class="template">
      <quill-editor
        ref="myEditor"
        :content="content"
        :options="options"
        @selectionChange="selectionChange"
        @ready="ready"
      ></quill-editor>
      <!-- <h3 class="title">一、“单位名称”单位</h3>
      <p>1.基本情况</p>
      <p>
        &emsp;&emsp;“单位名称”基本部署于“单位地址”，BD代号“BD代号”，“单位级别）”级，下辖“单位类别数”个（“单位简称”）；“编制人员XXX人（其中军官XXX人、士官XXX人、义务兵XXX人、文职人员XXX人”，“现有人员XXX人（其中军官XXX人、士官XXX人、义务兵XXX人、文职人员XXX人”。
      </p>
      <p>2.担负任务</p>
      <p>&emsp;&emsp;1）“任务类型：任务名称”（例如：XXX：1.AAA；2.AAA）。</p>
      <p>3.主要装备</p>
      <p>&emsp;&emsp;”装备类型（编制数，现有数）“。</p>
      <p>4.主要领导</p>
      <p>
        &emsp;&emsp;“主官职务：姓名J衔，出生日期，民族，地址，入伍时间”。<br />&emsp;&emsp;“
        政治委员：姓名J衔，出生日期，民族，地址，入伍时间”。
      </p> -->
    </div>
  </div>
</template>

<style scoped lang="less">
.combined-box {
  margin-top: 23px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .detail {
    margin-left: 100px;
    width: 595px;
    height: 850px;
    background-color: black;
    .section {
      .type {
        margin: 10px 0 0 0;
        padding-left: 30px;
        height: 60px;
        line-height: 60px;
        font-size: 28px;
        font-weight: 400;
      }
      .contain-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        padding-right: 20px;
        .contain {
          display: inline-block;
          margin-top: 10px;
          margin-left: 30px;
          padding: 0 15px;
          background-color: rgb(43, 57, 88);
          font-size: 14px;
          height: 38px;
          line-height: 38px;
          border-radius: 5px;
          cursor: pointer;
          &.no-padding {
            padding: 0 5px;
          }
        }
      }
    }
    .insert {
      margin-top: 120px;
      margin-left: 225px;
      width: 140px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 14px;
      border-radius: 5px;
      background-color: rgb(22, 155, 213);
    }
  }
  .template {
    margin-left: 100px;
    width: 595px;
    height: 850px;
    background-color: black;
    .title {
      margin: 10px 0 0 0;
      padding-left: 30px;
      height: 60px;
      line-height: 60px;
      font-size: 28px;
      font-weight: 400;
    }
    p {
      text-align: justify;
      padding-left: 25px;
      padding-right: 20px;
    }
  }
}
</style>
