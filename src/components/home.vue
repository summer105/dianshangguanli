<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="2"><div class="grid-content bg-purple">
          <img src="../assets/logo.png" alt="无法显示图片" width="100" height="60">
        </div></el-col>
        <el-col :span="20"><div class="grid-content bg-purple-light">
          图书管理系
        </div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">
          <a class="logindenglu" href="#">退出</a>
        </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }




.container{

}
  .header{

  }
  .aside{

  }
  .main{

  }
</style>
