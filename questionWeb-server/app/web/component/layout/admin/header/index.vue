<template>
    <div class="nav">
        <router-link to="/">主页</router-link>
        <router-link to="/exam">考试</router-link>
        <router-link to="/createQuestion">出题</router-link>
        <router-link to="/rank">排行</router-link>
        <router-link to="/login">登录</router-link>
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
      font-weight: bold;
      color: #2c3e50;
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