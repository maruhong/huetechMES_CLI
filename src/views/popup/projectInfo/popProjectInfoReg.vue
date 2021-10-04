<template>
<section>
       <v-card >
       <v-toolbar dark color="grey">
            <v-btn  icon dark @click="close()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
          <v-toolbar-title>프로젝트 도면 정보 등록</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="save()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar> 
       <!-- <div v-for = "item in projectCds" :key="item.project_cd">  -->
     <!--   <v-card  fluid white style="width: 100%; padding: 5px; margin-right: auto; margin-left: auto;"> -->
        <v-container>            
            <v-row>
            <v-col cols="4" class="ms-0" >       
              <v-text-field v-model="projectCd" label="도면번호" ></v-text-field>
              <v-text-field v-model="projectName" label="도면명" ></v-text-field>
              <v-text-field v-model="modelName" label="모델명"  ></v-text-field>
              <v-text-field
                v-model="chkCamEmpNo"
                clearable
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="CAM"  
                @click="empInfoPop('camEmpInfo')" 
              ></v-text-field>
              <v-dialog v-model="this.toggleCamEmpInfoList" >
                <employee-info-list>
                </employee-info-list>
              </v-dialog>
              <v-text-field
                v-model="chkCadEmpNo"
                clearable
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="CAD"  
                @click="empInfoPop('cadEmpInfo')"         
              ></v-text-field>
              <v-dialog v-model="this.toggleCadEmpInfoList" >
                <employee-info-list>
                </employee-info-list>
              </v-dialog>
             
              <v-text-field v-model="cavity" label="CAVITY" ></v-text-field>
              <v-text-field v-model="attribute"  label="속성"  ></v-text-field> 
              <v-text-field
                v-model="chkMgrEmpNo"
                clearable
                hide-details 
                prepend-inner-icon="mdi-magnify"            
                label="관리자"  
                @click="empInfoPop('mgrEmpInfo')"         
              ></v-text-field>
              <v-dialog v-model="this.toggleMgrEmpInfoList">
                <employee-info-list>
                </employee-info-list>
              </v-dialog>
              <v-text-field v-model="customerId"  label="고객명"  ></v-text-field> 
            </v-col>      
            <v-col cols="4" >
              <v-text-field v-model="material"  label="주재료"  ></v-text-field> 
              
              <div class="ma-1">                
                <date-picker  label="실제작업 시작일" v-model='realStartDt' :input-props='{
                  class: "w-full shadow border rounded py-2 px-3 text-gray-700 ",
                  placeholder: "실제 작업 시작일을 입력하세요.",
                  readonly: true,
                  header :"시작일"
                }'/>    
                           
              </div>
              <div class="ma-1">
                <date-picker label="실제작업 종료일"  v-model='realEndDt' :input-props='{
                  class: "w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 hover:border-blue-2",
                  placeholder: "실제 작업 종료일을 입력하세요.",
                  readonly: true
                }'/>
              </div>
              <v-text-field v-model="realWorkCount"  label="실제작업공수"  ></v-text-field> 
              <v-text-field v-model="workCost" label="작업비용" ></v-text-field>
              <div class="ma-1">
                <date-picker label="납기일"  v-model='dueDt' :input-props='{
                  class: "w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 hover:border-blue-2",
                  placeholder: "납기일을 입력하세요.",
                  readonly: true
                }'/>
              </div>    
              <div class="ma-1">
                <date-picker label="수주일"  v-model='acceptDt' :input-props='{
                  class: "w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 hover:border-blue-2",
                  placeholder: "수주일을 입력하세요.",
                  readonly: true
                }'/>
              </div> 
            </v-col>
            <v-col cols="4" >
              <v-text-field v-model="managerInfo"  label="관리자정보"  ></v-text-field> 
              <v-text-field v-model="projectGbn" label="구분" ></v-text-field>
              <v-text-field v-model="outsideSupportCompanyCd"  label="외주업체코드"  ></v-text-field>
              <v-file-input multiple  v-model="drawImagePath" label="도면이미지" ></v-file-input>
              <v-file-input multiple  v-model="cadFilePath"  label="CAD파일"  ></v-file-input>
              <v-file-input multiple  v-model="camFilePath" label="CAM파일" ></v-file-input>
              <v-file-input multiple  v-model="ordFilePath"  label="주문서파일"  ></v-file-input> 
              <v-file-input multiple  v-model="estFilePath" label="견적서파일" ></v-file-input>
            </v-col>
          </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
        </v-card-actions> 
        
      </v-container>   
    <!-- </div>  -->  
      </v-card>
      
     <!-- </v-card> -->
</section>
</template>
    
