//首页所有的请求放到一起统一管理
import {request} from "./request";

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request ({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
