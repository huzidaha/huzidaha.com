import Router from '../../utils/router'
import Profile from '../../models/profile'

const router = new Router()

router.get('/', async (ctx) => {
  let profile = await Profile.findOne({})
  if (!profile) {
    profile = await Profile.create({
      name: '胡子大哈',
      signature: '悟以往之不谏，知来者之可追',
      avatarUrl: '/static/right.jpeg'
    })
  }
  return profile
})

export default router
