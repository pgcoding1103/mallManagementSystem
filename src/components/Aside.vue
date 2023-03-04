<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
      >
        <el-menu-item index="/">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/statistics">
          <template #title>
            <el-icon><PieChart /></el-icon>
            <span>数据统计</span>
          </template>
        </el-menu-item>

        <el-menu-item index="/commodity/1">
          <el-icon><Goods /></el-icon>
          <span>商品管理</span>
        </el-menu-item>
        <el-menu-item index="/category/1">
          <el-icon><Menu /></el-icon>
          <span>类别管理</span>
        </el-menu-item>
        <el-menu-item index="/specification/1">
          <el-icon><Grid /></el-icon>
          <span>规格管理</span>
        </el-menu-item>
        <el-menu-item index="/employee/1">
          <el-icon><User /></el-icon>
          <span>员工管理</span>
        </el-menu-item>
        <el-menu-item index="/activity/1">
          <el-icon><Discount /></el-icon>
          <span>活动管理</span>
        </el-menu-item>
        <el-menu-item index="/coupon/1">
          <el-icon><Ticket /></el-icon>
          <span>优惠券管理</span>
        </el-menu-item>
        <el-menu-item index="/message/1">
          <el-icon><Notification /></el-icon>
          <span>消息管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { useMessage } from '@/libs/messages'
import { onMounted } from 'vue'
const { allmessage, unhandled_message } = useMessage()
function handleOpen(key, keyPath) {
  console.log(key, keyPath)
}
function handleClose(key, keyPath) {
  console.log(key, keyPath)
}
onMounted(() => {})
</script>
<style lang="scss" scoped>
.el-col-12 {
  max-width: 100%;
  flex: 0 0 50%;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 100%;
}
</style>
