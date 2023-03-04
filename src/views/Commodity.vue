<template>
  <TablePanel :page="props.page" :title="'商品'"> </TablePanel>
</template>
<script setup>
import { provide } from 'vue'
import useTable from '../libs/table'
import { requestGet } from '@/libs/request'
const { tableData, tableType, formatTime, formatImages, getAttribute } =
  useTable()
const props = defineProps({
  page: {
    type: String,
  },
})

tableType.value = 'commodity'
getAttribute()
provide('page', props.page)
requestGet('/auth/getcommodity').then(res => {
  const { result } = res.data
  tableData.value = formatTime(result)
  tableData.value = formatImages(result)
})
</script>
<style lang="scss" scoped></style>
