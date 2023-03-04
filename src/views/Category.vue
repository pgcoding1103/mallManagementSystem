<template>
  <TablePanel :page="props.page" :title="'商品类别'"> </TablePanel>
</template>
<script setup>
import { provide } from 'vue'
import { requestGet } from '@/libs/request'
import useTable from '../libs/table'
const { tableData, tableType, formatTime,formatParameter, getAttribute } = useTable()
const props = defineProps({
  page: {
    type: String,
  },
})
tableType.value = 'category'
getAttribute()
provide('page', props.page)
requestGet('/auth/getcommodity_category').then(res => {
  const { result } = res.data
  tableData.value = formatTime(result)
  tableData.value = formatParameter(result)
})
</script>
<style lang="scss" scoped></style>
