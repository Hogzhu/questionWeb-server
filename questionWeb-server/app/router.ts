
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
  router.post('/admin/api/getStudentExam', controller.user.getStudentExam);
  router.post('/admin/api/getPassExamInfo', controller.user.getPassExamInfo);
  router.post('/admin/api/submitExam', controller.user.submitExam);
  router.post('/admin/api/submitQuestion', controller.user.submitQuestion);
  router.post('/admin/api/getPersonalInfo', controller.user.getPersonalInfo);
  router.post('/admin/api/importStudent', controller.user.importStudent);
  router.post('/admin/api/getStudentInfo', controller.user.getStudentInfo);
  router.post('/admin/api/changeStudentInfo', controller.user.changeStudentInfo);
  router.post('/admin/api/deleteStudentInfo', controller.user.deleteStudentInfo);
  router.post('/admin/api/getTeacherInfo', controller.user.getTeacherInfo);
  router.post('/admin/api/changeTeacherInfo', controller.user.changeTeacherInfo);
  router.post('/admin/api/deleteTeacherInfo', controller.user.deleteTeacherInfo);
  router.post('/admin/api/getSubjectInfo', controller.user.getSubjectInfo);
  router.post('/admin/api/deleteSubjectInfo', controller.user.deleteSubjectInfo);
  router.post('/admin/api/getQuestionList', controller.question.getQuestionList);
  router.post('/admin/api/getSubject', controller.question.getSubject);
  router.post('/admin/api/searchProblem', controller.question.searchProblem);
  router.post('/admin/api/changeProblem', controller.question.changeProblem);
  router.post('/admin/api/deleteProblem', controller.question.deleteProblem);
  router.post('/admin/api/getExamList', controller.question.getExamList);
  router.post('/admin/api/getExamProblem', controller.question.getExamProblem);
  router.post('/admin/api/newQuestion', controller.question.newQuestion);
  router.post('/admin/api/findQuestion', controller.question.findQuestion);
  router.post('/admin/api/getProblemInfo', controller.question.getProblemInfo);
  router.post('/admin/api/unPassProblem', controller.question.unPassProblem);
};