<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from'network/detail';
  import {debounce} from "common/utils";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";
  import {mapActions} from 'vuex';

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo: {},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        itemImgListener:null,
        themeTopYs:[],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        //1)获取顶部的图片轮播数据
        const data = res.result
        //2).获取顶部banner
        this.topImages = data.itemInfo.topImages;
        //3).获取商品详情
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //4).创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //5).保存商品详情信息
        this.detailInfo = data.detailInfo;
        //6).获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //7).获取评论信息
        this.commentInfo = data.rate.list[0]
        // //渲染完回调，图片还没加载完
        // this.$nextTick(() => {
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs)
        // })
      })
      //3.请求推荐数据
      getRecommend().then(res=>{
        //console.log(res)
        this.recommends = res.data.list
      });
      //4.给getThemeTopY赋值
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //console.log(this.themeTopYs)
      },100)
    },
    // mounted() {
    //   let refresh = debounce(this.$refs.scroll.refresh,200)
    //   this.itemImgListener = ()=>{
    //     refresh()
    //   }
    //   this.$bus.$on('itemImageLoad',this.itemImgListener)
    // },
    destroyed() {
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //2.将商品添加到购物车 用vuex放入全局状态
        // this.$store.CartList.push(product)
        //this.$store.commit('addCart',product)
        this.addCart(product).then(res=>{
          // this.show = true
          // this.message = res;
          // setTimeout(()=>{
          //   this.show = false
          //   this.message = ''
          // },1500)
          this.$toast.show(res,2000)
        })
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res)
        // })
      },
      contentScroll(position){
        //1.获取y值
        const positionY= -position.y
        let length = this.themeTopYs.length
        //2.positionY和主题中值进行对比
        for(let i=0; i<length; i++){
          if(this.currentIndex !== i &&((i<length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||(i==length-1 &&positionY >= this.themeTopYs[i]))){
            this.currentIndex = i;
            console.log(this.currentIndex)
            this.$refs.nav.currentIndex = this.currentIndex
          }
          //hack做法 在数组最后传一个非常大的值 判断条件变少能提高性能
        }
        //3.是否显示回到顶部
        // this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
        this.listenShowBackTop(position)
      }
    }
  }
</script>

<style scoped>
 #detail{
   height: 100vh;
   position:relative;
   z-index: 9;
   background-color: #fff;
 }
 .detail-nav{
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
 .content{
   height: calc(100% - 44px);
   overflow: hidden;
 }
</style>
