<template>
    <div class="info">
        <div class="date">
            <div class="day">{{day}}</div>
            <div class="month">{{month}}</div>
        </div>
        <div class="title">
            <span>知乎日报</span>
        </div>
        <div class="headpic" @click="gotoSideBar">
            <img src="../assets/logo.svg" alt="">
        </div>
    </div>
</template>

<script>
import router from '../router'
export default {
    name:'headContent',
    data() {
        return {
            month:'三月',
            day:'29',
            monthList:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
        }
    },
    methods: {
        gotoSideBar(){
            router.push({name:'sideBar'})
        }
    },
    created() {
        var date = new Date();
        this.month = this.monthList[date .getMonth()];
        this.day = date .getDate();
    },

}
</script>

<style>
.info{
    width: 100%;
    /* 43的电池栏 */
    height: 0.59rem;
    display: flex;
    font-size: 0.12rem;
    padding-bottom: 0.13rem;
    padding-top: 0.12rem;
    
}
.info .date{
    /* margin-left: 0.18rem;
    padding-right: 0.19rem; */
    width: 0.61rem;
    border-right: 0.01rem solid #999999;
    align-items: center;
    display: flex;
    flex-direction:column;
    justify-content:center;
    
}
.info .date .day{
    font-size: 0.16rem;
    line-height: 0.16rem;
    text-align: center;

}
.info .date .month{
    font-size: 0.1rem;
    line-height: 0.1rem;
    text-align: center;
    color: #222222;
}
.info .title{

    padding-left: 0.12rem;
    display: flex;
    align-items: center;
}
.info .title span{
    font-size: 0.22rem;
    line-height: 0.22rem;
}
.info .headpic{
    flex: 1 ;
    height: 0.34rem;
    display: flex;
    flex-direction: row-reverse;
}
.info .headpic img{
    width: 0.34rem;
    height: 0.34rem;
    margin-right: 0.28rem ;
    border-radius: 50%;
}
</style>