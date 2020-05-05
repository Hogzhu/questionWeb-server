'use strict';
import { Vue, Component, Emit } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component
export default class QuestionList extends Vue {
  @Action('getQuestionList') getQuestionList;
  @Getter('userSolved') userSolved: any;
  private question: any = ''
  private questionNum: any[] = []
  private questionData: any = {}

  private created () {
    this.getList()
  }

  private async getList () {
    let res: any = ''
    await this.getQuestionList().then((resolve) => {
      res = resolve
    })
    this.questionData = res.data
    this.question = this.questionData.questionList
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

  @Emit('showQuestion')
  private handlerQuestion (id: number) {
    return id
  }
}
