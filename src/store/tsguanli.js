import * as API from "../diaojiekou"; //*取所有的 json数据  as是给*取了一个别名 叫API

const tsguanli={
  namespaced:true,//是否全局
  state:{
      tsshuju:[],
  },
  mutations:{
    //数据
    shuju1(state,list1){
      state.tsshuju=list1;
    },
    shanchu(state,id){
      state.tsshuju=state.tsshuju.filter((ele)=>{
        return ele.bookId!==id;
      })
    },
    tjtushu(state,all){
      state.tsshuju.push(all)
    }

  },
  getters:{

  },
  actions: { //异步的行为里面
    //调取接口
    gethotlist(context,payload){
      API.Hotlist().then(res=>{
        console.log(res);
        context.commit("shuju1",res.hotlist)
      })
    },
  },

}

export default tsguanli
