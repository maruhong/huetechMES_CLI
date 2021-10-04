<template>
<section>
       <v-card>
       <v-toolbar dark color="primary">
            <v-btn  icon dark @click="close()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
          <v-toolbar-title>프로젝트 도면 상세 정보</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="close()">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar> 
        <div v-for = "item in projectCds" :key="item.PROJECT_CD">  
     <!--   <v-card  fluid white style="width: 100%; padding: 5px; margin-right: auto; margin-left: auto;"> -->
        <v-container> 
           
            <v-row>
            <v-col cols="3" class="ms-0" >       
              <v-text-field v-model="item.PROJECT_CD" label="도면번호" ></v-text-field>
              <v-text-field v-model="item.MODEL_NM" label="모델명"  ></v-text-field>
              <v-text-field v-model="item.CAM"  label="CAM"  ></v-text-field> 
              <v-text-field  v-model="item.CAD" label="CAD" ></v-text-field>  
              <v-text-field  v-model="item.CAVITY" label="CAVITY" ></v-text-field>
              <v-text-field v-model="item.ATTRIBUTE"  label="속성"  ></v-text-field> 
              <v-text-field  v-model="item.PROJECT_EMP_NO" label="관리자" ></v-text-field>
              <v-text-field v-model="item.PROJECT_CUSTOMER_ID"  label="고객명"  ></v-text-field> 
              
            </v-col>      
            <v-col cols="3" >
              <v-text-field  v-model="item.PROEJCT_MATERIAL"  label="주재료"  ></v-text-field> 
              <v-text-field  v-model="item.PROJECT_IMG" label="도면이미지" ></v-text-field>   
              <v-text-field  v-model="item.REAL_START_DT"  label="실제작업시작일"  ></v-text-field> 
              <v-text-field  v-model="item.REAL_END_DT" label="실제작업종료일" ></v-text-field> 
              <v-text-field  v-model="item.REAL_WORK_COUNT"  label="실제작업공수"  ></v-text-field> 
              <v-text-field  v-model="item.PROJECT_PRICE" label="작업비용" ></v-text-field>          
              <v-text-field  v-model="item.DUE_DT"  label="납기일"  ></v-text-field> 
              <v-text-field  v-model="item.ACCEPT_DT" label="수주일" ></v-text-field> 

            </v-col>
            <v-col cols="3" >
              <v-text-field  v-model="item.MANAGER_INFO"  label="관리자정보"  ></v-text-field> 
              <v-text-field  v-model="item.PROJECT_GBN" label="구분" ></v-text-field>
              <v-text-field  v-model="item.OUTSIDE_SUPPORT_COMPANY_CD"  label="외주업체코드"  ></v-text-field> 
              <v-text-field  v-model="item.DRAW_IMAGE_PATH" label="도면이미지" ></v-text-field>
              <v-text-field  v-model="item.CAD_FILE_PATH"  label="CAD파일"  ></v-text-field> 
              <v-text-field  v-model="item.CAM_FILE_PATH" label="CAM파일" ></v-text-field>
              <v-text-field  v-model="item.ORD_FILE_PATH"  label="주문서파일"  ></v-text-field> 
              <v-text-field  v-model="item.EST_FILE_PATH" label="견적서파일" ></v-text-field>
            </v-col>
            <v-col cols="3" >
              <v-text-field  v-model="item.CRT_BY"  label="최초등록자"  ></v-text-field> 
              <v-text-field  v-model="item.CRT_DTM" label="최초등록일" ></v-text-field>
              <v-text-field  v-model="item.MOD_BY"  label="최종수정자"  ></v-text-field> 
              <v-text-field  v-model="item.MOD_DTM" label="최종수정일" ></v-text-field>
            </v-col>
          </v-row>
        <v-divider></v-divider>
     <!--   <v-card-actions>
          <v-btn color="blue darken-1" text @click="projectInfoDetailPop = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="projectInfoDetailPop = false">Save</v-btn>
        </v-card-actions> 
       --> 
      </v-container>   
      </div>    
      </v-card>
      
     <!-- </v-card> -->
</section>
</template>
    
<script>
  import {mapState} from 'vuex'  
 
  export default {  
    components: {
    },

    computed:{
      //store.js 의 project_cd 의 조회 결과값을 projectInfo Pop화면에 items 의 넣어주는 정보 전달 방법
      ...mapState({
        projectCds : state => state.projectInfo.popItems, 
      }),
    },
    beforeCreated: () => {
    
   },
   data () {
      return {
        //dialog: true,
        projectInfoDetailPop :true
      }
    },
    methods : {
      close () {
          // eslint-disable-next-line
        console.log("popProjectInfoDetail.vue. close()" )
         this.$store.commit('projectInfo/TOGGLEPROJECTINFODETAIL', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
      },
    }
  }
</script>