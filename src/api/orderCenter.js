import request from '@/utils/request'

const orderCenter = {
  getOrderList : (params = {}) => {
    return request({
      url: '/order/page',
      method: 'post',
      data: params
    })
  },
  getBetType : (params = {}) => {
    return request({
      url: '/order/betOption',
      method: 'get',
      params: params
    })
  },
}

export { orderCenter }
