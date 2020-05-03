<template>
  <div class="personalRank">
    <div class="personalRank-pie"></div>
    <div class="personalRank-bar"></div>
  </div>
</template>
<script lang="ts" src="./personalRank.ts"></script>
<style scoped lang="less">
  .personalRank {
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
