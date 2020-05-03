'use strict';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class QuestionList extends Vue {
  private question: any[] = []
  private questionNum: any[] = []
  private created () {
  }
  private mounted () {
    this.getQuestionNum()
    this.getQuestion()
  }
  private getQuestionNum () {
    const allQuestion = {
      text: '已解决 ' + 300 + '/' + 789,
      color: '#337ab7'
    }
    const easyQuestion = {
      text: '简单 ' + 452,
      color: '#5cb85c'
    }
    const midQuestion = {
      text: '中等 ' + 216,
      color: '#f0ad4e'
    }
    const diffQuestion = {
      text: '困难 ' + 121,
      color: '#d9534f'
    }
    this.questionNum.push(allQuestion, easyQuestion, midQuestion, diffQuestion)
  }
  private getQuestion () {
    const question1 = {
      id: 1,
      title: '这是第一道困难选择题哦',
      edit: '40.7%',
      accept: '30.2%',
      difficult: '困难',
      type: '选择题'
    }
    const question2 = {
      id: 2,
      title: '这是第二道简单简答题哦',
      edit: '87.5%',
      accept: '90.2%',
      difficult: '简单',
      type: '简答题'
    }
    const question3 = {
      id: 3,
      title: '这是第三道简单选择题哦',
      edit: '95.7%',
      accept: '98.9%',
      difficult: '简单',
      type: '选择题'
    }
    const question4 = {
      id: 4,
      title: '这是第四道中等简答题哦',
      edit: '84.5%',
      accept: '62.1%',
      difficult: '中等',
      type: '简答题'
    }
    const question5 = {
      id: 5,
      title: '这是第五道简单简答题哦',
      edit: '52.5%',
      accept: '62.1%',
      difficult: '简单',
      type: '简答题'
    }
    const question6 = {
      id: 6,
      title: '这是第六道困难简答题哦',
      edit: '23.5%',
      accept: '34.1%',
      difficult: '困难',
      type: '简答题'
    }
    const question7 = {
      id: 7,
      title: '这是第七道简单选择题哦',
      edit: '84.5%',
      accept: '85.9%',
      difficult: '简单',
      type: '选择题'
    }
    const question8 = {
      id: 8,
      title: '这是第八道中等选择题哦',
      edit: '84.5%',
      accept: '52.1%',
      difficult: '中等',
      type: '选择题'
    }
    const question9 = {
      id: 9,
      title: '这是第九道中等简答题哦',
      edit: '57.5%',
      accept: '79.1%',
      difficult: '中等',
      type: '简答题'
    }
    const question10 = {
      id: 10,
      title: '这是第十道简单简答题哦',
      edit: '97.5%',
      accept: '86.7%',
      difficult: '简单',
      type: '简答题'
    }
    this.question.push(question1, question2, question3, question4, question5, question6, question7, question8, question9, question10)
  }
}
