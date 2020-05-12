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
    const userData = await app.mysql.query(`select name,identity,solved from user where number = '${ctx.state.user.account}'`, '')
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
      solved: userData[0].solved
    };
  }

  // 获得排行前五学生的数据
  public async getUserRank () {
    const { ctx , app } = this
    const rankData = await app.mysql.query(`select name,solved from user order by solved Desc limit 5`, '')
    ctx.body = rankData
  }

  // 加入错题并把做对的题从错题删去
  public async joinError () {
    const { ctx , app } = this
    const body = ctx.request.body
    const trueStr = body.trueArr.join(',')
    const allStr = (body.trueArr.concat(body.errorArr)).join(',')
    // const errorData = await app.mysql.query(`update user SET error=CONCAT(error,',${ctx.request.body.errorArr}') WHERE number=${ctx.request.body.account};`, '')
    let oldData = await app.mysql.query(`select error from user WHERE number=${body.account};`, '')
    const userId = await app.mysql.query(`select id from user WHERE number=${body.account};`, '')
    oldData = oldData[0].error.split(',')
    if (oldData.includes('')) {
      const index = oldData.indexOf('')
      oldData.splice(index, 1)
    }
    let newData = body.errorArr
    newData = newData.join(',').split(',')
    body.trueArr.forEach((item) => {
      item = String(item)
      if (oldData.includes(item)) {
        const index = oldData.indexOf(item)
        oldData.splice(index, 1)
      }
    })
    if (oldData.length > 0) {
      newData = newData.concat(oldData)
    }
    newData = Array.from(new Set(newData))
    const errorData = await app.mysql.query(`update user SET error='${newData}' WHERE number=${body.account};`, '')
    const acceptData = await app.mysql.query(`update problem SET accept= CASE id WHEN id THEN accept+1 END WHERE id IN (${trueStr});`, '')
    const editData = await app.mysql.query(`update problem SET edit= CASE id WHEN id THEN edit+1 END WHERE id IN (${allStr});`, '')
    ctx.body = errorData
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