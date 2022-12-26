import Router from 'koa-router';
import userRouter from './user.js';
import listRouter from './list.js';
import homeRouter from './home.js';
import loginRouter from './login.js';
import uploadRouter from './upload.js';

const router = new Router();

// 統一的路由 prefix
// router.prefix('/api');

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/list', listRouter.routes(), listRouter.allowedMethods());
router.use('/home', homeRouter.routes(), homeRouter.allowedMethods());
router.use('/login', loginRouter.routes(), loginRouter.allowedMethods());
router.use('/upload', uploadRouter.routes(), uploadRouter.allowedMethods());
router.redirect('/', '/home');

export default router;
