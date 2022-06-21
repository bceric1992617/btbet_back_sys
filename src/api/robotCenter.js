import request from '@/utils/request'

const robotCenter = {
  getRobotList : (params = {}) => {
    return request({
      url: '/tgBot/page',
      method: 'post',
      data: params
    })
  },
  changeRobotStatus : (params = {}) => {
    return request({
      url: '/tgBot/updateStatus',
      method: 'post',
      data: params
    })
  },
  addRobot : (params = {}) => {
    return request({
      url: '/tgBot/open',
      method: 'post',
      data: params
    })
  },
}

export { robotCenter }