<script>
  import {mapState} from 'vuex'  
  import employeeInfoList from "@/views/popup/employeeInfo/popEmployeeInfoList.vue"
  export default {  
    components: {
      'employee-info-list': employeeInfoList,
    },
    computed:{
      //store.js 의 project_cd 의 조회 결과값을 projectInfo Pop화면에 items 의 넣어주는 정보 전달 방법
      ...mapState({
        projectCds : state => state.empInfo.popItems,  
        chkCamEmpNo : state => state.empInfo.checkCamEmpNo,
        chkCadEmpNo : state => state.empInfo.checkCadEmpNo,
        chkMgrEmpNo : state => state.empInfo.checkMgrEmpNo,
        toggleCadEmpInfoList : state => state.empInfo.toggleCadEmpInfoList,
        toggleCamEmpInfoList : state => state.empInfo.toggleCamEmpInfoList,
        toggleMgrEmpInfoList : state => state.empInfo.toggleMgrEmpInfoList,
        
      }),

    },
    beforeCreated: () => {
    
   },
   data () {
      return {
        //dialog: true,
        projectInfoRegisterPop : false,
        employeeInfoPop : false,
        cadInfoPop : false,
        camInfoPop : false,
        mgrInfoPop : false,
        //item:[],
        //등록한 도면의 정보 변수
        empInfoList :[],
        projectCd : null,
        projectName : null,
        modelName : null,
        cavity : null,
        attribute : null,
        customerId : null,
        material : null,
        realStartDt : null,
        realEndDt : null,
        realWorkCount: null,
        workCost: null,
        dueDt: null,
        acceptDt: null,
        managerInfo: null,
        projectGbn: null,
        outsideSupportCompanyCd: null,
        drawImagePath: null,
        cadFilePath: null,
        camFilePath: null,
        ordFilePath: null,
        estFilePath: null,
        result:null
        ///////////

      }
    },
    methods : {       
      empInfoPop(infoName) {
        
        this.employeeInfoPop = true;
        var url = this.APIURL + '/api/getEmpInfo';
        // eslint-disable-next-line
        console.log("p3. employeeInfo.vue /api/getEmpInfo >>>> " + url )
        this.$http.get(url , null /*, config */).then ( ret=> {
          this.empInfoList = ret.data;
          // eslint-disable-next-line
          console.log("p4. pass employeeInfo.vue !!!! : " + this.empInfoList)
          this.$store.commit('empInfo/SETDISPLAY', infoName)//store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법. 
          //this.$store.commit('empInfo/PRIMEONOFF', false)//store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.                 
          this.$store.commit('empInfo/SETEMPLIST', this.empInfoList); //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.

        if(infoName === "camEmpInfo")
          this.$store.commit('empInfo/TOGGLECAMEMPINFOLIST', true); //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
        else if(infoName === "cadEmpInfo")
          this.$store.commit('empInfo/TOGGLECADEMPINFOLIST', true); //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
        else if(infoName === "mgrEmpInfo")
          this.$store.commit('empInfo/TOGGLEMGREMPINFOLIST', true); //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
        })
      },
      close () {
           this.$store.commit('projectInfo/TOGGLEPROJECTINFOREG', false);//store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.  
      },
      save() {
          //정보 등록하는 로직 추가 구성 

          // DB Table Insert 로직
          // Item 에 Push 하는 로직 구성해서 화면 새로 고침 
          var newProjectInfo = {
            projectCd : this.projectCd,
            projectName: this.projectName,
            modelName : this.modelName,
            cadEmpNo : this.chkCadEmpNo,
            camEmpNo : this.chkCamEmpNo,
            mgrEmpNo : this.chkMgrEmpNo,
            cavity : this.cavity,
            attribute : this.attribute,
            customerId : this.customerId,
            material : this.material,
            realStartDt : this.realStartDt,
            realEndDt : this.realEndDt,
            realWorkCount: this.realWorkCount,
            workCost: this.workCost,
            dueDt: this.dueDt,
            acceptDt: this.acceptDt,
            managerInfo: this.managerInfo,
            projectGbn: this.projectGbn,
            outsideSupportCompanyCd: this.outsideSupportCompanyCd,
            drawImagePath: this.drawImagePath,
            cadFilePath: this.cadFilePath,
            camFilePath: this.camFilePath,
            ordFilePath: this.ordFilePath,
            estFilePath: this.estFilePath
          }
          //this.item.push('cadEmpNo',this.chkCadEmpNo);
          //this.item.push('camEmpNo',this.chkCamEmpNo);
          //this.item.push('mgrEmpNo',this.chkMgrEmpNo);
          // eslint-disable-next-line
          console.log("save ::::::" + newProjectInfo);
          
          var url = this.APIURL + '/api/putProjectInfo';
            // eslint-disable-next-line
          console.log("p13. popProjectInfoReg.vue /api/getEmpInfo >>>> " + url )
          this.$http.post(url , newProjectInfo /*, config */).then ( ret=> {
            this.result = ret.data;
            // eslint-disable-next-line
            console.log("p14. pass popProjectInfoReg.vue !!!! : " + this.result.status)
           if(this.result.data.status === 200)
           {
              url = this.APIURL + '/api/putProjectDescInfo';
              this.$http.post(url , newProjectInfo /*, config */).then ( retData=> {
              this.result = retData.result;

              });
              // eslint-disable-next-line
              console.log("p15. pass popProjectDescReg.vue !!!! : " + this.result)
            }
            
          })
     
          // 정보 등록하는 로직 추가 구성 
           this.$store.commit('projectInfo/TOGGLEPROJECTINFOREG', false);//store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.  //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.  
      }
    }
  }
</script>