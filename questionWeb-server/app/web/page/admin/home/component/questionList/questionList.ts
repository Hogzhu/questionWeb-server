'use strict';
import { Vue, Component, Emit } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component
export default class QuestionList extends Vue {
  @Action('getQuestionList') getQuestionList
  @Action('getSubject') getSubject
  @Action('searchProblem') searchProblem
  @Action('changeProblem') changeProblem
  @Action('deleteProblem') deleteProblem
  @Getter('userSolved') userSolved: any
  @Getter('identity') identity;
  private question: any = []
  private questionNum: any[] = []
  private questionData: any = {}
  private subject: any = ''
  private subjectArr: any = []
  private selectProblem: any = []
  private showProblemItem: boolean = false
  private totalPage: number = 1
  private currentPage: number = 1
  private pageSize: number = 10
  private currentPageData: any = []

  @Emit('showQuestion')
  private handlerQuestion (id: number) {
    return id
  }

  private created () {
    // 监听总体数的变化确认获取题目列表的接口是否已返回值
    // if (!this.identity) {
    //   this.$watch(function () {
    //     return this.identity
    //   }, (v, o) => {
    //       this.getList()
    //       this.getSubjectInfo()
    //   })
    // } else {
    //   this.getList()
    //   this.getSubjectInfo()
    // }
    this.getList()
    this.getSubjectInfo()
  }

  private async getSubjectInfo () {
    const res = await this.getSubject()
    this.subjectArr = res.data
  }

  private async getList () {
    console.log(this.identity)
    let res: any = ''
    const data = {
      subject: this.subject,
      identity: this.identity
    }
    await this.getQuestionList(data).then((resolve) => {
      res = resolve
    })
    this.questionData = res.data
    this.question = this.questionData.questionList
    this.setPage()
    this.getQuestionNum()
  }

  private getQuestionNum () {
    const questionNum = this.questionData.questionNum
    const easyNum = this.questionData.easyNum
    const midNum = this.questionData.midNum
    const difficultNum = this.questionData.difficultNum
    const allQuestion = {
      text: `已解决 ${this.userSolved}/${questionNum}`,
      color: '#337ab7'
    }
    const easyQuestion = {
      text: `简单 ${easyNum}`,
      color: '#5cb85c'
    }
    const midQuestion = {
      text: `中等 ${midNum}`,
      color: '#f0ad4e'
    }
    const diffQuestion = {
      text: `困难 ${difficultNum}`,
      color: '#d9534f'
    }
    this.questionNum.push(allQuestion, easyQuestion, midQuestion, diffQuestion)
  }

  private async searchSubject (subject: any) {
    this.subject = subject
    let res: any = ''
    const data = {
      subject: this.subject
    }
    await this.getQuestionList(data).then((resolve) => {
      res = resolve
    })
    this.questionData = res.data
    this.question = this.questionData.questionList
    this.setPage()
  }

  private async searchKeyWords (e: any) {
    const searchStr = e.target.value
    let res: any = ''
    if (searchStr === '') {
      this.searchSubject(this.subject)
      return false
    }
    const data = {
      search: searchStr,
      subject: this.subject
    }
    res = await this.searchProblem(data)
    this.question = res.data
    this.setPage()
  }

  // 修改题目
  private change (id: any) {
    this.question.forEach((item, index) => {
      if (item.id === id) {
        this.selectProblem = this.question[index]
      }
    })
    this.showProblemItem = true
  }

  // 确认修改
  private async changeCheck () {
    const refs: any = this.$refs
    const title = refs.title.value
    const chooseA = refs.choose_A ? refs.choose_A.value : null
    console.log(chooseA)
    const chooseB = refs.choose_B ? refs.choose_B.value : null
    const chooseC = refs.choose_C ? refs.choose_C.value : null
    const chooseD = refs.choose_D ? refs.choose_D.value : null
    const answer = refs.answer.value
    const analysis = refs.analysis.value
    const level = refs.level.value
    this.showProblemItem = false
    const data = {
      id: this.selectProblem.id,
      title,
      choose_A: chooseA,
      choose_B: chooseB,
      choose_C: chooseC,
      choose_D: chooseD,
      answer,
      analysis,
      level,
      type: this.selectProblem.type
    }
    await this.changeProblem(data).then(() => {
      this.$message('修改成功')
      this.question.forEach((item, index) => {
        if (item.id === this.selectProblem.id) {
          this.$set(this.question[index], 'title', title)
          this.$set(this.question[index], 'level', level)
          this.$set(this.question[index], 'type', item.type)
        }
      })
    })
  }

  // 删除题目
  private async deleteProblemItem (id: any) {
    const data = {
      id
    }
    this.question.forEach((item, index) => {
      if (item.id === id) {
        this.question.splice(index, 1)
      }
    })
    await this.deleteProblem(data).then(() => {
      this.$message('删除成功')
    })
    this.setCurrentPageData()
  }

  // 关闭查看页面
  private closeProblemItem () {
    this.showProblemItem = false
  }

  // 设置当前页面数据，对数组操作的截取规则为[0~10],[10~20]...
  private setCurrentPageData () {
    const begin = (this.currentPage - 1) * this.pageSize
    const end = this.currentPage * this.pageSize
    this.currentPageData = this.question.slice(begin, end)
  }

  // 上一页
  private prevPage () {
    console.log(this.currentPage);
    if (this.currentPage === 1) {return}
    this.currentPage--
    this.setCurrentPageData()
  }

  // 下一页
  private nextPage () {
    if (this.currentPage === this.totalPage) {return}
    this.currentPage++;
    this.setCurrentPageData();
  }

  // 分页函数
  private setPage () {
    // 计算一共有几页
    this.totalPage = Math.ceil(this.question.length / this.pageSize)
    // 计算得0时设置为1
    this.totalPage = this.totalPage === 0 ? 1 : this.totalPage
    this.setCurrentPageData()
  }
}
