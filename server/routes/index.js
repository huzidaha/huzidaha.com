import Router from '../utils/router'
import tagsRouter from './tags'
import postsRouter from './posts'
import usersRouter from './users'
import profileRouter from './profile'
import coursesRouter from './courses'
import lessonsRouter from './lessons'
import teachersRouter from './teachers'

const router = new Router()

router.use('/tags', tagsRouter.routes())
router.use('/posts', postsRouter.routes())
router.use('/users', usersRouter.routes())
router.use('/profile', profileRouter.routes())
router.use('/courses', coursesRouter.routes())
router.use('/lessons', lessonsRouter.routes())
router.use('/teachers', teachersRouter.routes())

export default router
