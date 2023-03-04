import { requestGet, requestPost } from '../request'
import { useRequestFunc } from '../request/func'
import { ResponseCode } from '../config'
import { ref } from 'vue'
let global_form
let jobs = ref([])
const { isAuthenticated } = useRequestFunc()
if (isAuthenticated() && jobs.value.length == 0) {
  requestGet('/auth/getjob').then(res => {
    const { result } = res.data
    jobs.value = [...result]
  })
}
//验证账号
function vaildateAccount(rule, value, callback) {
  const { account } = global_form.value
  if (!account) {
    callback(new Error('请输入账号'))
  } else if (account.length < 3 || account.length > 10) {
    callback(new Error('账号长度应该大于3且小于10'))
  } else {
    callback()
  }
}
//验证密码
function vaildatePass(rule, value, callback) {
  const { password } = global_form.value
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (password.length < 6 || password.length >= 15) {
    callback(new Error('密码长度应该大于6且小于15'))
  } else {
    callback()
  }
}
//验证第二次密码
function vaildatePass2(rule, value, callback) {
  const { password, password2 } = global_form.value
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (password2 !== password) {
    callback(new Error('两次输入的密码不一样'))
  } else {
    callback()
  }
}
//验证名字
function vaildateName(rule, value, callback) {
  const { name } = global_form.value
  if (!name) {
    callback(new Error('请输入名字'))
  } else if (name.length >= 2 && name.length <= 10) {
    callback()
  } else {
    callback(new Error('请输入正确的名字'))
  }
}
//验证注册许可码
function vaildateLicensCode(rule, value, callback) {
  const { license_code } = global_form.value
  if (!license_code) {
    callback(new Error('请输入许可码'))
  } else {
    requestGet('/api/findcode', {
      licenseCode: license_code,
    }).then(res => {
      let { code, id } = res.data
      if (code == ResponseCode.select_ok) {
        // data.aid = id;
        callback()
      } else {
        callback(new Error('该许可码不存在'))
      }
    })
  }
}
//验证员工id
function vaildateEmployeeID(rule, value, callback) {
  const { employee_id } = global_form.value
  if (!employee_id) {
    callback(new Error('请输入员工id'))
  } else {
    requestGet('/api/vaildate_empoyeeid', {
      id: employee_id,
    }).then(res => {
      const { code } = res.data
      if (code == ResponseCode.select_ok) {
        callback()
      } else {
        callback(new Error('员工id不存在'))
      }
    })
  }
}
//验证岗位
async function vaildateJob(rule, value, callback) {
  const { job } = global_form.value
  if (jobs.value.find(jb => jb.name == job)) {
    callback()
  } else {
    callback(new Error('请选择岗位'))
  }
}
//验证地址
function vaildateAddress(rule, value, callback) {
  // debugger
  const { address } = global_form.value
  if (!address) {
    callback(new Error('请填写地址'))
  } else {
    callback()
  }
}
//验证年龄
function vaildateAge(rule, value, callback) {
  const { age } = global_form.value
  if (!age) {
    callback(new Error('请填写年龄'))
  } else {
    callback()
  }
}
//验证商品名称
function vaildateCommodityName(rule, value, callback) {
  const { commodityName } = global_form.value
  // debugger
  if (!commodityName) {
    callback(new Error('请填写商品名称'))
  } else if (commodityName.length < 5 || commodityName.length > 10) {
    callback(new Error('请输入正确格式的商品名称'))
  } else {
    callback()
  }
}
export function usevaildateForm() {
  // const { name, account, password, password2, employee_id, license_code } = data
  const name = ref()
  const account = ref()
  const password = ref()
  const password2 = ref()
  const employee_id = ref()
  const license_code = ref()
  const gender = ref()
  const age = ref()
  const job = ref()
  const address = ref()
  const addressCode = ref()
  const parameter = ref([])
  const enable = ref()
  const commodityName = ref()
  const originalPrice = ref()
  const currentPrice = ref()
  const images = ref([])
  const inventory = ref()
  const _title = ref()
  const issale = ref()
  const coupon = ref([])
  const activity = ref([])
  const freemail = ref()

  global_form = ref({
    name,
    account,
    password,
    password2,
    employee_id,
    license_code,
    job,
    age,
    address,
    commodityName
  })

  function submit(url, form) {
    form.value.validate(async vaild => {
      if (vaild) {
        const res = await requestPost(url, {
          account: account.value,
          password: password.value,
          employee_id: employee_id.value,
          license_code: license_code.value,
        })
        console.log(res)
      }
    })
  }
  return {
    name,
    account,
    password,
    password2,
    employee_id,
    license_code,
    gender,
    age,
    job,
    jobs,
    address,
    addressCode,
    parameter,
    enable,
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
    vaildateAccount,
    vaildateName,
    vaildatePass,
    vaildatePass2,
    vaildateLicensCode,
    vaildateEmployeeID,
    vaildateJob,
    vaildateAddress,
    vaildateAge,
    vaildateCommodityName,
    submit,
  }
}
