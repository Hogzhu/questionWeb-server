import { Vue, Component, Emit } from 'vue-property-decorator';
import { Action } from 'vuex-class';
@Component({
  components: {
  }
})
export default class Backstage extends Vue {
  @Action('importStudent') importStudent;
  private fileName: string = '导入学生信息'
  private studentInfo: any = {
    numberStr: '',
    nameStr: '',
    classStr: ''
  }

  // 点击选择文件触发隐藏的input按钮选择文件(用于修改input的样式)
  private clickInput () {
    (this.$refs.file as any).click()
  }

  // 导入学生信息
  private importInfo (e: any) {
    this.fileName = e.target.value
    let reader = new FileReader()
    reader.onload = (e: any) => {
      let files = e.target.result;
      let workbook = Vue.prototype.xlsx.read(files, {type: 'binary'});
      console.log(workbook)
      let sheet = workbook.Sheets.Sheet1
      let sheetJSON = Vue.prototype.xlsx.utils.sheet_to_json(sheet)
      let numberStr: string = ''
      let nameStr: string = ''
      let classStr: string = ''
      
      
      sheetJSON.forEach((item: any, index: number) => {
        if (index === sheetJSON.length - 1) {
          numberStr +=  item['学号'] + ''
          nameStr += item['姓名'] + ''
          classStr += item['班级'] + ''
        } else {
          numberStr +=  item['学号'] + ','
          nameStr += item['姓名'] + ','
          classStr += item['班级'] + ','
        }
      });
      this.studentInfo = {
        numberStr,
        nameStr,
        classStr
      }
      console.log(this.studentInfo)
    }
    const f: any = reader.readAsBinaryString(e.target.files[0]);
  }

  // 将学生信息通过接口插入数据库
  private async handlerImport() {
    await this.importStudent(this.studentInfo)
  }
}