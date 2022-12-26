import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  // 取得 cookie
  // console.log(ctx.cookies.get('name'));
  // 設置 cookie
  // ctx.cookies.set('age', 100);

  await ctx.render('home', { username: 'sheep' }); // 自動去找 views/home.ejs
});

router.get('/list', async (ctx) => {
  ctx.body = [
    { _id: 1, username: 'sheep', age: 10 },
    { _id: 2, username: 'hitsuji', age: 20 },
    { _id: 3, username: 'watame', age: 30 },
  ];
});

export default router;
