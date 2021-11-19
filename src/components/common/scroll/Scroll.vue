<template>
  <!-- ref绑定给子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll:null,
        message:"scroll对象里的信息"
      }
    },
    mounted(){
      //ref绑在组件上,this.$refs.name获取的是组件对象
      //ref绑在元素上,this.$refs.name获取的是元素对象
      //1.创建BSscroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType,
        pullUpLoad:this.pullUpLoad
      });
      //this.scroll.scrollTo(0,0)
      //2.监听滚动区域的位置
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position)=>{
          //console.log(position)
          this.$emit('scroll',position)
        })
      }
      //3.监听滚到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          //console.log('滚动到底部')
          this.$emit('pullingUp')
        })
      }
      //console.log(this.scroll)
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        //this.scroll.refresh()
        console.log('refreshImage')
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
