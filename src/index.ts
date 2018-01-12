import * as http from 'http';

// Koa Stuff
import * as Koa from "koa";
import { Context } from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";

// setup the server
var app:Koa = new Koa();
var router:Router = new Router();

app.use(async (ctx:Context, next:Function)=> {
  console.log(`Access to: ${ctx.url} by ${ctx.ip}`);
  return await next();
});

router.get('/', async (ctx: Context, next: Function) => {
  ctx.body = { status: "ok", data: { greeting: "hello world" }, timestamp: Date.now().toFixed(0) };
  ctx.status = 200;
  // terminate , no next() call
});

router.all('/', async (ctx: Context, next: Function) => {
  ctx.throw(501, 'Not implemented!');
  return await next();
});



app
  .use(bodyParser())
  .use(router.middleware())
  .use(router.allowedMethods());

const httpServer = http.createServer(app.callback());
//listen on provided port
httpServer.listen(1337, () => {
  console.log(`${httpServer.address().address} (${httpServer.address().family}) is listening on port ${httpServer.address().port}`)
});