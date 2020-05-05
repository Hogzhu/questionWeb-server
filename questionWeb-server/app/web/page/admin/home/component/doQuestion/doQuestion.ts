import { Vue, Component, Emit, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
@Component({})
export default class AutoExam extends Vue {
    @Action('joinError') joinError;
    @Action('findQuestion') findQuestion;
    @Prop({ type: Number, default: 0 }) questionId;
    private questionData: any = {}
    private isChoose: boolean = false
    private showAnswer: boolean = false
    private radioSelect: string = ''
    private result: string = ''

    @Emit('closeDoQuestion')
    private closeDoQuestion () {
        return 'closeDoQuestion'
    }

    private created () {
        this.queryQuestion()
    }

    // 根据所点击的题目id查找题目数据
    private async queryQuestion () {
        const data = {
            questionId: this.questionId
        }
        const res = await this.findQuestion(data)
        this.questionData = res.data[0]
        if (this.questionData.class === '选择题') {
            this.isChoose = true
        }
    }

    private select (choose: string) {
        this.radioSelect = choose
    }

    private async submit () {
        this.showAnswer = true
        if (this.isChoose) {
            if (this.questionData.answer === this.radioSelect) {
                this.result = '回答正确'
                this.$message('回答正确')
            } else {
                this.result = '回答错误，该题目已记入错题'
                this.$message('回答错误')
                await this.joinError(this.questionId)
            }
        }
    }
}