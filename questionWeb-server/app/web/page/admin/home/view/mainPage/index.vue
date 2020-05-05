<template>
  <div class="mainPage">
    <question-list @showQuestion="showQuestion"></question-list>
    <rank-list></rank-list>
    <do-question v-if="questionShow" :questionId="questionId" @closeDoQuestion="closeQuestion"></do-question>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import QuestionList from '../../component/questionList/questionList.vue'
import RankList from '../../component/rankList/rankList.vue'
import DoQuestion from '../../component/doQuestion/doQuestion.vue'
@Component({
  components: {
    QuestionList,
    RankList,
    DoQuestion
  }
})
export default class MainPage extends Vue {
  private questionId: number = 0
  private questionShow: boolean = false

  private showQuestion (id: number) {
    this.questionId = id
    this.questionShow = true
  }

  private closeQuestion () {
    this.questionShow = false
  }
}
</script>
<style lang="less" scoped>
  .mainPage {
    display: flex;
    padding: 5rem 10rem;
    justify-content: space-between;
  }
</style>