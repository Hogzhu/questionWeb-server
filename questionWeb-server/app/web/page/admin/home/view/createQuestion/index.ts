import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
@Component({
  components: {
  }
})
export default class CreateQuestion extends Vue {
  @Action('getSubject') getSubject;
  @Action('newQuestion') newQuestion;
  @Action('saveArticle') saveArticle;
  private subjectArr: any = []
  private isChoose: boolean = true
  private questionLevel: string = '简单'
  private questionType: string = '选择题'
  private btnLocked: boolean = true
  private subject: any = ''

  private changeClass (type: string) {
    this.isChoose = type === '选择题' ? true : false
    this.questionType = type
  }

  private changeLevel (level: string) {
    this.questionLevel = level
  }

  // 通过url直接进入页面的用户未登录则提示登录并退回首页
  private beforeMount () {
    console.log(this.$store.getters.account)
    if (!window.localStorage.getItem('token')) {
      this.$message({
        type: 'error',
        message: '请先登录'
      })
      setTimeout(() => {
        window.location.href = window.location.origin + '/'
      }, 1000)
    }
    this.getSubjectInfo()
  }

  // 获得学科信息
  private async getSubjectInfo () {
    const res = await this.getSubject()
    this.subjectArr = res.data
    this.subject = res.data[0].name
  }

  private changeSubject (e: any) {
    this.subject = e.target.value
  }

  // 提交题目内容
  private async submitQuestion () {
    console.log(this.$store.getters.identity)
    const identity = this.$store.getters.identity
    const refs: any = this.$refs
    let isPassed = false
    if (this.btnLocked === false) {
      this.$message('请勿频繁提交')
      return false
    }
    this.btnLocked = false
    setTimeout(() => {
      this.btnLocked = true
    }, 1000)
    if (!refs.title.value || !refs.answer.value || !refs.analysis.value) {
      this.$message('请填写完整')
      return false
    }
    if (this.questionType === '选择题') {
      if (!refs.choose_A.value || !refs.choose_B.value || !refs.choose_C.value || !refs.choose_D.value) {
        this.$message('请填写完整')
        return false
      }
    }
    if (identity !== 'student') {
      isPassed = true
    }
    const data = {
      title: refs.title.value,
      level: this.questionLevel,
      type: this.questionType,
      choose_A: (refs.choose_A && refs.choose_A.value) || null,
      choose_B: (refs.choose_B && refs.choose_B.value) || null,
      choose_C: (refs.choose_C && refs.choose_C.value) || null,
      choose_D: (refs.choose_D && refs.choose_D.value) || null,
      answer: refs.answer.value,
      analysis: refs.analysis.value,
      subject: this.subject,
      isPassed,
      provider: this.$store.getters.account
    }
    console.log(data)
    await this.newQuestion(data).then(() => {
      this.$message('创建成功')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    })
  }
}