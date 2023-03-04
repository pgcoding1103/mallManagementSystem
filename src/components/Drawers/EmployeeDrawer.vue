<template>
  <el-drawer
    @open="init"
    v-model="props.showDrawer"
    @close="emit('reflushShow', false), reset(employeeForm)"
    :size="'35%'"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">{{ title }}员工</h4>
    </template>
    <el-card shadow="never">
      <template #header>
        <div class="eid">员工号 {{ props.drawerData.id }}</div>
        <el-form
          :model="form"
          label-width="120px"
          :label-position="'top'"
          :status-icon="true"
          :rules="rules"
          ref="employeeForm"
        >
          <el-form-item label="头像">
            <el-upload
              ref="upload"
              class="avatar-uploader"
              action="http://localhost:80/auth/uploadpicture"
              method="post"
              :headers="{
                Authorization: 'Bearer ' + access_token,
              }"
              list-type="picture-card"
              :auto-upload="false"
              accept="image"
              :limit="1"
              :on-exceed="handleUploadExceed"
              :on-change="handleUploadChange"
              :on-success="handleUploadSuccess"
            >
              <el-avatar
                v-if="Object.keys(props.drawerData).length && !urlChanged"
                shape="square"
                :src="UploadedImageUrl"
              />
              <el-avatar
                v-if="!Object.keys(props.drawerData).length && !urlChanged"
                shape="square"
                :src="'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
              />
            </el-upload>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="name" size="default" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="gender">
              <el-radio-button label="男" size="default" border
                >男</el-radio-button
              >
              <el-radio-button label="女" size="default" border
                >女</el-radio-button
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input-number
              :min="18"
              :max="60"
              controls-position="right"
              size="default"
              v-model="age"
            />
          </el-form-item>
          <el-form-item label="岗位" prop="job">
            <el-select v-model="form.job" size="default">
              <el-option
                v-for="item in jobs"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="籍贯" prop="address">
            <el-cascader
              ref="area"
              :options="regionData"
              v-model="addressCode"
              @change="addressChange"
              clearable
              size="default"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #default>
        <div class="btns">
          <el-button type="default" @click="reset(employeeForm)" size="default">
            重置修改
          </el-button>
          <el-button
            v-if="Object.keys(props.drawerData).length != 0"
            type="primary"
            @click="modifySubmit"
            size="default"
          >
            确认修改
          </el-button>
          <el-button v-else type="primary" @click="addSubmit" size="default">
            确认添加
          </el-button>
        </div>
      </template>
    </el-card>
  </el-drawer>
</template>

<script setup>
import { requestPost } from '@/libs/request'
import { ElMessage, genFileId } from 'element-plus'
import { ref, computed } from 'vue'
import { usevaildateForm } from '../../libs/form'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import useTable from '@/libs/table'
const props = defineProps({
  drawerData: {
    type: Object,
    default: {},
  },
  showDrawer: {
    type: Boolean,
    default: false,
  },
})
const {
  name,
  gender,
  job,
  address,
  addressCode,
  age,
  jobs,
  vaildateName,
  vaildateJob,
  vaildateAddress,
  vaildateAge,
} = usevaildateForm()
const { tableData } = useTable()
const emit = defineEmits(['reflushShow'])
const title = computed(() =>
  Object.keys(props.drawerData).length != 0 ? '编辑' : '新增'
)
const upload = ref()
const employeeForm = ref()
const UploadedImageUrl = ref()
const access_token = localStorage.getItem('access_token')
const urlChanged = ref(false)
const form = ref({
  name,
  gender,
  job,
  addressCode,
  age,
  jobs,
})
const rules = ref({
  name: [
    {
      validator: vaildateName,
      trigger: 'change',
    },
  ],
  job: [
    {
      validator: vaildateJob,
      trigger: 'change',
    },
  ],
  address: [
    {
      validator: vaildateAddress,
      trigger: 'change',
    },
  ],
  age: [
    {
      validator: vaildateAge,
      trigger: 'change',
    },
  ],
})

function init() {
  if (Object.keys(props.drawerData).length != 0) {
    name.value = props.drawerData.name
    gender.value = props.drawerData.gender
    job.value = props.drawerData.job
    age.value = props.drawerData.age
    address.value = props.drawerData.address
    UploadedImageUrl.value = `http://localhost/images/${props.drawerData.avatarUrl}`
    if (address.value) {
      const addressarr = address.value.split('-')
      const one = addressarr[0]
      const two = addressarr[1]
      const three = addressarr[2]
      addressCode.value = [
        TextToCode[one].code,
        TextToCode[one][two].code,
        TextToCode[one][two][three].code,
      ]
    }
  }
}
function reset(form) {
  if (!form) return
  form.resetFields()
  upload.value.clearFiles()
  addressCode.value = undefined
  address.value = ''
  UploadedImageUrl.value = undefined
  urlChanged.value = false
}
function handleUploadExceed(files) {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)
}
function handleUploadSuccess(response) {
  UploadedImageUrl.value = response.newurl
  tableData.value = tableData.value.map(e => {
    if (e.id == props.drawerData.id) {
      e.avatarUrl = response.newurl
    }
    return e
  })
}

function handleUploadChange(uploadFile) {
  if (uploadFile.raw.type !== 'image/jpeg') {
    ElMessage.error('格式必须是图片!')
    return false
  } else if (uploadFile.raw.size / 1024 / 1024 > 1) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  } else {
    urlChanged.value = true
    return true
  }
}

function modifySubmit() {
  upload.value.submit()
  employeeForm.value.validate(vaild => {
    if (vaild) {
      requestPost('/auth/modifyemployee', {
        avatarUrl: UploadedImageUrl.value,
        name: name.value,
        gender: gender.value,
        age: age.value,
        job: job.value,
        address: address.value,
        id: props.drawerData.id,
      }).then(() => {
        tableData.value = tableData.value.map(tb => {
          if (tb.id == props.drawerData.id) {
            tb.name = name.value
            tb.gender = gender.value
            tb.age = age.value
            tb.job = job.value
            tb.address = address.value
          }
          return tb
        })
      })
    }
  })
}
function addSubmit() {
  upload.value.submit()
  employeeForm.value.validate(vaild => {
    if (vaild) {
      requestPost('/auth/addemployee', {
        avatarUrl: UploadedImageUrl.value,
        name: name.value,
        gender: gender.value,
        age: age.value,
        job: job.value,
        address: address.value,
      }).then(res => {
        const { id } = res.data
        tableData.value.push({
          id,
          avatarUrl: UploadedImageUrl.value,
          name: name.value,
          gender: gender.value,
          age: age.value,
          job: job.value,
          address: address.value,
        })
        console.log(res)
      })
    }
  })
}
function addressChange(value) {
  if (value) {
    address.value =
      CodeToText[value[0]] +
      '-' +
      CodeToText[value[1]] +
      '-' +
      CodeToText[value[2]]
  } else {
    address.value = undefined
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

:deep(.el-upload--picture-card) {
  position: relative;
  background-color: rgba(0, 0, 0, 0) !important;
  .el-avatar {
    display: block;
    width: 100%;
    height: 100%;
  }
}
:deep(.el-upload-list__item) {
  position: absolute;
}

.el-card__header {
  .eid {
    margin-bottom: 20px;
  }
}
.el-card__body {
  .el-form-item {
    width: 60%;
  }
  .btns {
    display: flex;
    justify-content: space-between;
    .el-button {
      flex: 1;
    }
  }
}
</style>
