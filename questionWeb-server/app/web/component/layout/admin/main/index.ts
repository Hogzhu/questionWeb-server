import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router'
import LayoutContent from '../content/index.vue';
import LayoutHeader from '../header/index.vue';
import LayoutLogin from '../login/index.vue';
@Component({
  components: {
    LayoutHeader,
    LayoutContent,
    LayoutLogin
  }
})
export default class Main extends Vue {
  private showLogin: boolean = false

  // 用户切换路由进入其他页面时先检测是否已登录
  private loginStatusCheck () {
    this.$router.beforeEach ((to, from, next) => {
      console.log(to)
      if (to.path !== '/' && !window.localStorage.getItem('token')) {
        this.$message({ type: 'error',
         message: '请先登录'
        })
      } else if (to.path === '/') {
        next()
      }
    })
  }

  private created () {
    this.loginStatusCheck()
  }

  private login () {
    this.showLogin = true
  }

  private closeLogin () {
    this.showLogin = false
  }
}