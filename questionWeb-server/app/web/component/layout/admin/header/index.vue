<template>
    <div class="nav">
        <router-link to="/">主页</router-link>
        <router-link to="/exam">考试</router-link>
        <router-link to="/createQuestion">出题</router-link>
        <!-- <router-link to="/information">数据</router-link> -->
        <!-- <router-link to="/backstage" v-if="userIdentity==='administrator' || userIdentity==='teacher'">后台管理</router-link> -->
        <router-link to="/backstage">后台管理</router-link>
        <a @click="login()" v-if="!isLogin">登录</a>
        <a class="nav-user" v-if="isLogin">你好，{{userName}}
          <div class="nav-user-container">
            <div class="nav-user-container-space">个人中心</div>
            <div class="nav-user-container-out" @click="logout()">退出系统</div>
          </div>
        </a>
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
      color: #2c3e50;
      cursor: pointer;
      &:hover, &:link {
        text-decoration: none;
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
    &-user {
      &:hover &-container{
        display: block;
        position: absolute;
        margin-left: -1rem;
        width: 12rem;
        font-size: 1.4rem;
        &-space, &-out {
          padding: 0.5rem 1.5rem;
          background-color: rgba(240,240,240,0.6);
          color: #2c3e50;
          &:hover {
            background-color: rgba(240,240,240,0.9);
          }
        }
      }
      &-container {
        display: none;
      }
    }
  }
</style>