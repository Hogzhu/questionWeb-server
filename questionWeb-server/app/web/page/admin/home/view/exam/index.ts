import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
@Component({})
export default class Exam extends Vue {
  @Action('getExamList') getExamList;
  @Action('submitExam') submitExam;
  @Getter('account') account;
  @Getter('userSolved') userSolved;

  private chooseQuestion: any = []
  private essayQuestion: any[] = []
  private chooseArr: number[] = [0, 0, 0, 0, 0, 0, 0]
  private isSubmit: boolean = false
  private btnLocked: boolean = true

  // 通过url直接进入页面的用户未登录则提示登录并退回首页
  private beforeMount () {
    if (!window.localStorage.getItem('token')) {
      this.$message({
        type: 'error',
        message: '请先登录'
      })
      setTimeout(() => {
        window.location.href = window.location.origin + '/'
      }, 1000)
    } else {
      // 监听总体数的变化确认获取题目列表的接口是否已返回值
      if (this.$store.getters.account === 0) {
        this.$watch(function () {
          return this.$store.getters.account
        }, (v, o) => {
          this.getExamInfo()
        })
      } else {
        this.getExamInfo()
      }
    }
  }

  private async getExamInfo () {
    const data = {
      account: this.account
    }
    const res = await this.getExamList(data)
    this.chooseQuestion = res.data.choose.concat(res.data.errorArr)
    console.log(this.chooseQuestion)
    console.log(res.data.errorArr)
    this.essayQuestion = res.data.essay
  }

  // 提交答案，回答错误的题目加入用户的错题
  private async submit () {
    if (this.btnLocked === false) {
      this.$message('请勿频繁提交')
      return false
    }
    this.btnLocked = false
    setTimeout(() => {
      this.btnLocked = true
    }, 1000)
    this.isSubmit = true
    console.log(this.chooseArr)
    this.$message('提交成功')
    const errorArr: any[] = []
    const trueArr: any[] = []
    this.chooseArr.forEach((item, index) => {
      if (item  === 0) {
        errorArr.push(this.chooseQuestion[index].id)
      } else {
        trueArr.push(this.chooseQuestion[index].id)
      }
    })
    const data = {
      account: this.account,
      errorArr,
      trueArr
    }
    await this.submitExam(data)
  }

  private selectRadio (index: number, choose: string) {
    if (choose === this.chooseQuestion[index].answer) {
      this.chooseArr.splice(index, 1, 1)
    } else {
      this.chooseArr.splice(index, 1, 0)
    }
  }
}