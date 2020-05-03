import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({
  components: {
  }
})
export default class Header extends Vue {
  private created () {
    console.log('header')
  }
}