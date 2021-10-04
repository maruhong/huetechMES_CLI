<template>
<section class="container">
 <!--<div>-->
    <v-card>
    <v-row>
      <div class = "md-form w-60"  >
        <i class="fa fa-search prefix"></i>
        <input type="text" id ="projectId" v-model="projectId" class="form-control" />
        <label for = "projectId">도면번호를 입력하세요.</label>
      </div>
      <v-col cols="5" sm="6" md="3">
      <v-menu ref="orderStartDateMenu" v-model="orderStartDateMenu" :close-on-content-click="false" :return-value.sync="orderStartdate"
        transition="scale-transition" offset-y min-width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="orderStartdate"
            label="주문시작일"
            prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="orderStartdate" no-title scrollable>
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="orderStartDateMenu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.orderStartDateMenu.save(orderStartdate)">OK</v-btn>
        </v-date-picker>
      </v-menu>     
    </v-col>
    <v-col cols="5" sm="6" md="3">
      <v-menu ref="orderEndDateMenu" v-model="orderEndDateMenu" :close-on-content-click="false" :return-value.sync="orderEndDate"
        transition="scale-transition" offset-y min-width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="orderEndDate"
            label="주문종료일"
            prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="orderEndDate" no-title scrollable>
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="orderEndDateMenu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.orderEndDateMenu.save(orderEndDate)">OK</v-btn>
        </v-date-picker>
      </v-menu>     
    </v-col>   

    <v-row justify="right">      
        <div class="btn-group" role="group" aria-label="Basic example" >         
          <v-btn  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-search fa-lm pr-3"
              aria-hidden="true"></i>검색</v-btn>         
          <v-btn type="button" class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-window-close fa-lm pr-3"
              aria-hidden="true"></i>취소</v-btn>
        </div>
      </v-row>  
    </v-row>
    
    
      <v-card-title>
          프로젝트 기본 정보
          <div class="flex-grow-1"></div>
          <v-text-field  v-model="search" append-icon="<i class='fa fa-search prefix'/>"  label="search" single-line hide-details
          ></v-text-field>
        <v-data-table :headers="headers"  :items="projectInfo" :items-per-page="5" class="elevation-1">

        </v-data-table>
        
      </v-card-title>
    </v-card>
    
  </section>
</template>

<script>
  export default {
    
    data: () => ({
      dialog: false,
      search: '',
      orderStartDate: '',
      orderEndDate: '',
      orderStartDateMenu : false,
      orderEndDateMenu : false,
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
      }
    }),
    beforeCreate() {
        let url = this.APIURL + '/getBuyInfo';
        // eslint-disable-next-line
        console.log("3. /views/buyCoins/buyCoinsInfo.vue /getBuyInfo >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.projectInfo = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass /views/buyCoins/buyCoinsInfo.vue !!!! : " + this.projectInfo)   
          });
      },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },
/*
    watch: {
      // eslint-disable-next-line 
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
*/
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${year}=${month}=${day}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
       editItem (item) {
        this.editedIndex = this.projectInfo.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.ProjectInfo.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.projectInfo.splice(index, 1)
      }
    }
   
 }
</script>