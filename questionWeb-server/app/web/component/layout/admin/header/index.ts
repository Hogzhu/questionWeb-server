import { Vue, Component, Emit } from 'vue-property-decorator';
import { Action } from 'vuex-class';
@Component({
  components: {
  }
})
export default class Header extends Vue {
  @Action('checkLogin') checkLogin;

  private isLogin: boolean = false
  private userName: string = '游客'
  private userIdentity: string = 'student'

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