import * as API from "../diaojiekou"; //*取所有的 json数据  as是给*取了一个别名 叫API

const user={
  namespaced:true,//是否全局
  state:{
      userlist:[]
  },
  mutations:{
      //获取数据
      msetuserlist(state,list){
        state.userlist=list;
      },
      //删除
      delUser(state,id){
        state.userlist=state.userlist.filter((ele)=>{
          return ele.cardId!==id;
        })
      },
      //添加数据
      addList(state,all){
        state.userlist.push(all)
      }
  },
  getters:{

  },
  actions: { //异步的行为里面
    //调取user接口
    getUserApi(context,payload){
      API.userApi().then((res)=>{
        context.commit("msetuserlist",res.user)
      })
    }
  }
}

export default user
