<template> 
  <section>
    <Nav/>
  </section> 
</template>
<script>
 // @ is an alias to /src
 /* eslint-disable */
 import Nav from "@/components/Nav.vue"
 //import projectInfoDetail from "@/views/popup/projectInfo/popProjectInfoDetail.vue"
 import {mapState} from "vuex"  
 export default {
  name: 'Home', 
  components: {
    Nav,
   // projectInfoDetail
  },
  method:{
   
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', 'Helvetica', 'Arial', 'sans-serif','맑은고딕';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size:10px;
  color: #2c2e30;
  margin-top: 0px;
}
</style>