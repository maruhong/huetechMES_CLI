<template> 
<v-section>  
  <v-container fluid grid-list-xs> 
    <v-layout style="height:160px;padding-top:0px"> 
      <v-flex xs10> 
        <v-card> 
          <v-form v-model="valid" class="ma-2" >
            <v-row>
              <v-col class="mx-4">    
                <v-select v-model="s_projectId"  :items="projectIdItems" item-text="projectId"  label="도면번호 선택" multi-line ></v-select> 
              </v-col>          
              <v-col class="ma-3">         
                <v-menu  v-model="orderStartDateMenu"  :close-on-content-click="true" :return-value.sync="orderStartDateMenu"
                        transition="scale-transition" offset-y min-width="120px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="s_orderStartDate"
                      label="주문 시작일"
                      prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
                      readonly
                      v-on="on"
                      style="width:120px;padding-top:0px"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="s_orderStartDate" @input="orderStartDateMenu = false" no-title scrollable></v-date-picker>
                </v-menu>
              </v-col>
              <v-chip  class="ma-1">~</v-chip>
                <v-col  class="ma-3">
                  <v-menu v-model="orderEndDateMenu"  :close-on-content-click="true"  :return-value.sync="orderEndDateMenu"
                          transition="scale-transition" offset-y min-width="120px">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="s_orderEndDate"
                        label="주문 종료일"
                        readonly
                        prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
                        v-on="on"
                        style="width:120px;padding-top:0px"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="s_orderEndDate" @input="orderEndDateMenu = false" no-title scrollable></v-date-picker>
                  </v-menu> 
                </v-col>
                <v-col  class="mx-1">
                <v-text-field v-model="s_modelName" label="모델명 입력" multi-line ></v-text-field> 
                </v-col> 
                <v-col class="mx-1" >
                <v-text-field v-model="s_productName" label="제품명 입력" multi-line ></v-text-field>
                </v-col>
              </v-row>
           </v-form>
        </v-card>
      </v-flex>
      <v-flex xs1>
        <v-card>
          <v-form>
            <div>
        <!--<v-btn  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-trash-alt fa-lm pr-3"
            aria-hidden="true"></i>삭제</v-btn> -->
              <v-btn type="button" style="height:30px;width:80px;padding-top:0px" class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-plus-square fa-lm pr-2"
                  aria-hidden="false"></i>검색</v-btn>             
              <v-btn type="button" style="height:30px;width:80px;padding-top:0px"  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-check-square fa-lm pr-3"
                  aria-hidden="false"></i>수정</v-btn>             
              <v-btn  type="button" style="height:30px;width:80px;padding-top:0px"  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-window-close fa-lm pr-2"
                  aria-hidden="false"></i>취소</v-btn> 
            </div> 
          </v-form> 
        </v-card> 
      </v-flex>     
      <v-flex xs1 > 
        <v-card style="height:127px;padding-top:0px">
          <div>
        <!--  <div class="btn-group" role="group" aria-label="Basic example" >  -->
            <!--<v-btn type="button" style="height:30px;width:80px;padding-top:0px"  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-trash-alt fa-lm pr-3"
                aria-hidden="true"></i>삭제</v-btn> -->
            <v-btn  type="button"  style="height:30px;width:80px;padding-top:0px"  class="btn btn-outline-deep-purple btn-rounded waves-effect"  @click="pop_projectIdRegistered=true"><i class="fas fa-plus-square fa-lm pr-3"
                aria-hidden="true"  @click="pop_projectIdRegistered=true"></i>등록</v-btn>
            <!--<v-btn type="button" style="height:30px;width:80px;padding-top:0px"  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-check-square fa-lm pr-3"
                aria-hidden="true"></i>수정</v-btn> -->
            <v-btn type="button"  style="height:30px;width:80px;padding-top:0px"  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-window-close fa-lm pr-3"
                aria-hidden="true"></i>취소</v-btn> 
          </div>   
        </v-card>
      </v-flex> 
    </v-layout>      
   </v-container>
  <v-container fluid grid-list-xs>
   <v-layout>
      <v-flex xs12 >
        <v-card>
          <v-card-title>
              프로젝트 도면 기본 정보
              <div class="flex-grow-1"></div>
              <v-text-field  v-model="search" append-icon="<i class='fa fa-search prefix'/>"  label="search" single-line hide-details
              ></v-text-field>
            <v-data-table :headers="headers"  :items="projectInfo" :items-per-page="5" class="elevation-1">
            </v-data-table>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>


  <!-- 도면 정보 등록 Dialog-->
  
    <v-dialog v-model="pop_projectIdRegistered"  scrollable max-width="800px">
 <!-- <v-card class="mx-auto" color="#D9E5FF">
    <v-container>
      <v-row justify="right">      
        <div class="btn-group" role="group" aria-label="Basic example" >
          !--<v-btn  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-trash-alt fa-lm pr-3"
              aria-hidden="true"></i>삭제</v-btn> --
          <v-btn  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-plus-square fa-lm pr-3"
              aria-hidden="true"></i>등록</v-btn>
          !--<v-btn class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-check-square fa-lm pr-3"
              aria-hidden="true"></i>수정</v-btn> --
          <v-btn type="button" class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-window-close fa-lm pr-3"
              aria-hidden="true"></i>취소</v-btn>
        </div>
      </v-row>
    </v-container>
  </v-card> -->
  <v-card  fluid white style="width: 100%; padding: 5px; margin-right: auto; margin-left: auto;">
      <v-container>
      <v-card-title>
              프로젝트 도면 신규 등록             
      </v-card-title>
      
        <v-row >
          <v-col cols="4" class="ms-0" >       
            <v-select  v-model="customerNameList"  :items="customerListItems"   item-text="customerName"  label="발주업체 선택" dense  multi-line ></v-select>
            <v-text-field v-model="text" :counter="20" :rules="nameRules" label="도면번호 자동생성" ></v-text-field>
            <v-text-field v-model="text" label="모델명 입력" required dense ></v-text-field>
            <v-text-field v-model="text" label="제품명 입력" required dense ></v-text-field>
            <v-select v-model="cavityNameList"  :items="cavityNameListItems" item-text="cavityName" label="캐비티 선택"  dense  multi-line ></v-select> 
            <v-select v-model="materialNameList"  :items="materialNameListItems" item-text="materialName"  label="성형재료 선택"  dense multi-line ></v-select> 
            <v-text-field v-model="text" label="수축율 입력" required dense ></v-text-field> 
            </v-col>
      
          <v-col cols="4" >
            <v-select v-model="camNameList"  :items="camNameListItems" item-text="camName"  label="CAM 선택" multi-line  dense ></v-select> 
            <v-select v-model="cadNameList"  :items="cadNameListItems" item-text="cadName"  label="CAD 선택" multi-line  dense ></v-select>
            <v-select v-model="managerNameList"  :items="managerNameListItems" item-text="mmanagerName"  label="관리담당자 선택"  dense multi-line ></v-select> 
            <v-file-input multiple label="도면 이미지 파일첨부"  dense></v-file-input>        
            <v-text-field  v-model="text" label="미리보기" required  dense></v-text-field>
            <v-img
              src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
            ></v-img>
          </v-col>
          <v-col cols="4" >
          <v-col cols="12" md="20" style="height:70px;padding-top:0px">
          <v-menu ref="orderDateMenu" v-model="orderDateMenu" :close-on-content-click="false" :return-value.sync="orderDate"
            transition="scale-transition" offset-y min-width="100px">
            <template v-slot:activator="{ on }">
              <v-text-field
                label="주문일"
                v-model="orderDate" 
                prepend-icon="<i class='fa fa-calendar-alt prefix primary' size='1em'/>"
                readonly
                v-on="on"
                hide-details
                dense
              ></v-text-field>               
            </template>
            <v-date-picker v-model="orderDate" no-title scrollable>
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="orderDateMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.orderDateMenu.save(orderDate)">OK</v-btn>
            </v-date-picker> 
          </v-menu>  
          </v-col> 

          <v-col cols="12" md="20" style="height:70px;padding-top:0px">   
          <v-menu ref="dueDateMenu" v-model="dueDateMenu" :close-on-content-click="false" :return-value.sync="dueDate"
            transition="scale-transition" offset-y min-width="100px">
            <template v-slot:activator="{ on }">
              <v-text-field
                label="납기일"                
                v-model="dueDate" 
                prepend-icon="<i class='fa fa-calendar-alt prefix primary' size='1em'/>"
                dense
                readonly
                hide-details
                v-on="on"                
              ></v-text-field>               
            </template>
            <v-date-picker v-model="dueDate" no-title scrollable>
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="dueDateMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dueDateMenu.save(dueDate)">OK</v-btn>
            </v-date-picker> 
          </v-menu> 
          </v-col>   
          <v-file-input multiple label="CAM 파일 첨부" dense></v-file-input>
          <v-file-input multiple label="CAD 파일 첨부" dense></v-file-input>
          <v-file-input multiple label="발주서 첨부" dense></v-file-input>
          <v-file-input multiple label="견적서 첨부" dense></v-file-input>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="pop_projectIdRegistered = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="pop_projectIdRegistered = false">Save</v-btn>
        </v-card-actions> 
      </v-container>       
      </v-card> 
  </v-dialog>
