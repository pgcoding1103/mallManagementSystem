<template>
  <TablePanel :page="props.page" :title="'员工'"> </TablePanel>
</template>
<script setup>
import { provide } from 'vue'
import { requestGet } from '@/libs/request'
import useTable from '../libs/table'
const { tableData, tableType, formatTime, getAttribute } = useTable()
const props = defineProps({
  page: {
    type: String,
  },
})
tableType.value = 'employee'
getAttribute()
provide('page', props.page)
requestGet('/auth/getemployee').then(res => {
  const { result } = res.data
  tableData.value = formatTime(result)
})
</script>
<style lang="scss" scoped></style>
