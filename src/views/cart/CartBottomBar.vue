<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算：({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import { mapGetters } from 'vuex'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥' + this.cartList.filter(item =>item.checked).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        //1.使用fliter(数组的高阶函数)
        //return !(this.cartList.filter(item => !item.checked).length)
        //2.使用find(数组的高阶函数)
        // if(this.cartList.length == 0){
        //   return false
        // }else {
        //   return !this.cartList.find(item => !item.checked)
        // }
        //3.普通遍历
        for(let item of this.cartList){
          if(!item.checked){
            return false
          }
        }
        return true
      }
    },
    methods:{
      checkClick(){
        //原来都是选中，点一次都不选中；原来都没全选中，点一次都选中
        if(this.isSelectAll){//全部选中
          this.cartList.forEach(item => item.checked = false)
        }else{//没全选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){
        if(!this.isSelectAll){
          // this.$toast,show('请选择购买的商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height: 50px;
    width: 100%;
    background-color: #eee;
    position: absolute;
    bottom: 40px;
    line-height: 40px;
    display: flex;
    font-size: 14px;
  }
  .check-content{
    width: 60px;
    align-items: center;
    margin-left: 10px;
    display: flex;
    margin-bottom: 10px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    margin-right: 5px;
    line-height: 20px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    color: #fff;
    background: red;
    text-align: center;
  }
</style>
