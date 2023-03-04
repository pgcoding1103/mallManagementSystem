<template>
  <TablePanel :page="props.page" :title="'规格'"></TablePanel>
</template>
<script setup>
import { provide } from 'vue'
import useTable from '../libs/table'
import { requestGet } from '@/libs/request'
const { tableData, tableType, formatTime, formatParameter, getAttribute } =
  useTable()
const props = defineProps({
  page: {
    type: String,
  },
})
tableType.value = 'specification'
getAttribute()
provide('page', props.page)
requestGet('/auth/getspecification').then(res => {
  const { result } = res.data
  tableData.value = formatTime(result)
  tableData.value = formatParameter(result)
})
</script>
<style lang="scss" scoped></style>
