import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
@Component({
  components: {
  }
})
export default class CreateQuestion extends Vue {
  @Action('upQuestion') upQuestion;
  @Action('saveArticle') saveArticle;

  private async createQuestion () {
    const data = {}
    const result = await this.upQuestion(data);
  }
}