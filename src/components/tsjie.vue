<template>
  <div class="tsjie">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书查询与借阅</el-breadcrumb-item>
      <el-breadcrumb-item>图书借阅</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bookcat">
      <ul>
        <li v-for="item in jiuyuelist" :key="item.bookId">
          <input
            :checked="item.isSed"
            @click="checkboxl(item.bookId)"
            class="checkbox"
            type="checkbox"
          />
          <img :src="item.bookImg" />
          <div class="itembox">
            <span class="namebook">书名：{{item.bookName}}</span>
            <br />
            <br />
            <span>类别：{{item.bookCategory}}</span>
          </div>
        </li>
      </ul>
      <!-- <div class="form"> -->
           
      <!-- </div> -->
      <div class="btnbox">
        <div class="checkall">
          <input type="checkbox" v-model="checkalls" /> 全选
        </div>
        <div class="btn" @click="affirm">
          <el-button type="text" @click="open">确认借阅</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tsjie",
  data() {
    return {
      radio: false
    };
  },
 
  computed: {
    jiuyuelist() {
      return this.$store.state.chaxun.bookcatlist;
    },
    checkalls: {
      get() {
        //根据isSed改变选中状态
        return this.jiuyuelist.every(ele => {
          return ele.isSed == true;
        });
      },
      set(newval) {
        //根据自身变化影响所有选项
        this.$store.commit("chaxun/mcheckall", newval);
      }
    }
  },
  methods: {//多选框改变触发的方法
    checkboxl(id) {
      this.$store.commit("chaxun/mchangebox", id);
    },
  
   open() {
        this.$prompt('请输入用户编码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.affirm(value)
          if(value==""||value==null||value==undefined){
            this.$message({
            type: 'success',
            message: '请重新输入 ' 

          })
          }else{
               this.$message({
            type: 'success',
            message: '你输入的编码是: ' + value

          })
          }
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
   affirm(val){
     if(typeof val=="string"&&val!==""){
      this.$store.dispatch("chaxun/agetuser").then(res=>{
       let a= res.userlist.find((ele)=>{
          return ele.encoding==val
        })
        if(a){
          this.$store.commit("chaxun/mchangeborrow");
        }else{
          console.log(98);
          
        }
      })
      
     }
     
    },
    } 
};
</script>

<style scoped>
/* 多选框公共样式 */
input[type="checkbox"] {
  position: relative;
  z-index: 2;
  width: 15px;
  height: 15px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 50%;
  -webkit-appearance: none;
  outline: none;
}
input[type="checkbox"]:checked::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  background: orange;
  width: 13px;
  height: 13px;
  border: 1px solid orange;
  border-radius: 50%;
}
input[type="checkbox"]:checked::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 7px;
  height: 3px;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: rotate(-50deg);
  transform: rotate(-50deg);
}
.bookcat {
  padding: 20px;
  width: 90%;
  background: #fff;
  margin: 30px auto;
  border-radius: 15px;
}
.bookcat ul {
  margin: 0 auto;
}
.bookcat ul li {
  margin-left: -30px;
  height: 130px;
  background: #eee;
}
.bookcat ul li img {
  position: absolute;
  margin: 10px;
  width: 80px;
  height: 100px;
}
.itembox {
  display: inline-block;
  position: relative;
  top: 20px;
  left: 120px;
  width: 300px;
}
.checkbox {
  margin: 20px;
}
.btnbox {
  position: fixed;
  bottom: 0;
  left: 200px;
  width: 100%;
  height: 80px;
  border: 1px solid #eee;
  background: #fff;
}
.checkall {
  margin: 25px;
}
.btn {
  position: relative;
  top: -60px;
  left: 60%;
  width: 260px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: rgba(190, 204, 211, 0.473);
  border-radius: 10px;
}
.el-button--text{
  color: #666;
}
</style>
