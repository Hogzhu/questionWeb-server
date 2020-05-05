import axios from 'axios';
import { Module, GetterTree, ActionTree, MutationTree } from 'vuex';
import {
  SET_ARTICLE_LIST,
  SET_ARTICLE_DETAIL,
  SET_SAVE_ARTICLE,
  DELETE_ARTICLE,
  SET_USER_DELETE
} from './type';

import RootState from '../../state';
import AdminState from './state';
import Article from '../../../../../model/article';
import querystring from 'querystring'

axios.defaults.baseURL = 'http://127.0.0.1:7001';
axios.defaults.timeout = 15000;
axios.defaults.xsrfHeaderName = 'x-csrf-token';
axios.defaults.xsrfCookieName = 'csrfToken';

export default class AdminModule implements Module<AdminState, RootState> {
  state: AdminState;

  getters: GetterTree<AdminState, RootState> = {
    total(state): number {
      return state.articleTotal;
    },
    article(state): Article {
      return state.article || {};
    },
    articleList(state): Article[] {
      return state.articleList;
    },
  };

  actions: ActionTree<AdminState, RootState> = {
    async getArticleList({ commit, dispatch, state, rootState }, condition) {
      // fetch no token headers
      const headers = EASY_ENV_IS_NODE ? {
        'x-csrf-token': rootState.csrf,
        'Cookie': `csrfToken=${rootState.csrf}`
      } : {};
      const res = await axios.post(`${rootState.origin}/admin/api/article/list`, condition, { headers });
      commit(SET_ARTICLE_LIST, res.data);
    },
    async getArticle({ commit, dispatch, state , rootState}, { id }) {
      const res = await axios.get(`${rootState.origin}/admin/api/article/${id}`);
      commit(SET_ARTICLE_DETAIL, res.data);
    },
    async upQuestion ({ commit, dispatch, state , rootState}, data) {
      const res = await axios.post(`${rootState.origin}/admin/api/article/upQuestion`, data);
      console.log(res)
      return res;
    },
    // 登录并添加token
    async login ({ commit, dispatch, state , rootState}, data) {
      console.log(data)
      const res = await axios.post(`${rootState.origin}/admin/api/login`, data);
      console.log(res)
      return res;
    },
    // 确认登陆状态
    async checkLogin ({ commit, dispatch, state , rootState}, config) {
      const res = await axios.post(`${rootState.origin}/admin/api/checkLogin`, {}, config);
      commit(SET_USER_DELETE, res.data);
      console.log(res.data)
      return res;
    },
    // 获得题目列表
    async getQuestionList ({ commit, dispatch, state , rootState}) {
      const res = await axios.post(`${rootState.origin}/admin/api/getQuestionList`, {});
      console.log(res)
      return res;
    },
    async saveArticle({ commit, dispatch, state, rootState }, data) {
      // node need auth
      const res = await axios.post(`${rootState.origin}/admin/api/article/add`, data);
      commit(SET_ARTICLE_LIST, res.data);
      return res;
    },
    async deleteArticle({ commit, dispatch, state, rootState }, { id }) {
      // node need auth
      await axios.post(`${rootState.origin}/admin/api/article/del`, { id });
      commit(DELETE_ARTICLE, { id });
    }
  };

  mutations: MutationTree<AdminState> = {
    [SET_ARTICLE_LIST](state, { list, total }) {
      state.articleTotal = total;
      state.articleList = list;
    },
    [SET_ARTICLE_DETAIL](state, data) {
      state.article = data;
    },
    [SET_SAVE_ARTICLE](state, data) {
      state.articleTotal += 1;
      state.articleList = [data].concat(state.articleList);
    },
    [DELETE_ARTICLE](state, { id }) {
      state.articleTotal -= 1;
      state.articleList = state.articleList.filter((item: any) => {
        return item.id !== id;
      });
    },
    [SET_USER_DELETE](state, data) {
      state.userSolved = data.solved;
    },
  };

  constructor(initState: AdminState) {
    this.state = {
      articleTotal: 0,
      articleList: [],
      article: undefined,
      userSolved: 0,
      ...initState
    };
  }
}