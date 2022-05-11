import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import newsDetail from '../pages/newsDetail'
import comment from '../pages/comment'
import sideBar from '../pages/sideBar'
import collect from '../pages/collect'
import writeComment from '../pages/writeComment'
Vue.use(Router);

export default new Router({
    routes:[
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/newsDetail/:id',
            name: 'newsDetail',
            component: newsDetail
        },
        {
            path: '/comment/:id',
            name: 'comment',
            component: comment
        },
        {
            path: '/sideBar',
            name: 'sideBar',
            component: sideBar            
        },
        {
            path: '/collect',
            name: 'collect',
            component: collect            
        },
        {
            path: '/writeComment',
            name: 'writeComment',
            component: writeComment
        }
    ]

})