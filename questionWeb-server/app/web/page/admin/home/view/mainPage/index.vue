<template>
  <div class="mainPage">
    <question-list></question-list>
    <personal-rank></personal-rank>
  </div>
</template>
<style>

</style>
<script type="ts">
  import QuestionList from '../../component/questionList/questionList.vue'
  import PersonalRank from '../../component/personalRank/personalRank.vue'
  export default {
    components: {
      QuestionList,
      PersonalRank
    },
  }
</script>
<style lang="less" scoped>
  .mainPage {
    display: flex;
    padding: 5rem 10rem;
    justify-content: space-between;
  }
</style>