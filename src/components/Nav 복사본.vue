<template>
  <!--Main Navigation-->  
      <!-- Navbar -->
    <v-app id="inspire"> 
    <v-app-bar app clipped-left color="blue-grey lighten-4" >    
      <v-app-bar-nav-icon @click.stop="drawer_toggle"></v-app-bar-nav-icon>
      <v-toolbar-title >MES System</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-human-greeting</v-icon>
        </v-btn>       
    </v-app-bar>
   <v-navigation-drawer  
        v-model="drawer"  
        dense 
        color="blue-grey lighten-4" 
        :expand-on-hover="true" 
        :mini-variant="true"
        :right="false" 
        app
        clipped
       > 
     <v-list dense> 
     <v-list-item nav>            
        <v-list-item-content>
          <v-list-item-title >{{mainTitle}}</v-list-item-title>
          <v-list-item-subtitle> {{subItemTitle}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>    
      <v-list-group v-for="item in items"
        :key="item.title"
        v-model="item.active" 
        :prepend-icon="item.action"      
        no-action >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title  v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          color="blue-grey darken-1"
          @click.prevent = "$router.push(subItem.to)"         
        >  
          <v-list-item-content>
            <v-list-item-title  v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
          
        </v-list-item>
      </v-list-group>
    </v-list> 
    </v-navigation-drawer> 
    <v-content>
      <v-container fluid app>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <router-view></router-view>
            </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  
  <v-footer app :fixed="footer.fixed" :clipped-left="footer.clippedLeft">
      <span class="caption mx-1">&copy; 2020, Hue Tech. - 쉬어가자. </span>
    </v-footer>  
  </v-app> 
 
</template>

<script>
import {mapState} from "vuex";
//import app from './App.vue';
export default ({
  components : {
  // app
  },
  computed : {
      ...mapState(["isLogin", "isLoginError", "authInfo"])
    },
  created () {
      this.$vuetify.theme.dark = false
    },
  data: () => ({
    drawer : false,
    clipped : true,
    subItemTitle : null,
    mainTitle : "작업등록 관리",
    toolbar: {
        //
        fixed: false,
        // sets if the toolbar contents is leaving space for drawer (false) or not (true)
        clippedLeft: true
    },
    footer: {
        // sets the CSS position of the footer
        fixed: true,
        // sets if the footer is full width (true) or gives space to the drawer (false)
        clippedLeft: true,
    },
     items: [
          {
            action:'mdi-arrange-bring-to-front',
            title: '작업등록 관리',   
            active: true,         
            items: [
              { title: '도면정보 관리' , grant: 'manager', to: {path: '/project'} ,action: 'mdi-note'},
          //   { title: '도면정보 등록' , grant: 'admin' , to: {path: '/project/ProjectInfoReg'}, icon: 'mdi-note-plus'},
              { title: '도면별 공정 등록' , grant: 'manager' , to: {path: '/processCodeRegByProject'}, action: 'mdi-shape-plus'},
              { title: '작업정보 조회' , grant: 'manager' , to: {path: '/'}, action: 'mdi-note-text'},
              { title: '작업정보 추가' , grant: 'worker' , to: {path: '/'}, action: 'mdi-human-male-male'},
              { title: '진행외작업정보 추가' , grant: 'worker' , to: {path: '/'}, action: 'mdi-calendar-plus'},
            ],
          },
          {
            action: 'mdi-chart-line-stacked',
            title: '작업현황 관리',          
            items: [
              { title: '기간별 금형 일정' , grant: 'manager' , to: {path: '/projectStatis'}, action: 'mdi-chart-line-stacked'},
              { title: '부품별 공정 현황' , grant: 'manager' , to: {path: '/processStatis'}, action: 'mdi-chart-bar-stacked'},
              { title: '일자별 공정 현황' , grant: 'manager' , to: {path: '/'}, action: 'mdi-calendar-today'},
            ],
          },
          {
            action: 'mdi-led-strip',
            title: '재고 관리',
            items: [
                { title: '재고 관리' , grant: 'manager' , to: {path: '/stock'}, action: 'mdi-led-strip'}//,
              //;  { title: '공구이력 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-wrench'},
              //  { title: '소재이력 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-xaml'},
              //  { title: '장비이력 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-keyboard'},
            ],
          },
          {
            action: 'mdi-cart-outline',
            title: '출고 관리',
            items: [
              { title: '제품출고 관리' , grant: 'manager' , to: {path: '/delivery'}, icon: 'mdi-cart-outline'},
              { title: '제품 A/S 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-screwdriver'},
              { title: '제품양산 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-play-network'},
            ],
          },
          {
            action: 'mdi-human-greeting',
            title: '협력사 관리',
            items: [
              { title: '고객/협력업체 관리' , grant: 'manager' , to: {path: '/vendor'}, action: 'mdi-human-greeting'}
              // { title: '협력업체 관리' , grant: 'vendor' , to: {path: '/vendor'}, icon: 'mdi-factory'},
            ],
          },
          {
            action: 'mdi-rotate-right-variant',
            title: '매입 관리',
            items: [
              { title: '매입 항목 관리' , grant: 'manager' , to: {path: '/purchase'}, action: 'mdi-rotate-right-variant'},
            ],
          },
          {
            action:'mdi-sale',
            title: '매출 관리',
            items: [
              { title: '매출 관리' , grant: 'manager' , to: {path: '/sales'}, action: 'mdi-call-split'},
            ],
          },
          {
            action: 'mdi-database-plus',
            title: '공통 코드 관리',
            items: [
              { title: '기본 코드 관리' , grant: 'manager' , to: {path: '/'}, action: 'mdi-database-plus'},
              { title: '영업 코드 관리' , grant: 'manager' , to: {path: '/'}, action: 'mdi-sale'},
              { title: '공정 코드 관리' , grant: 'manager' , to: {path: '/processCodeReg'}, action: 'mdi-code-array'},
            ],
          },
          {
            action: 'mdi-account-key',
            title: '기타 관리',
            items: [
              { title: '비밀번호 변경' , grant: 'manager' , to: {path: '/'}, action: 'mdi-key'},
              { title: '개인정보 관리' , grant: 'worker'  , to: {path: '/'}, action: 'mdi-account'},        
              { title: '직원정보 관리' , grant: 'manager' , to: {path: '/employee'}, action: 'mdi-account-edit'},
            ],
          },
        ],
      model: 1,
  }),

  props: {
    source: String
  },
  
  methods: {
    // changes the drawer to permanent
    drawer_toggle() {
      this.drawer = !this.drawer
    },
  }
})
</script>