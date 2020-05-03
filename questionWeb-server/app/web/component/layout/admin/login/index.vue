<template>
<div class="login">
  <div class="login-container">
    <h1 class="login-container-header">请登录后开始做题</h1>
    <div class="login-container-account">
      <span class="login-container-account-text">学号</span>
      <input class="login-container-account-input" type="text" placeholder="请输入学号...">
    </div>
    <div class="login-container-pwd">
      <span class="login-container-pwd-text">密码</span>
      <input class="login-container-pwd-input" type="password" placeholder="请输入密码...">
    </div>
    <button class="login-container-btn">登录</button>
    <div class="login-container-forgetPwd">忘记密码</div>
  </div>
</div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
  .login {
    display: none;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    &-container {
      display: flex;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 35rem;
      height: 20rem;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid #eee;
      border-radius: 4px;
      box-shadow: 5px 5px 10px #ccc;
      background-color: rgba(250,250,250,1);
      &-header {
        margin-bottom: 2rem;
        font-weight: 600;
        font-size: 1.4rem;
      }
      &-account,&-pwd {
        padding-bottom: 1rem;
        &-input {
          margin-left: 1rem;
          padding: 0.2rem 0.5rem;
          width: 15rem;
          height: 2rem;
          border: 1px solid #aaa;
          border-radius: 0.2rem;
          font-size: 1rem;
          &:hover {
            border-color: #42b983;
          }
        }
      }
      &-btn {
        margin: 0.5rem 0 1rem;
        width: 12rem;
        height: 2.5rem;
        border-radius: 0.5rem;
        border: none;
        font-size: 1rem;
        color: #fff;
        background-color: #42b983;
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
