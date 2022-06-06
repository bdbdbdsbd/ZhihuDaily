<template>
<div class="swipe" ref="swipe"> 
    <ul ref="ul">
        <li :style="scrollStyle"  v-for="(item,indexSwipe) in swipeStory" :key="indexSwipe" @click="viewDetail(item.id)">
            <img  alt=""
            v-on:touchstart="touchStart" 
            v-on:touchend="touchEnd" 
            v-on:touchmove="bodyTouchMove"
            :style="{'background': 'linear-gradient(to top,'+ '#'+item.image_hue.slice(2)+' , rgba(255, 255, 255, 0) 70%), url('+item.image+')','background-size':'100% 100%'}"
            >
                <div class="message" >
                    <div class="title">{{item.title}}</div>
                    <div class="author">{{item.hint}}</div>
                </div>
        </li>
    </ul>

    <div class="button" ref="button">
        <div  v-for="(itemN,indexN) in widthActive" :key="indexN" :style="{width:itemN}" >
         </div>
    </div>
</div>
</template>

<script>
// 轮播图有bug 在后台会自动走
import axios from 'axios'
import router from '../router'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
axios.defaults.withCredentials = true
export default {
    name:'swipe',
    data() {
        return {
            // swipeStory 存储了新闻的内容 imgNumber 是新闻的数量也可以理解为图片的数量
            // positionImg 是当前的图片的位置 scrollStyle 是当前的位移度，理论上可以作为同一个
            // widthActive 存储了每个图片被选中的状态
            // touchStartPointX 和 distanceX 距离相关的 timer 是定时器 width 是页面的宽度
            swipeStory:{},
            imgNumber:0,
            positionImg:0,
            screenWidth: null, 
            scrollStyle:{transform:"translateX(-100%)"},
            widthActive:[],
            touch:{
                touchStartPointX:0,
                distanceX:0,
            },    
            timer:'',
            width:0,
        }
    },
    methods: {
        ...mapMutations('mainOption',['updateId']),
        viewDetail(id){
            this.$store.commit('mainOption/updateId',id)
            router.push({ name: 'newsDetail', params: { id: id } });
        },
        // begin函数用于定时切换轮播图
        begin(){
            this.timer = setInterval(()=>{
                this.width = this.screenWidth
                this.moveFromTo(this.currentImg*this.width,this.currentImg*this.width+this.width)
            },4000)
        },
        // moveFromTo用于移动图片（切换图片）
        moveFromTo(positionFrom,positionTo){
            // console.log('FT',positionFrom,positionTo)
            if(document.hidden){
                return
            }
            var positionGap = 5
            if(positionFrom>positionTo){
                positionGap = -5
            }
            let tim = setInterval(()=>{
                // 移动positionGap个像素点
                this.positionImg = this.positionImg + positionGap
                if( Math.abs(positionTo-this.positionImg)<= Math.abs(positionGap)){
                    this.positionImg = positionTo
                    clearInterval(tim)
                }
                this.changeIndex()          
                this.scrollStyle = {transform:"translateX(-"+this.positionImg+"px)"}
                if(this.positionImg/this.width>=(this.imgNumber+1)){
                    this.positionImg = this.width
                    clearInterval(tim)
                }
                if(this.positionImg==0){
                    this.positionImg = this.width*(this.imgNumber)
                    clearInterval(tim)
                }
            },1)
        },
        // 根据图片的移动来改变下面小圆点的状态
        changeIndex(){
            let positionNum = (this.positionImg/this.width) -1
            if(positionNum<=0){
                positionNum = positionNum + this.imgNumber
                var positionNumCeil = 0
                var positionNumFloor = this.imgNumber-1
                var positionNumF = positionNum+this.imgNumber
                var positionNumC = positionNum
            }
            if(positionNum>(this.imgNumber-1)){
                positionNum = positionNum - (this.imgNumber-1)
                var positionNumCeil = 0
                var positionNumFloor = this.imgNumber-1
                var positionNumF = positionNum+this.imgNumber-1
                var positionNumC = positionNum-1
            }
            else{
                // 上取整（上界）
                var positionNumCeil = Math.ceil(positionNum)
                // 下取(下届)
                var positionNumFloor = Math.floor(positionNum)
                var positionNumF = positionNum
                var positionNumC = positionNum
            }

            this.widthActive.forEach((item,index)=>{
                    this.widthActive[index] = '0.04rem'
            })
            if(positionNumCeil==positionNumFloor){
                this.widthActive[positionNumFloor]='0.16rem'
            }
            else{
                this.widthActive[positionNumCeil]=0.12*(positionNumF-positionNumFloor)+0.04+'rem'
                this.widthActive[positionNumFloor]=0.12*(positionNumCeil-positionNumC)+0.04+'rem'
            }

        },
        // 触摸开始 中间 结束
        touchStart(e){
            clearInterval(this.timer)
            this.touch.touchStartPointX = e.targetTouches[0].pageX
        },
        bodyTouchMove(e){
            this.touch.distanceX = e.targetTouches[0].pageX - this.touch.touchStartPointX
            this.changeIndex()
            var trans = this.positionImg - this.touch.distanceX
            this.scrollStyle = {transform:"translateX(-"+trans+"px)"}
        },
        touchEnd(e){
            this.positionImg = this.positionImg - this.touch.distanceX            
            this.moveFromTo(this.positionImg,Math.round(this.positionImg/this.width)*this.width)
            this.begin()
            // var date = new Date();
            // console.log(date)
        }
    },
    created() {
        // 获取新闻数据并且初始化 swipeStory 以及 widthActive
        axios.get('api/4/news/latest').then(response => {
            this.swipeStory = response.data.top_stories
            this.imgNumber = this.swipeStory.length
            this.swipeStory.forEach((item,index)=>{
                if(index==0){
                    this.widthActive.push('0.16rem')
                }
                else{
                    this.widthActive.push('0.04rem')
                }
                
            })
            this.swipeStory.push(this.swipeStory[0])
            this.swipeStory.unshift(this.swipeStory[this.imgNumber-1])
        })
        .catch(error => {
            console.log(this.error)
        })
    },
    mounted() {
        // 初始化width以及positionImg，并且开启定时器begin函数
        this.begin()
        setTimeout(()=>{
            this.width = document.body.clientWidth
            this.positionImg = this.width
            this.screenWidth = document.body.clientWidth
            window.onresize= ()=>{
                this.screenWidth = document.body.clientWidth
            }
        },0)

    },
    watch:{
        screenWidth(){
            
            if(this.positionImg!=this.currentImg*this.screenWidth){
                this.positionImg = this.currentImg*this.screenWidth  
                this.scrollStyle = {transform:"translateX(-"+this.positionImg+"px)"}
                console.log()
                clearInterval(this.timer)
                this.begin()  
            }
            
        }
    },
    computed:{
        // 计算属性 计算当前的图片位置
        currentImg(){
            if(Math.ceil((this.positionImg+1)/this.width) > this.imgNumber+1){
                return 1 
            }
            if(Math.ceil((this.positionImg+1)/this.width) < 1){
                return this.imgNumber 
            }
            return Math.ceil((this.positionImg+1)/this.width)-1
        },
    }

}
</script>

