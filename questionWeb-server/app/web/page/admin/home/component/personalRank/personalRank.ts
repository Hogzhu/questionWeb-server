import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class PersonalRank extends Vue {
  private myBarCharts: any = ''
  private myPieCharts: any = ''
  private barCharts: any = {
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
      data: ['张三', '李四', '王五', '赵六', 'hog', 'zhu']
    },
    yAxis: {},
    series: [{
      name: '已完成',
      type: 'bar',
      stack: '完成情况',
      barWidth: '20',
      data: [567, 456, 346, 332, 300, 289]
    }, {
      name: '未完成',
      type: 'bar',
      stack: '完成情况',
      barWidth: '20',
      data: [222, 333, 443, 457, 489, 500]
    }]
  }

  private pieCharts: any = {
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
          { value: 300, name: '已完成' },
          { value: 489, name: '未完成' }
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

  private mounted (): void {
    console.log(112)
    console.log(document.getElementsByClassName('personalRank-bar')[0])
    this.myBarCharts = Vue.prototype.echarts.init(document.getElementsByClassName('personalRank-bar')[0])
    this.myPieCharts = Vue.prototype.echarts.init(document.getElementsByClassName('personalRank-pie')[0])
    this.createBarCharts()
    this.createPieCharts()
  }

  private createBarCharts () {
    this.myBarCharts.setOption(this.barCharts)
  }

  private createPieCharts () {
    console.log(this.pieCharts)
    this.myPieCharts.setOption(this.pieCharts)
  }
}