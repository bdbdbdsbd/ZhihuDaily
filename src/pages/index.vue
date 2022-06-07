<template>
  <div class="main">
    <headContent></headContent>
    <swipe></swipe>
    <newsList></newsList>
  </div>
</template>

<script>

import swipe from '../components/swipe.vue'
import newsList from '../components/newsList.vue'
import headContent from '../components/headContent.vue'
export default {
    name:'index',
    components:{
        headContent,swipe,newsList

    },
    data() {
        return {
            isShowsidebar: false,
        }
    },
    created() {
        this.isShowsidebar = true
    },
}
</script>

<style>
.main{
    overflow:hidden;
}
</style>