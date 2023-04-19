// @ts-check
//处理树节点点击和tab切换逻辑
import { defineStore, acceptHMRUpdate } from "pinia";
import qtClient from "@/qt.ts";

export const infoStore = defineStore({
  id: "user",
  state: () => ({
    activeTabName: "baseInfo", //当前显示页面
    activeNodeID: "711200013", //点击的节点id
  }),

  actions: {
    //切换tab
    activeTabNameChange(name: any) {
      console.log("当前tab:", name);
      console.log("当前tabName:", name.paneName);
      this.query(name.paneName);
    },
    //节点点击
    layerNodeClick(data: any) {
      console.log("当前NodeClick:", data);
      this.query(this.activeTabName);
      //this.activeNodeID = data.id
    },
    query(name: String) {
      switch (name) {
        case "baseInfo":
          //基本信息
          qtClient && qtClient.queryBasicInfoByID(this.activeNodeID);
          //位置信息
          qtClient && qtClient.queryGPSInfoByID(this.activeNodeID);
          //历史沿革
          qtClient && qtClient.queryLSYGInfoByID(this.activeNodeID);
          //担负任务
          qtClient && qtClient.queryDFRWInfoByID(this.activeNodeID);
          break;
        case "memberInfo":
          //人员信息
          qtClient && qtClient.queryPeopleInfoByID(this.activeNodeID);
          //人员详细信息
          qtClient && qtClient.queryPeopleDetailInfoByID(this.activeNodeID);
          break;
        case "equipmentInfo":
          //装备信息
          qtClient && qtClient.queryEquipmentInfoByID(this.activeNodeID);
          break;
        case "criticalPersonnel":
          //关键人员列表
          qtClient && qtClient.queryKeyPeopleListByID(this.activeNodeID);
          // qtClient && qtClient.queryKeyPeopleInfoByID("711200019x976200000001");
          break;
        case "mission":
          break;
        case "echarts":
          break;
        default:
          break;
      }
    },

    // logout() {
    //   // this.$patch({
    //   //   name: "",
    //   //   isAdmin: false,
    //   // });
    //   // we could do other stuff like redirecting the user
    // },
    /**
     * Attempt to login a user
     * @param {string} user
     * @param {string} password
     */
    // async login(user, password) {
    //   const userData = await apiLogin(user, password);
    //   this.$patch({
    //     name: user,
    //     ...userData,
    //   });
    // },
  },
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(infoStore, import.meta.hot));
// }
