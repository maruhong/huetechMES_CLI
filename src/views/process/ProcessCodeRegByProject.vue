<template>
  <section> 
 
  <!--  <v-container grid-list-sm >  -->
      <template  v-if="$vuetify.breakpoint.smAndUp">
        <v-card
          dark
          dense
          class="mb-1"
          color="grey darken-3 dark"
          gradient="to left, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >

        <v-row class="ma-1">
     <!--     <div class="ma-1"> 
            <date-picker  v-model='startDate' :input-props='{
              class: "w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 hover:border-blue-5",
              placeholder: "Please enter startDate",
              readonly: true
            }'/>
          </div>
          <div class="ma-1">
            <date-picker  v-model='endDate' :input-props='{
              class: "w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 hover:border-blue-5",
              placeholder: "Please enter endDate",
              readonly: true
            }'/>
          </div> -->
           <v-text-field
              outlined
              class="mt-2 ma-2"
              dense
              v-model="this.projectCd"
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="도면(제품)번호 선택"   
              @click="getPopProjectIdSearch()"        
            >
            </v-text-field>
          
    <!--<div class="ma-1"> 
            <v-select v-model="s_projectId"  :input="text" :items="projectIdItems" item-text="PROJECT_CD"  label="도면번호 선택" single-line ></v-select> 
          </div> -->
          <v-spacer></v-spacer>
          <v-btn  class ="mt-3 mx-1" color="grey darken-2" :value="false" @click="getProcessCodeByProjectId()">공정 조회<v-icon  class="mx-2" >mdi-magnify</v-icon></v-btn>
          
     <!--   <v-divider vertical></v-divider>
          <v-btn 
            class ="mt-3 mx-1"
            color="grey darken-2"
            :value="true"
            @click="toggle_projectInfoReg()"
           >
            신규 등록
           <v-icon  class="mx-1" @click="toggle_projectInfoReg()">mdi-expand-all-outline</v-icon>
           </v-btn> -->
        </v-row>
        </v-card>
        </template> 
        <template  v-if="$vuetify.breakpoint.smAndUp">
        <v-layout align-start justify-left >
          <v-flex md4 class="elevation-1 pa-1 ma-1" >
            <v-card-title>
              공정 전체 목록
            </v-card-title> 
              <v-card class="mx-auto"  scrollable >
                <v-list two-line  scrollable>                  
                <!--  <draggable v-model="processCodeAll" :options="{group:'processCode.ID'}" style="min-height:10px"> -->
                  <template v-for="processCode in processCodeAll">
                    <v-list-item :key="processCode.ID" style="min-height:10px"> 
                      <v-list-item-action>
                      <!--   <v-checkbox :input-value="active" :true-value="processCode.CODENAME" color="deep-purple accent-4" ></v-checkbox> -->
                        <v-icon color="green" @click="processCodeDelete(processCode.ID, processCode.CODENAME)">mdi-minus-circle-outline</v-icon>
                      </v-list-item-action>                  
                      <v-list-item-content >
                        <v-list-item-title >{{processCode.ID}} - {{processCode.CODENAME}}</v-list-item-title>
                      </v-list-item-content>
                        <v-icon color="grey" @click="searchToProcessInfo(processCode)">mdi-card-search-outline</v-icon>
                        <v-icon color="blue" @click="moveToProcessReal(processCode)">mdi-logout-variant</v-icon>
                    </v-list-item>
                  </template>
                <!--  </draggable> -->
                <!--  <v-btn color="success"  @click="processAdd({ID, CODENAME})">추가</v-btn> -->
                  <v-btn> <v-icon  color="primary"  @click="processAdd(processCode.ID, processCode.CODENAME)">mdi-plus-circle-outline</v-icon>추가</v-btn>
                  <v-btn> <v-icon  color="primary"  @click="processSave({ID, CODENAME})">mdi-download-box-outline</v-icon>저장</v-btn>
                </v-list>
              </v-card>
            </v-flex>

            <v-flex md6 class="elevation-1 pa-1 ma-1" >
               <v-card-title>
                사용 공정 목록
               </v-card-title>
              <v-card class="mx-auto"  scrollable>
                <v-list one-line  scrollable>                  
                  <draggable v-model="processCodeReal" :options="{group:'processCode.ID'}"  style="min-height:10px">
                    <template v-for="(processCode, index) in processCodeReal" >
                      <v-list-item :key="processCode.ID" style="min-height:10px"> 
                        <v-list-item-action>
                         <!-- <v-checkbox :input-value="active" :true-value="processCode.CODENAME" color="deep-purple accent-4" ></v-checkbox> -->
                        <v-icon color="green" @click="deleteProcessCodeReal(processCode)">mdi-minus-circle-outline</v-icon>
                        </v-list-item-action>                   
                        <v-list-item-content >
                          <v-list-item-title > {{processCode.ID}} - {{processCode.CODENAME}}</v-list-item-title>
                        </v-list-item-content>
                        <v-btn rounded color="primary"> 공정순서:{{index}}</v-btn>
                          <v-icon :disabled = "processCode.isCodeReg ? true : false" :color="!processCode.isCodeReg ? 'primary accent-4' : 'grey'" v-model="processCodeSave" @click="putProcessRealInfoSave(processCode)">mdi-plus-circle-outline</v-icon>
                          <v-icon color="primary" v-model="processCodeView" @click="getProcessRealInfoView(processCode)">mdi-pencil-box-multiple-outline</v-icon>
                      </v-list-item>
                    </template>
                  </draggable>
                  <v-btn><v-icon  color="success"  @click="putProcessCodeRealOrderSave()">mdi-download-box-outline</v-icon>공정순서 저장</v-btn> 
                 </v-list>
              </v-card>
            </v-flex>
            <v-flex md4 class="elevation-1 pa-1 ma-1" scrollable>
              <v-card-title>
                공정상세정보 입력
              </v-card-title>
                <v-card class ="mt-1 mx-3"   dense scrollable> 
                <v-row > 
                  <v-col>
                 <v-text-field v-model="this.projectCd" label="도면(제품)번호" required></v-text-field>
                    <v-text-field v-model="projectNm" label="도면(제품)명" required></v-text-field>  
                    <v-text-field v-model="this.processCdByProcess" label="공정번호" required></v-text-field> 
                    <v-text-field v-model="this.processNmByProcess" label="공정명" required></v-text-field> 
                  <!--  <v-row >             
                      <v-text-field class ="mt-1 mx-12" v-model="this.partName"  label="부품명" required single-line > </v-text-field>
                      <v-icon class ="mx-15" color="blue" @click="getPopPartSearch()">mdi-magnify</v-icon>
                    </v-row> -->
                 <v-text-field
                      outlined
                      class="mt-3"
                      dense
                      v-model="partNm"
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="부품명"   
                      @click="getPopPartSearch()"        
                    ></v-text-field>
                  <v-text-field
                      outlined
                      class="mt-3"
                      dense
                      v-model="workNm"
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="작업구분 선택"   
                      @click="getPopWorkSearch()"        
                    ></v-text-field>
             <!--       <ComSelectBox
                      v-model="this.workNmByProcess"
                      :items="workListItems"
                      :input="'my_selectbox'"
                      label="작업구분 선택" 
                      @input="value => { this.workNmByProcess = value }"
                      single-line
                    ></ComSelectBox> -->
            
                   
                    <v-text-field v-model="cavityNm" label="CAVITY" required></v-text-field> 
                    <v-text-field v-model="this.compressRate" label="압축률" required></v-text-field>

            <!-- cam, cad 담당자는 프로젝트 등록 공저에서만 수정 하도록 할것 -->
            <!--         <v-text-field
                      outlined
                      class="mt-3"
                      dense
                      v-model="camMgrCd"
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="CAM 담당자"   
                      @click="getPopCamSearch()"        
                    ></v-text-field> 
                    <v-text-field
                      outlined
                      class="mt-3"
                      dense
                      v-model="cadMgrCd"
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="CAD 담당자"   
                      @click="getPopCadSearch()"        
                    ></v-text-field> -->
                    <v-menu ref="processStartDateMenu" v-model="processStartDateMenu" :close-on-content-click="false" :return-value.sync="processStartDate"
                      transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          label="작업 시작일" 
                          v-model="processStartDateByProcess" 
                          prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
                          readonly
                          v-on="on"
                          style="width:250px;padding-top:-10px"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="processStartDateByProcess" no-title scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="processStartDateMenu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.processStartDateMenu.save(processStartDate)">OK</v-btn> 
                      </v-date-picker>  
                    </v-menu> 
                    <v-menu ref="processStartTimeMenu" v-model="processStartTimeMenu" :close-on-content-click="false" :return-value.sync="processStartTime"
                      transition="scale-transition" offset-y min-width="200px">
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          label="작업시작 시각"
                          v-model="processStartTimeByProcess" 
                          prepend-icon="<i class='fa fa-clock prefix'/>"
                          readonly
                          v-on="on"
                          style="width:250px;padding-top:-10px"
                        ></v-text-field>                 
                      </template>
                     <v-time-picker v-model="processStartTimeByProcess"  type="time" width="200" class="ml-2">
                          <div class="flex-grow-1"></div>
                          <v-btn text color="primary" @click="processStartTimeMenu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.processStartTimeMenu.save(processStartTime)">OK</v-btn>
                        </v-time-picker>                  
                    </v-menu> 
                    <v-menu ref="processEndDateMenu" v-model="processEndDateMenu" :close-on-content-click="false" :return-value.sync="processEndDate"
                        transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            label="작업 종료일"
                            v-model="processEndDateByProcess" 
                            readonly
                            v-on="on"
                            prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
                            style="width:250px;padding-top:-1px"
                          ></v-text-field>
                        </template>             
                        <v-date-picker v-model="processEndDateByProcess" no-title scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="processEndDateMenu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.processEndDateMenu.save(processEndDate)">OK</v-btn> 
                      </v-date-picker> 
                      </v-menu> 
                      <v-menu ref="processEndTimeMenu" v-model="processEndTimeMenu" :close-on-content-click="false" :return-value.sync="processEndTime"
                        transition="scale-transition" offset-y min-width="200px">
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            label="작업 종료시각"
                            v-model="processEndTimeByProcess" 
                            prepend-icon="<i class='fa fa-clock prefix'/>"
                            readonly
                            v-on="on"
                            style="width:250px;padding-top:-10px"
                          ></v-text-field>               
                        </template> 
                        <v-time-picker v-model="processEndTimeByProcess"  type="time" width="200" class="ml-2">
                          <div class="flex-grow-1"></div>
                          <v-btn text color="primary" @click="processEndTimeMenu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.processEndTimeMenu.save(processEndTime)">OK</v-btn>
                        </v-time-picker> 
                      </v-menu> 
                      <v-menu ref="orderDateMenu" v-model="orderDateMenu" :close-on-content-click="false" :return-value.sync="orderDate"
                        transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            label="주문일"
                            v-model="orderDateByProcess" 
                            prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
                            readonly
                            v-on="on"
                            style="width:250px;padding-top:-10px"
                          ></v-text-field>               
                        </template>
                        <v-date-picker v-model="orderDateByProcess" no-title scrollable>
                          <div class="flex-grow-1"></div>
                          <v-btn text color="primary" @click="orderDateMenu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.orderDateMenu.save(orderDate)">OK</v-btn>
                        </v-date-picker> 
                      </v-menu>  
                    <v-menu ref="dueDateMenu" v-model="dueDateMenu" :close-on-content-click="false" :return-value.sync="dueDate"
                        transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            label="납기일"
                            v-model="dueDateByProcess" 
                            prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
                            readonly
                            v-on="on"
                            style="width:250px;padding-top:-10px"
                          ></v-text-field>               
                        </template>
                        <v-date-picker v-model="dueDateByProcess" no-title scrollable>
                          <div class="flex-grow-1"></div>
                          <v-btn text color="primary" @click="dueDateMenu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.dueDateMenu.save(dueDate)">OK</v-btn>
                        </v-date-picker> 
                    </v-menu> 
                    <v-text-field
                      outlined
                      class="mt-3"
                      dense
                      v-model="this.equipmentNmByProcess"
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="장비명"   
                      @click="getPopEquipmentSearch()"        
                    ></v-text-field>   
                    <v-text-field
                      outlined
                      class="mt-3"
                      dense
                      v-model="this.materialNmByProcess"
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="재료명"  
                      @click="getPopMaterialSearch()"        
                    ></v-text-field>  
                  </v-col>
            <!--  </v-list> -->
                </v-row>
                <v-col>
                  <v-btn> <v-icon  color="primary" :disabled="validated ? '' : disabled"  @click="processPlanComplete(processCode.ID, processCode.CODENAME)">mdi-plus-circle-outline</v-icon>완료</v-btn>
                  <v-btn> <v-icon  color="primary"  @click="putProcessRealPlanSave()">mdi-download-box-outline</v-icon>저장</v-btn>
                </v-col>
              <!--  </v-row> -->
              </v-card>
            </v-flex> 
        </v-layout>
        <v-dialog  v-model="this.toggleProjectInfoSearch" >
            <project-info-detail>
            </project-info-detail>  
        </v-dialog>
        <v-dialog  v-model="this.toggleMaterialInfoSearch" >
            <material-info-detail>
            </material-info-detail>  
        </v-dialog>
        <v-dialog  v-model="this.toggleEquipmentInfoSearch" >
            <equipment-info-detail>
            </equipment-info-detail>  
        </v-dialog>
        <v-dialog  v-model="this.togglePartInfoSearch" >
            <part-info-detail>
            </part-info-detail>  
        </v-dialog>
        <v-dialog  v-model="this.toggleCamInfoSearch" >
            <cam-info-detail>
            </cam-info-detail>  
        </v-dialog>
        <v-dialog  v-model="this.toggleCadInfoSearch" >
            <cad-info-detail>
            </cad-info-detail>  
        </v-dialog>
        <v-dialog  v-model="this.toggleWorkInfoSearch" >
            <work-info-detail>
            </work-info-detail>  
        </v-dialog>
        </template>
  <!--   </v-container>  -->
   </section> 
