<template>
<div class="backstage">
  <div class="backstage-container">
      <div class="backstage-container-import">
        <h2 ref="header">{{fileName}}</h2>
        <div class="backstage-container-import-file">
          <input type="file" class="backstage-container-import-file-input" ref="file" @change="importInfo" />
          <button class="backstage-container-import-file-btn" ref="btn" @click="clickInput">选择文件</button>
        </div>
        <button class="backstage-container-import-btn" @click="handlerImport">确定导入</button>
      </div>
  </div>
</div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
  .backstage {
      margin: 5rem 10rem;
      &-container {
        &-import {
          h2 {
            margin: 0;
          }
          &-file {
            position: relative;
            margin-top: 5rem;
            &-input {
              display: none;
            }
            &-btn {
              margin: 2rem 0;
              width: 20rem;
              height: 4rem;
              border-radius: 0.2rem;
              border: none;
              font-size: 1.8rem;
              color: #fff;
              background-color: #007fff;
              outline: none;
              cursor: pointer;
              &:hover {
                background-color: #33afff;
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
        }
      }
  }
</style>