import {debounce} from './utils'

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = ()=>{
      refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
    console.log('混入中的内容')
  }
}

import BackTop from "components/content/backTop/BackTop";
import {BACKTOP_DISTANCE} from "common/const";
export const backTopMixin = {
  data(){
    return {
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      //this.$refs.scroll.scroll.scrollTo(0, 0)
      this.$refs.scroll.scrollTo(0, 0)
      console.log(this.$refs.scroll.message);
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
    }
  }
}