</template>

<script>
import draggable from "vuedraggable";
//import ComSelectBox from '../../components/ComSelectBox.vue';
// import ProcessCode from "../components/ProcessCode";
import {mapState} from 'vuex' ;
import projectInfoSearch from "@/views/popup/projectInfo/popProjectInfoSearch";
import materialInfoSearch from "@/views/popup/materialInfo/popMaterialInfoSearch";
import equipmentInfoSearch from "@/views/popup/equipmentInfo/popEquipmentInfoSearch";
import partInfoSearch from "@/views/popup/partInfo/popPartInfoSearch";
import camInfoSearch from "@/views/popup/camInfo/popCamInfoSearch";
import cadInfoSearch from "@/views/popup/cadInfo/popCadInfoSearch";
import workInfoSearch from "@/views/popup/workInfo/popWorkInfoSearch";

export default {
    name: "processCodeRegByProject",
    components: {
        draggable,
        'project-info-detail' : projectInfoSearch,
        'material-info-detail' : materialInfoSearch,
        'equipment-info-detail' : equipmentInfoSearch,
        'part-info-detail' : partInfoSearch,
        'cam-info-detail' : camInfoSearch,
        'cad-info-detail' : cadInfoSearch,
        'work-info-detail' : workInfoSearch,
      //  'ComSelectBox':ComSelectBox,
    },
    
    data() {
        return {
        date:null,
        rowCount : 2,
        even : 2,
        odd : 1,
        model : ['processCode'],
        ID:'',
        CODENAME:'',
       
        customerName:'', 
        processCodeView:'',
        text:'',
        index:1,

        isCodeReg:false,    
        orderDateMenu :false,
        orderTimeMenu :false,
        dueDataMenu:false,
        dueTimeMenu:false,
        startDateMenu:false,
        endDateMenu:false,
        
        startTimeMenu:false,
        endTimeMenu:false,
        processStartDate:'',
        processEndDate:'',
        processStartTime:'',
        processEndTime:'',
        processStartDateMenu:false,
        processEndDateMenu:false,
        processStartTimeMenu:false,
        processEndTimeMenu:false,
       
        processCodeSave :'UNREG',

// 프로세스별 공정관련 variable

        compressRate:'',
        
        processCdByProcess:'',
        processNmByProcess:'',
        
        orderDateByProcess:'',
        dueDateByProcess:'',

        orderDate:'',
        dueDate:'',

        processStartDateByProcess:'',
        processEndDateByProcess:'',
        
        processStartTimeByProcess:'',
        processEndTimeByProcess:'',
        
        equipmentNmByProcess:'',
        materialNmByProcess:'',
// popup search
        workListItems:["어묵공장","김치공장"],

        //재료,장비,부품 명 검색을 위한 팝업 창 보여주기
        pop_ProjectInfoSearch : false,
        pop_MaterialInfoSearch : false,
        pop_EquipmentInfoSearch : false,
        pop_PartInfoSearch : false,
        pop_CamInfoSearch : false,
        pop_CadInfoSearch : false,
        pop_WorkInfoSearch : false,
       
        projectIdItems:["어묵공장","김치공장"],
        processCodeAll:[],
        processCodeReal:[],
      
        processRealInfo:[],
        result : null,

        // 상세정보
        select :'',
        dueDateMenu:true,
        disabled:false,
        validated:true,
        
        };
        
    },
    computed:{
      //store.js 의 material 의 조회 결과값을 maaterialInfo Pop화면에 items 의 넣어주는 정보 전달 방법
      ...mapState({
        toggleProjectInfoSearch : state => state.projectInfo.toggleProjectInfoSearch,
        toggleMaterialInfoSearch : state => state.materialInfo.toggleMaterialInfoSearch,
        toggleEquipmentInfoSearch : state => state.equipmentInfo.toggleEquipmentInfoSearch,
        togglePartInfoSearch : state => state.partInfo.togglePartInfoSearch,
        toggleCamInfoSearch : state => state.camInfo.toggleCamInfoSearch,
        toggleCadInfoSearch : state => state.cadInfo.toggleCadInfoSearch,
        toggleWorkInfoSearch : state => state.workInfo.toggleWorkInfoSearch,
        projectNm : state => state.projectInfo.projectNm,
        projectCd : state => state.projectInfo.projectCd,
        materialNm : state => state.materialInfo.materialNm,
        materialCd : state => state.materialInfo.materialCd,
        equipmentNm: state =>  state.equipmentInfo.equipmentNm,
        equipmentCd: state =>  state.equipmentInfo.equipmentCd,
        partNm: state =>  state.partInfo.partNm,
        partCd: state =>  state.partInfo.partCd,
        workCd: state =>  state.workInfo.workCd,
        workNm: state =>  state.workInfo.workNm,
        cavityNm: state =>  state.cavityInfo.cavityNm,
        cavity: state =>  state.cavityInfo.cavity
      }),

      errorMessage() {
      if (!this.date) return 'Date is required.';
      return '';
    },
    },
    beforeCreate() {
        let url = this.APIURL + '/api/getProcessCodeAll';
      //  let url1 = this.APIURL + '/api/getProcessCodeByProject';
        // eslint-disable-next-line
        console.log("3. getProcessCodeRegByProject.vue /api/getProcessCodeReg >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.processCodeAll = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass getProcessCodeReg.vue !!!! : " + this.processCodeAll)   
          });
       
      },
    
     methods: {
        moveToProcessReal (processCd) {
          // eslint-disable-next-line
         console.log(processCd);
         var isProcessCd ="";
         var isDone = false;
        if(this.projectCd === "")
        {
          alert("도면 조회를 통하여, 도면 번호를 선택하세요.");
          return false;
        } else {
          for(var i=0; i < this.processCodeReal.length; i++){
            // eslint-disable-next-line
            console.log("processCodeRegByProject.vue !!!! : " + this.processCodeReal.length);
            isProcessCd = this.processCodeReal[i].ID
            if(isProcessCd == processCd.ID) 
            {
              isDone = true;
              break;
            }
          }
          if(!isDone) {
            this.processCodeReal.push(processCd);
            return true;
          } else{
            return false;
          }
        }
      },
      getPopProjectIdSearch()
      {
        this.pop_ProjectInfoSearch = !this.pop_ProjectInfoSearch;
        this.$store.commit('projectInfo/TOGGLEPROJECTINFOSEARCH', this.pop_ProjectInfoSearch)
      },
      getPopMaterialSearch()
      {
        this.pop_MaterialInfoSearch = !this.pop_MaterialInfoSearch;
        this.$store.commit('materialInfo/TOGGLEMATERIALINFOSEARCH', this.pop_MaterialInfoSearch)
      },
      getPopEquipmentSearch()
      {
        this.pop_EquipmentInfoSearch = !this.pop_EquipmentInfoSearch;
        this.$store.commit('equipmentInfo/TOGGLEEQUIPMENTINFOSEARCH', this.pop_EquipmentInfoSearch)
      },
      getPopPartSearch()
      {
        this.pop_PartInfoSearch = !this.pop_PartsnfoSearch;
        this.$store.commit('partInfo/TOGGLEPARTINFOSEARCH', this.pop_PartInfoSearch)
      },
      getPopCamSearch()
      {
        this.pop_CamInfoSearch = !this.pop_CamInfoSearch;
        this.$store.commit('camInfo/TOGGLECAMINFOSEARCH', this.pop_CamInfoSearch)
      },
      getPopCadSearch()
      {
        this.pop_CadInfoSearch = !this.pop_CadInfoSearch;
        this.$store.commit('cadInfo/TOGGLECADINFOSEARCH', this.pop_CadInfoSearch)
      },
       getPopWorkSearch()
      {
        this.pop_WorkInfoSearch = !this.pop_WorkInfoSearch;
        this.$store.commit('workInfo/TOGGLEWORKINFOSEARCH', this.pop_WorkInfoSearch)
      },
      putProcessCodeRealOrderSave() {
        
        return true
      },
      processAdding () {
       
        return true
      },
      processCodeDelete () {

        return true
      },
      deleteProcessCodeReal (processCd) {
        let url = this.APIURL + '/api/delProcessCodeRealByProjectId';
        var delProcessInfo = {
              projectId : this.projectCd,
              processCodeId : processCd.ID,
              processCodeName : processCd.CODENAME
            }
      //  let url1 = this.APIURL + '/api/getProcessCodeByProject';
        // eslint-disable-next-line
        console.log("3. getProcessCodeRegByProject.vue /api/delProcessCodeRealByProjectId >>>> " + url )
        this.$http.post(url , delProcessInfo, /*, config */)
          .then ( ret => {
            this.result = ret.data;
            this.getProcessCodeByProjectId();
            // eslint-disable-next-line
            console.log("p14. pass getProcessCodeRegByProject.vue !!!! : " + this.result.status)

          });
        return true
      },
      getProjectCodeInfo (startDate,endDate) {
        var getDateInfo = {
           startDate : startDate,
           endDate : endDate
          }
          let url = this.APIURL + '/api/getProcessCodeByDateInfo';
            // eslint-disable-next-line
          console.log("p01. ProcessCodeRegByProject.vue /api/getProcessCodeByDateInfo >>>> " + url )
          this.$http.post(url , getDateInfo, /*, config */).then ( ret=> {
            this.projectIdItems = ret.data;
            // eslint-disable-next-line
            console.log("p02. pass ProcessCodeRegByProject.vue !!!! : " + this.projectIdItems)
          })
        return true
      },
      getProcessCodeByProjectId(){
          let url = this.APIURL + '/api/getProcessCodeByProjectId/'+this.projectCd;
            // eslint-disable-next-line
          console.log("p01. ProcessCodeRegByProject.vue /api/getProcessCodeByDateInfo >>>> " + this.projectCd )
          this.$http.get(url , null, /*, config */).then ( ret=> {
            this.processCodeReal = ret.data;
       /*     this.$store.commit('camInfo/SETCAMMGRNM', this.processCodeReal[0].CAM_MGR_NM);
            this.$store.commit('cadInfo/SETCADMGRNM', this.processCodeReal[0].CAD_MGR_NM);
            this.$store.commit('camInfo/SETCAMMGRCD', this.processCodeReal[0].CAM_MGR_CD);
            this.$store.commit('cadInfo/SETCADMGRCD', this.processCodeReal[0].CAD_MGR_CD);
            this.$store.commit('cavityInfo/SETITEMS', this.processCodeReal[0].CAVITY);
            this.compressRate = this.processCodeReal[0].COMPRESS_RATE ;
            */
            // eslint-disable-next-line
            console.log("p02. pass ProcessCodeRegByProject.vue !!!! : " + this.processCodeReal)
          })
        return true
      },
      getProcessRealInfoView(processCd){
          let url = this.APIURL + '/api/getProcessRealInfoByProjectId';
          
          var getProcessInfo = {
              projectId : this.projectCd,
              processCodeId : processCd.ID,
              processCodeName : processCd.CODENAME
            }
           // eslint-disable-next-line
          console.log("p01. ProcessCodeRegByProject.vue /api/getProcessRealInfoByProjectId >>>> " + this.projectCd )
          this.$http.post(url , getProcessInfo, /*, config */).then ( ret=> {
            this.processRealInfo= ret.data;

            this.$store.commit('projectInfo/SETPROJECTNM', this.processRealInfo[0].PROJECT_NM);
            this.processCdByProcess = this.processRealInfo[0].PROCESS_CD ;
            this.processNmByProcess = this.processRealInfo[0].PROCESS_NM ;

            this.$store.commit('partInfo/SETPARTNM', this.processRealInfo[0].PART_NM);
            this.$store.commit('partInfo/SETPARTCD', this.processRealInfo[0].PART_CD);

            this.$store.commit('workInfo/SETWORKNM', this.processRealInfo[0].WORK_NM);
            this.$store.commit('workInfo/SETWORKCD', this.processRealInfo[0].WORK_CD);

            this.$store.commit('cavityInfo/SETCAVITYNM', this.processRealInfo[0].CAVITY_NM);
            this.$store.commit('cavityInfo/SETCAVITYCD', this.processRealInfo[0].CAVITY);
            
            
            this.orderDateByProcess = this.processRealInfo[0].ORDER_DATE ;
            this.dueDateByProcess = this.processRealInfo[0].DUE_DATE ;

            this.processStartDateByProcess = this.processRealInfo[0].PROCESS_START_DT ;
            this.processEndDateByProcess = this.processRealInfo[0].PROCESS_END_DT ;
            
            this.processStartTimeByProcess = this.processRealInfo[0].PROCESS_START_HOUR  ;
            this.processEndTimeByProcess = this.processRealInfo[0].PROCESS_END_HOUR ;
            
            this.equipmentNmByProcess = this.processRealInfo[0].EQUIPMENT_NM ;
            this.materialNmByProcess = this.processRealInfo[0].MATERIAL_NM ;

            this.compressRate = this.processRealInfo[0].COMPRESS_RATE ;

            // eslint-disable-next-line
            console.log("p02. pass ProcessCodeRegByProject.vue !!!! : " + this.projectIdItems)
          })
        return true
      },
      putProcessRealInfoSave(processCd){
            let url = this.APIURL + '/api/putProcessCodeByProjectId';
            var putProcessInfo = {
              projectId : this.projectCd,
              processCodeId : processCd.ID,
              processCodeName : processCd.CODENAME
            }
            this.isCodeReg = true;
              // eslint-disable-next-line
            console.log("p01. ProcessCodeRegByProject.vue /api/putProcessCodeByDateInfo >>>> " + processCd.ID)
             this.$http.post(url , putProcessInfo, /*, config */).then ( ret=> {
              this.result = ret.data;
              this.getProcessCodeByProjectId();
              if(this.result.data.status === 200)
              {
                 // eslint-disable-next-line
                  console.log("p16. pass ProcessCodeRegByProject.vue !!!! : " + this.result)
               }
            })
          return true
        },
        putProcessRealPlanSave(){
              let url = ''
                // eslint-disable-next-line
            //01. ProcessCodeRegByProject.vue /api/putProcessCodeSaveByProjectId >>>> " + processId +","+processName )
              var putProcessMasterInfo = "";
              var putProcessPlanInfo ="";
              var putProcessPlanHistInfo="";
              for (var i=0; i<this.processCodeReal.rowCount; i++)
              {
                url = this.APIURL + '/api/getSeqId/' + 'seq_processIdByProjectId';
                this.$http.get(url , null, /*, config */).then ( ret=> {
                  var SEQ_ID = ret.data.SEQ_ID;
                  // eslint-disable-next-line
                  console.log("p14. pass ProcessCodeRegByProject.vue !!!! : /api/getSeqId/seq_processIdByProjectId" + this.result.status)
                  if(SEQ_ID !== '')
                  {
                    //프로젝트 아이디 가져와서 던지기
                    putProcessMasterInfo = {
                        processSeq: this.processSeq,
                        processId : this.processCdByProcess,
                        processNm : this.processNmByProcess,
                        projectCd : this.projectCd,
                        projectNm : this.projectNm,
                        equipmentCd : this.equipmentCd,
                        materialCd : this.materialCd,
                        workCd : this.workCd,
                        partCd : this.partCd,
                        cavity : this.cavity,
                        compressRate: this.compressRate
                    },

                    putProcessPlanInfo = {
                        processId : this.processCdByProcess,
                        processNm : this.processNmByProcess,
                        projectCd : this.projectCd,
                        planStartDt : this.planStartDt,
                        planEndDt : this.planEndDt
                    },
                     putProcessPlanHistInfo = {
                        processSeq: this.processSeq,
                        processId : this.processCdByProcess,
                        processNm : this.processNmByProcess,
                        projectCd : this.projectCd,
                        projectNm : this.projectNm,
                        equipmentCd : this.equipmentCd,
                        materialCd : this.materialCd,
                        workCd : this.workCd,
                        partCd : this.partCd,
                        cavity : this.cavity,
                        compressRate: this.compressRate,
                        planStartDt : this.planStartDt,
                        planEndDt : this.planEndDt
                    }
//........ 추가할것
// history table 에 추가
// main Tabled 에도 추가
                    
                    url = this.APIURL + '/api/putProcessCodeSaveByProjectId/:projectId';
                    this.$http.put(url , putProcessMasterInfo, /*, config */).then ( ret=> {
                      this.result = ret.data;
                      // eslint-disable-next-line
                      console.log("p14. pass ProcessCodeRegByProject.vue !!!! : " + this.result.status)
                      if(this.result.data.status === 200)
                      {
                        // eslint-disable-next-line
                        console.log("p15. success ProcessCodeRegByProject.vue !!!! : " + this.result)
                      }
                    });
                    this.$http.put(url , putProcessPlanInfo, /*, config */).then ( ret=> {
                      this.result = ret.data;
                      // eslint-disable-next-line
                      console.log("p14. pass ProcessCodeRegByProject.vue !!!! : " + this.result.status)
                      if(this.result.data.status === 200)
                      {
                        // eslint-disable-next-line
                        console.log("p15. success ProcessCodeRegByProject.vue !!!! : " + this.result)
                      }
                    });
                    this.$http.put(url , putProcessPlanHistInfo, /*, config */).then ( ret=> {
                      this.result = ret.data;
                      // eslint-disable-next-line
                      console.log("p14. pass ProcessCodeRegByProject.vue !!!! : " + this.result.status)
                      if(this.result.data.status === 200)
                      {
                        // eslint-disable-next-line
                        console.log("p15. success ProcessCodeRegByProject.vue !!!! : " + this.result)
                      }
                    })
                  }
                })
              }
            return true
          },
          active () {
            return true
          },
    },
    created () {
      
    },
};
</script>