
import { Application } from 'egg';

export default (application: Application) => {
  const { router, controller, jwt } = application;
  router.get('/*', controller.admin.home);
  router.get('/exam', controller.admin.index);
  router.get('/*', controller.admin.list);
  router.post('/admin/api/article/add', controller.admin.add);
  router.post('/admin/api/login', controller.user.login);
  router.post('/admin/api/checkLogin', jwt, controller.user.checkLogin);
  router.post('/admin/api/getUserRank', controller.user.getUserRank);
  router.post('/admin/api/joinError', controller.user.joinError);
  router.post('/admin/api/getQuestionList', controller.question.getQuestionList);
  router.post('/admin/api/getExamList', controller.question.getExamList);
  router.post('/admin/api/newQuestion', controller.question.newQuestion);
  router.post('/admin/api/findQuestion', controller.question.findQuestion);
};