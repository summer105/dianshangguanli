<template>
  <div class="home">
    <img src="../assets/timg.jpg" width="100%" height="510" alt />
    <h1 class="shye">欢迎来到图书管理系统</h1>
  </div>
</template>

<script>
export default {
  name: "shouye",
  mounted() {
    this.$store.dispatch("chaxun/azongshuju");
    this.$store.dispatch("chaxun/agetbookcat");
  }
};
</script>

<style scoped>
.home .shye {
  position: absolute;
  top: 155px;
  left: 521px;
}
</style>
