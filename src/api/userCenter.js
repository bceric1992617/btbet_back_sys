import request from '@/utils/request'

const userCenter = {
  getUserList : (params = {}) => {
    return request({
      url: '/user/page',
      method: 'get',
      data: params
    })
  },
  delUserInfo : (params = {}) => {
    return request({
      url: '/user/delete',
      method: 'post',
      data: params
    })
  },
  changeUserStatus : (params = {}) => {
    return request({
      url: '/user/status',
      method: 'post',
      data: params
    })
  },
}


export { userCenter }
