<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot  name="item-icon"></slot>
    </div>
    <div v-else>
      <slot  name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
    <!--
      <img src="../../assets/img//tabbar/home.svg" alt=""/>
      <div>首页</div>
    -->
  </div>
</template>
<script>
  export default {
    name: "TabBarItem",
    props:{
      path: String,
      activeColor:{
        type: String,
        default: 'red'
      }
    },
    methods: {
      itemClick () {
        this.$router.replace(this.path);
      }
    },
    computed:{
      isActive() {
        // /home -> item1(/home) = true
        // /home -> item2(/category) = false
        // /home -> item2(/cart) = false
        // /home -> item2(/profile) = false
        //indexOf方法返回一个整数值，指出String对象内子字符串的开始位置。如果没有找到子字符串，则返回-1。
        return this.path.indexOf(this.$route.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor}:{}
      }
    },
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
</style>
