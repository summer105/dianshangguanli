<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <img src="../assets/logo1.png" alt="无法显示图片" width="80" height="60"  class="img1"/>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-light h222">
            <p>图书管理系统12</p>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <p class="logindenglu" @click="tuichu" href="#">退出</p>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="bj1">
      <el-aside class="aside" width="200px">
        <!--     :unique-opened="true"   导航的属性   只打开一个-->
        <el-menu router :unique-opened="true" default-active="2" class="el-menu-vertical-demo bj1">
          <el-menu-item index="/shouye">
            <template slot="title">
              <!--              <i class="el-icon-location"></i>-->
              <span>首页1</span>
            </template>
          </el-menu-item>

          <!--2-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>图书查询与借阅</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/tschanxun">
                <i class="el-icon-location"></i>
                <span>图书查询</span>
              </el-menu-item>
              <el-menu-item index="/tsjie">
                <i class="el-icon-location"></i>
                <span>图书借阅</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--          3-->

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理页面</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/yhguanli">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </el-menu-item>
              <el-menu-item index="/tsguanli">
                <i class="el-icon-location"></i>
                <span>图书管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
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
    const token = localStorage.getItem("token");
    //token没有  ---登录
    if (!token) {
      this.$router.push({ name: "login" });
    }
    //if 判断 token  有  ---继续渲染组件
  },

  methods: {
    tuichu() {
      // 1.清除token
      localStorage.clear();
      // 2.提示 退出成功
      this.$message.success("退出成功");
      // 3.来到login组件
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color:#757575;
  width: 100%;
  height: 30px;
  /*background: url("../assets/山水背景.jpg");*/
  /*background-size:300px 60px;*/
  color: #333;
  text-align: center;
  /*line-height: 60px;*/
}

.bj1{
  background: #eee;
}

.h222 p{
  line-height: 24px;
  font-weight: 600;
  font-size: 20px;
}
.logindenglu:hover{
  cursor: pointer;
}
.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /*text-align: center;*/
  /*line-height: 160px;*/
}

.img1{
  margin-left: 40px;
}

.container {
  height: 100%;
}
.header {
}
.aside {
}
.main {
}

</style>
