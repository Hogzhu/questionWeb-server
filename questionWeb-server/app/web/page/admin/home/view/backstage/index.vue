<template>
<div class="backstage">
<<<<<<< HEAD
    <div class="backstage-import">
      <h2>{{fileName}}</h2>
      <div class="backstage-import-file">
        <input type="file" class="backstage-import-file-input" ref="fileInput" @change="chooseFile" />
        <button class="backstage-import-file-btn" @click="handlerChoose">选择文件</button>
=======
  <div class="backstage-container">
      <div class="backstage-container-import">
        <h2 ref="header">{{fileName}}</h2>
        <div class="backstage-container-import-file">
          <input type="file" class="backstage-container-import-file-input" ref="file" @change="importInfo" />
          <button class="backstage-container-import-file-btn" ref="btn" @click="clickInput">选择文件</button>
        </div>
        <button class="backstage-container-import-btn" @click="handlerImport">确定导入</button>
>>>>>>> 7e727f195ea32488a289a35f8caffb4bf27ab119
      </div>
      <button class="backstage-import-upload" @click="uploadFile">上传文件</button>
    </div>
</div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
<<<<<<< HEAD
    .backstage {
        margin: 5rem 10rem;
        &-import {
          &-file {
=======
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
>>>>>>> 7e727f195ea32488a289a35f8caffb4bf27ab119
            &-input {
              display: none;
            }
            &-btn {
              margin: 2rem 0;
              width: 20rem;
              height: 4rem;
<<<<<<< HEAD
              border-radius: 2.5rem;
=======
              border-radius: 0.2rem;
>>>>>>> 7e727f195ea32488a289a35f8caffb4bf27ab119
              border: none;
              font-size: 1.8rem;
              color: #fff;
              background-color: #007fff;
              outline: none;
              cursor: pointer;
              &:hover {
<<<<<<< HEAD
                background-color: #229fff;
              }
            }
          }
          &-upload {
=======
                background-color: #33afff;
              }
            }
          }
          &-btn {
>>>>>>> 7e727f195ea32488a289a35f8caffb4bf27ab119
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
<<<<<<< HEAD
    }
=======
      }
  }
>>>>>>> 7e727f195ea32488a289a35f8caffb4bf27ab119
</style>