<template>
  <div class="questionList">
    <div class="questionList-top">
      <ul class="questionList-top-ul" v-for="(item,index) in questionNum" :key="index">
        <li :style="[{backgroundColor:item.color}]">{{item.text}}</li>
      </ul>
      <div class="questionList-top-search">
        <input type="text" @keyup.enter="searchKeyWords" placeholder="请输入搜索关键字" />
      </div>
    </div>
    <div class="questionList-condition" v-for="(item, index) of subjectArr" :key="index">
      <span @click="searchSubject(item.name)">{{item.name}}</span>
    </div>
    <div class="questionList-list">
      <div class="questionList-list-nav">
        <ul>
          <li class="questionList-list-nav-id">题号#</li>
          <li class="questionList-list-nav-title">题名</li>
          <li class="questionList-list-nav-accept">通过率</li>
          <li class="questionList-list-nav-difficult">难度</li>
          <li class="questionList-list-nav-type">题型</li>
          <li class="questionList-list-nav-change" v-if="identity && identity !== 'student'"></li>
          <li class="questionList-list-nav-delete" v-if="identity && identity !== 'student'"></li>
        </ul>
      </div>
      <div class="questionList-list-item" v-for="(item,index) in currentPageData" :key="index" @click="handlerQuestion(item.id)">
        <span>{{item.id}}</span>
        <span>{{item.title}}</span>
        <span>{{item.edit === 0 ? 0 : (item.accept / item.edit * 100).toFixed(1)}}%</span>
        <span>{{item.level}}</span>
        <span>{{item.type}}</span>
        <span class="questionList-list-item-change" @click.stop="change(item.id)" v-if="identity && identity !== 'student'">修改</span>
        <span class="questionList-list-item-delete" @click.stop="deleteProblemItem(item.id)" v-if="identity && identity !== 'student'">删除</span>
      </div>
      <div class="alert" v-if="showProblemItem">
        <div class="alert-bg" @click="closeProblemItem"></div>
        <div class="alert-container">
          <div class="alert-container-title">
            <span>题目：</span>
            <input type="text" ref="title" :value="selectProblem.title" /><br/>
          </div>
          <div class="alert-container-choose" v-if="selectProblem.type === '选择题'">
            <span>选项A：</span>
            <input type="text" ref="choose_A" :value="selectProblem.choose_A" /><br/>
            <span>选项B：</span>
            <input type="text" ref="choose_B" :value="selectProblem.choose_B" /><br/>
            <span>选项C：</span>
            <input type="text" ref="choose_C" :value="selectProblem.choose_C" /><br/>
            <span>选项D：</span>
            <input type="text" ref="choose_D" :value="selectProblem.choose_D" /><br/>
          </div>
          <div class="alert-container-answer">
            <span>答案：</span>
            <input type="text" ref="answer" :value="selectProblem.answer" /><br/>
          </div>
          <div class="alert-container-analysis">
            <span>解析：</span>
            <input type="text" ref="analysis" :value="selectProblem.analysis" /><br/>
          </div>
          <div class="alert-container-level">
            <span>难度：</span>
            <input type="text" ref="level" :value="selectProblem.level" /><br/>
          </div>
          <button class="alert-container-btn" @click="changeCheck">确定修改</button>
        </div>
      </div>
      <footer>
        <button @click="prevPage()">
            上一页
        </button>
        <span>第{{currentPage}}页/共{{totalPage}}页，共{{question.length}}题</span>
        <button @click="nextPage()">
            下一页
        </button>
      </footer>
    </div>
  </div>
</template>
<script lang="ts" src="./questionList.ts"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
a {
  color: #42b983;
}
.questionList {
  display: inline-block;
  &-top {
    display: flex;
    align-items: center;
    border-top: 1px solid #ddd;
    padding: 2rem 0;
    li {
      display: inline-block;
      margin-right: 2rem;
      padding: 0.1rem 0.8rem;
      font-size: 1.2rem;
      color: #fff;
      background-color: #5cb85c;
      border-radius: 1rem;
    }
    &-search {
      input {
        padding: 0 1rem;
        margin: 0;
        width: 40rem;
        height: 3rem;
        border: 1px solid #aaa;
        border-radius: 8rem;
        outline: none;
        font-size: 1.4rem;
        &:hover {
          border-color: #42b983;
        }
      }
    }
  }
  &-condition {
    display: inline-block;
    margin: 0 2rem 2rem 0;
    & span {
      padding: 0.5rem 1rem;
      background-color: rgba(0,0,255,0.6);
      color: #fff;
      border-radius: 3rem;
      &:hover {
        cursor: pointer;
        background-color: rgba(0,0,255,0.4);
      }
    }
  }
  &-list {
    width: 85rem;
    &-nav {
      ul {
        display: flex;
        padding: 0.8rem 0;
        border-width: 1px 0 1px 0;
        border-style: solid;
        border-color: #eee #eee #ddd #eee;
        li {
          font-weight: 600;
          flex: 1;
          cursor: pointer;
          &:first-child {
            padding-left: 1rem;
          }
          &:nth-child(2) {
            flex: 5;
          }
          &:hover {
            color: #42b983;
          }
        }
      }
    }
    &-item {
      display: flex;
      height: 4rem;
      align-items: center;
      &:nth-child(even) {
        background-color: rgb(245,245,245);
      }
      &:hover {
        cursor: pointer;
        background-color: #ddd;
      }
      span {
        padding: 0.4rem 0;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:first-child {
          padding-left: 1rem;
        }
        &:nth-child(2) {
          flex: 5;
        }
      }
      &-change, &-delete {
        &:hover {
          color: #42b983;
        }
      }
    }
    & footer {
      text-align: center;
      & button {
        margin: 4rem 2rem;
        width: 10rem;
        height: 3rem;
        border-radius: 0.2rem;
        border: none;
        font-size: 1.4rem;
        color: #fff;
        background-color: #007fff;
        outline: none;
        cursor: pointer;
        &:hover {
          background-color: #33afff;
        }
        &:nth-child(1) {
          background-color: #42b983;
          &:hover {
            background-color: #42aa70;
          }
        }
      }
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
