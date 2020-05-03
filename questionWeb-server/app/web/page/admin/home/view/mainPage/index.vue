<template>
  <div class="mainPage">
    <question-list></question-list>
    <rank-list></rank-list>
  </div>
</template>
<script type="ts">
  import QuestionList from '../../component/questionList/questionList.vue'
  import RankList from '../../component/rankList/rankList.vue'
  export default {
    components: {
      QuestionList,
      RankList
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