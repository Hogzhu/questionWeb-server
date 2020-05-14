import { Vue, Component, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class';
@Component({})
export default class RankList extends Vue {
  @Action('getUserRank') getUserRank;
  // @Getter('questionNum') questionNum;
  @Getter('userSolved') userSolved;
  @Getter('identity') identity;
  private rankInfo: any[] = []
  private myBarCharts: any = ''
  private myPieCharts: any = ''
  private barCharts: any = {}
  private pieCharts: any = {}

  private mounted () {
    // 监听总体数的变化确认获取题目列表的接口是否已返回值
    this.$watch(function () {
      // return this.$store.state.admin.questionNum
      return this.$store.getters.questionNum
    }, (v, o) => {
      this.getRankInformation()
    })
    this.getRankInformation()
  }

  private async getRankInformation () {
    let res: any = ''
    await this.getUserRank().then((resolve) => {
      res = resolve
      this.rankInfo = res.data
      this.handlerBarCharts()
      this.handlerPieCharts()
    })
  }

  private createBarCharts () {
    this.myBarCharts.setOption(this.barCharts)
  }

  private createPieCharts () {
    this.myPieCharts.setOption(this.pieCharts)
  }

  // 组装柱状图数据
  private handlerPieCharts () {
    this.pieCharts = {
      title: {
        text: '我的做题数据',
        left: 'left'
      },
      radius: ['40%', '60%'],
      center: ['20%', '5%'],
      legend: {
        x: 'left',
        y: 'bottom',
        orient: 'vertical',
        itemWidth: 30,
        itemHeight: 15,
        data: ['已完成', '未完成']
      },
      color: ['#7EC0EE', '#be002f'],
      series: [
        {
          name: '题目',
          type: 'pie',
          radius: '70%',
          center: ['60%', '50%'],
          data: [
            { value: this.userSolved, name: '已完成' },
            { value: this.$store.getters.questionNum - this.userSolved, name: '未完成' }
          ],
          labelLine: {
            normal: {
              show: true
            }
          },
          label: {
            normal: {
              position: 'inner',
              formatter: '{a}{b}{c}个\n{d}%',
              textStyle: {
                fontSize: '10',
                color: '#fff'
              }
            }
          }
        }
      ]
    }
    this.myPieCharts = Vue.prototype.echarts.init(document.getElementsByClassName('rankList-pie')[0])
    this.createPieCharts()
  }

  // 组装柱状图数据
  private handlerBarCharts () {
    const nameArr: string[] = []
    const solvedArr: number[] = []
    const notSolvedArr: number[] = []
    this.rankInfo.forEach((item: any) => {
      item.solved = item.solved.split(',')
      if (item.solved.includes('')) {
        const index = item.solved.indexOf('')
        item.solved.splice(index, 1)
      }
      item.solved = item.solved.length
    })
    this.rankInfo.sort((a, b) => {
      if (a.solved > b.solved) {
        return -1
      } else if (a.solved === b.solved) {
        return 0
      } else {
        return 1
      }
    })
    console.log(this.rankInfo)
    this.rankInfo.forEach((item: any) => {
      nameArr.push(item.name)
      solvedArr.push(item.solved)
      notSolvedArr.push(this.$store.getters.questionNum - item.solved)
    })
    console.log(solvedArr)
    this.barCharts = {
      title: {
        text: '当前排行数据'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        x: 'right',
        itemWidth: 40,
        itemHeight: 15,
        data: ['已完成', '未完成']
      },
      grid: {
        left: '20%'
      },
      xAxis: {
        data: [...nameArr]
      },
      yAxis: {},
      series: [{
        name: '已完成',
        type: 'bar',
        stack: '完成情况',
        barWidth: '20',
        data: [...solvedArr]
      }, {
        name: '未完成',
        type: 'bar',
        stack: '完成情况',
        barWidth: '20',
        data: [...notSolvedArr]
      }]
    }
    this.myBarCharts = Vue.prototype.echarts.init(document.getElementsByClassName('rankList-bar')[0])
    this.createBarCharts()
  }
}