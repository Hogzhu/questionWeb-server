import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
@Component({})
export default class Information extends Vue {
  @Action('getPersonalInfo') getPersonalInfo
  @Action('checkLogin') checkLogin
  @Getter('account') account
  @Getter('questionNum') questionNum
  private editNum: any = 0
  private acceptNum: any = 0
  private examNum: any = 0

  // 通过url直接进入页面的用户未登录则提示登录并退回首页
  private beforeMount () {
    if (!window.localStorage.getItem('token')) {
      this.$message({
        type: 'error',
        message: '请先登录'
      })
      setTimeout(() => {
        window.location.href = window.location.origin + '/'
      }, 1000)
    }
    // 监听总体数的变化确认获取题目列表的接口是否已返回值
    if (this.$store.getters.account === 0 || this.$store.getters.questionNum === 0) {
      this.$watch(function () {
        console.log(this.questionNum)
        return this.$store.getters.account
      }, (v, o) => {
        this.getInfo()
      })
    } else {
      this.getInfo()
    }
  }

  private async getInfo () {
    const data = {
      account: this.account
    }
    const res = await this.getPersonalInfo(data)
    console.log(res)
    this.editNum = res.data[0].done.split(',').length
    this.acceptNum = res.data[0].solved.split(',').length
    this.examNum = res.data[0].exam
  }

  // private async checkLoginStatus () {
  //   const token = window.localStorage.token
  //   const headers = {
  //     // 切记 token 不要直接发送，要在前面加上 Bearer 字符串和一个空格
  //     Authorization: `Bearer ${token}`
  //   }
  //   const data = {
  //   }
  //   const config = {
  //     data,
  //     headers
  //   }
  //   const loginStatus = await this.checkLogin(config)
  //   const res = loginStatus.data
  //   console.log(res)
  // }
}