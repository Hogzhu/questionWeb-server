
import { Application } from 'egg';

export default (application: Application) => {
  const { router, controller } = application;
  router.get('/*', controller.admin.home);
  router.get('/exam', controller.admin.index);
  router.get('/*', controller.admin.list);
  router.post('createPost', '/home', controller.post.create);
  router.post('/admin/api/article/add', controller.admin.add);
  router.post('/admin/api/article/upQuestion', controller.admin.upQuestion);
};