import { Vue, Component } from 'vue-property-decorator'
import RankList from '../../component/rankList/rankList.vue'
@Component({
  name: 'Information',
  components: {
    RankList
  }
})
export default class Information extends Vue {
}