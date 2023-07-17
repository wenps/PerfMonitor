import axios from 'axios';
import { SUCCESS_CODE } from '../constant/code'

const BASE_URL = '/XXX';

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 100000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    // 抛错处理
  } else if (error.message) {
    if (error.message.includes('timeout')) {
      console.log('timeout');
    } else {
        console.log(`don't know err`);
    }
  }
  return Promise.reject(error)
}

// 请求拦截
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use((response) => {
  return new Promise((resolve, reject) => {
    if (response && response.data) {
      const { code, data } = response.data;
      if (code === SUCCESS_CODE) {
        return resolve(data)
      } else {
        return reject(response.data) //有异常在业务侧请求catch捕获，有特殊情况需要再调整
      }
    } else {
      return reject({ msg: 'inter err' })
    }
  })
}, err)

export { service as axios }