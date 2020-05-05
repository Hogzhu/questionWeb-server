<template>
  <div class="exam">
    <div class="exam-choose">
      <div class="exam-choose-container" v-for="(item, index) of chooseQuestion" :key="index">
        <div class="exam-choose-container-title">{{index+1}}、{{item.title}}</div>
        <div class="exam-choose-container-reply">
          <span>选项:</span>
          <input type="radio" :name="'question-type-'+index" value="A" @change="selectRadio(index, 'A')" />{{item.choose_A}}
          <input type="radio" :name="'question-type-'+index" value="B" @change="selectRadio(index, 'B')" />{{item.choose_B}}
          <input type="radio" :name="'question-type-'+index" value="C" @change="selectRadio(index, 'C')" />{{item.choose_C}}
          <input type="radio" :name="'question-type-'+index" value="D" @change="selectRadio(index, 'D')" />{{item.choose_D}}
        </div>
        <div class="exam-choose-container-answer" v-if="isSubmit">参考答案：{{item.answer}}</div>
      </div>
    </div>
    <div class="exam-essay">
      <div class="exam-essay-container" v-for="(item, index) of essayQuestion" :key="index">
        <div class="exam-essay-container-title">{{index+11}}、{{item.title}}</div>
        <div class="exam-essay-container-reply">
          <textarea rows="3" cols="140"></textarea>
        </div>
        <div class="exam-choose-container-answer" v-if="isSubmit">参考答案：{{item.answer}}</div>
      </div>
    </div>
    <button class="exam-submit" @click="submitExam()">提交</button>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style scoped lang="less">
.exam {
  margin-top: 5rem;
  margin-left: 10rem;
  font-size: 1.6rem;
  &-choose, &-essay {
    &-container {
      &-title {
        margin-bottom: 6rem;
      }
      &-reply, &-answer {
        margin-bottom: 4rem;
        font-size: 1.8rem;
        input {
          margin: 0 1.5rem;
        }
      }
    }
  }
}
</style>