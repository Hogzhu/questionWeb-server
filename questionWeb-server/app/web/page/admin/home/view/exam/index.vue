<template>
  <div class="exam">
    <div class="exam-container">
      <div class="exam-container-title"></div>
      <div class="exam-container-answer">
        <span>选项:</span>
        <input type="radio" name="question-type" />选择题
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style scoped lang="less">
.exam {
  &-topText {
    text-align: center;
    margin-top: 5rem;
    font-size: 2rem;
    letter-spacing: 1rem;
    font-weight: 600;
  }
  &-card {
    display: flex;
    margin-top : 2rem;
    justify-content: center;
  }
}
</style>