import request from '@/utils/request'

const loginAPI = {
  login : (params = {}) => {
    return request({
      url: '/login',
      method: 'post',
      data: params
    })
  },

}


export { loginAPI }
