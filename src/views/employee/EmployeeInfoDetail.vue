<template>
  <section class ="container">
    <div class="card">
        <h5 class="card-header info-color white-text text-center py-4">
            <strong>Employee Management</strong>
            <a @click.prevent="toggleEmpEmployeeInfoEditing()" href="#" class="pull left"><i class = "fa fa-edit"></i></a>
        </h5>
        <!--Card content-->
        <div class="mt-3"> 
        <div v-if="isEditing" class="card-body px-lg-3 pt-1">
            <!-- Form -->
            <form class="text-center" style="color: #757575;" action="#!">
                <div class="form-row">                
                    <div class="col mt-10" >
                        <!-- First name -->
                      <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                          <span class="badge badge-primary" id="l_emp_no">사번</span>
                        </div>
                        <input type="text" class="form-control" id="emp_no" v-model="empNoInfo.EMP_NO" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                      </div>
                    </div>
                    <div class="col">
                      <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                          <span class="badge badge-primary" id="l_emp_name">성명</span>
                        </div>
                        <input type="text" class="form-control" id="emp_name" v-model="empNoInfo.NAME" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                      </div>                      
                    </div>
                </div>

                <div class="form-row">
                  <!-- 연락처/주민번호/여권번호 -->
                  <!-- Phone number -->
                  <div class="col">
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="badge badge-primary" id="l_phone_no">연락처</span>
                      </div>
                      <input type="password" class="form-control"  id="phone_no" v-model="empNoInfo.PHONE_NO"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>
                   </div>
                  <div class="col">
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="badge badge-primary" id="l_jumin_no">주민번호</span>
                      </div>
                      <input type="text" class="form-control"  id="jumin_no" v-model="empNoInfo.JUMIN_NO" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>                    
                  </div>
                  <div class="col">
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="badge badge-primary" id="l_passport_no">여권번호</span>
                      </div>
                      <input type="text" class="form-control"  id="passport_no" v-model="empNoInfo.PASSPORT_NO" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>                     
                  </div>                          
                </div>  
                
                <div class="form-row">
                  <!-- 성별/직위/직책 -->
                  <div class="col">
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="badge badge-primary" id="l_gender">성별</span>
                      </div>
                      <input type="text" class="form-control"  id="gender" v-model="empNoInfo.GENDER" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>                    
                  </div>

                  <div class="col">
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="badge badge-primary" id="l_emp_jw">직위</span>
                      </div>
                      <input type="text" class="form-control"  id="emp_jw" v-model="empNoInfo.JW_CD" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="badge badge-primary" id="l_emp_jc">직책</span>
                      </div>
                      <input type="text" class="form-control"  id="emp_jc" v-model="empNoInfo.JC_CD"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>
                  </div>                                     
                </div>             

                <!-- e-Mail -->
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <span class="badge badge-primary" id="l_email">E-Mail</span>
                  </div>
                  <input type="text" class="form-control"  id="email" v-model="empNoInfo.EMAIL_ADDR"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                </div>
                
                <!-- 주소 -->
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <span class="badge badge-primary" id="l_addr">주소</span>
                  </div>
                  <input type="text" class="form-control"  id="addr" v-model="empNoInfo.ADDRESS2"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                </div>           

                               
                <hr>
                <!-- Select Box 직위 -->                
                <label>직위</label>
               <!-- <select class="browser-default custom-select mb-4">
                  <option value="" disabled>Choose option</option>                  
                  <option value="1" selected>작업자</option>
                  <option value="2">생산관리자</option>
                  <option value="3">인사관리자</option>                    
                  <option value="4">대표관리자</option>
                </select>
                -->
             <!-- <CommSelectBox  :selectJwCodeInfo ="this.selectJwCodeInfo"
                  v-model= "this.selectJwCodeInfo[0].IO_CODE_D_NM" >
                </CommSelectBox>
                -->
                <!-- Terms of service -->
                <!-- Message -->
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <!--
                    <span class="input-group-text" id="l_emp_name">비고/기타</span>
                    -->
                    <span class="badge badge-primary" id="l_etc1">비고/기타</span>
                  </div>
                  <textarea type="text" class="form-control"  rows="3" id="etc1" v-model="empNoInfo.ETC1"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div> 

                <!-- Terms of service -->
                <p>By clicking
                    <em>Sign up</em> you agree to our
                    <a href="" target="_blank">terms of service</a>
                <!-- Sign up button -->
                
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-anchor fa-sm pr-2"
                      aria-hidden="true"></i>삭제</button>
                  <button type="button" class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="far fa-sun fa-sm pr-2"
                      aria-hidden="true"></i>등록</button>
                  <button type="button" class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-user-secret fa-sm pr-2"
                      aria-hidden="true"></i>수정</button>
                      <button type="button" class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-user-secret fa-sm pr-2"
                      aria-hidden="true"></i>취소</button>
                </div>

            </form>
            <!-- Form -->

        </div>
        </div>

    </div>  
<!-- Default form contact -->
  </section>
</template>

<script>
// @ is an alias to /src
import CommSelectBox from '../../components/ComSelectBox.vue';
//$store.state.jwCodeInfo
export default {
  name: 'employeeInfoDetail',  
  components: {
    // eslint-disable-next-line
    CommSelectBox
  },
  created() {
    var url = this.APIURL + '/api/getCommCode/' + 'U001'; // 직위
    this.findEmployee(this.$route.params.EMP_NO);
    
    this.$http.post(url, null, /*, config */).then ( retData => {
      // eslint-disable-next-line
      console.log("pass !!!! : employeeInfoEdit.vue /api/getCommCode >>>> " )
      this.selectJwCodeInfo = retData.data; 
      // eslint-disable-next-line  
      console.log("return api/getCommCode >>>> : " + this.selectJwCodeInfo[0])     
    });

 },

 data(){
   return {
     empNoInfo : [],
     selectJwCodeInfo : [],
     isEditing : true,
     items : [{item :"1", value :"작업자", unit:""}
     , {item: "2", value:"관리자", unit:""}],
   }
 },

 mounted(){
   this.EventBus.$on('findEmployee', empNo => {
     // eslint-disable-next-line
     console.log("***** on result : " + empNo);
     this.findEmployee(empNo);
   });
 },

 methods : {
   toggleEmpEmployeeInfoEditing() {
     this.isEditing = !this.isEditing;     
   },

   findEmployee(empNo) {
    var url = this.APIURL + '/api/getEmpInfoByEmpNo/' + empNo;
    // eslint-disable-next-line
    console.log("employeeInfoEdit.vue /api/getEmpInfoByEmpNo >>>> " + url )
    this.$http.post(url, null, /*, config */).then ( ret => {
      // eslint-disable-next-line
      console.log("pass !!!! : employeeInfoEdit.vue /api/getEmpInfoByEmpNo >>>> " + ret.data[0].EMP_NO)
      this.empNoInfo = ret.data[0];        
    });
   }
 }
}
</script>
