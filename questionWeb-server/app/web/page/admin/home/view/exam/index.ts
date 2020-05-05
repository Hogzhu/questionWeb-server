import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class';
@Component({})
export default class Exam extends Vue {
  @Action('getExamList') getExamList;
  @Getter('account') account;
  @Getter('userSolved') userSolved;

  private created () {
    this.getExamInfo()
  }

  private async getExamInfo () {
    const data = {
      account: this.account
    }
    console.log(this.userSolved)
    const res = await this.getExamList(data)
  }
}