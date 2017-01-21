import Koa from 'koa'
import next from 'next'
import Router from 'koa-router'
import fs from 'fs'
import bodyParser from 'koa-body'
import logger from 'koa-logger'
import 'isomorphic-fetch'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: '.' })
let backendApiCallback = getBackendApiCallback()
console.log('Running in', dev ? 'dev' : 'production', 'mode')

function startServer () {
  app.start(3000).then(() => {
    app.oldRun = app.run
    app.run = (req, res) => {
      return !req.url.startsWith('/api/')
        ? app.oldRun(req, res)
        : serveBackendApi(req, res)
    }
    if (dev) {
      watchFilesAndResetBackendApiCallback()
    }
  }).catch((e) => {
    console.log(e.stack)
  })
}

function getBackendApiCallback () {
  const koaApp = new Koa()
  const router = new Router()
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key]
  })
  const apiRouter = require('./routes/').default
  router.use('/api', apiRouter.routes())
  koaApp.use(logger())
  koaApp.use(bodyParser({ multipart: true }))
  koaApp.use(router.routes())
  return koaApp.callback()
}

function serveBackendApi (req, res) {
  return new Promise((resolve, reject) => {
    try {
      backendApiCallback(req, res)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

function watchFilesAndResetBackendApiCallback () {
  fs.watch('./server/', { recursive: true }, (event, filename) => {
    backendApiCallback = getBackendApiCallback()
    console.log(`${filename} ${event}, restarting routes.`)
  })
}

startServer()
