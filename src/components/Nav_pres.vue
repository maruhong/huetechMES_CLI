<template>
  <v-app id="inspire">
  <div>
    <v-toolbar  color = "indigo"  >
      <v-toolbar-title >MES System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>

       <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="indigo" class="white--text" v-on="on">작업등록</v-btn>
        </template>        
        <v-list>          
          <v-list-item dense v-for="(workReg, index) in workRegs"  :key="index" @click.prevent = "$router.push(workReg.to)">
            <v-list-item-icon>
              <v-icon v-text="workReg.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="workReg.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn  color="indigo" class="white--text"  v-on="on">작업현황</v-btn>
        </template>
        <v-list>
          <v-list-item dense v-for="(workInfo, index) in workInfos" :key="index"  @click.prevent = "$router.push(workInfo.to)" >
            <v-list-item-icon>
              <v-icon v-text="workInfo.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="workInfo.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
       <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn dense color="indigo" class="white--text"  v-on="on">재고</v-btn>
        </template>
        <v-list>
          <v-list-item dense v-for="(stockInfo, index) in stockInfos"  :key="index" @click.prevent = "$router.push(stockInfo.to)">
            <v-list-item-icon>
              <v-icon v-text="stockInfo.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="stockInfo.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="indigo" class="white--text"  v-on="on">출고</v-btn>
        </template>
        <v-list>
          <v-list-item dense v-for="(shippingInfo, index) in shippingInfos"  :key="index" @click.prevent = "$router.push(shippingInfo.to)">
            <v-list-item-icon>
              <v-icon v-text="shippingInfo.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="shippingInfo.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>  
      <v-menu offset-y>
        <template  v-slot:activator="{ on }">
          <v-btn color="indigo" class="white--text"  v-on="on">거래처</v-btn>
        </template>
        <v-list>
          <v-list-item dense v-for="(supplierInfo, index) in supplierInfos"  :key="index" @click.prevent = "$router.push(supplierInfo.to)">
            <v-list-item-icon>
              <v-icon v-text="supplierInfo.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="supplierInfo.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>   

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn dense color="indigo" class="white--text"  v-on="on">매입</v-btn>
        </template>
        <v-list>
          <v-list-item dense v-for="(purchaseInfo, index) in purchaseInfos"  :key="index" @click.prevent = "$router.push(purchaseInfo.to)">
            <v-list-item-icon>
              <v-icon v-text="purchaseInfo.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="purchaseInfo.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu> 

       <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="indigo" class="white--text"  v-on="on">매출</v-btn>
        </template>
        <v-list>
          <v-list-item dense v-for="(salesInfo, index) in salesInfos"  :key="index" @click.prevent = "$router.push(salesInfo.to)">
            <v-list-item-icon>
              <v-icon v-text="salesInfo.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="salesInfo.title"></v-list-item-title>
            </v-list-item-content>         
          </v-list-item>
        </v-list>
      </v-menu> 

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="indigo" class="white--text"  v-on="on">코드관리</v-btn>
        </template>
        <v-list>
          <v-list-item dense v-for="(codeInfo, index) in codeInfos"  :key="index"  @click.prevent = "$router.push(codeInfo.to)">
            <v-list-item-icon>
              <v-icon v-text="codeInfo.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="codeInfo.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu> 
      <v-menu offset-y >
        <template v-slot:activator="{ on }">
          <v-btn color="indigo" class="white--text"  v-on="on">환경설정</v-btn>
        </template>
        <v-list>
          <v-list-item class ="max-heght:10" dense v-for="(envInfo, index) in envInfos"  :key="index" @click.prevent = "$router.push(envInfo.to)">
            <v-list-item-icon>
              <v-icon v-text="envInfo.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="envInfo.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu> 
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon tag="li" router to="/Login"  >
          <v-icon >mdi-login-variant</v-icon>
        </v-btn>
        <v-btn icon  >
          <v-icon >mdi-logout-variant</v-icon>
        </v-btn>
        <v-btn icon >
          <v-icon >mdi-plus-circle</v-icon>
        </v-btn>
      </template>

    </v-toolbar>
    </div>
    <v-content>
      <router-view>
      </router-view>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
 </v-app>
</template>

<script>
// import router from '../router'
import {mapState} from "vuex"
  export default {
    props: {
     
    },
    computed : {
      ...mapState(["isLogin", "isLoginError", "authInfo"])
    },
    methods:{
      // router (linkName) {
      //   // eslint-disable-next-line
      //   console.log("router.linkName" + linkName)
      //   if(linkName == "/ProjectInfo" )
      //     router.to("/ProjectInfo");
      // },
    },
    data: () => ({
       drawer: null,
       workRegs: [
        { title: '도면정보 관리' , grant: 'manager',to: {path: '/project'}, icon: 'mdi-note'},
     //   { title: '도면정보 등록' , grant: 'admin' , to: {path: '/project/ProjectInfoReg'}, icon: 'mdi-note-plus'},
        { title: '도면별 공정 등록' , grant: 'manager' , to: {path: '/processCodeRegByProject'}, icon: 'mdi-shape-plus'},
        { title: '작업정보 조회' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-note-text'},
        { title: '작업정보 추가' , grant: 'worker' , to: {path: '/'}, icon: 'mdi-worker'},
        { title: '진행외작업정보 추가' , grant: 'worker' , to: {path: '/'}, icon: 'mdi-calendar-plus'},
      ],
      workInfos: [
        { title: '기간별 금형 일정' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-chart-line-stacked'},
        { title: '부품별 공정 현황' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-chart-bar-stacked'},
        { title: '일자별 공정 현황' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-calendar-today'},
      ],
      stockInfos: [
        { title: '재고 관리' , grant: 'manager' , to: {path: '/stock'}, icon: 'mdi-led-strip'}//,
      //;  { title: '공구이력 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-wrench'},
      //  { title: '소재이력 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-xaml'},
      //  { title: '장비이력 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-keyboard'},
        ],
      shippingInfos: [
        { title: '제품출고 관리' , grant: 'manager' , to: {path: '/delivery'}, icon: 'mdi-cart-outline'},
        { title: '제품 A/S 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-screwdriver'},
        { title: '제품양산 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-medium'},
      ],
      supplierInfos: [
        { title: '고객/협력업체 관리' , grant: 'manager' , to: {path: '/vendor'}, icon: 'mdi-human-greeting'}
       // { title: '협력업체 관리' , grant: 'vendor' , to: {path: '/vendor'}, icon: 'mdi-factory'},
      ],
      purchaseInfos: [
        { title: '매입 관리' , grant: 'manager' , to: {path: '/purchase'}, icon: 'mdi-rotate-right-variant'},
      ],
      salesInfos: [
        { title: '매출 관리' , grant: 'manager' , to: {path: '/sales'}, icon: 'mdi-coin'},
      ],
      codeInfos: [
        { title: '기본 코드 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-database-plus'},
        { title: '영업 코드 관리' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-sale'},
        { title: '공정 코드 관리' , grant: 'manager' , to: {path: '/processCodeReg'}, icon: 'mdi-code-array'},
      ],
      envInfos: [
        { title: '비밀번호 변경' , grant: 'manager' , to: {path: '/'}, icon: 'mdi-key'},
        { title: '개인정보 관리' , grant: 'worker'  , to: {path: '/'}, icon: 'mdi-account'},        
        { title: '직원정보 관리' , grant: 'manager' , to: {path: '/employee'}, icon: 'mdi-account-edit'},
      ],
    }),
  }
</script>