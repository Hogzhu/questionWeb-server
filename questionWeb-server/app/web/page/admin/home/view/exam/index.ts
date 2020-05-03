import { Vue, Component } from 'vue-property-decorator'
import AutoExam from '../../component/autoExam/autoExam.vue'
import CustomExam from '../../component/customExam/customExam.vue'
@Component({
  components: {
    AutoExam,
    CustomExam
  }
})
export default class Exam extends Vue {
  private created () {
    console.log('exam page')
  }
}