import { Vue, Component, Emit } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { type } from 'os';
// import { resolve } from 'dns';
// import { rejects } from 'assert';
@Component({
  components: {
  }
})
export default class Login extends Vue {
  @Action('login') login;
  private isForget: boolean = false

  @Emit('closeLogin')
  private closeLogin () {
    return 'closeLogin'
  }

  private async handlerLogin () {
    const account = (this.$refs.account as any).value
    const password = (this.$refs.password as any).value
    if (!account || !password) {
      this.$message({type: 'error', message: '学号或密码不可为空!'})
      return false
    }
    const data = {
      account,
      password
    }
    const loginStatus = await this.login(data)
    if (loginStatus.status === 200) {
      if (loginStatus.data.loginText) {
        this.$message({type: 'error', message: loginStatus.data.loginText})
        return false
      }
      window.localStorage.setItem('token', loginStatus.data)
      window.location.reload()
    }
  }

  private forgetPwd () {
    this.isForget = true
  }

  private backLogin () {
    this.isForget = false
  }
}