<template>
    <div class="nav">
        <router-link to="/">主页</router-link>
        <router-link to="/exam">考试</router-link>
        <router-link to="/createQuestion">出题</router-link>
        <router-link to="/information">数据</router-link>
        <a href="#">登录</a>
    </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }

  .nav {
    display: flex;
    padding: 1rem 10rem;
    background-color: rgba(240,240,240,0.6);
    box-shadow: 10px 5px 5px #eee;
    a {
      font-size: 1.6rem;
      font-weight: bold;
      color: #2c3e50;
      cursor: pointer;
      &:active {
        color: #42b983;
      }
      &:not(:first-child) {
        margin-left: 5rem;
      }
      &:last-child {
        margin-left: auto;
      }
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>