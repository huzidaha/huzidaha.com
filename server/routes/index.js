import Router from '../utils/router'

const router = new Router()

router.get('/helloworld', (ctx) => {
  return {
    name: 'Jerry'
  }
})

export default router
