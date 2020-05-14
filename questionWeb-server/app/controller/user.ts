import { Controller, Context, Application } from 'egg';
import { deserialize } from '@hubcarl/json-typescript-mapper';
import Article from '../model/article';
import Condition from '../lib/condition';
import { request } from 'http';

export default class UserController extends Controller {

  public async index () {
    const { ctx , app } = this
    ctx.body = {code: 0, msg: '验证成功'}
  }

  // 验证登录并且生成 token
  public async login () {
    const { ctx , app } = this
    // 获取用户端传递过来的参数
    const data = ctx.request.body
    // 进行验证 data 数据 登录是否成功
    let checkNum = 0
    const information = await app.mysql.query('select * from user', '')
    const userNum = information.length
    information.forEach((item, index) => {
      checkNum++
      if (item.number === ctx.request.body.account) {
        if (item.password === ctx.request.body.password) {
          checkNum--
          console.log('login success')
        } else {
          checkNum--
          console.log('密码错误')
          return false
        }
      }
    })
    if (checkNum === userNum) {
      console.log('账号不存在')
      return false
    }
    // 成功过后进行一下操作
    // 生成 token 的方式
    const token = app.jwt.sign({
     account: data.account, // 需要存储的 token 数据
     password: data.password,
     // ......
    }, app.config.jwt.secret)
    // 生成的token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1NjAzNDY5MDN9.B95GqH-fdRpyZIE5g_T0l8RgzNyWOyXepkLiynWqrJg
    // 返回 token 到前端
    ctx.body = token
  };

  // 访问admin数据时进行验证token，并且解析 token 的数据
  public async checkLogin () {
    const { ctx , app } = this
    const userData = await app.mysql.query(`select name,identity,done,solved from user where number = '${ctx.state.user.account}'`, '')
    /*
    * 打印内容为：{ username : 'admin', iat: 1560346903 }
    * iat 为过期时间，可以单独写中间件验证，这里不做细究
    * 除了 iat 之后，其余的为当时存储的数据
    **/
    ctx.body = {
      code: 0,
      msg: '验证成功',
      account: ctx.state.user.account,
      userName: userData[0].name,
      userIdentity: userData[0].identity,
      done: userData[0].done,
      solved: userData[0].solved
    };
  }

  // 获得排行前五学生的数据
  public async getUserRank () {
    const { ctx , app } = this
    const rankData = await app.mysql.query(`select name,solved from user order by solved Desc limit 5`, '')
    ctx.body = rankData
  }

  // 考试后修改用户的做题数据
  public async submitExam () {
    const { ctx , app } = this
    const body = ctx.request.body
    const trueStr = body.trueArr.join(',')
    const allStr = (body.trueArr.concat(body.errorArr)).join(',')
    // const errorData = await app.mysql.query(`update user SET error=CONCAT(error,',${ctx.request.body.errorArr}') WHERE number=${ctx.request.body.account};`, '')
    const oldData = await app.mysql.query(`select id,done,solved,error from user WHERE number=${body.account};`, '')
    console.log(12334)
    console.log(oldData[0].done)
    const oldDoneData = oldData[0].done.split(',')
    const oldSolvedData = oldData[0].solved.split(',')
    const oldErrorData = oldData[0].error.split(',')
    if (oldDoneData.includes('')) {
      const index = oldDoneData.indexOf('')
      oldDoneData.splice(index, 1)
    }
    if (oldSolvedData.includes('')) {
      const index = oldSolvedData.indexOf('')
      oldSolvedData.splice(index, 1)
    }
    if (oldErrorData.includes('')) {
      const index = oldErrorData.indexOf('')
      oldErrorData.splice(index, 1)
    }
    let newDoneData = body.errorArr.concat(body.trueArr)
    let newSolvedData = body.trueArr
    let newErrorData = body.errorArr
    newDoneData = newDoneData.join(',').split(',')
    newSolvedData = newSolvedData.join(',').split(',')
    newErrorData = newErrorData.join(',').split(',')
    body.trueArr.forEach((item) => {
      item = String(item)
      if (oldErrorData.includes(item)) {
        const index = oldErrorData.indexOf(item)
        oldErrorData.splice(index, 1)
      }
    })
    if (oldDoneData.length > 0) {
      newDoneData = newDoneData.concat(oldDoneData)
    }
    if (oldSolvedData.length > 0) {
      newSolvedData = newSolvedData.concat(oldSolvedData)
    }
    if (oldErrorData.length > 0) {
      newErrorData = newErrorData.concat(oldErrorData)
    }
    newDoneData = Array.from(new Set(newDoneData))
    newSolvedData = Array.from(new Set(newSolvedData))
    newErrorData = Array.from(new Set(newErrorData))
    const resData = await app.mysql.query(`update user SET done='${newDoneData}',solved='${newSolvedData}',error='${newErrorData}' ` +
    `WHERE number=${body.account};`, '')
    const acceptData = await app.mysql.query(`update problem SET accept= CASE id WHEN id THEN accept+1 END WHERE id IN (${trueStr});`, '')
    const editData = await app.mysql.query(`update problem SET edit= CASE id WHEN id THEN edit+1 END WHERE id IN (${allStr});`, '')
    ctx.body = resData
  }

  // 做题后修改学生的做题数据
  public async submitQuestion () {
    const { ctx , app } = this
    const body = ctx.request.body
    const oldData = await app.mysql.query(`select id,done,solved,error from user WHERE number=${body.account};`, '')
    const oldDoneData = oldData[0].done.split(',')
    const oldSolvedData = oldData[0].solved.split(',')
    const oldErrorData = oldData[0].error.split(',')
    body.id = String(body.id)
    if (oldDoneData.includes('')) {
      const index = oldDoneData.indexOf('')
      oldDoneData.splice(index, 1)
    }
    if (oldSolvedData.includes('')) {
      const index = oldSolvedData.indexOf('')
      oldSolvedData.splice(index, 1)
    }
    if (oldErrorData.includes('')) {
      const index = oldErrorData.indexOf('')
      oldErrorData.splice(index, 1)
    }
    const resData = ''
    if (body.isSolved === true) {
      if (!oldDoneData.includes(body.id)) {
        oldDoneData.push(body.id)
      }
      if (!oldSolvedData.includes(body.id)) {
        oldSolvedData.push(body.id)
      }
      if (oldErrorData.includes(body.id)) {
        const index = oldErrorData.indexOf(body.id)
        oldErrorData.splice(index, 1)
      }
      await app.mysql.query(`update user SET done='${oldDoneData}',solved='${oldSolvedData}',error='${oldErrorData}' ` +
      `WHERE number=${body.account};`, '')
      await app.mysql.query(`update problem SET edit=edit+1,accept=accept+1 WHERE id=${body.id};`, '')
    } else {
      if (!oldDoneData.includes(body.id)) {
        oldDoneData.push(body.id)
      }
      if (!oldErrorData.includes(body.id)) {
        oldErrorData.push(body.id)
      }
      await app.mysql.query(`update user SET done='${oldDoneData}',error='${oldErrorData}' WHERE number=${body.account};`, '')
      await app.mysql.query(`update problem SET edit=edit+1 WHERE id=${body.id};`, '')
    }
    ctx.body = resData
  }

  // 导入学生信息
  public async importStudent () {
    const { ctx , app } = this
    const body = ctx.request.body
    console.log(body.studentInfo)
    const studentData = await app.mysql.query(`insert into user (number,name,password,class) values ${body.studentInfo} on duplicate key update number=values(number),name=values(name),password=values(password),class=values(class);`, '')
    ctx.body = studentData
  }
}