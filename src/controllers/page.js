const templates = [
  {
    path: '/',
    template: 'index'
  }
]


exports.default = function(req, res) {
  const obj = templates.find(item => item.path === req._parsedUrl.path)
  if (obj) {
    const { template } = obj
    return res.render(template, { title: 'Express' })
  }
  return res.render('error', {
    status: '404',
    message: 'Page does not exist'
  })
}
