import Router from 'koa-router';

const router = new Router();

router
  .post('/', (ctx, next) => {
    ctx.body = {
      ok: 1,
      info: 'add list success',
    };
  })
  .get('/', (ctx, next) => {
    ctx.body = ['111', '222', '333'];
  })
  .put('/:id', (ctx, next) => {
    console.log(ctx.params);
    ctx.body = {
      ok: 1,
      info: 'put list success',
    };
  })
  .del('/:id', (ctx, next) => {
    ctx.body = {
      ok: 1,
      info: 'del list success',
    };
  });

export default router;
