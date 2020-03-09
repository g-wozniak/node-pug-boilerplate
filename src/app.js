const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const routes = require('./routes')
const app = express()

const loadRoutes = (app, routes) => {
  routes.forEach(route => {
    const { url, request, controller } = route
    const module = includeController(controller).default
    if (request === 'get') {
      app.route(url).get(module)
    } else {
      app.route(url).post(module)
    }
  })
}

const includeController = (name) => {
  const controllerPath = path.join(__dirname, 'controllers')
  return require(controllerPath + name)
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

loadRoutes(app, routes)

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
