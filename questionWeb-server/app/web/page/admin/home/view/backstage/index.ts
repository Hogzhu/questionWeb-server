import { Vue, Component, Emit } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
@Component({
  components: {
  }
})
export default class Backstage extends Vue {
  @Action('importStudent') importStudent
  @Action('getStudentInfo') getStudentInfo
  @Action('changeStudentInfo') changeStudentInfo
  @Action('deleteStudentInfo') deleteStudentInfo
  @Action('getTeacherInfo') getTeacherInfo
  @Action('changeTeacherInfo') changeTeacherInfo
  @Action('deleteTeacherInfo') deleteTeacherInfo
  @Action('getProblemInfo') getProblemInfo
  @Action('newQuestion') newQuestion
  @Action('unPassProblem') unPassProblem
  @Action('getSubjectInfo') getSubjectInfo
  @Action('deleteSubjectInfo') deleteSubjectInfo
  @Getter('account') account;
  @Getter('identity') identity;
  private fileName: string = '导入学生信息'
  private studentInfo: string = ''
  private studentArr: any = {}
  private showStdent: boolean = true
  private showTeacher: boolean = true
  private showProblem: boolean = true
  private showSubject: boolean = true
  private showStudentItem: boolean = false
  private showTeacherItem: boolean = false
  private showProblemItem: boolean = false
  private showSubjectItem: boolean = false
  private studentBaseInfo: any = {}
  private teacherBaseInfo: any = {}
  private problemBaseInfo: any = {}
  private subjectBaseInfo: any = {}
  private selectStudent: any = {}
  private selectTeacher: any = {}
  private selectProblem: any = {}
  private selectSubject: any = {}

  private mounted () {
    // 监听总体数的变化确认获取题目列表的接口是否已返回值
    if (this.account === 0) {
      this.$watch(function () {
        // return this.$store.state.admin.questionNum
        return this.account
      }, (v, o) => {
        // this.getRankInformation()
        console.log(this.account)
        console.log(this.identity)
      })
    } else {
      console.log(this.account)
      // this.getRankInformation()
    }
  }

