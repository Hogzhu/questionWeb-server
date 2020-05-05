import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
@Component({
  components: {
  }
})
export default class CreateQuestion extends Vue {
  @Action('newQuestion') newQuestion;
  @Action('saveArticle') saveArticle;
  private isChoose: boolean = true
  private questionLevel: string = '简单'
  private questionClass: string = '选择题'
  private questionImportant: boolean = false
  private btnLocked: boolean = true

  private changeClass (type: string) {
    this.isChoose = type === '选择题' ? true : false
    this.questionClass = type
  }

  private changeLevel (level: string) {
    this.questionLevel = level
  }

  private changeImportant (important: boolean) {
    this.questionImportant = important
  }

  // 提交题目内容
  private async submitQuestion () {
    const refs: any = this.$refs
    if (this.btnLocked === false) {
      this.$message('请勿频繁提交')
      return false
    }
    this.btnLocked = false
    setTimeout(() => {
      this.btnLocked = true
    }, 1000)
    if (!refs.title.value || !refs.answer.value) {
      this.$message('请填写完整')
      return false
    }
    if (this.questionClass === '选择题') {
      if (!refs.choose_A.value || !refs.choose_B.value || !refs.choose_C.value || !refs.choose_D.value) {
        this.$message('请填写完整')
        return false
      }
    }
    const data = {
      title: refs.title.value,
      level: this.questionLevel,
      class: this.questionClass,
      choose_A: (refs.choose_A && refs.choose_A.value) || null,
      choose_B: (refs.choose_B && refs.choose_B.value) || null,
      choose_C: (refs.choose_C && refs.choose_C.value) || null,
      choose_D: (refs.choose_D && refs.choose_D.value) || null,
      answer: refs.answer.value,
      important: this.questionImportant,
    }
    await this.newQuestion(data).then(() => {
      this.$message('创建成功')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    })
  }
}