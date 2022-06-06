<template>
<div>
    <div class="menu">
        <div class="ic" @click="backToIndex">
             <i class="iconfont icon-fanhui1" ></i>
        </div>
        <div class="others">
            <div class="ic2">
                <i class="iconfont icon-pinglunxiao" @click="goToComment"></i>
                <span>{{comments}}</span>
            </div>
            <div class="ic2">
                <i class="iconfont" :class="dianzan" @click="truUP"></i>
                <span>{{popularity}}</span>
            </div>
            <div class="ic2">
                <i class="iconfont" :class="star" @click="starIt"></i>
            </div>
            <div class="ic2">
                <i class="iconfont icon-fenxiang" @click="shareIt"></i>
            </div>
        </div>
        
    </div>
    <share class="share" v-show="!share"></share>
</div>

</template>

<script>
import router from '../router'
import axios from 'axios'
import {mapState,mapMutations} from 'vuex'
import share from './share.vue'
export default {
    name:'newsMenu',
    data() {
        return {
            comments:'',
            popularity:'',
            dianzan:'icon-dianzan',
            star:'icon-shoucang1',
        }
    },
    components:{
        share
    },
    methods: {
        ...mapMutations('mainOption',['updateLongComment','updateShortComment','updateshare']),
        ...mapMutations('collectOption',['collectItemAppend','collectItemRemove','dianzanItemAppend','dianzanItemRemove']),
        backToIndex(){
            router.push({name:'index'})
        },
        goToComment(){
            router.push({name:'comment'})
        },
        truUP(){
            this.dianzan = (this.dianzan=='icon-dianzan'?'icon-dianzan_kuai':'icon-dianzan')
            this.popularity+=  (this.dianzan=='icon-dianzan'?-1:1)
            if(this.dianzan=='icon-dianzan_kuai'){
                this.dianzanItemAppend(this.lastestContent)
            }
            if(this.dianzan=='icon-dianzan'){
                this.dianzanItemRemove(this.lastestContent)
            }
        },
        starIt(){
            this.star = (this.star=='icon-shoucang1'?'icon-shoucang2':'icon-shoucang1')
            if(this.star=='icon-shoucang2'){
                this.collectItemAppend(this.lastestContent)
            }
            if(this.star=='icon-shoucang1'){
                this.collectItemRemove(this.lastestContent)
            }
            
        },
        shareIt(){
            this.$store.commit('mainOption/updateshare',false)
        }
    },
    created() {
        if(!this.id){
            console.log('i')
        }

        this.collectItem.forEach((item)=>{
            if(item.id==this.id){
                this.starIt()
            }
        })

        this.dianzanItem.forEach((item)=>{
            if(item.id==this.id){
                this.truUP()
            }
        })

        axios.get('api/4/story-extra/'+this.id).then(
            response => {
                this.comments = response.data.comments
                this.popularity = response.data.popularity
                this.$store.commit('mainOption/updateLongComment',response.data.long_comments)
                this.$store.commit('mainOption/updateShortComment',response.data.short_comments)
            }
        ).catch(error => {
            console.log(this.error)
        })
    },
    computed:{
        ...mapState('mainOption',['id','share','lastestContent']),
        ...mapState('collectOption',['collectItem','dianzanItem'])
    }
}
</script>

<style scoped>
.menu{
    background: white;
    width: 3.75rem;
    height: 0.5rem;
    display: flex;
}
.ic{
    width: 0.55rem;
    height: 0.26rem;
    font-size: 0.2rem;
    border-right: 0.01rem #888888 solid;
    margin: 0.12rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.ic2{
    width: 0.55rem;
    height: 0.26rem;
    font-size: 0.2rem;
    margin: 0.12rem 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;

}
.ic2 i{
    font-size: 0.2rem;
    line-height: 0.2rem;
}
.ic2 span{
    
    font-size: 0.08rem;
    margin-left: 0.02rem;
    line-height: 0.28rem;
}
.ic i{
    font-size: 0.2rem;
    line-height: 0.2rem;
}

.others{
    width: 3.2rem;
    margin: 0  0.2rem;
    display: flex;
    justify-content: space-between;
}
.icon-dianzan_kuai{
    color:#dc4e4e;
}
.icon-shoucang2{
    color:#82e2f8;
}
i{
    font-size: 0.2rem;
}
.share{
    width: 3.75rem;
    height: 3.33rem;
    position: absolute;
    bottom: 0;
    z-index: 1;
}
</style>