'use strict';
import { Vue, Component, Emit } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component
export default class QuestionList extends Vue {
  @Action('getQuestionList') getQuestionList
  @Action('getSubject') getSubject
  @Action('searchProblem') searchProblem
  @Getter('userSolved') userSolved: any
  @Getter('identity') identity;
  private question: any = ''
  private questionNum: any[] = []
  private questionData: any = {}
  private subject: any = ''
  private subjectArr: any = []
  private totalPage: number = 1
  private currentPage: number = 1
  private pageSize: number = 10
  private currentPageData: any = []

  @Emit('showQuestion')
  private handlerQuestion (id: number) {
    return id
  }

  private created () {
    this.getList()
    this.getSubjectInfo()
  }

  private mounted () {
    // 监听总体数的变化确认获取题目列表的接口是否已返回值
    // if (this.$store.getters.identity !== 'administartor') {
    //   this.$watch(function () {
    //     return this.$store.getters.identity
    //   }, (v, o) => {
    //     console.log(this.identity)
    //     console.log(this.$store.getters.identity)
    //   })
    // } else {
    //   console.log(this.identity)
    //   console.log(this.$store.getters.identity)
    // }
  }

  private async getSubjectInfo () {
    const res = await this.getSubject()
    this.subjectArr = res.data
  }

  private async getList () {
    let res: any = ''
    const data = {
      subject: this.subject
    }
    await this.getQuestionList(data).then((resolve) => {
      res = resolve
    })
    this.questionData = res.data
    this.question = this.questionData.questionList
    console.log(this.question)
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
