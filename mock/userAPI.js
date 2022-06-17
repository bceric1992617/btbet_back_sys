const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
    "id|+1": 1,
    username: '@cname()',
    email: '@email()',
    phone: '13590278888',
    author: '@cname()',
    createTime: "@date()",
    updateTime: "@date()",
    operator: "@cname()",

  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 0,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
