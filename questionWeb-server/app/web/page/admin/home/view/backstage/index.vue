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
        <span @click="manageStudentItem(item.id)">修改</span>
        <span @click="deleteStudent(item.id)">删除</span>
      </div>
    </div>
    <div class="alert" v-if="showStudentItem">
      <div class="alert-bg" @click="closeStudentItem"></div>
      <div class="alert-container">
        <div class="alert-container-name">
          <span>姓名：</span>
          <input type="text" ref="studentName" :value="selectStudent.name" />
        </div>
        <div class="alert-container-number">
          <span>学号：</span>
          <input type="text" ref="studentNumber" :value="selectStudent.number" />
        </div>
        <div class="alert-container-class">
          <span>班级：</span>
          <input type="text" ref="studentClass" :value="selectStudent.class" />
        </div>
        <button class="alert-container-btn" @click="changeStudent()">确认修改</button>
      </div>
    </div>
    <div v-if="identity === 'administrator'">
    <h2>教师信息管理</h2>
    <button class="backstage-manage-showTeacher" ref="teacher-btn" @click="manageTeacher" v-if="showTeacher">管理教师信息</button>
    <div class="backstage-manage-teacher" v-if="!showTeacher">
      <div class="backstage-manage-teacher-nav">
        <ul>
          <li class="backstage-manage-teacher-nav-name">名称</li>
          <li class="backstage-manage-teacher-nav-subject">学科</li>
          <li class="backstage-manage-teacher-nav-class">班级</li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="backstage-manage-teacher-item" v-for="(item, index) of teacherBaseInfo" :key="index">
        <span>{{item.name}}</span>
        <span>{{item.subject}}</span>
        <span>{{item.class}}</span>
        <span @click="manageTeacherItem(item.number)">修改</span>
        <span @click="deleteTeacher(item.number)">删除</span>
      </div>
    </div>
    <div class="alert" v-if="showTeacherItem">
        <div class="alert-bg" @click="closeTeacherItem"></div>
        <div class="alert-container">
          <div class="alert-container-name">
            <span>姓名：</span>
            <input type="text" ref="teacherName" :value="selectTeacher.name" />
          </div>
          <div class="alert-container-subject">
            <span>学科：</span>
            <input type="text" ref="teacherSubject" :value="selectTeacher.subject" />
          </div>
          <div class="alert-container-class">
            <span>班级：</span>
            <input type="text" ref="teacherClass" :value="selectTeacher.class" />
          </div>
          <button class="alert-container-btn" @click="changeTeacher()">确认修改</button>
        </div>
      </div>
    </div>
    <h2>题目入库</h2>
    <button class="backstage-manage-showProblem" ref="problem-btn" @click="manageProblem" v-if="showProblem">题目入库</button>
    <div class="backstage-manage-problem" v-if="!showProblem">
      <div class="backstage-manage-problem-nav">
        <ul>
          <li class="backstage-manage-problem-nav-title">题目</li>
          <li class="backstage-manage-problem-nav-name">姓名</li>
          <li class="backstage-manage-problem-nav-number">学号</li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="backstage-manage-problem-item" v-for="(item, index) of problemBaseInfo" :key="index">
        <span>{{item.title}}</span>
        <span>{{item.name}}</span>
        <span>{{item.number}}</span>
        <span @click="manageProblemItem(item.id)">查看</span>
        <span @click="unPass(item.id)">不通过</span>
      </div>
    </div>
    <div class="alert" v-if="showProblemItem">
      <div class="alert-bg" @click="closeProblemItem"></div>
      <div class="alert-container">
        <div class="alert-container-title">
          <span>题目：</span>
          <span>{{selectProblem.title}}</span>
        </div>
        <div class="alert-container-choose" v-if="selectProblem.type === '选择题'">
          <span>选项A：</span>
          <span>{{selectProblem.choose_A}}</span><br/>
          <span>选项B：</span>
          <span>{{selectProblem.choose_B}}</span><br/>
          <span>选项C：</span>
          <span>{{selectProblem.choose_C}}</span><br/>
          <span>选项D：</span>
          <span>{{selectProblem.choose_D}}</span><br/>
        </div>
        <div class="alert-container-answer">
          <span>答案：</span>
          <span>{{selectProblem.answer}}</span>
        </div>
        <div class="alert-container-analysis">
          <span>解析：</span>
          <span>{{selectProblem.analysis}}</span>
        </div>
        <div class="alert-container-type">
          <span>题型：</span>
          <span>{{selectProblem.type}}</span>
        </div>
        <div class="alert-container-level">
          <span>难度：</span>
          <span>{{selectProblem.level}}</span>
        </div>
        <button class="alert-container-btn" @click="Pass()">通过</button>
      </div>
    </div>
  </div>
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
      <span @click="deleteSubject(item.name)">查看</span>
      <span @click="deleteSubject(item.name)">删除</span>
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
    &-showStudent, &-showTeacher, &-showProblem, &-showSubject {
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
    &-student, &-teacher, &-problem, &-subject {
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
.alert {
    position: fixed;
    top: 0;
    left: 0;
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
    &-container {
      display: flex;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100rem;
      height: 60rem;
      flex-direction: column;
      border: 1px solid #eee;
      border-radius: 2rem;
      box-shadow: 0 0 10px #fff;
      background-color: rgba(245,245,245,1);
      overflow: scroll;
      &-title {
        padding: 4rem;
      }
      &-name, &-number, &-class, &-subject, &-choose, &-answer, &-analysis, &-type, &-level {
        padding: 1rem 4rem;
      }
      &-name, &-number, &-class, &-subject {
        margin: 1rem auto;
      }
      &-choose span {
        display: inline-block;
        padding: 1rem 0;
      }
      &-btn {
        margin: 0 auto;
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