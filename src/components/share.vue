<template>
<div class="share">
    <div class="txt"><span>分享这篇内容</span></div>
    <div class="iconMatrix">
        <div class="iconLine">
            <div class="iconItem">
                <i class="iconfont icon-weixin" style="color:#5BC66D"></i>
                <span>微信</span>
            </div>
            <div class="iconItem">
                <i class="iconfont icon-pengyouquan" style="color:#98CB5D"></i>
                <span>朋友圈</span>
            </div>
            <div class="iconItem">
                <i class="iconfont icon-QQ" style="color:#66BCF9"></i>
                <span>QQ</span>
            </div>
            <div class="iconItem">
                <i class="iconfont icon-pinpaibiaoshi_QQkongjian" style="color:#EBBC40"></i>
                <span>QQ空间</span>
            </div>
        </div>
        <div class="iconLine">
            <div class="iconItem">
                <i class="iconfont icon-weibo" style="color:#EC694D"></i>
                <span>微博</span>
            </div>
            <div class="iconItem">
                <i class="iconfont icon-liulanqi" style="color:GRAY"></i>
                <span>浏览器</span>
            </div>
            <div class="iconItem">
                <i class="iconfont icon-fuzhilianjie" style="color:GRAY"></i>
                <span>复制连接</span>
            </div>
            <div class="iconItem">
                <i class="iconfont icon-gengduomore12" style="color:GRAY"></i>
                <span>更多</span>
            </div>
        </div>        
    </div>


    <div class="cancle" @click="cancleShare">
        <span>取消</span>
    </div>
</div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name:'share',
    methods: {
        ...mapMutations('mainOption',['updateshare']),
        cancleShare(){
            this.$store.commit('mainOption/updateshare',true)
        }
    },
    
}
</script>

<style>
.share{
    background:white;
    /* width: 3.75rem;
    height: 1rem; */
}
.txt{
    color: #888;
    font-size: 0.12rem;
    margin: 0.26rem 0 0.05rem;
    display: flex;
    justify-content: center;
}
.iconMatrix{
    padding-bottom: 0.22rem;
    border-bottom: 0.02rem solid #ddd;
}
.iconMatrix .iconLine{
    display: flex;
    padding: 0 0.16rem;
}
.iconMatrix .iconLine .iconItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.24rem 0.18rem 0 0.18rem;
}
.iconMatrix .iconLine .iconItem .iconfont{
    font-size: 0.5rem;
}
.iconMatrix .iconLine .iconItem span{
    color: #888;
    font-size: 0.1rem;
    margin-top: 0.08rem;
}
.cancle{
    color: #888;
    font-size: 0.15rem;
    margin-top: 0.18rem;
    display: flex;
    justify-content: center;
}
</style>