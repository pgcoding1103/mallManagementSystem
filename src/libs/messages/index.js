import { ref, computed } from "vue";
import { requestGet } from "../request";
let allmessage = ref([])
let unhandled_message = computed(() => allmessage.value.filter(ms => ms.processed == 0))
//整合消息数组
function consolidateMessages(result) {
    console.log("排序了一次");
    result = result.filter(message => {
        if (allmessage.value.findIndex(ms => ms.id == message.id) == -1) {
            return message
        }
    })
    allmessage.value = [...allmessage.value, ...result]

}
function getAllMessage() {
    requestGet("/auth/getnotificationlists").then(res => {
        console.log(res);
        const { result } = res.data
        consolidateMessages(result)
    })
}
export function useMessage() {
    return {
        allmessage,
        unhandled_message,
        getAllMessage,
    }
}