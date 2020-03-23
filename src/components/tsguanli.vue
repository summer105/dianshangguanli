<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理页面</el-breadcrumb-item>
        <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card >
        <el-row :gutter="10">
          <el-col :span="9">
            <el-input placeholder="请输入内容" v-model="cx">
              <el-button slot="append" icon="el-icon-search" @click="cx1">查询</el-button>
            </el-input>
            <el-button class="btn" @click="tianjia">添加</el-button>
          </el-col>
        </el-row>

        <el-table
          max-height="380"
          fit
          stripe
          border
          :data="boo==1?tableData:list"
          >
          <el-table-column
            prop="bookName"
            label="书名"
            width="150"
            >
          </el-table-column>
          <el-table-column
            prop="bookPrice"
            label="价格"
            width="80"
            >
            <template slot-scope="scope">
              {{scope.row.bookPrice | price(2)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="bookCategory"
            label="类别"
          width="80"
          >
          </el-table-column>
<!--          <el-table-column-->
<!--            prop="Borrow"-->
<!--            label="是否被借阅"-->
<!--            width="100"-->
<!--          >-->
<!--          </el-table-column>-->
          <el-table-column
            v-for="(item,index) in tableData"
            v-if="index==0"
            :key="index" :prop="item.porp"
            label="图片"
            width="150"
          >
            <template slot-scope="scope">
              <img :src="scope.row.bookImg" alt="" width="100px" height="100px">
            </template>


          </el-table-column><el-table-column
          prop="bookInfo"
          label="图书简介"
          width="400"
        >
        </el-table-column>

          <el-table-column
          label="状态"
        >
            <template slot-scope="scope">
<!--              delete(scope.row.bookId)-->
              <el-button type="primary" icon="el-icon-edit" circle @click=""></el-button>
<!--              shanchu(scope.$index)-->
              <el-button type="danger" icon="el-icon-delete" circle @click="open(scope.row.bookId)"></el-button>

            </template>
        </el-table-column>
        </el-table>
      </el-card>
<!--   添加用户的对话框-->
      <el-dialog title="添加图书信息" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
          <el-form-item label="书名" label-width="100px">
            <el-input v-model="form.bookName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="价格" label-width="100px">
            <el-input v-model="form.bookPrice " autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别" label-width="100px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否借阅" label-width="100px">
            <el-input v-model="form.Borrow" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片路径" label-width="100px">
            <el-input v-model="form.bookImg" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图书简介" label-width="100px">
            <el-input v-model="form.bookInfo" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="addUser(form)">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
  export default {
        name: "tsguanli",
      data(){
          return{
            // 这是数据
            tableData:[],
            // 这是input框的v-model
            cx:'',
            boo:1,
            list:[],
            // 这是对话框显示与隐藏
            dialogFormVisibleAdd:false,
            // 这是绑定的弹初对话框的v-model
            // bookImg 图片路径
            // bookName 书名称
            // bookPrice 价格
            // bookCategory 类别
            // bookInfo 图书简介
            // Borrow 是否被借阅
            listt:[],
            form:{
              bookPrice:"",
              bookCategory:"",
              Borrow:"",
              bookImg:"",
              bookName:"",
              bookInfo:"",
            },

          }
      },
    created() {
          this.qshuju();
    },
    methods:{
      //从vuex取数据
      qshuju(){
        this.$store.dispatch("tsguanli/gethotlist")
        this.tableData=this.$store.state.tsguanli.tsshuju;
      },

      cx1(){
          this.boo=2;
        this.tableData.map((item,index)=>{
          if (item.bookName.includes(this.cx)){
            this.list.push(item)
          }
        })
      },
      tianjia(){
            //显示对话框  由false改为true
            this.dialogFormVisibleAdd=true;
      },
     //  async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
     // 当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
     //  异步函数
       addUser(all){
         this.dialogFormVisibleAdd=false;
         this.$store.commit("tsguanli/tjtushu",all);
         this.tableData=this.$store.state.tsguanli.tsshuju;
         console.log(this.tableData);
       },

      open(id) {
        this.$confirm('是否删除该图书?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$store.commit("tsguanli/shanchu",id);
          this.tableData=this.$store.state.tsguanli.tsshuju;

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // remove(i){
      //  this.tableData.splice(i,1);
      // },
    },

    watch:{
        cx(){
          if(this.cx==''){
            this.boo = 1;
            this.list = [];
          }
      }
    },
    filters:{
          price(a,b){
            a=parseFloat(a);
            return "￥"+a.toFixed(b);
          }
    }

  }
</script>

<style scoped>
  .el-input{
    margin-bottom: 30px;
  }

  .el-table-column img{
    width: 100%;
  }

  .btn{
     position: absolute;
    top: -2px;
    left: 450px;
  }

</style>
