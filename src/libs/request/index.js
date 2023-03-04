import Axios from './init'
import qs from "qs"
export const requestGet = (url, params = null) => Axios.get(url, { params })
export const requestPost = (url, data = null, params = null) => Axios.post(url, qs.stringify(data), params)

