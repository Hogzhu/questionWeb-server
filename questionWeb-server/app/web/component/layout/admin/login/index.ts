import { Vue, Component, Emit } from 'vue-property-decorator';
import { Action } from 'vuex-class';
@Component({
  components: {
  }
})
export default class Login extends Vue {
  @Action('checkLogin') checkLogin;

  @Emit('closeLogin')
  private closeLogin () {
    return 'closeLogin'
  }

  private async login () {
    const token = '123456'
    const headers = {
      // 切记 token 不要直接发送，要在前面加上 Bearer 字符串和一个空格
    Authorization: `Bearer ${token}`
    }
    const data = {
      account: (this.$refs.account as any).value,
      password: (this.$refs.password as any).value
    }
    const requestData = {
      data,
      headers
    }
    const loginStatus = await this.checkLogin(requestData)
  }

}