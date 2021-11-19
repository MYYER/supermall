import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";

export default {
  //修改state中的状态 每个方法做一件单一的事情
  addCart(context,payload){
    //payload新添加的商品
    // let oldProduct = null;
    // for(let item of state.CartList){
    //   if(item.iid === payload.iid){
    //     oldProduct = item;
    //   }
    // }
    return new Promise((resolve, reject) => {
      //1.查找数组中是否有该商品
      let oldProduct = context.state.CartList.find(item => item.iid === payload.iid)
      //2.判断oldProduct
      if(oldProduct){
        //oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品数量加一')
      }else{
        payload.count = 1
        //context.state.CartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })
  }
}
