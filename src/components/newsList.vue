<template>
    <div class="newsList" >
        <!-- <ul class="list" > -->
        <ul class="list" style="overflow: auto;" 
        v-infinite-scroll="loadMore"   
        :infinite-scroll-distance="20" 
        :infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check=false
        infinite-scroll-delay=2000
        >
            <li v-for='(storyItem,indexstoryList) in story' :key="indexstoryList" @click="viewDetail(storyItem.id)">
                <div class="msg">
                    <div class="title">{{storyItem.title}}</div>
                    <div class="hint">{{storyItem.hint}}</div>
                </div>
                <img :src="storyItem.images" alt="">
            </li>
        </ul>
        <ul  class="list" style="overflow: auto;" 
        v-infinite-scroll="loadMore" 
        :infinite-scroll-distance="20" 
        :infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check=false
        v-for="(stories,indexstories) in lastStoryList" 
        infinite-scroll-delay=2000
        :key="indexstories">
            <div class="dateline">
                <div class="date">{{stories.datedate}}</div>
                <div class="line"></div>
            </div>
            <li v-for='(storyItem,indexstoryList) in stories.stories' :key="indexstoryList" @click="viewDetail(storyItem.id)">
                <div class="msg">
                    <div class="title">{{storyItem.title}}</div>
                    <div class="hint">{{storyItem.hint}}</div>
                </div>
                <img :src="storyItem.images" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
    name:'newsList',
    data() {
        return {
            loading: false,
            story:{},
            date:'',
            lastStoryList:[],
        }
    },
    created() {
        axios.get('api/4/news/latest').then(response => {
            this.story = response.data.stories
            this.date = new Date()
        })
        .catch(error => {
            console.log(this.error)
        })
    },
    mounted() {

    },
    methods: {
        ...mapMutations('mainOption',['updateId']),
        loadMore(){
            // console.log(this.date)
           
            if(this.date == ''){
                return
            }
            this.loading = true
            this.date.setDate(this.date.getDate() - 1)
            var dateNow =  this.date.getFullYear().toString() + (this.date.getMonth()<10 ? '0' : '')+
                (this.date.getMonth()+1).toString() + (this.date.getDate()<10 ? '0' : '')+
                this.date.getDate().toString()
            // console.log('api/4/news/before/'+dateNow)
            axios.get('api/4/news/before/'+dateNow).then(response => {
                var objStory = response.data
                objStory['datedate'] = (this.date.getMonth()+1)+'月'+this.date.getDate()+'日'
                this.lastStoryList.push(objStory)
            })
            .catch(error => {
                console.log(this.error)
            })
            this.loading = false
        },
        viewDetail(id){
            this.$store.commit('mainOption/updateId',id)
            router.push({ name: 'newsDetail', params: { id: id } });
        }
    },

}
</script>

<style scoped>
.list{
    font-size: 0.1rem;
    margin: 0.1rem 0 0 0;
    padding: 0;
}
.list li{
    height: 1.02rem;
    width: 3.75rem;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}
.list li .msg{
    flex:1;
    margin: 0 0 0 0.16rem;
    padding: 0.2rem 0.1rem 0 0;
}
.list li .msg .title{
    font-size: 0.16rem;
    line-height: 0.16rem;
}
.list li .msg .hint{
    margin-top: 0.1rem;
    font-size: 0.12rem;
    line-height: 0.12rem;
}
.list li img{
    width: 0.7rem;
    height: 0.7rem;
    margin:0.16rem;
}
.list .dateline .date{
    margin-left: 0.16rem;
    
    font-size: 0.13rem;
    display: flex;
}
.list .dateline .date:after {
    margin: auto 0.14rem;
    margin-right: 0;
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
    /* margin: auto; */
}
</style>