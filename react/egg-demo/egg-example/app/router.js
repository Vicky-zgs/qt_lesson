'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/test', controller.home.test);
  router.get('/user', controller.user.index);
  router.get('/getid/:id', controller.user.getId);
  router.get('/add', controller.user.add);
};
