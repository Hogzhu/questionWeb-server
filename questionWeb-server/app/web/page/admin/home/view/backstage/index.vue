<template>
<div class="backstage">
    <div class="backstage-import" v-if="!showStdent">
      <h2>{{fileName}}</h2>
      <div class="backstage-import-file">
        <input type="file" class="backstage-import-file-input" accept="application/vnd.ms-excel" ref="file" @change="importInfo" />
        <button class="backstage-import-file-btn" ref="btn" @click="clickInput">选择文件</button>
      </div>
      <div class="backstage-import-info" v-for="(item, index) of studentArr" :key="index">
        <span>{{item['姓名']}}</span>
        <span>{{item['班级']}}</span>
        <span>{{item['学号']}}</span>
      </div>
      <button class="backstage-import-btn" @click="handlerImport">确定导入</button>
    </div>
    <div class="backstage-manage">
      <h2>学生信息管理</h2>
      <button class="backstage-manage-showStudent" ref="student-btn" @click="manageStudent" v-if="showStdent">管理学生信息</button>
      <div class="backstage-manage-student" v-if="!showStdent">
        <div class="backstage-manage-student-nav">
          <ul>
            <li class="backstage-manage-student-nav-name">姓名</li>
            <li class="backstage-manage-student-nav-number">学号</li>
            <li class="backstage-manage-student-nav-class">班级</li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="backstage-manage-student-item" v-for="(item, index) of studentBaseInfo" :key="index">
          <span>{{item.name}}</span>
          <span>{{item.number}}</span>
          <span>{{item.class}}</span>
          <span>修改</span>
          <span>删除</span>
        </div>
      </div>
    </div>
    <div class="backstage-manage-subject">
      <h2>学科信息管理</h2>
      <button class="backstage-manage-showSubject" ref="subject-btn" @click="manageSubject" v-if="showSubject">管理学科信息</button>
      <div class="backstage-manage-subject" v-if="!showSubject">
        <div class="backstage-manage-subject-nav">
          <ul>
            <li class="backstage-manage-subject-nav-name">名称</li>
            <li class="backstage-manage-subject-nav-teacher">任课老师</li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="backstage-manage-subject-item" v-for="(item, index) of subjectBaseInfo" :key="index">
          <span>{{item.name}}</span>
          <span>{{item.teacher}}</span>
          <span>修改</span>
          <span>删除</span>
        </div>
      </div>
    </div>
</div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
  .backstage {
    margin: 5rem 10rem;
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
      &-info span {
        padding-right: 5rem;
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
    &-manage {
      &-showStudent {
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
      &-student {
        width: 70rem;
        &-nav {
          ul {
            display: flex;
            padding: 0.8rem 0;
            border-width: 1px 0 1px 0;
            border-style: solid;
            border-color: #eee #eee #ddd #eee;
            list-style-type: none;
            li {
              font-weight: 600;
              flex: 2;
              cursor: pointer;
              &:first-child {
                padding-left: 1rem;
              }
              &:hover {
                color: #42b983;
              }
              &:nth-child(n+4) {
                flex: 0.5;
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
            background-color: #ddd;
          }
          span {
            padding: 0.4rem 0;
            flex: 2;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:first-child {
              padding-left: 1rem;
            }
            &:nth-child(n+4) {
              flex: 0.5;
              &:hover {
                color: #42b983;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
</style>