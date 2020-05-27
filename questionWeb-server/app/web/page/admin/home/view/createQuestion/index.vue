<template>
  <div class="createQuestion">
    <div class="createQuestion-exam">请填写题目相关信息</div>
    <div class="createQuestion-list">
      <div class="createQuestion-list-title">
        <span>题目:</span>
        <textarea class="createQuestion-list-title-input" ref="title" rows="2" />
      </div>
      <div class="createQuestion-list-difficulty">
        <span>难度:</span>
        <input type="radio" name="question-level" value="level-easy" @change="changeLevel('简单')" checked />简单
        <input type="radio" name="question-level" value="level-mid" @change="changeLevel('中等')" />中等
        <input type="radio" name="question-level" value="level-difficult" @change="changeLevel('困难')" />困难
      </div>
      <div class="createQuestion-list-type">
        <span>类型:</span>
        <input type="radio" name="question-type" value="type-choose" @change="changeClass('选择题')" checked />选择题
        <input type="radio" name="question-type" value="type-singal" @change="changeClass('简答题')" />简答题
      </div>
      <div class="createQuestion-list-choose" v-if="isChoose">
        <div class="createQuestion-list-choose-A">
          <span>选项A:</span>
          <textarea class="createQuestion-list-choose-input" ref="choose_A" rows="1" />
        </div>
        <div class="createQuestion-list-choose-B">
          <span>选项B:</span>
          <textarea class="createQuestion-list-choose-input" ref="choose_B" rows="1" />
        </div>
        <div class="createQuestion-list-choose-C">
          <span>选项C:</span>
          <textarea class="createQuestion-list-choose-input" ref="choose_C" rows="1" />
        </div>
        <div class="createQuestion-list-choose-D">
          <span>选项D:</span>
          <textarea class="createQuestion-list-choose-input" ref="choose_D" rows="1" />
        </div>
      </div>
      <div class="createQuestion-list-answer">
        <span>答案:</span>
        <textarea class="createQuestion-list-answer-input" ref="answer" rows="3" />
      </div>
      <div class="createQuestion-list-analysis">
        <span>解析:</span>
        <textarea class="createQuestion-list-analysis-input" ref="analysis" rows="3" />
      </div>
      <div class="createQuestion-list-point">
        <span>学科:</span>
        <select @change="changeSubject($event)">
          <option v-for="(item, index) of subjectArr" :key="index">{{item.name}}</option>
        </select>
      </div>
      <button class="createQuestion-list-btn" @click="submitQuestion()">提交</button>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style scoped lang="less">
.createQuestion {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 1.6rem;
  &-exam {
    margin-top: 5rem;
    font-size: 2.5rem;
    font-weight: 600;
  }
  &-list {
    display: flex;
    flex-direction: column;
    div {
      margin-top: 3rem;
      span {
        padding-right: 2rem;
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
    &-choose {
      div &-A {
        margin-top: 0;
      }
      div span {
        padding-right: 1rem;
      }
    }
    &-point {
      span {
        padding-right: 0.5rem;
      }
    }
    &-btn {
        width: 20rem;
        height: 4rem;
        margin: 2rem auto;
        border-radius: 0.5rem;
        border: none;
        font-size: 1.6rem;
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
