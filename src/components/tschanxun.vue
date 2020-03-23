<template>
  <div class="chaxun">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书查询与借阅</el-breadcrumb-item>
      <el-breadcrumb-item>图书查询</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <!-- 导航 -->
      <div class="search">
        <el-autocomplete
          @keyup.enter.native="searchfn"
          class="inline-input"
          v-model="state2"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </div>
      <!-- 图书列表 -->
      <div class="list">
        <ul>
          <li v-for="item in booklists" :key="item.bookId">
            <img :src="item.bookImg" />
            <br />
            <span class="namebook">书名：{{item.bookName}}</span>
            <br />
            <span>类别：{{item.bookCategory}}</span>
            <br />
            <span class="spa">详情</span>
            <span class="spa" @click="addbook(item)">{{item.Borrow?"已借阅":"借阅"}}</span>
          </li>
        </ul>
      </div>
      <div class="pagebox">
        <ul>
          <li v-for="(item,index) in computedpage" :key="index" @click="thispage(item,20)">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tschanxun",
  data() {
    return {
      restaurants: [],
      state2: "",
      page: "",
      list: []
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.$store.commit("chaxun/msetbooklist", { page: 1, crr: 20 });
  },
  computed: {
    zongshuju() {
      return this.$store.state.chaxun.zongshuju;
    },
    booklists() {
      return this.$store.state.chaxun.booklist;
    },
    computedpage() {
      //数据页数的计算
      if (this.zongshuju) {
        let s = this.zongshuju.length / 20;
        let a = [];
        for (let i = 1; i < s + 1; i++) {
          a.push(i);
        }
        return a;
      }
    }
  },
  methods: {
    //查询符合条件的书籍
    searchfn() {
      let a = this.state2.indexOf("(");
      let b = "";
      if (a != -1) {
        b = this.state2.substring(0, a);
      } else {
        b = this.state2;
      }
      let c = this.zongshuju.filter(ele => {
        return ele.bookName.includes(b);
      });
      this.$store.commit("chaxun/mfountbook", c);
    },
    //点击第几页进行传参
    thispage(page, crr) {
      this.$store.commit("chaxun/msetbooklist", { page, crr });
    },
    //添加借阅书籍
    addbook(item) {
      console.log(item.Borrow);
      
      if (item.Borrow) {
        alert("这本书已经被借出去了哦");
      } else {
        this.$store.commit("chaxun/maddbookcat",item)
      }
    },
    //输入框提示
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "挪威的森林(文学)" },
        { value: "挪威的森林(文学)" },
        { value: "架构(计算机)" },
        { value: "古人日常生活(历史)" },
        { value: "大话西方艺术史(历史)" },
        { value: "勇敢长大(儿童)" },
        { value: "瘟疫的故事(历史)" },
        { value: "完美关系(轻文学)" },
        { value: "从零开始学ppt(办公软件)" },
        { value: "斯盖瑞金色童书(儿童)" },
        { value: "断舍离(文学)" },
        { value: "国家宝藏礼盒(文学)" },
        { value: "英语笔译常用词语(外语)" },
        { value: "一碗号汤(养生)" },
        { value: "冯仑商业三部曲(商业)" },
        { value: "活着活着就老了(文学)" },
        { value: "三生三世枕上书(小说)" }
      ];
    },
    handleSelect(item) {}
  }
};
</script>

<style scoped>
.chaxun .main {
  padding: 20px;
  width: 1000px;
  border-radius: 15px;
  background: #fff;
  margin: 30px auto;
}
.search .inline-input {
  width: 600px;
  left: 50%;
  margin-left: -300px;
}
.list {
  box-sizing: border-box;
  width: 100%;
  margin: 10px auto;
}
.list ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.list ul li {
  text-align: center;
  width: 180px;
  padding: 3px 0;
  margin: 2px;
  border: 1px solid #ccc;
}
.list ul li .namebook {
  font-size: 14px;
}
.list ul li img {
  width: 100px;
  height: 120px;
  margin: 5px;
}
.list ul li .spa {
  color: tomato;
}
.list ul li .spa:hover{
  cursor: pointer;
}
.pagebox {
  width: 100%;
  height: 40px;
  background: #eee;
  border-radius: 5px;
}
.pagebox ul li {
  float: left;
  width: 30px;
  line-height: 30px;
  text-align: center;
  margin: 5px 3px;
  border-radius: 5px;
  background: rgba(204, 204, 204, 0.685);
}
</style>
