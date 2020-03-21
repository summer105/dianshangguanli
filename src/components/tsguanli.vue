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
            <el-input placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search">查询</el-button>
            </el-input>
          </el-col>
        </el-row>

        <el-table
          stripe
          border
          :data="tableData"
          >
          <el-table-column
            prop="bookName"
            label="书名"
            >
          </el-table-column>
          <el-table-column
            prop="bookPrice"
            label="价格"
            >
            <template slot-scope="scope">
              {{scope.row.bookPrice |price(2)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="bookCategory"
            label="类别">
          </el-table-column>
          <el-table-column
            prop="Borrow"
            label="是否被借阅"
          >
          </el-table-column>
          <el-table-column
            label="图片路径"

          >

          </el-table-column><el-table-column
          prop="bookInfo"
          label="图书简介"
          width="250"
        >
        </el-table-column>

          <el-table-column
          label="状态"
        >
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="delete(scope.row.bookId)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>

        </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
  import {Hotlist} from "../diaojiekou";

  export default {
        name: "tsguanli",
      data(){
          return{
            tableData:[],
          }
      },
    created() {
          this.gethotlist();
    },
    methods:{
          gethotlist(){
            Hotlist().then(res=>{
              this.tableData=res.hotlist
            })
          }
    },
    filters:{
          price(a,b){
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

</style>
