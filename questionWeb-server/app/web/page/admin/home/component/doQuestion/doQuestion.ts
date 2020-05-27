import { Vue, Component, Emit, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
@Component({})
export default class AutoExam extends Vue {
    @Action('submitQuestion') submitQuestion;
    @Action('findQuestion') findQuestion;
    @Getter('account') account;
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
        if (this.questionData.type === '选择题') {
            this.isChoose = true
        }
    }

    private select (choose: string) {
        this.radioSelect = choose
    }

    private beforeSubmit () {
        if (!window.localStorage.getItem('token')) {
            this.$message({
                type: 'error',
                message: '提交失败，请先登录'
            })
        } else {
            this.submit()
        }
    }

    private async submit () {
        this.showAnswer = true
        if (this.isChoose) {
            let isSolved: boolean = true
            if (this.questionData.answer === this.radioSelect) {
                this.result = '回答正确'
                this.$message('回答正确')
                isSolved = true
            } else {
                this.result = '回答错误，该题目已记入错题'
                this.$message('回答错误')
                isSolved = false
            }
            const data = {
                account: this.account,
                id: this.questionId,
                isSolved
            }
            await this.submitQuestion(data)
        }
    }
}