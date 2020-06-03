<template>
<div class="doQuestion">
  <div class="doQuestion-bg" @click="closeDoQuestion()"></div>
  <div class="doQuestion-container">
    <div class="doQuestion-container-title">
      <span class="doQuestion-container-title-text">题目：</span>
      <span class="doQuestion-container-title-detail">{{questionData.title}}</span>
    </div>
    <div class="doQuestion-container-choose" v-if="isChoose">
      <span class="doQuestion-container-choose-text">选项:</span></br>
      <input type="radio" ref="choose_A" name="choose" value="A" @change="select('A')" /><label>{{questionData.choose_A}}</label></br>
      <input type="radio" ref="choose_B" name="choose" value="B" @change="select('B')" /><label>{{questionData.choose_B}}</label></br>
      <input type="radio" ref="choose_C" name="choose" value="C" @change="select('C')" /><label>{{questionData.choose_C}}</label></br>
      <input type="radio" ref="choose_D" name="choose" value="D" @change="select('D')" /><label>{{questionData.choose_D}}</label></br>
    </div>
    <div class="doQuestion-container-essay" v-if="!isChoose">
      <span class="doQuestion-container-essay-text">答案：</span>
      <textarea class="doQuestion-container-essay-input" ref="answer" rows="2" cols="60" placeholder="请输入答案..."></textarea>
    </div>
    <div class="doQuestion-container-result">{{result}}</div>
    <div class="doQuestion-container-answer" v-if="showAnswer">参考答案：{{questionData.answer}}</div>
    <button class="doQuestion-container-btn" @click="beforeSubmit" v-if="isChoose">提交</button>
    <button class="doQuestion-container-btn" @click="beforeSubmit" v-if="!isChoose">查看解析</button>
  </div>
</div>
</template>
<script lang="ts" src="./doQuestion.ts"></script>
<style lang="less" scoped>
  .doQuestion {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &-bg {
      position: fixed;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
    }
    &-container {
      position: relative;
      padding: 5rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80rem;
      height: 50rem;
      border: 1px solid #eee;
      border-radius: 4px;
      box-shadow: 0 0 10px #fff;
      background-color: rgba(250,250,250,1);
      &-title {
        margin-bottom: 6rem;
        font-size: 1.6rem;
        &-text {
            margin-right: 1rem;
        }
      }
      &-choose, &-essay {
          margin-bottom: 10rem;
          font-size: 1.8rem;
          &-input {
              vertical-align: top;
          }
      }
      &-result {
          margin-bottom: 0.5rem;
      }
      &-answer {
          margin-bottom: 2rem;
      }
      &-btn {
        display: block;
        margin: 0 auto;
        width: 24rem;
        height: 5rem;
        border-radius: 2.5rem;
        border: none;
        font-size: 1.8rem;
        color: #fff;
        background-color: #42b983;
        outline: none;
        cursor: pointer;
        &:hover {
          background-color: #42aa70;
        }
      }
      &-forgetPwd:hover {
        color: #42aa70;
        cursor: pointer;
      }
    }
  }
</style>
