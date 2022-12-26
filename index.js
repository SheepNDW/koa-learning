import Koa from 'koa';
import router from './routes/index.js';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import views from 'koa-views';
// import session from 'koa-session-minimal';
import { JWT } from './util/JWT.js';

// DB
import './config/db.config.js';

// ESM 路徑處理
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = new Koa();

app.use(bodyParser()); // 取得 post 參數
app.use(serve(path.join(__dirname, 'public'))); // 靜態資源

// 設置 template engine
app.use(
  views(path.join(__dirname, 'views'), {
    extension: 'ejs',
  })
);

/* // session 配置
app.use(
  session({
    key: 'SESSION_ID',
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
// session 攔截
app.use(async (ctx, next) => {
  // 排除 login 相關的路由和 api
  if (ctx.url.includes('login')) {
    await next();
    return;
  }
  if (ctx.session.user) {
    ctx.session.date = Date.now();
    await next();
  } else {
    ctx.redirect('/login');
  }
}); */

// token 攔截
app.use(async (ctx, next) => {
  if (ctx.url.includes('login')) {
    await next();
    return;
  }

  const token = ctx.headers['authorization']?.split(' ')[1];
  if (token) {
    const payload = JWT.verify(token);
    if (payload) {
      // 重新計算過期時間
      const newToken = JWT.generate(
        {
          _id: payload._id,
          username: payload.username,
        },
        '1d'
      );
      ctx.set('Authorization', newToken);
      await next();
    } else {
      ctx.status = 401;
      ctx.body = { errCode: -1, errInfo: 'token expired' };
    }
  } else {
    await next();
  }
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
