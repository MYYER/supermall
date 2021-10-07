//首页所有的请求放到一起统一管理
import {request} from "./request";

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
