import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  await ctx.render('upload');
});

export default router;
