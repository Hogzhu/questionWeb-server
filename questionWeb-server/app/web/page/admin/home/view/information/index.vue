<template>
  <div class="information">
    <div class="information-pesonal">
      <div class="information-pesonal-edit">
        <img ref="editImg" src="/edit.png" />
        <div class="information-pesonal-edit-text">
          <span class="information-pesonal-edit-text-left">您在本站总共已做了</span>
          <span class="information-pesonal-edit-text-right">{{editNum}}题</span>
        </div>
      </div>
      <div class="information-pesonal-accept">
        <img ref="acceptImg" src="/accept.png"  />
        <div class="information-pesonal-accept-text">
          <span class="information-pesonal-accept-text-left">其中正确的题目有</span>
          <span class="information-pesonal-accept-text-right">{{acceptNum}}题</span>
        </div>
      </div>
      <div class="information-pesonal-exam">
        <img ref="examImg" src="/exam.png"  />
        <div class="information-pesonal-exam-text">
          <span class="information-pesonal-exam-text-left">参加考试的次数为</span>
          <span class="information-pesonal-exam-text-right">{{examNum}}次</span>
        </div>
      </div>
      <div class="information-pesonal-unfinish">
        <img ref="unfinishImg" src="/unfinish.png"  />
        <div class="information-pesonal-unfinish-text">
          <span class="information-pesonal-unfinish-text-left">您未完成的题目还有</span>
          <span class="information-pesonal-unfinish-text-right">{{questionNum - editNum}}题</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style scoped lang="less">
  .information {
    &-pesonal {
      display: flex;
      padding: 2rem 30rem;
      flex-wrap: wrap;
      justify-content: space-between;
      &-edit,&-accept,&-exam,&-unfinish {
        margin-top: 4rem;
        box-shadow: 0 0 20px #bbb;
        img {
          width: 35rem;
          height: 20rem;
        }
        &-text {
          width: 35rem;
          height: 10rem;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          &-left {
            font-size: 1.8rem;
          }
          &-right {
            font-size: 3.2rem;
            color: #007fff;
          }
        }
      }
    }
  }
</style>
