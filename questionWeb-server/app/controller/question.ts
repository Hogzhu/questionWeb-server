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
    // const questionList = await app.mysql.query(
    //     'select id,title,choose_A,choose_B,choose_C,choose_D,level,class ' +
    //     'from problem where id >= (select floor(RAND() * (select MAX(id) from problem))) ORDER BY id LIMIT 10', '');
    const questionList = await app.mysql.query(
        `select id,title,choose_A,choose_B,choose_C,choose_D,level,class,edit,accept` +
        ` from problem where subject LIKE '${ctx.request.body.subject}%' ORDER BY rand()`, '');
    const questionData = {
        questionNum,
        easyNum,
        midNum,
        difficultNum,
        questionList
    }
    ctx.body = questionData;
  }

  // 获取学科信息
  public async getSubject () {
    const { ctx , app } = this;
    const subjectData = await app.mysql.query(`select name from subject` , '');
    ctx.body = subjectData;
  }

  // 点击搜索框后找到所有关键字的题目
  public async searchProblem () {
    const { ctx , app } = this;
    const body = ctx.request.body;
    const questionData = await app.mysql.query(`select * from problem where title regexp '${body.search}'` +
    ` AND subject LIKE '${ctx.request.body.subject}%'` , '');
    ctx.body = questionData;
  }

  // 获取考试题
  public async getExamList () {
    const { ctx , app } = this;
    let choose: any = ''
    let index: number = 0
    let errorChoose: any = [] // 带引号的错题id数组
    let noQuote: any = [] // 无引号的错题id数组
    let questionData: any = {}
    // 随机选择10个选择题和5个问答题
    const essay = await app.mysql.query('select * from problem where class = "简答题" limit 5', '');
    let errorList = await app.mysql.query(`select error from user where number = ${ctx.request.body.account}`, '');
    errorList = errorList[0].error.split(',')
    if (errorList.length < 3) {
      choose = await app.mysql.query('select * from problem where class = "选择题" limit 10', '');
      questionData = {
        choose,
        essay
      }
    } else {
      // 多选择几个以免错题被删除的情况
      for (let i = 0 ; i < 3 ; i++) {
        index = Math.floor(Math.random() * errorList.length)
        errorChoose.push('"' + errorList[index] + '"')
        noQuote.push(errorList[index])
        errorList.splice(index, 1)
      }
      errorChoose = errorChoose.join(',')
      noQuote = noQuote.join(',')
      console.log(noQuote)
      const errorArr = await app.mysql.query(`select * from problem where id in (${errorChoose}) limit 3`, '');
      choose = await app.mysql.query(`select * from problem where class="选择题" and id not in (${noQuote}) limit 7`, '');
      questionData = {
        errorArr,
        choose,
        essay
      }
    }
    ctx.body = questionData
  }

  // 新建题目
  public async newQuestion () {
    const { ctx , app } = this;
    const body = ctx.request.body;
    const questionData = await app.mysql.query(`insert into problem (answer,choose_A,choose_B,choose_C,choose_D,class,important,level,title)` +
    ` values ("${body.answer}","${body.choose_A}","${body.choose_B}","${body.choose_C}","${body.choose_D}","${body.class}",` +
    `"${body.important}","${body.level}","${body.title}")` , '');
    ctx.body = questionData;
  }

  // 点击单个题目后从数据库找到题目
  public async findQuestion () {
    const { ctx , app } = this;
    const body = ctx.request.body;
    const questionData = await app.mysql.query(`select * from problem where id = "${body.questionId}"` , '');
    ctx.body = questionData;
  }
}