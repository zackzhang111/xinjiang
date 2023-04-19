// @ts-check
//处理表格统计字段
import { defineStore, acceptHMRUpdate } from "pinia";
import { infoStore } from "./treeTab";
import { chartItem } from "./interfaces";

import * as echarts from "echarts";

export const tableChartStore = defineStore({
  id: "tableChart",
  state: () => ({
    title: "",
    subTitle: "",
    chartData: [] as Array<chartItem>,
    myChartsEl: HTMLElement,
    seltectChartType: "bar",
    currentChart: null as any,
  }),
  actions: {
    columnData2Chart(tableName: string, tableData: [], column: any) {
      const info = infoStore();
      this.title = tableName;
      this.subTitle = column.label;

      this.chartData = tableData.reduce((prev: any, curr: any) => {
        let val = curr[column.key];
        //统计表格内字段值val出现的次数
        if (prev.hasOwnProperty(val)) {
          prev[val]++;
        } else {
          prev[val] = 1;
        }
        return prev;
      }, {});
      //切换tab到统计信息页面
      info.activeTabName = "echarts";
      //刷新页面的echarts
      this.selectChange();
    },
    selectChange() {
      this.destroyChart();
      switch (this.seltectChartType) {
        case "bar":
          this.currentChart = this.addBar();
          break;
        case "pie":
          this.currentChart = this.addPie();
          break;
        default:
          break;
      }
      //??????????
      setTimeout(() => {
        this.currentChart.resize();
      }, 0);
    },
    addBar() {
      const myChart = echarts.init(this.myChartsEl);
      let option = {
        title: {
          text: this.title,
          subtext: this.subTitle,
          left: "center",
          textStyle: {
            color: "white",
          },
          subtextStyle: {
            color: "white",
          },
        },
        tooltip: {},
        xAxis: {
          // data: ["大专", "本科", "硕士", "博士"],
          data: Object.keys(this.chartData),
        },
        yAxis: {},
        series: [
          {
            // name: tableChartState.subTitle,
            type: "bar",
            data: Object.values(this.chartData),
          },
        ],
      };
      myChart.setOption(option);
      return myChart;
    },
    addPie() {
      const myChart = echarts.init(this.myChartsEl);
      let option = {
        title: {
          text: this.title,
          subtext: this.subTitle,
          left: "center",
          textStyle: {
            color: "white",
          },
          subtextStyle: {
            color: "white",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
          textStyle: {
            color: "white",
          },
        },
        series: [
          {
            // name: "Access From",
            type: "pie",
            radius: "50%",
            // data: [
            //   { value: 4, name: "本科" },
            //   { value: 3, name: "硕士" },
            //   { value: 2, name: "大专" },
            //   { value: 2, name: "博士" },
            //   // { value: 300, name: "Video Ads" },
            // ],
            data: Object.keys(this.chartData).map((item: any) => {
              return { value: this.chartData[item], name: item };
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      return myChart;
    },
    destroyChart() {
      this.currentChart && this.currentChart.dispose();
    },
  },
});
