import { Vue, Component, Prop } from 'vue-property-decorator';
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
  private created () {
    console.log('maincontainer')
  }
}