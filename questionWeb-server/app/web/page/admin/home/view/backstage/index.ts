import { Vue, Component, Emit } from 'vue-property-decorator';
@Component({
  components: {
  }
})

export default class Backstage extends Vue {
  private fileName: string = '导入学生信息'

  private handlerChoose () {
    (this.$refs.fileInput as any).click()
  }

  private chooseFile (e: any) {
    this.fileName = e.target.value
  }

  private uploadFile () {
    console.log('upload')
  }
}