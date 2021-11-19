<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list/>
    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./CartList";
  import CartBottomBar from "./CartBottomBar";

  import {mapGetters} from 'vuex';

  export default {
    name: "Cart",
    components:{
      CartList,
      NavBar,
      CartBottomBar
    },
    computed:{
      //把getters里面的cartLength直接转成计算属性
      //指定那些转成计算属性 两种语法
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength'
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
