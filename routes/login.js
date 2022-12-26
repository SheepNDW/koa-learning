import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  await ctx.render('loginJWT', { username: 'sheep' });
});

export default router;
