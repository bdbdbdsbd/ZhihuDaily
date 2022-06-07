
# 1. 安装过程

1. 有两个包本地没有，额外安装
2. 报错 Module build failed: Error: Node Sass does not yet support your current envi<Br/>
    Sass的问题，node-sass版本问题，卸载重装<Br/>
    还是报错 npm ERR! Cannot read properties of null (reading 'fsTop')<Br/>
    使用cnpm 可以实现<Br/>
    npm run sever 成功<Br/>

## 问题1：vue.config.js 以及 在新的解决方法中使用

# 2. 架构上的问题

## 1. 移动端的适配
使用一个rem.js的文件适配<br>
在这个过程中加深了对函数的理解,匿名函数的使用，rem在移动端布局的使用<br>
## 2. 项目的结构
以下是路由组件，初步看起来是并列的<br>
index newsDetail comment writeComment themeDetail editorsList editor collect<br>
### index.vue
是一个重要的组件，在router里是根目录<br>
管理welcome，swipe，newsList，sidebar分别是  欢迎组件 轮播图组件 新闻列表组件 侧边栏组件<br>
welcome 没啥大用<br>
newsList 可以跳到 newsDetail<br>
    newsDetail 包含 newsmenu<br>
sidebar 可以跳到 collect/themeDetail<br>
    collect 可以跳到 index/newsDetail<br>
    themeDetail 可以跳到 index/newsDetail/editorsList<br>
        editorsList 可以跳到 editor<br>
        newsDetail 包含 newsmenu<br>
swipe 可以跳到 newsDetail<br>
    newsDetail 包含 newsmenu<br>
newsmenu 可以跳到 index/themeDetail/collect/newsDetail/comment 包含了Share<br>
    comment 可以跳到 writecomment ,包含了LongComment ShortComment<br>
# 3.构建的步骤
## 1. index.vue以及四个对应的组件
多次用到了一个组件created<br>

## 2. 设置字体时的问题
16px的字体实际上会占用21.6px的宽度，解决方法就是用line-height<br>

## 3.轮播图
使用element-ui来写<br>
这里进行了按需引入，但是比较丑，要自己去写一个UI组件库

# TODO
1. newsDetail里的内容需要手动写一下 OK
2. 收藏栏部分需要写 OK
3. 侧边栏部分需要写 OK
4. 点赞的暂时缓存 OK
5. collect以及comment 页面，若无会话存储，则自动定位到首页 OK 
6. 支持评论的编写 OK
7. 灰色渐变的CSS OK
8. 收藏里面也要做到能点 OK
9. 评论去添加评论 OK
10. 评论的点赞功能 OK 
11. 进评论区的地方，位置不对，同时样式也过宽——Safari position absolute 变 fixed
12. 评论手机端会自动放大 resize：none OK
13. 会出现的偶尔卡顿 OK
14. 轮播图的切换问题,在宽度变化的时候会遇到 OK 
15. 评论的点赞刷新不丢失 OK
16. 长评论和短评论的间距 OK
17. 页面的灰度 OK

# 4.难点

## 4.1 获取document.body.clientHeight为页面的一半
我的收藏部分，如果收藏部分未铺满页面满，需要填充灰色背景在下方。
如果收藏数量很多，那么就设置一个固定的高度。
所以我通过计算body高度以及window高度的差来解决。
但是body高度在created里面是window高度的一半
和在控制台里面查看到的结果不一样
解决方法：created 改成 mounted

## 4.2 难点：分享页的设计，涉及两个页面的切换
1. 在背景页面设置一个函数，用来决定是否蒙上一个after opacity:0.6
2. 当点击分享图标，vuex管理的share变量变为true, v-if管理对应的share页面弹出
3. 同时newsDetail变灰色
4. 点击取消或者点击灰色页面部分或者手指滑动灰色页面，share变量变为false

v-if: 控制DOM元素的显示隐藏是将DOM元素整个添加或删除
v-show:控制DOM的显示是为DOM元素添加css的样式display,设置none或者是block,DOM元素是还存在的
v-if有更高的切换消耗；
v-show有更高的初始渲染消耗

## 4.3 难点：轮播图页面的渐变
1. 采用after属性，在上面蒙一层透明的渐变的样式，可以配合伪类使用
vue修改伪类样式
    setStyle(){
        return {
        '--my-color': 'red'
        }
    }
加上之后又无法滑动
2. 直接将img的方式转换，本来是直接加一个img框的，然后换成background的形式，

## 4.4 要点：适配了浏览器在切换宽度时候的变化
增加了一个监听浏览器宽度变化的函数，重置图片的坐标以及translate

## 4.5 难点：线上访问接口数据很慢
https://zhuanlan.zhihu.com/p/525083382

## 4.6 难点：ul布局和flex冲突
ul元素使用display:flex会默认改变li的宽度，变成n分之一的ul的宽度，解决方法flex:none