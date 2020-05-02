import { Vue, Component, Emit } from 'vue-property-decorator';
import Layout from 'component/layout/admin/index.vue';
import QuestionList from '../../component/questionList/questionList.vue';
@Component({
  components: {
    Layout,
  }
})

export default class Home extends Vue {}