import * as API from "../diaojiekou"; //*取所有的 json数据  as是给*取了一个别名 叫API

const chaxun={
  namespaced:true,//是否全局
  state:{
    zongshuju:[],
    booklist:[],
    bookcatlist:[]
    
  },
  mutations:{
    mzongshuju(state,res){
      state.zongshuju=res.hotlist
    },
    msetbooklist(state,objs){
      let {page,crr}=objs
      let res=state.zongshuju.slice((page - 1) * crr, crr * page)
      state.booklist=res
    },
    mfountbook(state,item){
      state.booklist=item
    },
    mgetbookcat(state,res){
      state.bookcatlist=res.bookcatlist
      console.log(state.bookcatlist);
      
    },
    mcheckall(state,val){
   state.bookcatlist.forEach(element => {
    return element.isSed=val
      });
      
    },
    mchangebox(state,id){
     let a= state.bookcatlist.find((ele)=>{
        return ele.bookId==id
      })
      a.isSed=!a.isSed
    },
    mchangeborrow(state){
      state.zongshuju.forEach((res)=>{
          state.bookcatlist.forEach((ele)=>{
            if(res.bookId==ele.bookId&&ele.isSed==true){
             
            ele.Borrow= res.Borrow=true
            }
      })
      })
      state.bookcatlist= state.bookcatlist.filter((ele)=>{
        return ele.Borrow==false
      })
      
    },
    maddbookcat(state,item){
      state.bookcatlist.push(item)
    }
  },
  getters:{

  },
  actions: { //异步的行为里面
    azongshuju(context){
      API.Hotlist().then((res)=>{
        return context.commit("mzongshuju",res)
      })
    },
    agetbookcat(context){
      API.getbookcatlist().then((res)=>{
        context.commit("mgetbookcat",res)
      })
    },
    agetuser(context,val){
     return API.getuserlist()
    },
  
  
  },

}

export default chaxun
