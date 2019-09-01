const cluster  = require('cluster')
const { cpus } = require('os')
const log      = require('./modules/log')

const isMaster   = cluster.isMaster
const numWorkers = cpus().length

if (isMaster) {
  log('is master..........');
  log(`Forking ${numWorkers} workers`)
  // 这里执行fork的时候，将会进入else，在每个worker中跑一个koa实例，并且共享端口3000
  const workers = [...Array(numWorkers)].map(_ => cluster.fork())

  cluster.on('online', (worker) => log(`Worker ${worker.process.pid} is online`))
  cluster.on('exit', (worker, exitCode) => {
    log(`Worker ${worker.process.id} exited with code ${exitCode}`)
    log(`Starting a new worker`)
    cluster.fork();
  })

} else {
  log('is worker..........');
  const Koa    = require('koa')
  const Router = require('koa-router')
  const runJob = require('./modules/job')
  const router = new Router()
  const app    = new Koa()

  router.get('/', async ctx => ctx.body = `PID ${process.pid} listening here!`)
        .get('/flip', async ctx => {
          const res = await runJob()
          ctx.body  = res
        })

  app.use(async (ctx, next) => {
        await next();
        const rt = ctx.response.get('X-Response-Time');
        log(`${ctx.method} ${ctx.url} - ${rt}`);
      })
      .use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
      })
      .use(router.routes())
      .listen(3000)

}
