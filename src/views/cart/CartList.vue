<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"/>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    position: absolute;
    top:44px;
    bottom: 78px;
    width: 100%;

  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
