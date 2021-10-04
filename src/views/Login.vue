<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row  align="center"  justify="center">
          <v-col cols="12" sm="5" md="8" >
             <v-alert v-if = "isLoginError === true"  class = "mb-3" :value ="isLoginError" type = "error">
             사번과 비밀번호를 확인해 주세요.
            </v-alert>
            <v-alert v-if = "isLogin === true" class = "mb-3" router to="/Home" :value ="isLogin" type = "success" >
             로그인이 정상 수행 되었습니다.
            </v-alert>
            <v-card class="elevation-12">
              <v-toolbar color="indigo" dark flat>
                <v-toolbar-title>로그인 하세요.</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="Login" name="login" v-model="empNo" 
                    prepend-icon="<i class='fa fa-user-tie prefix'/>" type="text"
                  />
                  <v-text-field id="password" label="Password" name="password" v-model="password"
                    prepend-icon="<i class='fa fa-user-lock prefix'/>"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn  color="primary" depressed block  large @click="login({empNo, password})">Login </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// eslint-disable-next-line
import {mapState, mapActions} from "vuex"
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    password : null,
    empNo:null
  }),
   beforeCreated() {
    // eslint-disable-next-line
     console.log("login.vue >>>>>")
     // eslint-disable-next-line
     if( "isLogin" === true)    
      this.$router.replace("/Home") 
   },
  computed : {
    //store.js 에서 정의한 data 값 가져오기
    ...mapState(["isLogin", "isLoginError"])
  },
  methods:{
    ...mapActions(["login"])
  },
  created: () => {
      
  }

}
</script>