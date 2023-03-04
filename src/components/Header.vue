<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    :router="true"
  >
    <el-menu-item index="/main/home">商城管理系统</el-menu-item>
    <div class="flex-grow" />

    <el-menu-item index="/main/notificationlist_editor/1"
      ><el-icon><Bell /></el-icon>消息<el-badge
        v-if="unhandled_message"
        :value="unhandled_message.length"
        class="item"
        type="primary"
      ></el-badge>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useMessage } from '@/libs/messages'
import { reactive, ref, watch, onMounted } from 'vue'
const activeIndex = ref('1')
const data = reactive({
  flag: false,
  unprocessedNotificationNum: 0,
})
const { getAllMessage, unhandled_message } = useMessage()
onMounted(() => {
  // debugger
  getAllMessage()
})
function handleSelect(key, keyPath) {
  console.log(key, keyPath)
}
// watch(
//   () => storeNotification.unprocessednum,
//   (newval) => {
//     data.unprocessedNotificationNum = newval;
//     if (newval > 0) {
//       data.flag = true;
//     } else {
//       data.flag = false;
//     }
//   },
//   { deep: true, immediate: true }
// );
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
.el-menu-item {
  height: 100%;
}
.item {
  :deep(.el-badge__content) {
    float: right;
    margin-left: 5px;
  }
}
</style>
