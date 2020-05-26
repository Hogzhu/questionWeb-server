import { Vue, Component, Emit } from 'vue-property-decorator';
import { Action } from 'vuex-class';
@Component({
  components: {
  }
})
export default class Backstage extends Vue {
  @Action('importStudent') importStudent
  @Action('getStudentInfo') getStudentInfo
  private fileName: string = '导入学生信息'
  private studentInfo: string = ''
  private showStdent: boolean = true
  private studentBaseInfo: any = {}

  // 点击选择文件触发隐藏的input按钮选择文件(用于修改input的样式)
  private clickInput () {
    (this.$refs.file as any).click()
  }

  // 导入学生信息
  private importInfo (e: any) {
    this.fileName = e.target.value
    const reader = new FileReader()
    if (!(/xls/).test(this.fileName) && !(/xlsx/).test(this.fileName)) {
      this.$message({type: 'error', message: '上传格式需要为xls或xlsx格式'})
    }
    reader.onload = (res: any) => {
      const files = res.target.result
      const workbook = Vue.prototype.xlsx.read(files, {type: 'binary'})
      const sheet = workbook.Sheets.Sheet1
      const sheetJSON = Vue.prototype.xlsx.utils.sheet_to_json(sheet)
      let pwd: string = ''
      console.log(sheetJSON)
      sheetJSON.forEach((item: any, index: number) => {
        pwd = String(item['学号']).substr(-6)
        if (index === sheetJSON.length - 1) {
          this.studentInfo += `(${item['学号']},'${item['姓名']}',${pwd},'${item['班级']}')`
        } else {
          this.studentInfo += `(${item['学号']},'${item['姓名']}',${pwd},'${item['班级']}'),`
        }
      })
      console.log(this.studentInfo)
    }
    const f: any = reader.readAsBinaryString(e.target.files[0]);
  }

  // 将学生信息通过接口插入数据库
  private async handlerImport () {
    this.$message('导入成功')
    const data = {
      studentInfo: this.studentInfo
    }
    await this.importStudent(data)
  }

  private async manageStudent () {
    this.showStdent = false
    const res = await this.getStudentInfo()
    this.studentBaseInfo = res.data
    console.log(this.studentBaseInfo)
  }
}