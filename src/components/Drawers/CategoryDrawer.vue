<template>
  <el-drawer
    @open="init"
    v-model="props.showDrawer"
    @close="emit('reflushShow', false), reset(categoryForm)"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">{{ title }}商品类别</h4>
    </template>
    <el-card shadow="never">
      <template #header>
        <div class="eid">商品类别id {{ props.drawerData.id }}</div>
        <el-form
          :model="form"
          label-width="120px"
          :label-position="'top'"
          :status-icon="true"
          :rules="rules"
          ref="categoryForm"
        >
          <el-form-item label="商品类别名" prop="name">
            <el-input v-model.trim="name" size="default" />
          </el-form-item>
          <el-form-item label="启用的规格">
            <template
              v-for="specification in allspecification"
              :key="specification.name"
            >
              <el-check-tag
                v-if="specification.enable"
                :checked="specification.checked"
                size="large"
                @change="handleChange(specification.name)"
              >
                {{ specification.name }}
              </el-check-tag>
            </template>
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
import { requestGet, requestPost } from '@/libs/request'
import useTable from '../../libs/table'
import { usevaildateForm } from '@/libs/form'
import { ref, computed, watchEffect } from 'vue'
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
const categoryForm = ref()
const form = ref({
  name,
})
const { tableData } = useTable()
const allspecification = ref([])
const checkedspecificationID = ref([])

requestGet('/auth/getspecification').then(res => {
  const { result } = res.data
  console.log('一次')
  result.forEach(res => {
    allspecification.value.push({
      id: res.id,
      name: res.name,
      checked: false,
      enable: res.enable,
    })
  })
})
function init() {
  if (Object.keys(props.drawerData).length != 0) {
    name.value = props.drawerData.name
    //parameter可能会为undefined,进行判断
    if (props.drawerData.parameter) {
      parameter.value = JSON.parse(JSON.stringify(props.drawerData.parameter))
      allspecification.value.forEach(as => {
        if (props.drawerData.parameter.includes(as.name)) {
          as.checked = true
        }
      })
    }

    enable.value = Boolean(props.drawerData.enable)
  }
}
function reset(form) {
  if (!form) return
  form.resetFields()
  parameter.value = []
  allspecification.value.map(as => {
    as.checked = false
  })
}
function getcheckedspecificationName() {
  const arr = []
  allspecification.value.forEach(as => {
    if (checkedspecificationID.value.includes(as.id)) {
      return arr.push(as.name)
    }
  })
  return arr
}

watchEffect(() => {
  const arr = []
  allspecification.value.forEach(as => {
    if (as.checked) {
      arr.push(as.id)
    }
  })
  checkedspecificationID.value.splice(
    0,
    checkedspecificationID.value.length,
    ...arr
  )
})

function handleChange(name) {
  allspecification.value.map(as => {
    if (as.name == name) {
      as.checked = !as.checked
    }
    return as
  })
}
function modifySubmit() {
  if (!checkedspecificationID.value.length) {
    return ElMessage({
      message: '商品类别至少需要包含一种规格',
      type: 'error',
    })
  }
  requestPost('/auth/modifycommodity_category', {
    id: props.drawerData.id,
    name: name.value,
    specification: JSON.stringify(checkedspecificationID.value),
    enable: Number(enable.value),
  }).then(() => {
    // debugger
    tableData.value = tableData.value.map(tb => {
      if (tb.id == props.drawerData.id) {
        tb.name = name.value
        tb.parameter = getcheckedspecificationName()
        tb.enable = Number(enable.value)
      }
      return tb
    })
  })
}
function addSubmit() {
  if (!checkedspecificationID.value.length) {
    return ElMessage({
      message: '商品类别至少需要包含一种规格',
      type: 'error',
    })
  }
  categoryForm.value.validate(vaild => {
    if (vaild) {
      requestPost('/auth/addcommodity_category', {
        name: name.value,
        specification: JSON.stringify(checkedspecificationID.value),
      }).then(res => {
        const { id } = res.data
        tableData.value.push({
          id,
          name: name.value,
          parameter: getcheckedspecificationName(),
          enable: 1,
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
    .el-check-tag {
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
