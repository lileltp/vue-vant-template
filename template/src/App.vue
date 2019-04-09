<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="less">
@import url("./less/common.less");
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
