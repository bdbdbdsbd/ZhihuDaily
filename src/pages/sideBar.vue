<template>
    <div>
        <header></header>
        <div class="back">
            <i class="iconfont icon-fanhui1" @click="back"></i>
        </div>
        <div class="headImg">
            <img src="../../public/pic/avatar.png" alt="">
        </div>
        <div class="name">
            {{IDname}}
        </div>
        <div class="line" @click="gotoCollect"><span>我的收藏</span> <span class="right"><i class="iconfont icon-qianwang"></i></span> </div>
        <div class="line"><span>消息中心</span> <span class="right"><i class="iconfont icon-qianwang"></i></span> </div>
        <footer>
            <div class="function">
                <div class="icon"><i class="iconfont icon-yejianmoshi"></i></div>
                <div class="title"><span>夜间模式</span></div>
            </div>
            <div class="function">
                <div class="icon"><i class="iconfont icon-shezhi"></i></div>
                <div class="title"><span>设置</span></div>
            </div>
        </footer>
    </div>
</template>

<script>
import router from '../router'
export default {
    name:'sideBar',
    data() {
        return {
            IDname:'BDBDSBD'
        }
    },
    methods: {
        back(){
            router.back(-1)
        },
        gotoCollect(){
            router.push({name:'collect'})
        }
    },
}
</script>

<style scoped>
header{
    width: 3.75rem;
    height: 0.2rem;
    margin: 0;
}
.back{
    margin-top: 0.07rem;
    margin-left: 0.2rem;
    font-size: 0.18rem;
    margin-bottom: 0.21rem;
}
.back i{
    font-size: 0.2rem;
    font-weight: 600;
}
.headImg{
    display: flex;
    justify-content: center;
    margin-bottom: 0.18rem;
}
.headImg img{
    border-radius: 50%;
    height: 0.77rem;
    width: 0.77rem;
}
.name{
    font-size: 0.18rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    padding-bottom: 0.3rem;
    
}
.line{
    border-top: 1px solid #ddd;
    height: 0.56rem;
    width: 3.75rem;
    font-size: 0.16rem;
    display: flex;
    align-items: center;
    padding-left: 0.16rem;
}
.line .right{
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
    margin-right: 0.18rem;
}
.line .right i{
    font-size: 0.12rem;
}
footer{
    position: absolute;
    bottom: 0.52rem;
    width: 3.75rem;
    height: 0.52rem;
    display: flex;
    margin: 0 0.425rem;
}
footer .function{
    width: 1.45rem;
    height: 0.52rem;
    
    /* display: flex;
    justify-content: center; */
}
footer .function .icon{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 0.1rem;
   
}
footer .function .icon i{
    font-size: 0.3rem;
}
footer .function .title{
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 0.12rem;
}
</style>