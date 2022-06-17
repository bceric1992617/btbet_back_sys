import request from '@/utils/request'

const userAPI = {
  list : (params = {}) => {
    return request({
      url: '/vue-admin-template/table/list',
      method: 'get',
      data: params
    })
  }
}


export { userAPI }
