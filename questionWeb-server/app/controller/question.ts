import { Controller, Context, Application } from 'egg';
import { deserialize } from '@hubcarl/json-typescript-mapper';
import Article from '../model/article';
import Condition from '../lib/condition';
import { request } from 'http';

export default class UserController extends Controller {

  public async index () {
    const { ctx , app } = this;
    console.log(11123)
    console.log(ctx.state.user);
    /*
    * 打印内容为：{ username : 'admin', iat: 1560346903 }
    * iat 为过期时间，可以单独写中间件验证，这里不做细究
    * 除了 iat 之后，其余的为当时存储的数据
    **/
    ctx.body = {code: 0, msg: '验证成功'};
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
        'select * from problem where id >= (select floor(RAND() * (select MAX(id) from problem))) ORDER BY id LIMIT 5', '');
    const questionData = {
        questionNum,
        easyNum,
        midNum,
        difficultNum,
        questionList
    }
    ctx.body = questionData;
  }
}