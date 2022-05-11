<template>
  <div >
    <headContent></headContent>
    <swipe></swipe>
    <newsList></newsList>
  </div>
</template>

<script>
// import welcome from '../components/welcome.vue'
// import sidebar from '../components/sidebar.vue'
import swipe from '../components/swipe.vue'
import newsList from '../components/newsList.vue'
import headContent from '../components/headContent.vue'
export default {
    name:'index',
    components:{
        headContent,swipe,newsList
        // welcome,sidebar,swipe,newsList
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

</style>