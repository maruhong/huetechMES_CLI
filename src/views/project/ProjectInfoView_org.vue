<template>
<section class="container">
 <div>
    <v-row>
      <v-col cols="12" sm="6" md="4">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="100px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Start Date"
            prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>     
    </v-col>
    </v-row>
<!--    <v-row>
      <v-col cols="12" lg="6">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="computedDateFormatted"
              label="Date (read only text field)"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
              readonly
              v-on="on"
            ></v-text-field>
            </template>     
          <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
        </v-menu>
        <p>Date in ISO format: <strong>{{ date }}</strong></p>
      </v-col>
    </v-row> -->
    </div>
  
  <v-card>
    <v-card-title>
      프로젝트 기본 정보
      <div class="flex-grow-1"></div>
      <v-text-field v-model="search" append-icon="<i class='fa fa-search prefix'/>"  label="search" single-line  hide-details />
    <!--  <v-data-table  :headers="headers"  :items="projectInfo" :items-per-page="5"  class="elevation-1"  @Click.prevent= "showProjectInfoDetail(dialog, projectInfo[0])"></v-data-table> -->
    <v-data-table :headers="headers" :items="projectInfo" class="elevation-1"   @click:row ="activerow">
      <template v-slot:items="props">
        <tr :class="{'primary': props.item.selected}">
          <td>{{ props.item.NO }}</td>
          <td class="text-xs-right">{{ props.item.PROJECT_CD }}</td>
     <!--     <td class="text-xs-right">{{ props.item.PROJECT_NM }}</td> -->
          <td class="text-xs-right">{{ props.item.MODEL_NM }}</td>
          <td class="text-xs-right">{{ props.item.PROJECT_EMP_NO }}</td>
          <td class="text-xs-right">{{ props.item.PROJECT_CUSTOMER_ID }}</td>
          <td class="text-xs-right">{{ props.item.CAVITY }}</td>
          <td class="text-xs-right">{{ props.item.CAD }}</td>
          <td class="text-xs-right">{{ props.item.CAM }}</td>
          <td class="text-xs-right">{{ props.item.PROJECT_MATERIAL }}</td>
          <td class="text-xs-right">{{ props.item.CRT_DTM }}</td>
        </tr>
      </template>
    </v-data-table> 
    </v-card-title>
  </v-card>
  
  </section>
</template>

<script>
 //import projectInfoDetail from './ProjectInfoDetail'
  export default {   
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
    watch: {

    },
    methods: {
      activerow: function (item) {
        // eslint-disable-next-line 
        console.log("5. pass getProjectInfo.vue !!!! : " + item.PROJECT_CD)   
        alert("dkfdkfjdkfjdkfjd" + item.PROJECT_CD)
     //this.$set(item, 'selected', true)
    },
      // showProjectInfoDetail(projectDetail){
     
      //   alert("showProjectInfoDetail Enter00")
      //   this.dialog = true       
      //   this.$router.replace('/ProjectInfoDetail')
      //   alert("showProjectInfoDetail Enter" + projectDetail.PRJECT_CD)
      // },

      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${year}=${month}=${day}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    },
    beforeCreate() {
      let url = this.APIURL + '/api/getProjectInfo';
      // eslint-disable-next-line
      console.log("3. getProjectInfo.vue /api/getProjectInfo >>>> " + url )
      this.$http.get(url , null, /*, config */)
        .then ( ret => {
          this.projectInfo = ret.data; 
            // eslint-disable-next-line
          console.log("4. pass getProjectInfo.vue !!!! : " + this.projectInfo)   
        });
    },
    created() {     
     
    },
    data() {
      return {
        // eslint-disable-next-line 
        date: new Date().toISOString().substr(0, 10),
        // eslint-disable-next-line 
        //dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        projectCode: null,
        menu1: true,
        menu2: true,
        menu: true,
        search: '',
        dialog:false,
        projectInfo: [] , 
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
        ] ,
        
      }
    },
  }
</script>