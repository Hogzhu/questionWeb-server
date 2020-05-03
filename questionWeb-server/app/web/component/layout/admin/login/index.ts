import { Vue, Component } from 'vue-property-decorator';
@Component({
  components: {
  }
})
export default class Login extends Vue {
  private created () {
    console.log('login')
  }
}