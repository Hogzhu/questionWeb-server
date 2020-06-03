<template>
  <div class="exam">
    <div v-if="!showExam">
      <div v-if="passExam.length > 0">
        <div class="exam-nav">
          <ul>
            <li class="exam-nav-time">时间</li>
            <li class="exam-nav-subject">学科</li>
            <li class="exam-nav-grade">分数</li>
          </ul>
        </div>
        <div class="exam-item" v-for="(item,index) in passExam" :key="index">
          <span>{{item.time.split('T')[0]}}</span>
          <span>{{item.subject}}</span>
          <span>{{item.grade}}</span>
        </div>
      </div>
      <div v-if="identity === 'teacher'">
        <div class="exam-nav">
          <ul>
            <li class="exam-nav-name">考生</li>
            <li class="exam-nav-subject">学科</li>
            <li class="exam-nav-time">时间</li>
            <li></li>
          </ul>
        </div>
        <div class="exam-item" v-for="(item,index) in studentExamList" :key="index">
          <span>{{item.name}}</span>
          <span>{{item.subject}}</span>
          <span>{{item.time.split('T')[0]}}</span>
          <span @click="handlerExam(item.id)">批改</span>
        </div>
        <div class="alert" v-if="showHandler">
          <div class="alert-bg" @click="closeHandler"></div>
          <div class="alert-container">
            <div class="alert-container-item" v-for="(item, index) of selectExamInfo" :key="index">
              <div>
                <span>题目：</span>
                <span>{{item.title}}</span>
              </div>
              <div>
                <span>学生答案：</span>
                <span>{{item.answer}}</span>
              </div>
            </div>
            <button class="alert-container-btn" @click="changeCheck">确定修改</button>
          </div>
        </div>
      </div>
      <div class="exam-subject">
        <span>请选择考试学科:</span>
        <select @change="getExamInfo($event)">
          <option style='display: none'></option>
          <option v-for="(item, index) of subjectArr" :key="index">{{item.name}}</option>
        </select>
      </div>
    </div>
    <div v-if="showExam">
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
            <textarea rows="3" cols="120" v-model="item.student_answer"></textarea>
          </div>
          <div class="exam-choose-container-answer" v-if="isSubmit">参考答案：{{item.answer}}</div>
        </div>
      </div>
      <button class="exam-submit" @click="submit()">提交</button>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style scoped lang="less">
.exam {
  padding-left: 14rem;
  font-size: 1.6rem;
  &-nav {
    margin-top: 4rem;
    width: 70rem;
    ul {
      display: flex;
      padding: 0.8rem 0;
      border-width: 1px 0 1px 0;
      border-style: solid;
      border-color: #eee #eee #ddd #eee;
      list-style-type: none;
      li {
        font-weight: 600;
        flex: 2;
        cursor: pointer;
        &:first-child {
          padding-left: 1rem;
        }
        &:hover {
          color: #42b983;
        }
        &:nth-child(n+4) {
          flex: 0.5;
        }
      }
    }
  }
  &-item {
    width: 70rem;
    display: flex;
    height: 4rem;
    align-items: center;
    &:nth-child(even) {
      background-color: rgb(245,245,245);
    }
    &:hover {
      background-color: #ddd;
    }
    span {
      padding: 0.4rem 0;
      flex: 2;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:first-child {
        padding-left: 1rem;
      }
      &:nth-child(n+4) {
        flex: 0.5;
        &:hover {
          color: #42b983;
          cursor: pointer;
        }
      }
    }
  }
  &-subject {
    margin-top: 4rem;
  }
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
.alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 1.8rem;
  z-index: 100;
  &-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  &-container {
    display: flex;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100rem;
    height: 60rem;
    flex-direction: column;
    border: 1px solid #eee;
    border-radius: 2rem;
    box-shadow: 0 0 10px #fff;
    background-color: rgba(245,245,245,1);
    overflow: scroll;
    input {
      width: 60rem;
      height: 3rem;
    }
    &-title {
      padding: 4rem;
    }
    &-name, &-number, &-class, &-subject, &-choose, &-answer, &-analysis, &-type, &-level {
      padding: 1rem 4rem;
    }
    &-name, &-number, &-class, &-subject {
      margin: 1rem auto;
    }
    &-choose span {
      display: inline-block;
      padding: 1rem 0;
    }
    &-btn {
      margin: 4rem auto 0 auto;
      width: 20rem;
      height: 4rem;
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
}
</style>