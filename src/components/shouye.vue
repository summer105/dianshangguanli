<template>
  <div class="home">
<!--    <img src="../assets/logo.png" width="100%" height="520" alt />-->
<!--    <h1 class="shye">欢迎来到图书管理系统</h1>-->
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
  .home{
    position: fixed;
    top: 60px;
    left: 200px;
    width: 100%;
    height: 560px;
    background: url("../assets/logo.png") no-repeat;
    background-size:90% 100%;
  }
</style>
