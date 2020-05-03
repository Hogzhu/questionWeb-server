<template>
  <div class="rankList">
    <div class="rankList-pie"></div>
    <div class="rankList-bar"></div>
  </div>
</template>
<script lang="ts" src="./rankList.ts"></script>
<style scoped lang="less">
  .rankList {
    &-pie {
      width: 30rem;
      height: 30rem;
    }
    &-bar {
      margin-top: 5rem;
      width: 35rem;
      height: 35rem;
    }
  }
</style>
