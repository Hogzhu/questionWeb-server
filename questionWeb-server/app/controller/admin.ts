import { Controller, Context, Application } from 'egg';
import { deserialize } from '@hubcarl/json-typescript-mapper';
import Article from '../model/article';
import Condition from '../lib/condition';

export default class AdminController extends Controller {

  public async login (ctx: Context) {
    await ctx.renderClient('admin/login.js', {});
  }

  public async home (ctx: Context) {
    await ctx.render('admin/home.js', { url: ctx.url.replace(/\/admin/, '') });
  }

  public async index () {
    alert(11)
    this.ctx.body = 'Hello world';
  }

  public async upQuestion (ctx: Context) {
    const article = deserialize(Article, ctx.request.body);
    // ctx.body = await this.ctx.service.article.upQuestion(article);
    ctx.body = await this.app.mysql.query('select * from problem', '');
  }

  public async list () {
    console.log(1111)
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1' },
        { id: 2, title: 'this is news 2', url: '/news/2' }
      ]
    };
    await this.ctx.render('news/list.tpl', dataList);
  }

  public async qlist (ctx: Context) {
    const condition = deserialize(Condition, ctx.request.body);
    ctx.body = await ctx.service.article.getArtilceList(condition);
  }

  public async add (ctx: Context) {
    console.log(124)
    console.log(ctx.request.body)
    const article = deserialize(Article, ctx.request.body);
    ctx.body = await ctx.service.article.saveArticle(article);
    ctx.body.hog = '123123123'
    console.log(ctx.body)
  }

  public async del (ctx: Context) {
    const { id  } = ctx.request.body;
    ctx.body = await ctx.service.article.deleteArticle(id);
  }

  public async detail (ctx: Context) {
    const { id } = ctx.params;
    ctx.body = await ctx.service.article.query({ id: Number(id) });
  }
}