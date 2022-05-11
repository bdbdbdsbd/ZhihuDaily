import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const mainOption = {
    namespaced:true,
    actions:{

    },
    mutations:{
        updateId(state,value){
            sessionStorage.setItem('id',value)
            state.id = value
        },
        updateLongComment(state,value){
            sessionStorage.setItem('longCommentN',value)
            state.longCommentN = value
        },
        updateShortComment(state,value){
            sessionStorage.setItem('shortCommentN',value)
            state.shortCommentN = value
        },
        updateshare(state,value){
            state.share = value
        },
        updatelastestContent(state,value){
            state.lastestContent = value
        }
    },
    state:{
        lastestContent: sessionStorage.getItem('lastestContent')||'',
        id: sessionStorage.getItem('id')||'',
        longCommentN:sessionStorage.getItem('longCommentN')||'',
        shortCommentN:sessionStorage.getItem('shortCommentN')||'',
        share:true,
    },
    getters:{
        TotalComment(state){
            return state.longCommentN*1.0+state.shortCommentN*1.0
        }
    }
}
// 点赞以及收藏的vuex
const collectOption = {
    namespaced:true,
    actions:{

    },
    mutations:{
        ////////////////////////////////////////////
        // 收藏的添加以及擦除
        collectItemAppend(state,value){
            let flag = 0
            state.collectItem.forEach((item)=>{
                if(item.id==value.id){
                    flag = 1
                }
            })
            if(flag==0){
                state.collectItem.push(value)
            }
            sessionStorage.setItem('collectItem',JSON.stringify(state.collectItem))
        },
        collectItemRemove(state,value){
            state.collectItem.forEach((item,index)=>{
                if(item.id==value.id){
                    state.collectItem.splice(index,1); 
                }
            })
            sessionStorage.setItem('collectItem',JSON.stringify(state.collectItem))
        },
        ////////////////////////////////////////////
        // 点赞的添加以及擦除
        dianzanItemAppend(state,value){
            let flag = 0
            state.dianzanItem.forEach((item)=>{
                if(item.id==value.id){
                    flag = 1
                }
            })
            if(flag==0){
                state.dianzanItem.push(value)
            }
            sessionStorage.setItem('dianzanItem',JSON.stringify(state.dianzanItem))
        },
        dianzanItemRemove(state,value){
            state.dianzanItem.forEach((item,index)=>{
                if(item.id==value.id){
                    state.dianzanItem.splice(index,1); 
                }
            })
            sessionStorage.setItem('dianzanItem',JSON.stringify(state.dianzanItem))
        },  
        ////////////////////////////////////////////
        // 评论的添加以及更新（包含评论点赞状态）
        commentsAppend(state,value){
            let flag = 0
            state.comments.forEach((item,index)=>{
                if(item.id==value.id){
                    state.comments.splice(index,1,value)
                    flag = 1
                }
            })
            if(flag==0){
                state.comments.push(value)
            }
            sessionStorage.setItem('comments',JSON.stringify(state.comments))
        },

        
    },
    state:{
        collectItem:JSON.parse(sessionStorage.getItem('collectItem'))||[],
        dianzanItem:JSON.parse(sessionStorage.getItem('dianzanItem'))||[],
        comments:JSON.parse(sessionStorage.getItem('comments'))||[],
    },
    getters:{

    }
}


export default new  Vuex.Store({
    modules:{
        mainOption:mainOption,
        collectOption:collectOption,
    }
})

