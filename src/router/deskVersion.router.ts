import Router from 'koa-router';

import deskVersionController from '@/controller/deskVersion.controller';

const deskUserRouter = new Router({ prefix: '/desk_version' });

deskUserRouter.get('/check', deskVersionController.check);

deskUserRouter.get('/latest', deskVersionController.latest);

deskUserRouter.get('/find_by_version', deskVersionController.findByVersion);

deskUserRouter.get('/find_all_version', deskVersionController.findAllVersion);

export default deskUserRouter;
