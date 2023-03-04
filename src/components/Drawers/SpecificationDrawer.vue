<template>
  <el-drawer
    @open="init"
    v-model="props.showDrawer"
    @close="emit('reflushShow', false), reset(specificationForm)"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">{{ title }}规格</h4>
    </template>
    <el-card shadow="never">
      <template #header>
        <div class="eid">规格id {{ props.drawerData.id }}</div>
        <el-form
          :model="form"
          label-width="120px"
          :label-position="'top'"
          :status-icon="true"
          :rules="rules"
          ref="specificationForm"
        >
          <el-form-item label="规格名" prop="name">
            <el-input v-model.trim="name" size="default" />
          </el-form-item>
          <el-form-item label="属性值">
            <el-tag
              v-for="tag in parameter"
              :key="tag"
              size="large"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              size="default"
              ref="InputRef"
              v-model="inputValue"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button
              v-else
              size="default"
              @click="showInput"
            >
              + 添加属性
            </el-button>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-switch v-model="enable" size="default" />
          </el-form-item>
        </el-form>
      </template>
      <template #default>
        <div class="btns">
          <el-button
            type="default"
            @click="reset(specificationForm)"
            size="default"
          >
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
import { ref, computed, nextTick } from 'vue'
import { usevaildateForm } from '../../libs/form'
import { requestPost } from '@/libs/request'
import useTable from '@/libs/table'
const emit = defineEmits(['reflushShow'])
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
const { name, parameter, enable, vaildateName } = usevaildateForm()
const { tableData } = useTable()
const rules = ref({
  name: [
    {
      validator: vaildateName,
      trigger: 'change',
    },
  ],
})
const title = computed(() =>
  Object.keys(props.drawerData).length != 0 ? '编辑' : '新增'
)
const inputVisible = ref(false)
const inputValue = ref('')
const InputRef = ref()
const form = ref({
  name,
})
const specificationForm = ref()
function init() {
  if (Object.keys(props.drawerData).length != 0) {
    name.value = props.drawerData.name
    parameter.value = JSON.parse(JSON.stringify(props.drawerData.parameter))
    enable.value = Boolean(props.drawerData.enable)
  }
}
function reset(form) {
  if (!form) return
  form.resetFields()
  parameter.value = []
}
function handleClose(tag) {
  parameter.value.splice(parameter.value.indexOf(tag), 1)
}
function showInput() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}
function handleInputConfirm() {
  if (inputValue.value) {
    parameter.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
function modifySubmit() {
  if (parameter.value.length == 0) {
    return ElMessage({
      message: '规格的属性值不能为空',
      type: 'error',
    })
  }
  specificationForm.value.validate(vaild => {
    if (vaild) {
      requestPost('/auth/modifyspecification', {
        id: props.drawerData.id,
        name: name.value,
        parameter: JSON.stringify(parameter.value),
        enable: Number(enable.value),
      }).then(() => {
        tableData.value = tableData.value.map(tb => {
          if (tb.id == props.drawerData.id) {
            tb.name = name.value
            tb.parameter = parameter.value
            tb.enable = Number(enable.value)
          }
          return tb
        })
      })
    }
  })
}
function addSubmit() {
  if (parameter.value.length == 0) {
    return ElMessage({
      message: '规格的属性值不能为空',
      type: 'error',
    })
  }
  specificationForm.value.validate(vaild => {
    if (vaild) {
      requestPost('/auth/addspecification', {
        name: name.value,
        parameter: JSON.stringify(parameter.value),
        enable: Number(enable.value),
      }).then(res => {
        const { id } = res.data
        tableData.value.push({
          id,
          name: name.value,
          parameter: parameter.value,
          enable: Number(enable.value),
        })
      })
    }
  })
}
</script>
<style lang="scss" scoped>
.el-card__header {
  .eid {
    margin-bottom: 20px;
  }
}
.el-card__body {
  .el-form-item {
    width: 60%;
    .el-tag,
    .el-button,
    .el-input {
      margin: 10px 10px 0 0;
    }
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
