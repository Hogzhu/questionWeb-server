<template>
  <div class="createQuestion">
    <div class="createQuestion-exam">请填写题目相关信息</div>
    <div class="createQuestion-list">
      <div class="createQuestion-list-title">
        <span>题目:</span>
        <textarea class="createQuestion-list-title-input" rows="2" />
      </div>
      <div class="createQuestion-list-difficulty">
        <span>难度:</span>
        <textarea class="createQuestion-list-difficulty-input" rows="1" />
      </div>
      <div class="createQuestion-list-type">
        <span>类型:</span>
        <input type="radio" name="question-type" value="type-choose" />选择题
        <input type="radio" name="question-type" value="type-singal" />简答题
      </div>
      <div class="createQuestion-list-answer">
        <span>答案:</span>
        <textarea class="createQuestion-list-answer-input" rows="3" />
      </div>
      <button class="createQuestion-list-btn">提交</button>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style scoped lang="less">
.createQuestion {
  display: flex;
  align-items: center;
  flex-direction: column;
  &-exam {
    margin-top: 5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  &-list {
    display: flex;
    flex-direction: column;
    div {
      margin-top: 3rem;
      span {
        padding-right: 1rem;
      }
      textarea {
        width: 50rem;
        font-size: 1.2rem;
        border: 1px solid #aaa;
        border-radius: 0.2rem;
        vertical-align: top;
        &:hover {
          border-color: #42b983;
        }
      }
    }
    &-btn {
        width: 20rem;
        height: 4rem;
        margin: 2rem auto;
        border-radius: 0.5rem;
        border: none;
        font-size: 1rem;
        color: #fff;
        background-color: #42b983;
        cursor: pointer;
        &:hover {
          background-color: #42aa70;
        }
      }
  }
}
</style>
