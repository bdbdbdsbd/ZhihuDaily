<template>
  <div class="collect">
        <header class="headerLine">
            <i class="iconfont icon-fanhui1" @click="backToSwipe"></i>
            <span>我的收藏</span>
        </header>
        <div class="blank"></div>
        <ul>
            <li v-for="collectItemI,index in collectItem" :key="index" v-show="collectItemI!=''" @click="gotoDetail(collectItemI.id)">
                    <span>{{collectItemI.title}}</span>
                    <img :src="collectItemI.image" alt="">
            </li>
        </ul>
        <footer :style="{height:footerHeight}">
            <span>没有更多内容</span>
        </footer>
  </div>
</template>

<script>
import router from '../router'
import {mapState} from 'vuex'
export default {
    name:'collect',
    data() {
        return {
            footerHeight: 0,
        }
    },
    methods: {
        backToSwipe(){
            router.back(-1)
        },
        gotoDetail(id){
            router.push({ name: 'newsDetail', params: { id: id } })
        }
    },
    computed:{
        ...mapState('collectOption',['collectItem'])
    },
    mounted() {
        let footerHeightNow = window.screen.height-document.body.clientHeight
        if(footerHeightNow<90){
            footerHeightNow = 90
        }
        this.footerHeight = footerHeightNow/100+'rem'
    },
}
</script>

<style scoped>

.collect header{
    height: 0.59rem;
    font-size: 0.16rem;
    width: 3.75rem;
    display: flex;
    justify-content: center;
    padding: 0.27rem 0 0.16rem;
    border-bottom: 1px #ddd solid;
    background: white;
    position: fixed;
    top: 0px;
}
.collect  .blank{
    width: 3.75rem;
    height: 0.59rem;
}
.collect header i{
    position: absolute;
    left: 0rem;
    font-weight: 600;
}
.collect header .icon-fanhui1{
    font-size: 0.2rem;
}
.collect header span{
    line-height: 0.16rem;
}
.collect ul{
    font-size: 0.16rem;
    list-style: none;
    margin: 0;
    padding: 0;
}
.collect ul li{
    height: 1rem;
    width: 3.75rem;
    font-size: 0.14rem;
    display: flex;
    align-items: center;
    padding: 0 0.16rem;
    justify-content: space-between;
    border-bottom: 1px #ddd solid;
    background-color: white;
}
.collect ul li:last-child{
    border:none
}
.collect ul li img{
    height: 0.7rem;
    width: 0.7rem;
}
.collect footer{
    width: 3.75rem;
    background: #eee;
    padding-top: 0.25rem;
    display: flex;
    justify-content: center;
    color: #bbb;
    font-size: 0.14rem;
}
</style>