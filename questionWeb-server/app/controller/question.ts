import { Controller, Context, Application } from 'egg';
import { deserialize } from '@hubcarl/json-typescript-mapper';
import Article from '../model/article';
import Condition from '../lib/condition';
import { request } from 'http';

export default class UserController extends Controller {

  public async index () {
    const { ctx , app } = this;
  }

  // 获取首页的题目列表
  public async getQuestionList () {
    const { ctx , app } = this;
    // 选取各难度题目数以及题目数据
    const easy = await app.mysql.query('select count(*) from problem where level = "简单"', '');
    const mid = await app.mysql.query('select count(*) from problem where level = "中等"', '');
    const difficult = await app.mysql.query('select count(*) from problem where level = "困难"', '');
    const easyNum = easy[0]['count(*)']
    const midNum = mid[0]['count(*)']
    const difficultNum = difficult[0]['count(*)']
    const questionNum = easyNum + midNum + difficultNum;
    const questionList = await app.mysql.query(
        `select id,title,choose_A,choose_B,choose_C,choose_D,level,type,edit,accept` +
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
    const essay = await app.mysql.query('select * from problem where type = "简答题" limit 5', '');
    let errorList = await app.mysql.query(`select error from user where number = ${ctx.request.body.account}`, '');
    errorList = errorList[0].error.split(',')
    if (errorList.length < 3) {
      choose = await app.mysql.query('select * from problem where type = "选择题" limit 10', '');
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
      choose = await app.mysql.query(`select * from problem where type="选择题" and id not in (${noQuote}) limit 7`, '');
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
    let questionData = '';
    const studentInfo = await app.mysql.query(`select name,class from user where number=${body.provider}`, '');
    const studentName = studentInfo[0].name
    const studentClass = studentInfo[0].class
    if (body.isPassed === true) {
      questionData = await app.mysql.query(`insert into problem (answer,analysis,choose_A,choose_B,choose_C,choose_D,type,subject,level,title,provider)` +
      ` values ("${body.answer}","${body.analysis}","${body.choose_A}","${body.choose_B}","${body.choose_C}","${body.choose_D}","${body.type}",` +
      `"${body.subject}","${body.level}","${body.title}","${studentName}")` , '');
    } else {
      const teacherInfo = await app.mysql.query(`select number,name,class from teacher where subject LIKE '%${body.subject}%' AND ` +
      `class LIKE '%${studentClass}%'`, '');
      const teacherNumber = teacherInfo.length > 0 ? teacherInfo[0].number : '00001'
      questionData = await app.mysql.query(`insert into pre_problem (name,number,class,subject,teacher,title,answer,analysis,level,` +
      `type,choose_A,choose_B,choose_C,choose_D) values ("${studentName}","${body.provider}","${studentClass}",` +
      `"${body.subject}","${teacherNumber}","${body.title}","${body.answer}","${body.analysis}","${body.level}",` +
      `"${body.type}","${body.choose_A}","${body.choose_B}","${body.choose_C}","${body.choose_D}")` , '');
      console.log(questionData)
    }
    ctx.body = questionData;
  }

  // 点击单个题目后从数据库找到题目
  public async findQuestion () {
    const { ctx , app } = this;
    const body = ctx.request.body;
    const questionData = await app.mysql.query(`select * from problem where id = "${body.questionId}"` , '');
    ctx.body = questionData;
  }

  // 后台管理获得待入库题目信息
  public async getProblemInfo () {
    const { ctx , app } = this;
    const body = ctx.request.body;
    // 通过教师的id取得所有需要教师通过的待入库题目信息
    const questionData = await app.mysql.query(`select * from pre_problem where teacher = "${body.account}"` , '');
    ctx.body = questionData;
  }

  // 入库不通过
  public async unPassProblem () {
    const { ctx , app } = this;
    const body = ctx.request.body;
    // 在待入库表中删除该项
    const questionData = await app.mysql.query(`delete from pre_problem where id = "${body.id}"` , '');
    ctx.body = questionData;
  }
}