import { Vue, Component } from 'vue-property-decorator';
import QuestionList from '../../component/questionList/questionList';
@Component({
  components: {
    QuestionList
  }
})

export default class MainPage extends Vue {}