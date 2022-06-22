import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import auth from '@/utils/auth'
import constant from '@/utils/constant'
import common from '@/utils/common'
import router from '../router'
// create an axios instance
const service = axios.create({
  baseURL: window.PLATFROM_CONFIG.baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: common.timeOut // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['Authorization'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = auth.getToken()
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 0, it is judged as an error.

    if (res.code != constant.RESPONSECODE.SUCCESS) {

      if(common.isSet(response.headers.authorization)) {
        auth.setToken(response.headers.authorization)
      }

      if (res.code === constant.RESPONSECODE.ERROR || res.code === constant.RESPONSECODE.EXPIRED || res.code === constant.RESPONSECODE.AUTHERROR) {
     
        // auth.removeToken()
        // router.push('/login')
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: common.msgTime
    })
    return Promise.reject(error)
  }
)

export default service
