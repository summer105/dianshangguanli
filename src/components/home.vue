<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="2"><div class="grid-content bg-purple">
          <img src="../assets/logo.png" alt="无法显示图片" width="100" height="60">
        </div></el-col>
        <el-col :span="20"><div class="grid-content bg-purple-light">
          图书管理系统
        </div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">
          <a class="logindenglu" href="#">退出</a>
        </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!--     :unique-opened="true"   导航的属性   只打开一个-->
        <el-menu

          :unique-opened="true"
          default-active="2"
          class="el-menu-vertical-demo" >

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-success"></i>
                <span>用户列表</span>
              </el-menu-item>

            </el-menu-item-group>
          </el-submenu>

             <!--2-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-location"></i>
                <span>权限列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
<!--          3-->

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>商品列表</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-location"></i>
                <span>分类参数</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-location"></i>
                <span>商品分类</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

<!--          4-->

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>订单列表</span>
              </el-menu-item>

            </el-menu-item-group>
          </el-submenu>

<!--          5-->

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>数据列表</span>
              </el-menu-item>

            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "home",
      //if 判断 token  有  ---继续渲染组件
      //token没有  ---登录
      //vue实例之前自动触发

      //这个判断要写在组件渲染之前的生命周期  钩子函数中
      beforeCreate() {
       // 声明一个只读常量，一旦声明，常量的值便不可改变。可以声明一个变量，声明以后，必须初始化，否则变错。
//         const和let有许多相似点：
// 只在其声明的块级作用域中有效；
// 不存在作用域提升，是暂时性死区，必须先声明，后使用；
// 不能重复声明，否则会报错
          const token=localStorage.getItem("token");
        //token没有  ---登录
          if (!token){
            this.$router.push({name:"login"})
          }
        //if 判断 token  有  ---继续渲染组件
      }
    }
</script>

<style scoped>

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    /*line-height: 60px;*/
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
