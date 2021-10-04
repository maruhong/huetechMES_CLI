
<template>
  <!--Main Navigation-->
  <header>
      <!-- Navbar -->
      <nav class="navbar fixed-top navbar-expand-lg navbar-light indigo scrolling-navbar">
        <div class="container">  
          <!-- Brand -->
          <ul class="navbar-nav mr-auto">    
            <router-link to="/Home" tag="li" class="nav-item">
              <a class="nav-link waves-effect" href="#">
                <strong class="white-text ">HueTech MES</strong>
              </a>
            </router-link>
          </ul>
  
          <!-- Links -->
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left -->
            <ul class="navbar-nav mr-auto">             
              <router-link v-if = "isLogin === true" to="/EmployeeInfo" tag="li" class="nav-item">
                <a class="nav-link waves-effect" href="#">직원관리</a>
                  <span class="sr-only"></span>
              </router-link>  
              
              <router-link v-if = "isLogin === true" to="/ProjectInfo" tag="li" class="nav-item">
                <a class="nav-link waves-effect" href="#" >프로젝트관리</a>
                <span class="sr-only"></span>              
              </router-link> 
              <router-link v-if = "isLogin === true" to="/Adm" tag="li" class="nav-item">
                <a class="nav-link waves-effect" href="#" >공정코드관리</a>
                <span class="sr-only"></span>              
              </router-link>
              <router-link v-if = "isLogin === true" to="/About" tag="li" class="nav-item">
                <a class="nav-link waves-effect" href="#" >About</a>
                <span class="sr-only"></span>              
              </router-link>            
            </ul>            
          </div>

           <ul class="navbar-nav mr-auto">    
            <router-link v-if = "isLogin !== true" to="/Login" tag="li" class="nav-item">
              <a class="nav-link waves-effect" href="#" >Log In</a>
              <span class="sr-only"></span>              
            </router-link>
             <router-link v-if = "isLogin === true" to="/LogOut" tag="li" class="nav-item">
              <a class="nav-link waves-effect" href="#" >Log Out</a>
              <span class="sr-only"></span>              
            </router-link>
          </ul>
  
        </div>
      </nav>
      <!-- Navbar -->
  
    </header>
    <!--Main Navigation-->
  <!--Main Navigation-->
</template>

<script>
import {mapState} from "vuex"
export default {
    created() {
    },
    computed : {
      ...mapState(["isLogin", "isLoginError"])
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>