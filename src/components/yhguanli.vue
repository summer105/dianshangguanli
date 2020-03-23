<template>
    <div class="yh">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理页面</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin-top: 20px" class="control">
        <el-button @click="dialogVisible = true">新增</el-button>
        <el-button @click="delUser(cardIdList)">删除</el-button>
        <el-button @click="show">查询</el-button>
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          v-show="flag"
          style="width:200px;"
          @input="search">
        </el-input>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="border-radius:5px;"
        max-height="460"
        width="500"
        @selection-change="handleSelectionChange"
        class="contrl">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="cardId"
          label="证卡编码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="读者姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="readership"
          label="读者身份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式">
        </el-table-column>
<!--        <el-table-column-->
<!--          label="状态">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button type="primary" icon="el-icon-edit" circle @click=""></el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>

      <!-- 添加用户对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="50%"

      >
        <el-form
          :model="addUserForm"
          :rules="addUserFormRules"
          ref="addUserFormRef"
          label-width="90px"
          class="demo-ruleForm"
        >
          <el-form-item label="证卡编码" prop="cardId">
            <el-input v-model="addUserForm.cardId"></el-input>
          </el-form-item>
          <el-form-item label="读者姓名" prop="name">
            <el-input v-model="addUserForm.name"></el-input>
          </el-form-item>
          <el-form-item label="读者身份" prop="readership">
<!--            <el-input v-model="addUserForm.readership"></el-input>-->
            <el-select v-model="addUserForm.readership" placeholder="请选择">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
<!--            <el-input v-model="addUserForm.sex"></el-input>-->
            <el-select v-model="addUserForm.sex" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="addUserForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser(addUserForm)">确 定</el-button>
      </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "yhguanli",
      data() {
        // 自定义手机号校验规则
        let checkMobile = (rule, value, cb) => {
          const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (regMobile.test(value)) {
            return cb();
          }
          cb(new Error("请输入合法的手机号"));
        };
        let checkcardId = (rule, value, cb) => {
          const regCardId = /^[2][0][2][0][0][3][1-9][0-9]$/;
          if (regCardId.test(value)) {
            return cb();
          }
          cb(new Error("请输入以'20200310'之后的，并且是以'202003xx'格式的证卡编码"));
        };
        return {
          tableData:[] ,
          total:"",
          multipleSelection: [],
          flag:false,
          boo:true,
          list:[],
          cardIdList:[],
          queryInfo: {
            query: "",
            pagenum: 1,
            pagesize: 2
          },
          dialogVisible: false,
          addUserForm: {
            cardId: "",
            name: "",
            sex: "",
            readership: "",
            phone:""
          },
          options: [{
            label: '男',
            value: '选项1',
          }, {
            value: '选项2',
            label: '女'
          }],
          option: [{
            value: '选项1',
            label: '普通读者'
          }, {
            value: '选项2',
            label: '管理员'
          }],
          setRoleDialogVisible: false,
          addUserFormRules: {
            cardId: [
              { required: true, message: "证卡编码", trigger: "blur" },
              { validator: checkcardId, trigger: "blur" }
            ],
            name: [
              { required: true, message: "请输入用户名", trigger: "blur" },
              {
                require: true,
                min: 2,
                max: 10,
                message: "用户名长度在 2 到 10 个字符",
                trigger: "blur"
              }
            ],
            phone: [
              { required: true, message: "请输入手机", trigger: "blur" },
              { validator: checkMobile, trigger: "blur" }
            ]
          },
        }
      },
      computed:{

      },
      mounted(){

      },
      created(){
        this.getuser();
      },
      methods: {
        //选中当前项，放入multipleSelection数组中
        handleSelectionChange(val) {
          this.multipleSelection = val;
          this.multipleSelection.forEach((item)=>{
            this.cardIdList=item.cardId
          });
        },
        //是否删除
        delUser(id){
          if(this.multipleSelection.length==0){
            this.$alert('请选择想要删除的内容', '标题名称', {
              confirmButtonText: '确定'
            });
          }else{
            this.removelist(id);
          }
        },
        //删除提示的方法
        removelist(id){
          this.$confirm('是否删除当前选中项', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$store.commit('user/delUser', id);
            this.tableData=this.$store.state.user.userlist;
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        getuser(){
          this.$store.dispatch("user/getUserApi");
          this.tableData=this.$store.state.user.userlist;
          this.total=this.$store.state.user.total;
        },
        //查询输入框是否显示
        show(){
          if(this.boo){
            this.flag=true;
            this.boo=false;
          }else{
            this.flag=false;
            this.boo=true;
          }
        },
        //查询的方法
        search(e) {
          if(e){
            let ss=[];
            this.tableData.forEach((item)=>{
              if(item.name.indexOf(e)>-1){
                if(this.list.indexOf(item.name)==-1){
                  this.list.push(item.name);
                }
                ss.push(item);
              }else if(item.cardId.indexOf(e)>-1){
                if(this.list.indexOf(item.cardId)==-1){
                  this.list.push(item.cardId);
                }
                ss.push(item);
              }
            });
            this.tableData=ss;
          }else{
            this.tableData=this.$store.state.user.userlist
          }
        },
        //表单重置
        addDialogClosed() {
          this.$refs.addUserFormRef.resetFields();
        },
        addUser(all){
          this.$refs.addUserFormRef.validate((valid) => {
            if (!valid) return;
            console.log(this.addUserForm);
            this.$store.commit("user/addList",all)
            this.dialogVisible = false;
            this.tableData=this.$store.state.user.userlist
          });
        }
      },
      watch:{

      }
    }

</script>

<style scoped>
  .yh .control .el-button:nth-of-type(1){
    /*margin-left:10px;*/
  }
  .yh .contrl{
    margin:10px 0;
    border:1px solid #eee;
  }
</style>
