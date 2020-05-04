
import { Application } from 'egg';

export default (application: Application) => {
  const { router, controller } = application;
  router.get('/*', controller.admin.home);
  router.get('/exam', controller.admin.index);
  router.get('/*', controller.admin.list);
  router.post('/admin/api/article/add', controller.admin.add);
  router.post('/admin/api/article/upQuestion', controller.admin.upQuestion);
  router.post('/admin/api/login', controller.user.login);
  router.post('/admin/api/checkLogin', application.jwt, controller.user.index);
};