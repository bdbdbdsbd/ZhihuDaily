# 1. 安装过程以及项目介绍
## 安装
根据热心群众 阿伟 反应，直接使用 

    npm install
    npm run serve
## 介绍
本项目根据2022年4月-5月知乎日报IOS端内容复刻，仅供学习参考，不用于盈利。

<br>

# 2. 页面逻辑

分为pages以及components两个部分

## 2.1 index.vue

本页面为主页，在路由组件中地址为  '/'。包含
 <i>headContent.vue</i>(顶部)
 <i>swipe.vue</i>(新闻列表)
 <i>newsList.vue</i>(新闻列表) 

<i>headContent.vue</i>  点击头像可以跳转 <i>swipe.vue</i> (侧边栏)

<i>swipe.vue</i>以及<i>newsList.vue</i> 跳转 <i>newsDetail.vue</i>(新闻详情页面)

## 2.2 swipe.vue

本页面为侧边栏，可以进入我的收藏 <i>collect.vue</i>

## 2.3 collect.vue

本页面为收藏夹，包含若干收藏内容，点击可进入 <i>newsDetail.vue</i>(新闻详情页面)

## 2.4 newsDetail.vue

可以由各种方式进入，包含<i>newsMenu.vue</i>(功能栏)以及<i>share.vue</i>(分享页面)

newsMenu.vue包含 点赞/收藏/评论/分享 四个功能
评论会跳转到<i>comment.vue</i>
分享会触发<i>share.vue</i>

## 2.5 comment.vue

评论页面，包含长评论以及短评论，点击底部可以跳转<i>writeComment.vue</i>页面

## 2.6 writeComment.vue

<i>writeComment.vue</i>页面可以编写评论，点击发布以后跳回到<i>comment.vue</i>

<br>

# 3.功能点整理

## 3.1 headContent.vue
日期的显示，头像的显示以及跳转页面，无难点

## 3.2 swipe.vue
手写轮播图
<br>
实现自动（每隔4S切换）以及左滑右滑切换

## 3.3 newsList.vue
新闻列表，向下滑动会显示过去几天的新闻内容，使用element-ui的无限滚动组件

## 3.4 collect.vue
在页面中点击收藏按钮，相应新闻内容即可出现在我的收藏页面，刷新不丢失

## 3.5 newsMenu.vue
可点击点赞以及收藏分享评论，刷新后不丢失

## 3.6 share.vue
点击后弹出分享页面，后面背景变灰。
点击背景或点击取消，分享页面消失。

## 3.7 comment.vue
显示评论，可以点赞评论，刷新以及退出后不消失

## 3.8 writeComment.vue

1. 手机端点击后不放大
2. 有内容方可进行评论发布，有有评论内容时，发布按钮颜色变化
3. 发布后回到<i>comment.vue</i>并根据评论长短放入长评论以及短评论


