<template>
  <div class="login">
    <el-form
      :model="form"
      :label-position="labelPositon"
      label-width="100"
      :status-icon="true"
      :rules="rules"
      :hide-required-asterisk="true"
      ref="login_form"
    >
      <el-form-item label="账号" prop="account" size="default">
        <el-input v-model="account" />
      </el-form-item>
      <el-form-item label="密码" prop="password" size="default">
        <el-input v-model="password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" size="default">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
</script>
<script setup>
import { usevaildateForm } from "@/libs/form";
import { onMounted, ref } from "vue";
const login_form = ref(null);
const labelPositon = ref("top")
const { account, password, submit } = usevaildateForm()
const form = ref({
  account,
  password
})
function login() {
    submit("/api/admin_login", login_form)
}
// function login() {
//   Axios.request({
//     method: "post",
//     url: "/api/admin_login",
//     data: qs.stringify({
//       account: data.account,
//       password: data.password,
//     }),
//   }).then((res) => {
//     console.log(res);
//     storeAdminmessage.admin.aid = res.data.id;
//     let access_token = res.data.access_token;
//     let reflush_token = res.data.reflush_token;
//     if (access_token && reflush_token) {
//       localStorage.setItem("access_token", access_token);
//       localStorage.setItem("reflush_token", reflush_token);
//       router.push("/main/home");
//     }
//   });
// }


// const rules = reactive({
//   account: [
//     {
//       validator: vaildateAccount,
//       trigger: "blur",
//     },
//   ],
//   password: [
//     {
//       validator: vaildatePass,
//       trigger: "blur",
//     },
//   ],
// });
onMounted(() => {
  // localStorage.setItem("access_token", undefined);
  // localStorage.setItem("reflush_token", undefined);
});
</script>

<style lang="scss" scoped>
.login {
  .el-form {
    width: 300px !important;
    .el-form-item {
      width: 100%;
      .el-button {
        width: 100%;
      }
      .register {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>