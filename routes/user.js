import Router from 'koa-router';
import { JWT } from '../util/JWT.js';
import multer from '@koa/multer';
import { UserModel } from '../model/UserModel.js';

const router = new Router();
const upload = multer({ dest: 'public/uploads' });

router
  .post('/', (ctx, next) => {
    console.log(ctx.request.body);
    ctx.body = {
      ok: 1,
      info: 'add user success',
    };
  })
  .get('/', (ctx, next) => {
    console.log(ctx.query, ctx.querystring);
    ctx.body = ['aaa', 'bbb', 'ccc'];
  })
  .put('/:id', (ctx, next) => {
    console.log(ctx.params);
    ctx.body = {
      ok: 1,
      info: 'put user success',
    };
  })
  .del('/:id', (ctx, next) => {
    ctx.body = {
      ok: 1,
      info: 'del user success',
    };
  });

router.post('/login', (ctx) => {
  // console.log(ctx.request.body);
  const { username, password } = ctx.request.body;
  if (username === 'sheep' && password === '123') {
    // 設置 sessionId
    ctx.session.user = {
      username: 'sheep',
    };
    ctx.body = { ok: 1 };
  } else {
    ctx.status = 401;
    ctx.body = { ok: 0 };
  }
});

router.post('/loginjwt', (ctx) => {
  // console.log(ctx.request.body);
  const { username, password } = ctx.request.body;
  if (username === 'sheep' && password === '123') {
    // 設置 header
    const token = JWT.generate(
      {
        _id: '111',
        username: 'sheep',
      },
      '1d'
    );
    ctx.set('Authorization', token);
    ctx.body = { ok: 1 };
  } else {
    ctx.status = 401;
    ctx.body = { ok: 0 };
  }
});

// 上傳檔案 api
router.post('/upload', upload.single('avatar'), async (ctx) => {
  console.log(ctx.request.body, ctx.file);
  const { username, password, age } = ctx.request.body;
  const avatar = ctx.file ? `/uploads/${ctx.file.filename}` : ``;

  await UserModel.create({
    username,
    age,
    password,
    avatar,
  });
  ctx.body = { ok: 1 };
});

export default router;
