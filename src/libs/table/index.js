import { ref, watchEffect } from 'vue'
import moment from 'moment'
const tableType = ref('')
const tableData = ref([])
const currentPageTable = ref()
const attribute = ref([])
function getAttribute() {
  watchEffect(() => {
    if (!tableData.value.length) {
      return []
    }
    const allattribute = Object.keys(tableData.value[0])
    attribute.value = allattribute.map(at => {
      if (at == 'isdelete' || at == 'aid') {
        return {
          at,
          showtime: 'never',
        }
      } else if (at == 'avatarUrl') {
        return {
          at,
          showtime: 'drawer',
        }
      } else if (at == 'parameter') {
        return {
          at,
          showformat: 'tag',
        }
      } else if (at == 'images') {
        return {
          at,
          showformat: 'images',
        }
      }

      return at
    })
  })
}
function formatTime(data) {
  return data.map(d => {
    if (d['addtime']) {
      d['addtime'] = moment(new Date(d['addtime'])).format('YYYY-MM-DD')
    }
    return d
  })
}
function formatParameter(data) {
  return formatStrToArr(data, 'parameter')
}
function formatImages(data) {
  return formatStrToArr(data, 'images')
}
function formatStrToArr(data, str) {
  return data.map(d => {
    if (d[str]) {
      const arr = []
      const reg = /"+/g
      d[str]
        .substring(1, d[str].length - 1)
        .replace(reg, '')
        .split(',')
        .forEach(p => {
          p = p.trim()
          if (p != 'null') {
            arr.push(p)
          }
        })

      if (arr.toString() != '') {
        d[str] = arr
      } else {
        d[str] = undefined
      }
    }
    return d
  })
}
function UpdateCurrentPageTable(currentpage) {
  if (tableData.value) {
    console.log('更新一次')
    let page = parseInt(currentpage)
    let start = (page - 1) * 15
    let end = page * 15
    currentPageTable.value = tableData.value.slice(start, end)
  } else {
    currentPageTable.value = []
  }
}
function search(keyword, filter, page) {
  if (keyword != '') {
    let result
    if (filter == 'parameter') {
      result = tableData.value.filter(line => {
        return line[filter].includes(keyword)
      })
    } else {
      result = tableData.value.filter(line => {
        return line[filter] == keyword.trim()
      })
    }

    currentPageTable.value = result
  } else {
    UpdateCurrentPageTable(page)
  }
}
function useTable() {
  return {
    tableData,
    currentPageTable,
    attribute,
    tableType,
    formatTime,
    formatParameter,
    formatImages,
    UpdateCurrentPageTable,
    search,
    getAttribute,
  }
}
export default useTable
