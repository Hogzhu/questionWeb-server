<template>
  <div class="questionList">
    <div class="questionList-top">
      <ul class="questionList-top-ul" v-for="(item,index) in questionNum" :key="index">
        <li :style="[{backgroundColor:item.color}]">{{item.text}}</li>
      </ul>
      <div class="questionList-top-search">
        <input type="text" placeholder="请输入搜索关键字" />
      </div>
    </div>
    <div class="questionList-list">
      <div class="questionList-list-nav">
        <ul>
          <li class="questionList-list-nav-id">题号#</li>
          <li class="questionList-list-nav-title">题名</li>
          <li class="questionList-list-nav-edit">解题率</li>
          <li class="questionList-list-nav-accept">通过率</li>
          <li class="questionList-list-nav-difficult">难度</li>
          <li class="questionList-list-nav-type">题型</li>
        </ul>
      </div>
      <div class="questionList-list-item" v-for="(item,index) in question" :key="index">
        <span>{{item.id}}</span>
        <span>{{item.title}}</span>
        <span>{{item.edit}}</span>
        <span>{{item.accept}}</span>
        <span>{{item.difficult}}</span>
        <span>{{item.type}}</span>
      </div>
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
        &:first-child {
          padding-left: 1rem;
        }
        &:nth-child(2) {
          flex: 5;
        }
      }
    }
  }
}
</style>
