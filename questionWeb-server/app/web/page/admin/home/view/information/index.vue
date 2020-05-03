<template>
  <div class="information">
    <rank-list></rank-list>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style scoped lang="less">
  .information {
    display: flex;
    margin-top: 2rem;
    justify-content: space-around;
    .rankList{
        &-pie {
        width: 25rem;
        height: 25rem;
        }
        &-bar {
        width: 30rem;
        height: 30rem;
        }
    }
  }
</style>
