import { Vue, Component } from 'vue-property-decorator';
import QuestionList from '../../component/questionList/questionList.vue'
import PersonalRank from '../../component/personalRank/personalRank.vue'
import { checkLoginStatus } from "../../component/common/common";
@Component({
  components: {
    QuestionList,
    PersonalRank
  }
})
export default class MainPage extends Vue {
  private created() {
    this.checkLogin()
  }
  private checkLogin() {
    (Common as any).checkLoginStatus()
  }
}