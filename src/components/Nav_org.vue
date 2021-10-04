<template>
  <!--Main Navigation-->
  <header>
      <!-- Navbar -->
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark indigo scrolling-navbar navbar-height">
        <div class="container">  
          <!-- Brand -->
          <ul class="navbar-nav mr-auto">    
            <router-link to="/Home" tag="li" class="nav-item">
              <a class="nav-link waves-effect" href="#">
                <strong class="grey-text ">HueTech MES</strong>
              </a>
            </router-link>
          </ul>
  
          <!-- Links -->
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left -->
            <ul class="navbar-nav mr-auto">             
              <router-link v-if = "isLogin === true" to="/EmployeeInfo" tag="li" class="nav-item">
                <a class="nav-link waves-effect" href="#"> <strong class="white-text medium">직원관리 </strong> </a>
                  <span class="sr-only"></span>
              </router-link>  
              
              <router-link v-if = "isLogin === true" to="/ProjectInfo" tag="li" class="nav-item">
                <a class="nav-link waves-effect" href="#"> <strong class="white-text medium">프로젝트관리 </strong> </a>
                <span class="sr-only"></span>              
              </router-link> 

              <router-link v-if = "isLogin === true" to="/ProjectInfoReg" tag="li" class="nav-item">
                <a class="nav-link waves-effect" href="#"> <strong class="white-text medium">프로젝트등록 </strong> </a>
                <span class="sr-only"></span>              
              </router-link> 
              <router-link v-if = "isLogin === true" to="/Adm" tag="li" class="nav-item">
                <a class="nav-link waves-effect" href="#" > <strong class="white-text medium">공정코드관리 </strong></a>
                <span class="sr-only"></span>              
              </router-link>
              <router-link v-if = "isLogin === true" to="/About" tag="li" class="nav-item">
                <a class="nav-link waves-effect" href="#" > <strong class="white-text medium">About </strong> </a>
                <span class="sr-only"></span>              
              </router-link>            
            </ul>            
          </div>
          
          <div>
           <div class="my-2"  v-if = "isLogin !== true">
              
              <v-btn text  router to="/Login" class="yellow-text">
                <p class="yellow-text">사용자 로그인이후 사용 가능합니다.<b/></p>
                <v-icon left class="yellow-text">mdi-lock</v-icon> 
              로그인</v-btn>
            </div>
            <div v-if = "isLogin === true">             
              <v-btn text @click = "$store.dispatch('logOut')" class="white-text">
                <p class="white-text" >{{authInfo.id }} ({{authInfo.name }})님 환영합니다.<b/></p>
                <v-icon left class="red-text">mdi-lock-open</v-icon> 
              로그아웃</v-btn>
            </div>
           
      <!--    <router-link v-if = "isLogin !== true" to="/Login" class="nav-item">
            <v-icon left class="yellow-text">mdi-lock</v-icon> 
            <v-text class="yellow-text" >로그인</v-text>          
          </router-link>        
          <router-link v-if = "isLogin === true" to="" @click.prevent = "logOut" class="nav-item">
            <v-text class="yellow-text" >({{userInfo.id }})님 환영합니다.</v-text>    
            <v-icon left class="red-text" >mdi-lock-open</v-icon>
            <v-text class="white-text">로그아웃</v-text>       
          </router-link> -->  
          </div>
        </div>
      </nav>
      <!-- Navbar -->
  
    </header>
    <!--Main Navigation-->
  <!--Main Navigation-->
</template>

<script>
// import {mapState, mapActions} from "vuex"
import {mapState} from "vuex"
export default {
    created() {
    },
    computed : {
      ...mapState(["isLogin", "isLoginError", "authInfo"])
    },
    data() {
        return {
        }
    },
    // methods: {
    //   ...mapActions(["logOut"])
    // },
    props: {
      source :String
    }
}
</script>