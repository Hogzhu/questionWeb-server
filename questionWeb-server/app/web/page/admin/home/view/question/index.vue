<template>
  <div style="font-size: 24px; text-align: left">
    <!-- <panel-group></panel-group> -->
    <question-list></question-list>
  </div>
</template>
<style>

</style>
<script type="ts">
  import PanelGroup from '../../component/panel/panel.vue'
  import QuestionList from '../../component/questionList/questionList.vue'
  export default {
    components: {
      PanelGroup,
      QuestionList
    },
  }
</script>
