/**
 * Created by lileltp on 2017/6/5.
 */

import Qs from 'qs'
import axios from 'axios'
import store from './store'
import { Toast } from 'vant'
import router from './router'
import setting from '@/setting'

axios.defaults.timeout = 10000
axios.defaults.baseURL = setting.base
// axios.defaults.baseURL = 'http://192.168.0.2:8362/'

axios.defaults.transformRequest = [function (data) {
  data = Qs.stringify(data)
  return data
}]

axios.defaults.transformResponse = [function (data) {
  data = JSON.parse(data)
  return data
}]

// // http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.token = store.state.token
    } else if (localStorage.getItem('tmov')) {
      config.headers.token = JSON.parse(localStorage.getItem('tmov')).token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data && response.data.errno !== 0) { // 处理服务器返回的正常错误
      if (response.data.errno === 1001) {
        store.commit('setToken', null)
        localStorage.removeItem('token')
        router.push('/Welcome')
      }
      if (response.data.errno === 1000) {
        Toast.fail(response.data.errmsg)
      }
      return Promise.reject(response.data.errmsg)
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // router.replace()
          break
        case 404:
          break
        case 500:
          Toast.fail('服务器出现错误,请联系管理员')
          break
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    // Notification.error({ title: '错误', message: error.response.data })
    console.info(error)
    return Promise.reject(error.response.data)
  })

axios.originalJson = function (data) {
  return JSON.parse(JSON.stringify(data))
}

export default axios
