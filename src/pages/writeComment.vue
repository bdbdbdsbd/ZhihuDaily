<template>
    <div>
        <div class="blank"></div>
        <header>
            <i class="iconfont icon-fanhui1" @click="backToComment"></i>
            <span class="dinaping">写点评</span>
            <span class="fabu" :style="{color}" @click="fabuComment">发布</span>
        </header>
        <textarea placeholder="友善的评论是交流的起点" v-model="pinglun">
            
        </textarea>
    </div>
</template>

<script>
import router from '../router'
import {mapMutations} from 'vuex'
export default {
    name:'writeComment',
    data() {
        return {
            pinglun:''
        }
    },
    methods: {
        ...mapMutations('collectOption',['commentsAppend']),
        backToComment(){
            router.back(-1)
        },
        fabuComment(){
            let pinglunObj={
                'author':'BDBDSBD',
                'avatar':require('../../public/pic/avatar.png'),
                'content':this.pinglun,
                'id':34022125,
                'isLike':"icon-dianzan",
                'likes':0,
                'time':Math.floor(Date.now()/1000)
            }
            if(sessionStorage.getItem('comments')!=null && sessionStorage.getItem('id')!=null){
                let pinglunArray = JSON.parse(sessionStorage.getItem('comments'))
                
                let pinglunI = pinglunArray.find((i) => {return i.id==sessionStorage.getItem('id')})
                // console.log(pinglunI)
                if(this.pinglun.length>100){
                    pinglunI.longComment.push(pinglunObj)
                }
                else{
                    pinglunI.shortComment.push(pinglunObj)
                }
                this.commentsAppend({'id':pinglunI.id,'longComment':pinglunI.longComment,'shortComment':pinglunI.shortComment})
            }
            this.pinglun=''
            router.back(-1)

        }
    },
    computed:{
        color(){
            if(this.pinglun==''){
                return '#88c8FF'
            }
            else{
                return '#50A0FF'
            }
        }
    }
}
</script>

<style>
.blank{
    width: 3.75rem;
    height: 0.27rem;
}
header{
    display: flex;
    justify-content: space-between;
    font-size: 0.16rem;
    font-weight: 500;    
    height: 0.21rem;
    margin-bottom: 0.2rem;
}
header .iconfont{
    margin-left: 0.2rem;
    font-size: 0.2rem;
    font-weight: 600;
}
header .dinaping{
    font-weight: 600;
}
header .fabu{
    margin-right: 0.18rem;
}
textarea{
    margin:0;
    padding: 0;
    border: none;
    width:3.75rem;
    padding: 0 0.3rem;
    font-size: 0.12rem;
    height:  calc(100vh - 1.07rem);
    outline: none;
    resize:none;
}
</style>