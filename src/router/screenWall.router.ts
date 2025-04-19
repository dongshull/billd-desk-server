import Router from 'koa-router';

import screenWallController from '@/controller/screenWall.controller';

const screenWallRouter = new Router({ prefix: '/screen_wall' });

screenWallRouter.post('/set_img', screenWallController.setImg);

screenWallRouter.get('/get_img', screenWallController.getImg);

screenWallRouter.get('/get_all_img', screenWallController.getAllImg);

screenWallRouter.get(
  '/get_img_by_superadmin',
  screenWallController.getImgBySuperadmin
);

screenWallRouter.post('/add_group', screenWallController.addGroup);

screenWallRouter.post('/add_data', screenWallController.addData);

screenWallRouter.post('/edit_data', screenWallController.editData);

screenWallRouter.post('/edit_group', screenWallController.editGroup);

screenWallRouter.post('/del_data', screenWallController.delData);

screenWallRouter.post('/del_group', screenWallController.delGroup);

screenWallRouter.get('/get_data', screenWallController.getData);

export default screenWallRouter;
