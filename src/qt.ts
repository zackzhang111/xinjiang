import { QWebChannel } from "./qWebChannel.js";
let qtClient;
await new Promise((resolve, reject) => {
   var baseUrl = window.dataManager.WebSocketUrl;
  // var baseUrl = "http://localhost:54321";
  var socket = new WebSocket(baseUrl);
  socket.onclose = function () {
    console.error("web channel closed");
  };
  socket.onerror = function (error) {
    console.error("web channel error: " + error);
  };
  console.log("sssssssssss链接start");
  socket.onopen = function () {
    console.log("sssssssssss链接成功");
    new QWebChannel(socket, function (channel: any) {
      // make qtClient object accessible globally
      qtClient = channel.objects.qtClient;
      // let json = {};
      // qtClient.refreshTree()
      // qtClient.queryTree.connect(function(json:any){
      //   debugger
      // })

      // qtClient.queryBasicInfoByID("711200013");
      // qtClient.queryBasicInfo.connect(function(json:any){

      // });
      console.log("sssssssssss赋值qtClient成功");
      resolve(qtClient);
      // document.getElementById("send").onclick = function () {
      //   var input = document.getElementById("input");
      //   var text = input.value;
      //   if (!text) {
      //     return;
      //   }

      //   output("Sent message: " + text);
      //   input.value = "";

      //   //调用C++公有槽函数
      //   qtClient.receiveMessage(text);
      // }

      //连接C++信号与javascript函数
      // qtClient.sendTree.connect(function (jsonStr: any) {
      //   debugger;
      //   alert(jsonStr);
      //   // $("#chart").orgchart({
      //   //   data: JSON.parse(jsonStr),
      //   //   pan: true,
      //   //   zoom: true,
      //   // });
      // });

      // qtClient.receiveMessage("Client connected, ready to send/receive messages!");
      // output("Connected to WebChannel, ready to send/receive messages!");
    });
  };
});
export default qtClient; //导出qtWebChannel，供其他页面调用
// new QWebChannel(qt.webChannelTransport, (channel: any) => {
//   // all published objects are available in channel.objects under
//   // the identifier set in their attached WebChannel.id property
//   qtWebChannel = channel.objects.QtObj;
// });
