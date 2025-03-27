import Router from 'koa-router';

import inviteController from '@/controller/invite.controller';

const inviteRouter = new Router({ prefix: '/invite' });

inviteRouter.post('/create', inviteController.create);

inviteRouter.post('/keep_alive', inviteController.keepAlive);

// inviteRouter.post('/del', inviteController.del);

inviteRouter.get('/get', inviteController.get);

export default inviteRouter;
