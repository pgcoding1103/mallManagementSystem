<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span>{{ props.title }}管理</span>
        <div class="left">
          <el-select v-model="filter" placeholder="筛选" size="default">
            <template v-for="(item, index) in attribute" :key="index">
              <el-option
                v-if="typeof item == 'string'"
                :label="item"
                :value="item"
              />
            </template>
          </el-select>
          <el-input
            v-model="keyword"
            placeholder="输入关键字"
            :suffix-icon="Search"
            clearable
            size="default"
          />

          <el-button
            class="button"
            type="primary"
            size="default"
            @click="search(keyword, filter, props.page)"
            >搜索</el-button
          >
        </div>
      </div>
    </template>

    <template #default>
      <Table :title="props.title"></Table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        v-model:current-page="current_page"
        @current-change="tableJump"
      />
    </template>
  </el-card>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import router from '@/router'
import { computed, ref, watchEffect } from 'vue'
import useTable from '../libs/table'
const { tableData, attribute, search } = useTable()
const props = defineProps({
  page: {
    type: String,
  },
  title: {
    type: String,
    require: true,
  },
})
const total = computed(() =>
  tableData.value ? (tableData.value.length / 15) * 10 : 10
)
const current_page = ref(1)
const keyword = ref('')
const filter = ref('id')
watchEffect(() => (current_page.value = +props.page))

function tableJump() {
  router.push(`/employee/${current_page.value}`)
}
</script>
<style lang="scss" scoped>
.el-card {
  position: relative;
  height: 90%;
  .el-card__header {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        flex: 5;
      }
      .left {
        flex: 3;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .el-button {
          margin-left: 10px;
        }
        .el-input {
          margin-left: 10px;
        }
        :deep(.select-trigger) {
          width: 100px;
          margin-left: 10px;
        }
      }
    }
  }
  .el-card__body {
    position: relative;
    .el-pagination {
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
    }
  }
}
</style>
