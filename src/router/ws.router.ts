import Router from 'koa-router';

import wsController from '@/controller/ws.controller';

const wsRouter = new Router({ prefix: '/ws' });

wsRouter.post('/keep_alive', wsController.keepAlive);

export default wsRouter;
