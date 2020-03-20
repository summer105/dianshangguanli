<template>
    <div class="login-wrap">
      <el-form label-position="top" label-width="80px" :model="formdata" class="login-form">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.pass"></el-input>
        </el-form-item>

        <el-button type="primary" class="login-btn" @click="dllogin">登录</el-button>
      </el-form>
    </div>
</template>

<script>

    export default {
        name: "login",
      data(){
          return{
            formdata:{
              username:"",
              pass:"",
            }
          }
      },
      methods:{
          dllogin(){
          this.$http.get('./static/mock/denglu.json').then((res)=>{
            //登录成功   跳转home  提示成功   提示不成功
            // console.log(res.data.data.username);
            // console.log(res.data.data.pass);
             if ( this.formdata.username==res.data.data.username && this.formdata.pass==res.data.data.pass){
              // console.log("登录成功")
               this.$router.push({name:'home'})
               this.$message.success("登录成功")
            }else{
               this.$message.error('用户名或密码错误')
             }
            //else {
            //   console.log("用户名或者密码错误")
            // }

              console.log(res);
            })
          }
      }
    }
</script>

<style scoped>
  .login-wrap{
    height: 950px;
    background-color: #324152;
    /*弹性盒子布局*/
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-wrap .login-form{
    width: 400px;
    background:#fff;
    border-radius: 5px;
    padding: 30px;
  }

  .login-btn{
    width: 100%;
  }

</style>
