<template>
  <!-- 表格 -->
  <el-table
    :data="currentPageTable"
    style="width: 100%"
    border
    table-layout="auto"
  >
    <template v-for="item in attribute" :key="item.id">
      <el-table-column
        v-if="typeof item == 'string'"
        :prop="item"
        :label="item"
        min-width="150"
      ></el-table-column>
      <el-table-column
        v-if="item.showformat == 'tag'"
        :prop="item.at"
        :label="item.at"
        width="500"
      >
        <template #default="scope">
          <el-tag size="default" v-for="p in scope.row.parameter" :key="p">{{
            p
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="item.showformat == 'images'"
        :prop="item.at"
        :label="item.at"
      >
        <template #default="scope">
          <el-image
            v-for="image in scope.row.images"
            :key="image"
            style="width: 100px; height: 100px"
            :src="`http://192.168.0.105:80/images/${image}`"
            fit="fill"
          />
        </template>
      </el-table-column>
    </template>

    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="
            () => {
              tableRow = scope
              dialogVisible = true
            }
          "
        >
          删除
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="editRow(scope)"
        >
          编辑
        </el-button>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty description="description" />
    </template>
  </el-table>
  <!-- 抽屉 -->
  <EmployeeDrawer
    v-if="props.title == '员工'"
    :drawerData="drawerData"
    :showDrawer="showDrawer"
    @reflushShow="reflushProps"
  ></EmployeeDrawer>
  <SpecificationDrawer
    v-if="props.title == '规格'"
    :drawerData="drawerData"
    :showDrawer="showDrawer"
    @reflushShow="reflushProps"
  ></SpecificationDrawer>
  <CategoryDrawer
    v-if="props.title == '商品类别'"
    :drawerData="drawerData"
    :showDrawer="showDrawer"
    @reflushShow="reflushProps"
  ></CategoryDrawer>
  <CommodityDrawer
    v-if="props.title == '商品'"
    :drawerData="drawerData"
    :showDrawer="showDrawer"
    @reflushShow="reflushProps"
  ></CommodityDrawer>
  <!-- 对话框 -->
  <el-dialog v-model="dialogVisible" title="警告" width="20%" align-center>
    <span>你确定删除吗 ?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="default" @click="dialogVisible = false"
          >取消</el-button
        >
        <el-button type="primary" size="default" @click="deleteRow">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加按钮 -->
  <el-button class="add" type="primary" circle size="large" @click="addRow"
    ><el-icon><Plus /></el-icon
  ></el-button>
</template>
<script setup>
import { inject, watchEffect, ref } from 'vue'
import { requestPost } from '@/libs/request'
import useTable from '../libs/table'
const {
  tableData,
  currentPageTable,
  attribute,
  tableType,
  UpdateCurrentPageTable,
} = useTable()
const props = defineProps({
  title: {
    type: String,
  },
})
const page = inject('page')
const emit = defineEmits(['editeTableRow'])
const showDrawer = ref(false)
const drawerData = ref()
const dialogVisible = ref(false)
const tableRow = ref()
watchEffect(() => UpdateCurrentPageTable(page))
function editRow(tableRow) {
  drawerData.value = tableRow.row
  showDrawer.value = true
}
function deleteRow() {
  const { id } = tableRow.value.row
  requestPost(`/auth/delete${tableType.value}`, {
    id: tableRow.value.row.id,
  }).then(() => {
    tableData.value = tableData.value.filter(et => {
      if (et.id != id) {
        return et
      }
    })
    dialogVisible.value = false
  })
}
function addRow() {
  drawerData.value = undefined
  showDrawer.value = true
}
function reflushProps(newvalue) {
  showDrawer.value = newvalue
}
</script>
<style lang="scss" scoped>
.el-card__body {
  position: relative;
  .add {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
  .el-tag {
    margin: 5px 5px 0 0;
  }
}
</style>
