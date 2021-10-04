<template>
  <div id="employeeInfoEditVue">
    <section class ="container">     
    <div v-if = "!EventBus.isAdmin">
      <div class = "md-form w-50">
        <i class="fa fa-key prefix"></i>
        <input type="password" id ="adminKey" v-model="adminKey" class="form-control" />
        <label for = "adminKey">관리자 비밀번호 입력하세요.</label>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-5">
      <!--    <div class = "md-form w-90">
            <i class="fa fa-search prefix"> </i>
            <input type="text" id = "empNo"  v-model="empNo" class="form-control" aria-label="Search">
            <label for = "empNo">사번검색을 위해 입력하세요.</label>
          </div> -->
          <!-- Default form contact -->
          <div class="wrapper">
            
          </div>

          <div class="list-group">
            <div v-for = "(empInfo,index) in empInfos" v-bind:key="index">
              <router-link :to="'/employeeInfo/employeeInfoDetail/' + empInfo.EMP_NO" href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-2 h5" @click="checkAdminKey(empInfo.EMP_NO)">사번 : {{empInfo.EMP_NO}}</h5>
                  <small>등록일 : {{empInfo.CRT_DTM}}</small>
                </div>
                <p class="mb-2">개인 정보 : {{empInfo.NAME}} ,' ' ,{{empInfo.JW_CD}}, ' ',  {{empInfo.DEPT_ID}}  ' ',  {{empInfo.EMP_GBN}}</p>
                <small>최종수정일 : {{empInfo.MOD_DTM}}</small>
              </router-link>
            </div>
          </div>
        </div>
        <div class ="col-7">
          <router-view />
        </div>
      </div>
    </div>
<!-- Default form register --> 
<!-- Default form contact -->
  </section>
  </div>

  <!-- Search form -->
</template>

<script>
// @ is an alias to /src

export default {
  // el: "#employeeInfoEditVue",
  name: 'employeeInfo',
  components: {
  },
  beforeCreated() {
    if(!this.EventBus.isAdmin) {
      this.$router.replace('/employeeInfo')
    }
  },
  created() {
    this.$watch('adminKey', this._.debounce(this.checkAdminKey, 800)) ;
    //this.$watch('empNo', this._.debounce(this.searchEmpNo, 1000)) ;
    //this.$router.push('/employeeInfoEdit');
 },
 data(){
   return {
     adminKey : null,
     empNo : null,
     empInfos : [],
     date: { month: 10, year: 2019 }
   }
 },
 methods : {
   checkAdminKey : function(empNo) {
     var url = this.APIURL + '/api/admKey';
     // eslint-disable-next-line
     console.log("1. employeeInfo.vue /api/admKey >>>> " + url + "::" + this.adminKey)
     this.$http.post(url, {key:this.adminKey} /*, config */).then ( ret => {
       // eslint-disable-next-line
        console.log("2. pass !!!! : " + this.APIURL)
        if(ret.status == 200)
        {
          this.EventBus.isAdmin = true;
          url = this.APIURL + '/api/getEmpInfo';
          // eslint-disable-next-line
          console.log("3. employeeInfo.vue /api/getEmpInfo >>>> " + url )
          this.$http.get(url , null /*, config */).then ( ret=> {
            // eslint-disable-next-line
          console.log("4. pass employeeInfo.vue !!!! : " + this.APIURL)
          this.empInfos = ret.data;
// eslint-disable-next-line
          console.log("************ : " + empNo);
          this.EventBus.$emit('findEmployee', empNo);
         });      
        }  //if
      }); // this.$http.post(url, {key:this.adminKey} 
   } 
 }
}
</script>
