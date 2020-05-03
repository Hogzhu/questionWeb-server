<template>
  <div class="customExam">
    <div class="customExam-card">
      <div class="customExam-card-top">
        <div class="customExam-card-top-text">自定义出题</div>
      </div>
      <div class="customExam-card-bottom">
        <div class="customExam-card-bottom-edit">简单889</div>
        <div class="customExam-card-bottom-noEdit">中等482</div>
        <div class="customExam-card-bottom-rank">困难365</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./customExam.ts"></script>
<style scoped lang="less">
.customExam {
  margin-left: 5rem;
  &-card {
    display: inline-block;
    box-shadow: 5px 5px 10px #ddd;
    border-radius: 0.5rem;
    transition:all 1s ease-out;
    &-top {
      width: 18rem;
      height: 10rem;
      background: url("/favicon.ico") no-repeat;
      background-size: cover;
      &-text {
        padding: 0.4rem 0.8rem;
        color: #fff;
        font-size: 2rem;
        font-weight: 600;
      }
    }
    &-bottom {
      display: flex;
      height: 5rem;
      align-items: center;
      font-size: 1rem;
      font-weight: 600;
      div {
        padding: 0.8rem 1rem;
        border-right: 1px solid #eee;
        &:first-child {
          color: #5cb85c;
        }
        &:nth-child(2) {
          color: #f0ad4e
        }
        &:last-child {
          border: none;
          color: #d9534f;
        }
      }
    }
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 30px #ddd;
      cursor: pointer;
    }
  }
}
</style>
