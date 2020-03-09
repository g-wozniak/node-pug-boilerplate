module.exports = [
  {
    url: '/test',
    request: 'get',
    controller: '/api/test.js'
  },
  {
    url: '*',
    request: 'get',
    controller: '/page.js'
  }
]


