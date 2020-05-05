import { Controller, Context, Application } from 'egg';
import { deserialize } from '@hubcarl/json-typescript-mapper';
import Article from '../model/article';
import Condition from '../lib/condition';
import { request } from 'http';

export default class UserController extends Controller {

  public async index () {
    const { ctx , app } = this;
  }

  public async getQuestionList () {
    const { ctx , app } = this;
    // 选取各难度题目数以及随机50条题目数据
    const easy = await app.mysql.query('select count(*) from problem where level = "简单"', '');
    const mid = await app.mysql.query('select count(*) from problem where level = "中等"', '');
    const difficult = await app.mysql.query('select count(*) from problem where level = "困难"', '');
    const easyNum = easy[0]['count(*)']
    const midNum = mid[0]['count(*)']
    const difficultNum = difficult[0]['count(*)']
    const questionNum = easyNum + midNum + difficultNum;
    const questionList = await app.mysql.query(
        'select id,title,choose_A,choose_B,choose_C,choose_D,level,class ' +
        'from problem where id >= (select floor(RAND() * (select MAX(id) from problem))) ORDER BY id LIMIT 5', '');
    const questionData = {
        questionNum,
        easyNum,
        midNum,
        difficultNum,
        questionList
    }
    ctx.body = questionData;
  }

  public async getExamList () {
    const { ctx , app } = this;
    // 选取各难度题目数以及随机50条题目数据
    const easy = await app.mysql.query('select count(*) from problem where level = "简单"', '');
    console.log(ctx.request.body)
    ctx.body = easy
  }
}