<style scoped>
.swipe{
    height: 3.76rem;
    width: 3.75rem;
    font-size: 0.1rem;
    position: relative;
}
.swipe ul{
    height: 3.76rem;
    width: 3.75rem;
    margin: 0;
    padding: 0;
    display: flex;
    overflow: hidden;
}
.swipe ul li{
    flex: none;
    height: 3.76rem;
    width: 3.75rem;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
}
.swipe ul li .message{
    position: absolute;
    bottom: 0.27rem;
    left: 0.2rem;
    color: white;
    margin-right: 0.36rem;
}
.swipe ul li .message .title{
    font-size: 0.2rem;
    line-height: 0.25rem;
}
.swipe ul li .message .author{
    font-size: 0.12rem;
    line-height: 0.12rem;
    margin-top: 0.14rem;
}
.swipe ul li img{
    height: 100%;
    width: 100%;
    margin: 0;
    background-repeat: no-repeat;
    background-size: 100%,100%;
    
}
.swipe .button{
    position: absolute;
    bottom: 0;
    right:0;
    display: flex;
    margin-bottom: 0.15rem;
    margin-right: 0.1rem;
}
.swipe .button div{
    background: white;
    display:block;
    height: 0.04rem;
    border-radius: 0.02rem;
    border: none;
    margin: 0.03rem;
}
</style>