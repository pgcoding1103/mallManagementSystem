import { MessageType } from "../config";
import { h } from "vue"
import { color } from "../style";
function popupMessage(messageContent) {
    ElNotification({
        title: "提示",
        dangerouslyUseHTMLString: true,
        message: h("p", { style: `color:${color.main}` }, messageContent),
        offset: 50,
        type: 'info',
    });


}
function openWebsocketConnection() {
    const ws = new WebSocket(
        `ws://localhost:81?token=${localStorage.getItem("access_token")}`
    );
    ws.onopen = () => {
        console.log("连接成功");
    };
    ws.onmessage = (msg) => {
        let { messageContent } = JSON.parse(msg.data);
        popupMessage(messageContent);
    };
}
export {
    openWebsocketConnection
}