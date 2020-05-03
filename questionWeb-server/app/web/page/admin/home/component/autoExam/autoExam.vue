<template>
  <div class="autoExam">
    <div class="autoExam-card">
      <div class="autoExam-card-top">
        <div class="autoExam-card-top-text">自动出题</div>
      </div>
      <div class="autoExam-card-bottom">
        <div class="autoExam-card-bottom-edit">已做263</div>
        <div class="autoExam-card-bottom-noEdit">未做1389</div>
        <div class="autoExam-card-bottom-rank">排名183</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./autoExam.ts"></script>
<style scoped lang="less">
.autoExam {
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
          color: #337ab7;
        }
        &:nth-child(2) {
          color: #d9534f;
        }
        &:last-child {
          border: none;
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
