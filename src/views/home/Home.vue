<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--组件不能直接监听点击事件，加上.native才可以-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";
  import {backTopMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        itemImgListener:null
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    mixins:[backTopMixin],
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      /*
        *首页中Better-Scroll可滚动区域的问题
         BScroll中有多少可滚动区域是根据scrollerHeight属性决定的
         scrollHeight属性是根据放在content中子组件的高度所决定，刚开始没图片，图片加载有延迟
         要监听图片加载完成解决问题 @load='方法'
        *
      */
      /*
        * 对refresh刷新频繁进行防抖操作
          防抖debounce/节流throttle
          过程：如果直接执行refresh，那么refresh会被执行30次
          可以将refresh函数传入到debounce函数中，生成一个新的函数
        *
        *
        *
      */
      //3.监听item中图片加载完成
      let refresh = debounce(this.$refs.scroll.refresh,200)
      this.itemImgListener = ()=>{
        refresh()
      }
      this.$bus.$on('itemImageLoad',this.itemImgListener)
    },
    destroyed() {
      console.log('home destroyed')
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      //2.取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      //事件监听相关方法
      tabClick(index){
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      loadMore(){
        //console.log('加载更多')
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        //做tabControl吸顶效果
        //console.log(this.$refs.tabControl2.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      contentScroll(position){
        //判断BackTop是否显示
        this.listenShowBackTop(position)
        //决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          //console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          //console.log(res.data);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>
<!--样式加scoped只对当前域有效-->
<style scoped>
  #home{
    /*padding-top: 44px;*/
    height:100vh;
    position:relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right:0;
  }
  .tab-control{
    position:relative;
    z-index: 9;
  }
  /*.content{*/
  /*  height:calc(100% - 93px);*/
  /*  !*overflow:hidden;*!*/
  /*  margin-top:44px;*/
  /*}*/
</style>
