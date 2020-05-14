<template>
<div class="login">
  <div class="login-bg" @click="closeLogin()"></div>
  <div class="login-container" v-if="!isForget">
    <h1 class="login-container-header">请登录后开始做题</h1>
    <div class="login-container-account">
      <span class="login-container-account-text">学号</span>
      <input class="login-container-account-input" ref="account" type="text" placeholder="请输入学号...">
    </div>
    <div class="login-container-pwd">
      <span class="login-container-pwd-text">密码</span>
      <input class="login-container-pwd-input" ref="password" type="password" placeholder="请输入密码...">
    </div>
    <button class="login-container-btn" @click="handlerLogin">登录</button>
    <div class="login-container-forgetPwd" @click="forgetPwd">忘记密码</div>
  </div>
  <div class="forget-container" v-if="isForget">
    <h1 class="forget-container-header">请修改您的账号信息</h1>
    <div class="forget-container-account">
      <span class="forget-container-account-text">学号</span>
      <input class="forget-container-account-input forget" ref="forgetAccount" type="text" placeholder="请输入学号...">
    </div>
    <div class="forget-container-idCard">
      <span class="forget-container-idCard-text">身份证</span>
      <input class="forget-container-idCard-input" ref="forgetIdCard" type="text" placeholder="请输入身份证号码...">
    </div>
    <div class="forget-container-pwd">
      <span class="forget-container-pwd-text">新密码</span>
      <input class="forget-container-pwd-input" ref="forgetPassword" type="password" placeholder="请输入新密码...">
    </div>
    <button class="forget-container-btn" @click="handlerLogin">修改密码</button>
    <div class="forget-container-forgetPwd" @click="backLogin">返回登录</div>
  </div>
</div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
  .login {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 1.8rem;
    &-bg {
      position: fixed;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
    }
    &-container, .forget-container {
      display: flex;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70rem;
      height: 35rem;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid #eee;
      border-radius: 2rem;
      box-shadow: 0 0 10px #fff;
      background-color: rgba(250,250,250,1);
      &-header {
        margin-top: 0;
        margin-bottom: 3rem;
        font-weight: 600;
        font-size: 2.6rem;
      }
      &-account,&-pwd,&-idCard {
        padding-bottom: 1rem;
        &-input {
          margin-left: 1rem;
          padding: 0.2rem 0.5rem;
          width: 25rem;
          height: 4rem;
          border: 1px solid #aaa;
          border-radius: 0.6rem;
          font-size: 1.4rem;
          outline: none;
          &.forget {
            margin-left: 2.8rem;
          }
          &:hover {
            border-color: #42b983;
          }
        }
      }
      &-btn {
        margin: 2rem 0;
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
      &-forgetPwd {
        font-size: 1.6rem;
        &:hover{
          color: #42aa70;
          cursor: pointer;
        }
      }
    }
  }
</style>
