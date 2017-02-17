import Router from '../utils/router'
import tagsRouter from './tags'
import postsRouter from './posts'
import usersRouter from './users'
import profileRouter from './profile'

const router = new Router()

router.use('/tags', tagsRouter.routes())
router.use('/posts', postsRouter.routes())
router.use('/users', usersRouter.routes())
router.use('/profile', profileRouter.routes())

export default router
