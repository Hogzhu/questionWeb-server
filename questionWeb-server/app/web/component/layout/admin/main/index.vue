<template>
   <div class="main">
     <LayoutHeader @login="login"></LayoutHeader>
     <LayoutContent>
       <div slot="content"><slot name="main"></slot></div>
     </LayoutContent>
     <LayoutLogin v-if="showLogin" @closeLogin="closeLogin"></LayoutLogin>
   </div>
</template>
<style>
.main .el-menu:not(.el-menu--collapse) {
  width: 230px;
}
.main .app {
  width: 100%;
  background-color: #ecf0f5;
}
.main .app-body {
  width: 100%;
}
.main .main-container {
  min-height: calc(100vh - 100px);
}
</style>
<script lang ="ts" src="./index.ts"></script>
