
import { Application } from 'egg';

export default (application: Application) => {
  const { router, controller } = application;
  router.get('/*', controller.admin.home);
};