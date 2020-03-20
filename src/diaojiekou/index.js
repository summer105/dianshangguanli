import axios from 'axios'
axios.defaults.baseURL='/static/mock/'  //设置一个公共的路径  在调数据的话直接拼接

axios.interceptors.response.use((config)=>{  //设置响应拦截器
  //data是响应回来的数据  处理响应回来的数据
  return config.data.data.commentList
})
//导出
export  let denglu=()=>{  //函数  接口写的是一个函数  执行这个函数就会返回axios。get这样一个实例  就可以.then了 没抛出一个实例 外面import接收 解构赋值接收
   return axios.get('denglu.json')  //return axios.get之后的结果  axios.get返回的是peomise实例
}
// axios.get("/static/mock/mock/banner.json").then((res)=>{ //axios返回的是promise 实例  就可以用then方法了 then里面是一个函数
//   this.homebanner=res.data.banner;
//   console.log(res.data.banner)
// })

// export  let getBanner2=()=>{
//   return axios.get('2.json')
// }
//
//
// export  let getBanner3=()=>{
//   return axios.get('3.json')
// }