  // 点击选择文件触发隐藏的input按钮选择文件(用于修改input的样式)
  private clickInput () {
    (this.$refs.file as any).click()
    console.log(this.$store.getters.identity)
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
      this.studentArr = sheetJSON
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

  // 管理学生信息
  private async manageStudent () {
    this.showStdent = false
    const res = await this.getStudentInfo()
    this.studentBaseInfo = res.data
  }

  // 查看学生信息
  private manageStudentItem (id: any) {
    this.studentBaseInfo.forEach((item, index) => {
      if (item.id === id) {
        this.selectStudent = this.studentBaseInfo[index]
      }
    })
    console.log(this.selectStudent)
    this.showStudentItem = true
  }

  // 关闭查看学生信息页面
  private closeStudentItem () {
    this.showStudentItem = false
  }

  // 修改学生信息
  private async changeStudent () {
    const refs: any = this.$refs
    const studentName = refs.studentName.value
    const studentNumber = refs.studentNumber.value
    const studentClass = refs.studentClass.value
    this.showStudentItem = false
    const data = {
      id: this.selectStudent.id,
      name: studentName,
      number: studentNumber,
      class: studentClass
    }
    await this.changeStudentInfo(data).then(() => {
      this.$message('修改成功')
      this.studentBaseInfo.forEach((item, index) => {
        if (item.id === this.selectStudent.id) {
          this.$set(this.studentBaseInfo[index], 'name', studentName)
          this.$set(this.studentBaseInfo[index], 'number', studentNumber)
          this.$set(this.studentBaseInfo[index], 'class', studentClass)
        }
      })
    })
  }

  // 删除学生信息
  private async deleteStudent (id: any) {
    const data = {
      id
    }
    this.studentBaseInfo.forEach((item, index) => {
      if (item.id === id) {
        this.studentBaseInfo.splice(index, 1)
      }
    })
    await this.deleteStudentInfo(data).then(() => {
      this.$message('删除成功')
    })
  }

  // 管理教师信息
  private async manageTeacher () {
    this.showTeacher = false
    const res = await this.getTeacherInfo()
    this.teacherBaseInfo = res.data
  }

  // 查看教师信息
  private manageTeacherItem (num: any) {
    this.teacherBaseInfo.forEach((item, index) => {
      if (item.number === num) {
        this.selectTeacher = this.teacherBaseInfo[index]
      }
    })
    console.log(this.selectTeacher)
    this.showTeacherItem = true
  }

  // 关闭查看教师信息页面
  private closeTeacherItem () {
    this.showTeacherItem = false
  }

  // 修改教师信息
  private async changeTeacher () {
    const refs: any = this.$refs
    const teacherName = refs.teacherName.value
    const teacherSubject = refs.teacherSubject.value
    const teacherClass = refs.teacherClass.value
    this.showTeacherItem = false
    const data = {
      number: this.selectTeacher.number,
      name: teacherName,
      subject: teacherSubject,
      class: teacherClass
    }
    await this.changeTeacherInfo(data).then(() => {
      this.$message('修改成功')
      this.teacherBaseInfo.forEach((item, index) => {
        if (item.number === this.selectTeacher.number) {
          this.$set(this.teacherBaseInfo[index], 'name', teacherName)
          this.$set(this.teacherBaseInfo[index], 'subject', teacherSubject)
          this.$set(this.teacherBaseInfo[index], 'class', teacherClass)
        }
      })
    })
  }

  // 删除教师信息
  private async deleteTeacher (num: any) {
    const data = {
      number: num
    }
    this.teacherBaseInfo.forEach((item, index) => {
      if (item.number === num) {
        this.teacherBaseInfo.splice(index, 1)
      }
    })
    await this.deleteTeacherInfo(data).then(() => {
      this.$message('删除成功')
    })
  }

  // 管理题目入库
  private async manageProblem () {
    this.showProblem = false
    const data = {
      account: this.account
    }
    const res = await this.getProblemInfo(data)
    this.problemBaseInfo = res.data
  }

  // 查看待入库题目
  private manageProblemItem (id: any) {
    this.problemBaseInfo.forEach((item, index) => {
      if (item.id === id) {
        this.selectProblem = this.problemBaseInfo[index]
      }
    })
    this.showProblemItem = true
  }

  // 关闭查看页面
  private closeProblemItem () {
    this.showProblemItem = false
  }

  // 通过入库
  private async Pass () {
    this.showProblemItem = false
    const data = {
      title: this.selectProblem.title,
      level: this.selectProblem.level,
      type: this.selectProblem.type,
      choose_A: this.selectProblem.choose_A || null,
      choose_B: this.selectProblem.choose_B || null,
      choose_C: this.selectProblem.choose_C || null,
      choose_D: this.selectProblem.choose_D || null,
      answer: this.selectProblem.answer,
      analysis: this.selectProblem.analysis,
      subject: this.selectProblem.subject,
      isPassed: true,
      provider: this.selectProblem.number
    }
    await this.newQuestion(data).then(() => {
      this.$message('入库成功')
      this.unPass(this.selectProblem.id)
    })
  }

  // 入库不通过
  private async unPass (id: any) {
    const data = {
      id
    }
    this.problemBaseInfo.forEach((item, index) => {
      if (item.id === id) {
        this.problemBaseInfo.splice(index, 1)
      }
    })
    await this.unPassProblem(data).then(() => {
      this.$message('题目打回')
    })
  }

  // 管理教师信息
  private async manageSubject () {
    this.showSubject = false
    const res = await this.getSubjectInfo()
    this.subjectBaseInfo = res.data
  }

  // 删除学科信息
  private async deleteSubject (name: any) {
    const data = {
      name
    }
    this.subjectBaseInfo.forEach((item, index) => {
      if (item.name === name) {
        this.subjectBaseInfo.splice(index, 1)
      }
    })
    await this.deleteSubjectInfo(data).then(() => {
      this.$message('删除成功')
    })
  }
}