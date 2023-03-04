import axios from 'axios'
import { requestArr } from '../config'
const Axios = axios.create({
  headers: {
    Authorization: 'Bearer ' + getToken('access_token'),
  },
  baseURL: 'http://localhost:80/',
})
let isReflushing = false
function getToken(token) {
  return localStorage.getItem(token)
}
function reflushToken(config) {
  isReflushing = true
  const token = getToken('reflush_token')
  Axios.defaults.headers['Authorization'] = 'Bearer ' + token
  return Axios.post('/auth/reflushtoken').then(
    (res) => {
      console.log(res)
      //   debugger
      const { access_token, reflush_token } = res.data
      setToken(access_token, reflush_token, config)
      requestResend(requestArr)
      return Axios(config)
    },
    () => {
      clearToken()
      router.push('/welcome')
    }
  )
}

function setToken(access_token, reflush_token, config) {
  //将axios默认请求头的【Authorization】设置为新的access_token
  access_token ? localStorage.setItem('access_token', access_token) : ''
  reflush_token ? localStorage.setItem('reflush_token', reflush_token) : ''
  config ? (config.headers['Authorization'] = 'Bearer ' + access_token) : ''
  isReflushing = false
}
function clearToken() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('reflush_token')
}
function requestArrPush(config) {
  new Promise((resolve) => {
    requestArr.push((access_token) => {
      config.headers['Authorization'] = 'Bearer ' + access_token
      resolve(Axios(config))
    })
  })
}
function requestResend(requestArr) {
  const token = getToken('access_token')
  requestArr.forEach((requestcb) => requestcb(token))
}
function isAuthenticated() {
  return (
    localStorage.getItem('access_token') &&
    localStorage.getItem('reflush_token')
  )
}
export function useRequestFunc() {
  return {
    Axios,
    isReflushing,
    getToken,
    setToken,
    reflushToken,
    clearToken,
    requestResend,
    requestArrPush,
    isAuthenticated,
  }
}
