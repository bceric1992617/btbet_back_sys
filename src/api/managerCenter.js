import request from '@/utils/request'

const managerCenter = {
  getManagerList : (params = {}) => {
    return request({
      url: '/admin/user/page',
      method: 'get',
      params: params
    })
  },
  changeManagerStatus : (params = {}) => {
    return request({
      url: '/admin/user/status',
      method: 'post',
      data: params
    })
  },
  delManagerInfo : (params = {}) => {
    return request({
      url: '/admin/user/delete',
      method: 'post',
      data: params
    })
  },
  addManagerInfo : (params = {}) => {
    return request({
      url: '/admin/user/add',
      method: 'post',
      data: params
    })
  },
  changeManagerPwd : (params = {}) => {
    return request({
      url: '/admin/user/updatePassword',
      method: 'post',
      data: params
    })
  },
  getMenagerById : (params = {}) => {
    return request({
      url: '/admin/user/query',
      method: 'post',
      data: params
    })
  },
}


export { managerCenter }
