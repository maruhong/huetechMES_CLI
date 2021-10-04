import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from './router';
//import { state } from 'fs';

Vue.use(Vuex);


export default new Vuex.Store({

  loginInfo : {
    state : {      
      userInfo : null,
      authInfo : null,
      empNo : null,
      password : null,
      show : false,
      popEmps : [],
      isLogin : true, //Mysql 연결 에러로 isLogin 을 True 로 잠시 세팅함.
      isLoginError : false
    },
    getters : {

    },
    mutations : {
      // 로그인이 성공했을때
      loginSuccess(state, payload) {
        state.isLogin = true
        state.isLoginError = false
        state.authInfo = payload
      },
      //로그인이 실패했을때
      loginError(state) {
        state.isLogin = false
        state.isLoginError = true
      },
      //로그 아웃 수행시
      logOut(state) {
        state.isLogin = false
        state.isLoginError = true
        state.userInfo = null
        state.authInfo = null
      },
    },
    actions : {
           // 로그인 시도시
 // eslint-disable-next-line 
      login({dispatch,commit}, signObj) {     
        let url = 'http://localhost:3000/api/loginInfo';      
        // eslint-disable-next-line
        console.log("loginInfo.vue /api/loginInfo >>>> " + url )
        //로그인 - 토큰 반환
        axios.post(url , signObj /*, config */).then ( ret => {
            //성공시 token : (empNo 받아오기)
            // 토큰을 헤더에 포함시켜 유저 정보를 요청
            let token = ret.data.token
            //토큰을 로컬 스토리지에 저장
            localStorage.setItem("accesstoken",token)
            dispatch("getEmpInfo") 
            this.$router.push("/EmployeeInfo") 
          // router.push({name : 'EmployeeInfo'})
          // router.push ({name:"Home"})          
            })
          .catch(() => {
            // eslint-disable-next-line  
            commit("loginError")
            router.push({path : "./views/Login" }) 
            //alert("사번과 비밀번호를 확인하세요.")
        })
    },
    logOut({commit}) {
      commit("logOut")
      localStorage.removeItem("accesstoken")
     // router.push({name:"Home"})
      router.push({path : "./views/Home" }) 
    },
    // eslint-disable-next-line
    getEmpInfo({commit}, state) {
      //로컬 스토리지에 저장되어 있는 토큰을 가져온다.
      // eslint-disable-next-line
      let token = localStorage.getItem("accesstoken")
      // eslint-disable-next-line
      let config = {
        headers:{
          "accesstoken" : token
        }
      }

      let url = 'http://localhost:3000/api/loginInfo/22';
      axios
        .get(url, config)        
         .then(response => {
           // eslint-disable-next-line 
          console.log("http://localhost:3000/api/loginInfo/22" + response.data.data.name)
           let authInfo = {            
             // empNo : response.data.data.user              
             id :  response.data.data.id,  
             name :  response.data.data.name  
           }
           commit("loginSuccess", authInfo)
        })
        .catch(() => {
          // alert("사번과 비밀번호를 확인하세요.")
          router.push({path : "./views/Login" }) 
        })
      }
    }
  },
  projectInfo : {
    state : {
      popItems : [],
      checkCamEmpno : null,
      checkCadEmpNo : null,      
      checkEmpList : []
    },
    getters : {

    },
    //mutations
    mutations : {
      setItems(state,payload) {
        state.popItems = payload
      },
      setEmps(state,payload) {
        state.popEmps = payload
      },
      setCamEmpList(state,payload) {
        state.checkEmpList = payload      
      },
      setCadEmpList(state,payload) {
        state.checkEmpList = payload      
      },
      setCamEmpno(state,payload) {
        state.checkCamEmpno = payload      
      },
      setCadEmpno(state,payload) {
        state.checkCadEmpno = payload      
      },
      showDialog(state,payload) {
        state.show = !payload
      },
    },
    actions : {
    }
  }  
})
