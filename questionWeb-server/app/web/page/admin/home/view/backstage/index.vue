<template>
<div class="backstage">
    <div class="backstage-import">
      <h2>{{fileName}}</h2>
      <div class="backstage-import-file">
        <input type="file" class="backstage-import-file-input" ref="fileInput" @change="chooseFile" />
        <button class="backstage-import-file-btn" @click="handlerChoose">选择文件</button>
      </div>
      <button class="backstage-import-upload" @click="uploadFile">上传文件</button>
    </div>
</div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
    .backstage {
        margin: 5rem 10rem;
        &-import {
          &-file {
            &-input {
              display: none;
            }
            &-btn {
              margin: 2rem 0;
              width: 20rem;
              height: 4rem;
              border-radius: 2.5rem;
              border: none;
              font-size: 1.8rem;
              color: #fff;
              background-color: #007fff;
              outline: none;
              cursor: pointer;
              &:hover {
                background-color: #229fff;
              }
            }
          }
          &-upload {
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
</style>