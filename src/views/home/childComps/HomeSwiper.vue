<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper";
  export default {
    name: "HomeSwiper",
    props:{
      banners:{
        type:Array,
        default(){
          return[]
        }
      }
    },
    data(){
      return{
        isLoad:false
      }
    },
    methods:{
      imageLoad(){
        //console.log('轮播图加载完成')
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>

</style>
