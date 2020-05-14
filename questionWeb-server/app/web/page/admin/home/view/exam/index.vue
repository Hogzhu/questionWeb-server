<template>
  <div class="exam">
    <div class="exam-choose">
      <div class="exam-choose-container" v-for="(item, index) of chooseQuestion" :key="index">
        <div class="exam-choose-container-title">{{index+1}}、{{item.title}}</div>
        <div class="exam-choose-container-reply">
          <span>选项:</span>
          <div class="exam-choose-container-reply-item">
            <input type="radio" :name="'question-type-'+index" value="A" @change="selectRadio(index, 'A')" />{{item.choose_A}}<br/>
            <input type="radio" :name="'question-type-'+index" value="B" @change="selectRadio(index, 'B')" />{{item.choose_B}}<br/>
            <input type="radio" :name="'question-type-'+index" value="C" @change="selectRadio(index, 'C')" />{{item.choose_C}}<br/>
            <input type="radio" :name="'question-type-'+index" value="D" @change="selectRadio(index, 'D')" />{{item.choose_D}}
          </div>
        </div>
        <div class="exam-choose-container-answer" v-if="isSubmit">参考答案：{{item.answer}}</div>
      </div>
    </div>
    <div class="exam-essay">
      <div class="exam-essay-container" v-for="(item, index) of essayQuestion" :key="index">
        <div class="exam-essay-container-title">{{index+11}}、{{item.title}}</div>
        <div class="exam-essay-container-reply">
          <textarea rows="3" cols="120"></textarea>
        </div>
        <div class="exam-choose-container-answer" v-if="isSubmit">参考答案：{{item.answer}}</div>
      </div>
    </div>
    <button class="exam-submit" @click="submit()">提交</button>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style scoped lang="less">
.exam {
  padding-left: 14rem;
  font-size: 1.6rem;
  &-choose, &-essay {
    &-container {
      padding-top: 2rem;
      padding-left: 4rem;
      margin-top: 4rem;
      width: 90%;
      background-color: rgb(248,248,248);
      border: 1px solid #eee;
      border-radius: 0.6rem;
      &:hover {
        background-color: rgb(241,241,241);
      }
      &-title {
        margin-bottom: 6rem;
      }
      &-reply, &-answer {
        display: flex;
        margin-bottom: 4rem;
        font-size: 1.8rem;
        input {
          margin: 0 1.5rem;
          cursor: pointer;
        }
        textarea {
          border-radius: 0.6rem;
          &:hover {
            border-color: #42b983;
          }
        }
      }
    }
  }
  &-submit {
        display: block;
        margin: 4rem auto;
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
}
</style>