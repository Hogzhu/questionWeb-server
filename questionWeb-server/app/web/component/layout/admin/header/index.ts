import { Vue, Component, Emit } from 'vue-property-decorator';
@Component({
  components: {
  }
})
export default class Header extends Vue {
  private created () {
    console.log('header')
  }

  @Emit('login')
  private login () {
    return null;
  }
}