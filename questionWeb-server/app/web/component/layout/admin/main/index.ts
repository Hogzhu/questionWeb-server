import { Vue, Component, Prop } from 'vue-property-decorator';
import LayoutContent from '../content/index.vue';
import LayoutHeader from '../header/index.vue';

@Component({
  components: {
    LayoutContent,
    LayoutHeader
  }
})
export default class Main extends Vue {}