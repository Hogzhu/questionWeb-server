import { Vue, Component, Emit } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import Axios from 'axios';
@Component({
  components: {
  }
})
export default class Header extends Vue {
  @Action('checkLogin') checkLogin;
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
    console.log(config)
    const loginStatus = await this.checkLogin(config)
    console.log(loginStatus)
  }

  @Emit('login')
  private login () {
    return null;
  }
}