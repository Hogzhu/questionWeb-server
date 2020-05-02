import Vue from 'vue';

import VueRouter from 'vue-router';
import Dashboard from '../view/dashboard/index.vue';
import Question from '../view/question/index.vue';
import Home from '../view/home/index.vue';
import MainPage from '../view/mainPage/index.vue';

Vue.use(VueRouter);

export default function createRouter () {
  return new VueRouter({
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '/',
        component: Question
      },
    ]
  });
}
