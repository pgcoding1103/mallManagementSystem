<template>
  <el-scrollbar height="400px">
    <div class="register">
      <el-form
        :model="form"
        label-width="120px"
        :label-position="labelPositon"
        :status-icon="true"
        :rules="rules"
        ref="register_form"
      >
        <el-form-item label="员工id" prop="employee_id" size="default">
          <el-input v-model.trim="employee_id" />
        </el-form-item>
        <el-form-item label="管理员账号" prop="account" size="default">
          <el-input v-model.trim="account" />
        </el-form-item>
        <el-form-item label="管理员密码" prop="password" size="default">
          <el-input v-model.trim="password" type="password" />
        </el-form-item>
        <el-form-item label="确认管理员密码" prop="password2" size="default">
          <el-input v-model.trim="password2" type="password" />
        </el-form-item>
        <el-form-item label="注册许可码" prop="license_code" size="default">
          <el-input v-model.trim="license_code" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerSubmit" size="default">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-scrollbar>
</template>

<script setup>
  import { usevaildateForm } from '../libs/form'
  import { onMounted, ref, reactive } from 'vue'
  const ws = new WebSocket(`ws://localhost:81`)
  //消息类型
  const messageType = {
    Error: 0,
    Application: 1,
    Handleorder: 2,
  }
  const labelPositon = ref('top')
  const {
    account,
    password,
    password2,
    employee_id,
    license_code,
    vaildateAccount,
    vaildateLicensCode,
    vaildatePass,
    vaildatePass2,
    vaildateEmployeeID,
    submit,
  } = usevaildateForm()
  const register_form = ref(null)

  const rules = ref({
    account: [
      {
        validator: vaildateAccount,
        trigger: 'change',
      },
    ],
    password: [
      {
        validator: vaildatePass,
        trigger: 'change',
      },
    ],
    password2: [
      {
        validator: vaildatePass2,
        trigger: 'change',
      },
    ],
    license_code: [
      {
        validator: vaildateLicensCode,
        trigger: 'blur',
      },
    ],
    employee_id: [
      {
        validator: vaildateEmployeeID,
        trigger: 'blur',
      },
    ],
  })
  const form = ref({
    employee_id,
    account,
    password,
    password2,
    license_code,
  })
  function registerSubmit() {
    submit('/api/addadmin', register_form)
  }

  //表单提交
  // function submitForm() {
  //   registerForm.value.validate((vaild) => {
  //     console.log(vaild);
  //     console.log(toRaw(registerForm.value));
  //     if (vaild) {
  //       Axios.request({
  //         url: "/api/addadmin",
  //         method: "post",
  //         data: qs.stringify({
  //           name: data.name,
  //           account: data.account,
  //           password: data.password,
  //           licenseCode: data.licenseCode,
  //         }),
  //       }).then(() => {
  //         Axios.request({
  //           method: "post",
  //           url: "/api/addnotification",
  //           data: qs.stringify({
  //             title: "管理员账号申请",
  //             content: `[${data.name}]提交了管理员账号申请`,
  //             aid: data.aid,
  //             sender: data.name,
  //             registeraccount: data.account,
  //           }),
  //         }).then(() => {
  //           ws.send(
  //             JSON.stringify({
  //               title: "管理员账号申请",
  //               registername: toRaw(data.name),
  //               account: toRaw(data.account),
  //               licenseCode: toRaw(data.licenseCode),
  //               msgtype: messageType.Application,
  //             })
  //           );
  //           ElMessage({
  //             message: "提交注册成功!请耐心等待审核",
  //             type: "success",
  //           });
  //         });
  //       });
  //     } else {
  //       ElMessage({
  //         showClose: true,
  //         message: "注册失败!",
  //         type: "error",
  //       });
  //       return;
  //     }
  //   });
  // }

  onMounted(() => {
    ws.onopen = () => {
      console.log('连接成功')
    }
    ws.onmessage = (msg) => {
      console.log(msg.data)
    }
  })
</script>

<style lang="scss" scoped>
  .el-scrollbar {
    height: auto;
  }
  .register {
    height: 400px;
    .el-form {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 100%;
      .el-form-item {
        width: 300px;
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