</v-section>
</template>


<script>
//import setDialog from '@components/SetDialog'
//import CommSelectBox from '../components/ComSelectBox.vue';
export default {
  name: 'project',  
  components: {  
   // setDialog   //팝업창 호출 연동
    // eslint-disable-next-line
  //  CommSelectBox  
  },
created() {
  alert("진입성공")
},
/*
beforeCreate() {
      let url = this.APIURL + '/api/get_customer_masterName';
      // eslint-disable-next-line
      console.log("3. ProjectInfoReg.vue /api/get_customer_masterName >>>> " + url )
      this.$http.get(url , null, /-, config -/)
                .then ( ret => {
                  this.customerListItems = ret.data; 
                    // eslint-disable-next-line
                  console.log("4. pass get_customer_masterName.vue !!!! : " + this.customerListItems)   
        });

      url = this.APIURL + '/api/getCommCodeName/' + 'B004';
      this.$http.get(url , null, /-, config -/)
                .then ( ret => {
                  this.cavityNameListItems = ret.data; 
                    // eslint-disable-next-line
                  console.log("4. pass get_cavityName.vue !!!! : " + this.cavityNameListItems)   
        });

       url = this.APIURL + '/api/getCommCodeName/' + 'B001';
       this.$http.get(url , null, /-, config -/)
        .then ( ret => {
          this.camNameListItems = ret.data; 
            // eslint-disable-next-line
          console.log("4. pass get_camName.vue !!!! : " + this.camNameListItems)   
        });

        url = this.APIURL + '/api/getCommCodeName/' + 'B002';
        this.$http.get(url , null, /-, config -/)
                 .then ( ret => {
                   this.cadNameListItems = ret.data; 
                     // eslint-disable-next-line
                   console.log("4. pass get_cadName.vue !!!! : " + this.cadNameListItems)   
        });

        url = this.APIURL + '/api/getCommCodeName/' + 'B003';
        this.$http.get(url , null, /-, config -/)
                  .then ( ret => {
                    this.materialNameListItems = ret.data; 
                      // eslint-disable-next-line
                    console.log("4. pass get_materialName.vue !!!! : " + this.materialNameListItems)   
        });
    },
    */
data(){
   return {
   
    select: 'Programming',
    valid: true,
    pop_projectIdRegistered: false,
    s_orderEndDate:'',
    s_orderStartDate:'',
    s_modelName:'',   
    s_productName:'',
    orderStartDateMenu:false,
    orderEndDateMenu:false,
    projectIdItems:[],
    s_projectId:'',
    search: '', 
    projectIdList:['test_019239292_001','test_11902923939_002'],
    projectInfo: [], 
    headers: [
      { text: '번호',  align: 'left',   sortable: false, value: 'NO' },
      { text: '프로젝트코드', align: 'left',   sortable: false, value: 'PROJECT_CD' },
    //   { text: '프로젝트명', value: 'PROJECT_NM' },
      { text: '모델명', value: 'MODEL_NM' },
    //  { text: '속성', value: 'ATTRIBUTE' },
    //  { text: '정렬', value: 'SORT_ORDER' },          
      { text: '프로젝트관리자', value: 'PROJECT_EMP_NO' },
      { text: '고객사', value: 'PROJECT_CUSTOMER_ID' },
      { text: 'CAVITY', value: 'CAVITY' },
      { text: 'CAD', value: 'CAD' },
      { text: 'CAM', value: 'CAM' },
      { text: '프로젝트재료', value: 'PROJECT_MATERIAL' },
    //  { text: '생성자', value: 'CRT_BY' },
      { text: '생성일', value: 'CRT_DTM' },
      // { text: '수정자', value: 'MOD_BY' },
    //  { text: '수정일', value: 'MOD_DTM' },
    { text: 'Actions', value: 'action', sortable: false },
    ] ,
    editedIndex: -1,
    editedItem: {
      PROJECT_CD: '',
      PROJECT_NM: '',
      MODEL_NM: '',
      ATTRIBUTE: '',
      PROJECT_EMP_NO: '',
      PROJECT_CUSTOMER_ID: '',
      CAVITY: '',
      CAD: '',
      CAM: '',
      PROJECT_MATERIAL: '',
      ETC123: '',
    },
    defaultItem: {
      PROJECT_CD: '',
      PROJECT_NM: '',
      MODEL_NM: '',
      ATTRIBUTE: '',
      PROJECT_EMP_NO: '',
      PROJECT_CUSTOMER_ID: '',
      CAVITY: '',
      CAD: '',
      CAM: '',
      PROJECT_MATERIAL: '',
      ETC123: '',
    },
    
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 25) || 'Name must be less than 25 characters',
    ],
     emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],

    /// dialog _도면정보 등록

    dueDate: '',
    orderDate:'',
    orderDateMenu:false,
    dueDateMenu:false,
    customerNameList:'',
    cavityNameList:'',
    materialNameList:'',
    camNameList:'',
    cadNameList:'',
    managerNameList:'',


    cavityNameListItems:["ANCD","1000"],
    materialNameListItems:["철주조물","철단조물"],
    camNameListItems:["김정호","이순신"],
    cadNameListItems:["김영랑","윤동주"],
    customerListItems:["어묵공장","김치공장"],
    managerNameListItems:["어묵공장","김치공장"],
    items: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify',
    ],
    text: '',
    name:''
    
   }
 },

 mounted(){
   
 },

 methods : {
  /* modOpen(mode,set) {
     console.log('다이알로그 열림')
     this.setDialog.dialog = true
     this.setDialog.dialogMode = mode
   },
   closeDialog() {
     console.log("팝업화면 닫음")
     this.setDialog.dialog=false
   }*/
 }
}
</script>
