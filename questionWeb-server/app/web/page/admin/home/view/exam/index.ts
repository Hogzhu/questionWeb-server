import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
@Component({})
export default class Exam extends Vue {
  @Action('getPassExamInfo') getPassExamInfo;
  @Action('getSubject') getSubject;
  @Action('getStudentExam') getStudentExam;
  @Action('getExamList') getExamList;
  @Action('getExamProblem') getExamProblem;
  @Action('submitExam') submitExam;
  @Getter('account') account;
  @Getter('identity') identity;
  @Getter('userSolved') userSolved;

  private passExam: any = []
  private subjectArr: any = []
  private subject: string = 'Web前端'
  private showExam: boolean = false
  private chooseQuestion: any = []
  private essayQuestion: any[] = []
  private chooseArr: number[] = [0, 0, 0, 0, 0, 0, 0]
  private essayId: string = ''
  private studentAnswer: string = ''
  private grade: any = 0
  private isSubmit: boolean = false
  private btnLocked: boolean = true
  private studentExamList: any = []
  private showHandler: boolean = false
  private selectExamInfo: any = {}

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
          console.log(this.identity)
          this.getSubjectInfo()
          this.getPassExam()
          this.getStudentExamInfo()
        })
      } else {
        this.getSubjectInfo()
        this.getPassExam()
        this.getStudentExamInfo()
      }
    }
  }

  private async getPassExam () {
    const data = {
      account: this.account
    }
    const res = await this.getPassExamInfo(data)
    this.passExam = res.data
    console.log(this.passExam)
  }

  private async getStudentExamInfo () {
    const data = {
      account: this.account
    }
    const res = await this.getStudentExam(data)
    this.studentExamList = res.data
    console.log(this.studentExamList)
  }

  private async handlerExam (id: any) {
    this.showHandler = true
    console.log(id)
    this.studentExamList.forEach((item, index) => {
      if (item.id === id) {
        this.selectExamInfo = this.studentExamList[index]
      }
    })
    let problem = this.selectExamInfo.problem.split(',')
    for (let i = 0 ; i < problem.length ; i++) {
      problem[i] = "'" + problem[i] + "'"
    }
    problem = problem.join(',')
    const data = {
      problem
    }
    const problemRes = await this.getExamProblem(data)
    console.log(problemRes)
  }

  private closeHandler () {
    this.showHandler = false
  }

  private async getSubjectInfo () {
    const res = await this.getSubject()
    this.subjectArr = res.data
    console.log(this.subjectArr)
  }

  private async getExamInfo (e: any) {
    this.showExam = true
    const data = {
      account: this.account,
      subject: e.target.value
    }
    this.subject = e.target.value
    const res = await this.getExamList(data)
    if (res.data.errorArr) {
      this.chooseQuestion = res.data.choose.concat(res.data.errorArr)
    } else {
      this.chooseQuestion = res.data.choose
    }
    console.log(this.chooseQuestion)
    console.log(res.data.errorArr)
    this.essayQuestion = res.data.essay
    this.essayQuestion.forEach((item, index) => {
      item = Object.assign(item, { student_answer: ''})
    })
    console.log(this.essayQuestion)
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
        this.grade += 5
      }
    })
    this.essayQuestion.forEach((item, index) => {
      if (index !== this.essayQuestion.length - 1) {
        this.essayId += item.id + ','
        this.studentAnswer += item.student_answer + '!!!!!'
      } else {
        this.essayId += item.id
        this.studentAnswer += item.student_answer
      }
    })
    const data = {
      account: this.account,
      errorArr,
      trueArr,
      essayId: this.essayId,
      studentAnswer: this.studentAnswer,
      subject: this.subject,
      grade: this.grade
    }
    console.log(data)
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