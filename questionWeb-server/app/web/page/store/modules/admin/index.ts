import axios from 'axios';
import { Module, GetterTree, ActionTree, MutationTree } from 'vuex';
import {
  SET_ARTICLE_LIST,
  SET_ARTICLE_DETAIL,
  SET_SAVE_ARTICLE,
  DELETE_ARTICLE,
  SET_USER_DELETE,
  SET_QUESTION_DELETE
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
    total (state): number {
      return state.articleTotal;
    },
    article (state): Article {
      return state.article || {};
    },
    articleList (state): Article[] {
      return state.articleList;
    },
    account (state): number {
      return state.account;
    },
    identity (state): string {
      return state.identity;
    },
    userSolved (state): number {
      return state.userSolved;
    },
    questionNum (state): number {
      return state.questionNum;
    }
  };

  actions: ActionTree<AdminState, RootState> = {
    async getArticleList ({ commit, dispatch, state, rootState }, condition) {
      // fetch no token headers
      const headers = EASY_ENV_IS_NODE ? {
        'x-csrf-token': rootState.csrf,
        'Cookie': `csrfToken=${rootState.csrf}`
      } : {};
      const res = await axios.post(`${rootState.origin}/admin/api/article/list`, condition, { headers });
      commit(SET_ARTICLE_LIST, res.data);
    },
    async getArticle ({ commit, dispatch, state , rootState}, { id }) {
      const res = await axios.get(`${rootState.origin}/admin/api/article/${id}`);
      commit(SET_ARTICLE_DETAIL, res.data);
    },
    // 登录并添加token
    async login ({ commit, dispatch, state , rootState}, data) {
      const res = await axios.post(`${rootState.origin}/admin/api/login`, data);
      return res;
    },
    // 确认登陆状态
    async checkLogin ({ commit, dispatch, state , rootState}, config) {
      const res = await axios.post(`${rootState.origin}/admin/api/checkLogin`, {}, config);
      commit(SET_USER_DELETE, res.data);
      return res;
    },
    // 获得题目列表
    async getQuestionList ({ commit, dispatch, state , rootState}) {
      const res = await axios.post(`${rootState.origin}/admin/api/getQuestionList`, {});
      commit(SET_QUESTION_DELETE, res.data);
      console.log('返回了')
      return res;
    },
    // 获得做题和排行数据
    async getUserRank ({ commit, dispatch, state , rootState}) {
      const res = await axios.post(`${rootState.origin}/admin/api/getUserRank`, {});
      return res;
    },
    // 获得考试题目
    async getExamList ({ commit, dispatch, state , rootState}, data) {
      const res = await axios.post(`${rootState.origin}/admin/api/getExamList`, data);
      return res;
    },
    // 加入错题
    async joinError ({ commit, dispatch, state , rootState}, data) {
      const res = await axios.post(`${rootState.origin}/admin/api/joinError`, data);
      return res;
    },
    // 新建题目
    async newQuestion ({ commit, dispatch, state , rootState}, data) {
      const res = await axios.post(`${rootState.origin}/admin/api/newQuestion`, data);
      return res;
    },
    // 查找一个题目
    async findQuestion ({ commit, dispatch, state , rootState}, data) {
      const res = await axios.post(`${rootState.origin}/admin/api/findQuestion`, data);
      return res;
    },
    // 导入学生数据
    async importStudent ({ commit, dispatch, state , rootState}, data) {
      const res = await axios.post(`${rootState.origin}/admin/api/importStudent`, data);
      return res;
    },
    async saveArticle ({ commit, dispatch, state, rootState }, data) {
      // node need auth
      const res = await axios.post(`${rootState.origin}/admin/api/article/add`, data);
      commit(SET_ARTICLE_LIST, res.data);
      return res;
    },
    async deleteArticle ({ commit, dispatch, state, rootState }, { id }) {
      // node need auth
      await axios.post(`${rootState.origin}/admin/api/article/del`, { id });
      commit(DELETE_ARTICLE, { id });
    }
  };

  mutations: MutationTree<AdminState> = {
    [SET_ARTICLE_LIST] (state, { list, total }) {
      state.articleTotal = total;
      state.articleList = list;
    },
    [SET_ARTICLE_DETAIL] (state, data) {
      state.article = data;
    },
    [SET_SAVE_ARTICLE] (state, data) {
      state.articleTotal += 1;
      state.articleList = [data].concat(state.articleList);
    },
    [DELETE_ARTICLE] (state, { id }) {
      state.articleTotal -= 1;
      state.articleList = state.articleList.filter((item: any) => {
        return item.id !== id;
      });
    },
    [SET_USER_DELETE] (state, data) {
      state.userSolved = data.solved;
      state.account = data.account;
      state.identity = data.userIdentity;
      console.log(data)
      console.log(state)
    },
    [SET_QUESTION_DELETE] (state, data) {
      state.questionNum = data.questionNum;
    },
  };

  constructor (initState: AdminState) {
    this.state = {
      articleTotal: 0,
      articleList: [],
      article: undefined,
      account: 0,
      userSolved: 0,
      questionNum: 0,
      ...initState
    };
  }
}