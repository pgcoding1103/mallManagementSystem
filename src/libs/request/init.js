import router from '../../router'
import { ResponseCode } from '../config'
import { useRequestFunc } from './func'
const { Axios, setToken, reflushToken, requestArrPush, isReflushing } =
  useRequestFunc()
Axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
Axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // debugger
    const { code } = response.data
    console.log(code)
    switch (code) {
      case ResponseCode.access_token_expired:
        if (!isReflushing) {
          const { config } = response
          return reflushToken(config)
        } else {
          return requestArrPush(config)
        }
        // if (!isReflushing) {
        //   isReflushing = true
        //   reflushToken(Axios)
        //     .then((res) => {
        //       const { access_token, reflush_token } = res
        //       const config = response.config
        //       setToken({ access_token, reflush_token }, config)
        //       requestResend(requestArr)
        //       isReflushing = false
        //       return Axios(config)
        //     })
        //     .catch((err) => {
        //       clearToken()
        //       router.push('/welcome')
        //     })
        // } else {
        //   return requestArrPush
        // }
        break
      case ResponseCode.login_error:
        ElMessage({
          message: '登录失败',
          type: 'error',
        })
        break
      case ResponseCode.login_ok:
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        const { access_token, reflush_token } = response.data
        setToken(access_token, reflush_token)
        router.push('/')
        break
      case ResponseCode.add_ok:
        ElMessage({
          message: '添加成功!',
          type: 'success',
        })
        break
      case ResponseCode.delete_ok:
        ElMessage({
          message: '删除成功!',
          type: 'success',
        })
        break
      case ResponseCode.modify_ok:
        ElMessage({
          message: '修改成功!',
          type: 'success',
        })
        break
    }
    return response
  },
  function (error) {}
)

export default Axios
