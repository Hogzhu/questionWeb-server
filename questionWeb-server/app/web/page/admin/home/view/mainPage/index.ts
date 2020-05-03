import { Vue, Component } from 'vue-property-decorator';
import QuestionList from '../../component/questionList/questionList.vue'
import PersonalRank from '../../component/personalRank/personalRank.vue'
@Component({
  components: {
    QuestionList,
    PersonalRank
  }
})
export default class MainPage extends Vue {}