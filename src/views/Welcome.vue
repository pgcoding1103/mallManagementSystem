<template>
  <div class="welcome">
    <div class="panel">
      <el-radio-group v-model="radio" size="default">
      <el-radio-button label="登录" />
      <el-radio-button label="注册" />
    </el-radio-group>
    <!-- <Login v-if="radio == '登录'"></Login>
    <Register v-if="radio == '注册'"></Register> -->
    <keep-alive>
      <component :is="radio == '登录' ? Login : Register"></component>
    </keep-alive>
    </div>
  </div>
</template>

<script setup>
import Login from "./Login.vue";
import Register from "./Register.vue";
import { reactive, ref } from "vue";

const data = reactive({
  selectisshow: true,
});
const radio = ref("登录");
function toLogin() {
  data.selectisshow = false;
  router.push("/welcome/login");
}
function toRegister() {
  data.selectisshow = false;
  router.push("/welcome/register");
}
</script>
<style lang="scss" scoped>
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.welcome{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background: url("../assets/pic001.svg") no-repeat left/50% #409eff;
  .panel {
  position: relative;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px 5px 5px 5px;
  width: 400px;
  height: 60%;
  background-color: #fff;
  padding: 20px;
  box-shadow: var(--el-box-shadow);
  .el-radio-group {
    position: absolute;
    top: 40px;
  }
}
}
</style>