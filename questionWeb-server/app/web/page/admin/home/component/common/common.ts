import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class'
@Component({
    components: {
    }
})
export default class Common extends Vue {
    @Action('checkLogin') checkLogin

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
        if (loginStatus.data.code !== 0) {
          this.$message({
              type: 'error',
              message: '请先登录',
          })
          window.localStorage.setItem('token', '')
          this.$emit('login')
        }
      }
}