import { Vue, Component, Emit, Watch } from 'vue-property-decorator';
import vuerRouter from 'vue-router'
import { Action } from 'vuex-class';
// Component.registerHooks([
//   'beforeRouteEnter', // 进入路由之前
//   'beforeRouteLeave', // 离开路由之前
//   'beforeRouteUpdate'
// ])
@Component({
  components: {
  }
})
export default class Header extends Vue {
  @Action('checkLogin') checkLogin;
  private isLogin: boolean = false
  private userName: string = '游客'
  private userIdentity: string = 'student'
  beforeRouteUpdate (to: vuerRouter, from: vuerRouter, next: () => void): void {
    console.log('beforeRouteEnter')
    next();
  }

  private created () {
      this.checkLoginStatus()
  }

  private async checkLoginStatus () {
    const token = window.localStorage.token
    const headers = {
      // 切记 token 不要直接发送，要在前面加上 Bearer 字符串和一个空格
      Authorization: `Bearer ${token}`
    }
    const data = {
    }
    const config = {
      data,
      headers
    }
    const loginStatus = await this.checkLogin(config)
    if (loginStatus.data.code === 0) {
      this.isLogin = true
      this.userName = loginStatus.data.userName
      this.userIdentity = loginStatus.data.userIdentity
    }
  }

  @Emit('login')
  private login () {
    return null;
  }

  private logout () {
    window.localStorage.setItem('token', '')
    window.location.reload()
  }
}