import Vue from 'vue';

import VueRouter from 'vue-router';
import Dashboard from '../view/dashboard/index.vue';
import Home from '../view/home/index.vue';
import MainPage from '../view/mainPage/index.vue';
import Exam from '../view/exam/index.vue';
import CreateQuestion from '../view/createQuestion/index.vue';
import Information from '../view/information/index.vue';

Vue.use(VueRouter);

export default function createRouter () {
  return new VueRouter({
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '/',
        component: MainPage
      },
      {
        path: '/exam',
        component: Exam
      },
      {
        path: '/createQuestion',
        component: CreateQuestion
      },
      {
        path: '/information',
        component: Information
      },
    ]
  });
}
