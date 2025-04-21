import Router from 'koa-router';

import shorturlController from '@/controller/shorturl.controller';

const shorturlRouter = new Router({ prefix: '/shorturl' });

shorturlRouter.get('/find/:code', shorturlController.find);

export default shorturlRouter;
