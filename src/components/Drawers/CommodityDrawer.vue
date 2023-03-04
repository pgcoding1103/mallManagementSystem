<template>
  <el-drawer
    size="50%"
    @open="init"
    v-model="props.showDrawer"
    @close="emit('reflushShow', false), reset(categoryForm)"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">{{ title }}商品</h4>
    </template>
    <el-card shadow="never">
      <template #header>
        <div class="eid">商品id {{ props.drawerData.id }}</div>
        <el-scrollbar height="600px">
          <el-form
            :model="form"
            label-width="120px"
            :label-position="'top'"
            :status-icon="true"
            :rules="rules"
            ref="commodityForm"
          >
            <el-form-item label="商品名" prop="name">
              <el-input v-model.trim="commodityName" size="default" />
            </el-form-item>
            <el-form-item label="图片" prop="freemail">
              <el-upload
                ref="upload"
                v-model:file-list="fileList"
                action="http://localhost:80/auth/uploadpicture"
                method="post"
                :headers="{
                  Authorization: 'Bearer ' + access_token,
                }"
                list-type="picture-card"
                :auto-upload="false"
                accept="image"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="原价" prop="originalPrice">
              <el-input-number
                v-model="originalPrice"
                :precision="2"
                :step="0.1"
                :max="10"
                size="default"
              />
            </el-form-item>
            <el-form-item label="现价" prop="currentPrice">
              <el-input-number
                v-model="currentPrice"
                :precision="2"
                :step="0.1"
                :max="10"
                size="default"
              />
            </el-form-item>
            <el-form-item label="库存" prop="inventory">
              <el-input v-model.trim="inventory" size="default" />
            </el-form-item>
            <el-form-item label="商品标题" prop="_title">
              <el-input
                v-model="_title"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="请输入商品的标题"
              />
            </el-form-item>
            <el-form-item label="是否在售" prop="issale">
              <el-radio-group v-model="issale" size="default">
                <el-radio-button label="是" />
                <el-radio-button label="否" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="启用的优惠券" prop="coupon">
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
            <el-form-item label="参与的活动">
              <el-select v-model="value" size="default" placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="是否包邮" prop="freemail">
              <el-radio-group v-model="freemail" size="default">
                <el-radio-button label="是" />
                <el-radio-button label="否" />
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-scrollbar>
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
import { ref, computed, watchEffect } from 'vue'
import { usevaildateForm } from '@/libs/form'
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
const title = computed(() =>
  Object.keys(props.drawerData).length != 0 ? '编辑' : '新增'
)
const {
  commodityName,
  originalPrice,
  currentPrice,
  images,
  inventory,
  _title,
  issale,
  coupon,
  activity,
  freemail,
  vaildateCommodityName,
} = usevaildateForm()
const form = ref({
  name,
})
const rules = ref({
  name: [
    {
      validator: vaildateCommodityName,
      trigger: 'change',
    },
  ],
})
const upload = ref()
const access_token = localStorage.getItem('access_token')
const commodityForm = ref()
function init() {
  //   if (Object.keys(props.drawerData).length != 0) {
  //     name.value = props.drawerData.name
  //     if (props.drawerData.parameter) {
  //       parameter.value = JSON.parse(JSON.stringify(props.drawerData.parameter))
  //       allspecification.value.forEach(as => {
  //         if (props.drawerData.parameter.includes(as.name)) {
  //           as.checked = true
  //         }
  //       })
  //     }
  //     enable.value = Boolean(props.drawerData.enable)
  //   }
}
function reset(form) {
  //   if (!form) return
  //   form.resetFields()
  //   parameter.value = []
  //   allspecification.value.map(as => {
  //     as.checked = false
  //   })
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
