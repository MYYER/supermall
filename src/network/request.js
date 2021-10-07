//封装框架
import axios from "axios";
export function request(config,success,failure){
 //1.创建axios的实例
 const instance = axios.create({
   baseURL:'http://123.207.32.32:8000',
   timeout: 5000
 })
  // //2.拦截器
  // //请求拦截
  // instance.interceptors.request.use(config=>{
  //   return config
  // },err=>{
  //   console.log(err);
  // });
  // //响应拦截
  // instance.interceptors.response.use(res=>{
  //   console.log(res);
  // },err=>{
  //   console.log(err)
  // })
  //3.发送真正的网络请求
  return instance(config)
}
