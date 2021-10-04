<template>
<section>
    <v-container fluid grid-list-sm >    
      <template  v-if="$vuetify.breakpoint.smAndUp">
        <v-card
        dark
        dense
        max-height=65
        class="mb-3"
        color="grey darken-3 dark"
        gradient="to left, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
        <v-row class="mx-3">
        
         <div class="ma-1"> 
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
         </div>
         
          <v-spacer></v-spacer>
          <v-btn 
            class ="mt-3 mx-1"
            color="grey darken-2"
            :value="true"
          >
            조회
            <v-icon  class="mx-1" >mdi-magnify</v-icon>
          </v-btn>
         <v-divider vertical></v-divider>
          <v-btn 
            class ="mt-3 mx-1"
            color="grey darken-2"
            :value="true"
            @click="toggle_projectInfoReg()"
           >
            신규 등록
           <v-icon  class="mx-1" @click="toggle_projectInfoReg()">mdi-expand-all-outline</v-icon>
           </v-btn>
        </v-row>
        </v-card>
        </template>  
      
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue-grey darken-2"
          class="mb-1"
          gradient="to left, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          tile
        >
          <v-text-field
            dense
            outlined
            v-model="search"
            clearable
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="search"           
          ></v-text-field>
         <!-- <template v-if="$vuetify.breakpoint.mdAndUp"> -->
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              dense 
              outlined
              v-model="sortBy"              
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-sort"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                medium
                depressed
                color="blue-grey darken-4"
                :value="false"
              >
              <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                medium
                depressed
                color="blue-grey darken-4"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.PROJECT_CD"
            cols="3"
            md4
            lg3
            xl2
          >
            <v-card 
              max-width="344"
              class="mx-auto">
              <v-img
              :src="item.PROJECT_IMG"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="140px"
              >         
              <v-card-title class="font-weight-regular">{{ item.PROJECT_CD }}</v-card-title>
            </v-img>
              <v-list>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                  dense
                >
                 <!--  <div v-if="key != 'project_img'"> -->
                   <!-- <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}</v-list-item-content> -->
                    <v-list-item-content :class="{'blue--text': sortBy === key }" ><span class="d-inline-block text-truncate subtitle-3 text-left">{{ item[key.toLowerCase()]}}</span></v-list-item-content>
                  <!--</div>-->
                </v-list-item>
              </v-list>
              <v-divider light></v-divider>
              <v-card-actions>              
              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn> 
              <v-spacer></v-spacer>           
              
              <v-btn icon>
                <v-icon @click="popProjectInfoDetailMethod(item.PROJECT_CD)" >mdi-table-large</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon @click="pop_projectInfoEdited=true">mdi-pencil-box-multiple</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
                <v-card-text v-show="show">
                  <span class="d-inline-block caption grey--text text-left">
                    {{ item.CAVITY}} | {{item.CAD}} | {{item.CAM}} <br/> {{item.ATTRIBUTE}}
                  </span>
                </v-card-text>
              </v-slide-y-transition>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="blue-grey--text">페이지 단위 보기 개수</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="grey darken-2"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="grey darken-1"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
      
    </v-data-iterator>

 
  </v-container>

   <v-dialog  v-model="this.toggleProjectInfoReg"  >
    <project-info-register >
    </project-info-register>  
  </v-dialog>
 <!-- 
  <v-dialog v-model="pop_projectInfoRegistered"  scrollable max-width="800px"> 
  <v-card  fluid white style="width: 100%; padding: 5px; margin-right: auto; margin-left: auto;">
      <v-container>
      <v-card-title>
              프로젝트 도면 신규 등록             
      </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="pop_projectInfoRegistered = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="pop_projectInfoRegistered = false">Save</v-btn>
        </v-card-actions> 
      </v-container>       
      </v-card> 
  </v-dialog>
  -->
  <v-dialog  v-model="this.toggleProjectInfoDetail" >
    <project-info-detail >
    </project-info-detail>  
  </v-dialog>

 <!-- <v-dialog v-model="pop_projectInfoDescription"  scrollable max-width="800px"> 
  <v-card  fluid white style="width: 100%; padding: 5px; margin-right: auto; margin-left: auto;">
      <v-container>
      <v-card-title>
              프로젝트 도면 상세 정보 보기            
      </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="pop_projectInfoDescription = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="pop_projectInfoDescription = false">Save</v-btn>
        </v-card-actions> 
      </v-container>       
      </v-card> 
  </v-dialog>
  -->

  <v-dialog v-model="pop_projectInfoEdited"  scrollable max-width="800px"> 
  <v-card  fluid white style="width: 100%; padding: 5px; margin-right: auto; margin-left: auto;">
      <v-container>
      <v-card-title>
              프로젝트 도면 정보 수정            
      </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="pop_projectInfoEdited = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="pop_projectInfoEdited = false">Save</v-btn>
        </v-card-actions> 
      </v-container>       
      </v-card> 
  </v-dialog>
  </section>
</template>


<script>
//import setDialog from '@components/SetDialog'
//import CommSelectBox from '../components/ComSelectBox.vue'; 
import {mapState} from 'vuex'  
import projectInfoDetail from "@/views/popup/projectInfo/popProjectInfoDetail.vue"
import projectInfoRegister from "@/views/popup/projectInfo/popProjectInfoReg.vue"
export default {
  name: 'projectInfo',  
  components: {  
    'project-info-detail' : projectInfoDetail,
    'project-info-register' : projectInfoRegister,
   // setDialog   //팝업창 호출 연동
    // eslint-disable-next-line
  //  CommSelectBox  
  },  
  data () {
        return {
          
          pop_projectInfoReg:false,
          pop_projectInfoDetail:false,
          pop_projectInfoEdited:false,
          datePicker:null,             
          s_orderEndDate:'',
          s_orderStartDate:'',
          orderStartDateMenu:false,
          orderEndDateMenu:false,
          projectIdItems:[],
          s_project_cd:'',
          projectCdItem: [],
          startDate: null, //datePicker
          endDate: new Date(), //datePicker

          show: false,
        //  filter: {},
          itemsPerPageArray: [4,8,12,16,20],
          page: 1,
          itemsPerPage: 4,
          search: '',
          sortDesc: false,
          sortBy: 'PROJECT_CD',
          keys: [
            'PROJECT_NM',
            'MODEL_NM',
            'PROJECT_EMP_NO',
            'PROJECT_CUSTOMER_ID'
          ],
          items: [                 
          ],

        }
  },
  computed:{
      //store.js 의 project_cd 의 조회 결과값을 projectInfo Pop화면에 items 의 넣어주는 정보 전달 방법
      ...mapState({
        toggleProjectInfoReg : state => state.projectInfo.toggleProjectInfoReg,
        toggleProjectInfoEdit : state => state.projectInfo.toggleProjectInfoEdit,
        toggleProjectInfoDetail : state => state.projectInfo.toggleProjectInfoDetail,
      }),
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `PROJECT_CD`)
      },
         
    },
created() {
  alert("진입성공")
},

beforeCreate() {
      let url = this.APIURL + '/api/getProjectInfo';
      // eslint-disable-next-line
      console.log("3. ProjectInfo.vue /api/getProjectInfo >>>> " + url )
      this.$http.get(url , null,  /* config */)
                .then ( ret => {
                  this.items = ret.data; 
                    // eslint-disable-next-line
                  console.log("4. ProjectInfo.vue /api/getProjectInfo !!!! : " + this.items)   
        });
      url = this.APIURL + '/api/getCommCodeName/' + 'B004';
      this.$http.get(url , null, /*, config */)
                .then ( ret => {
                  this.cavityNameListItems = ret.data; 
                    // eslint-disable-next-line
                  console.log("5. ProjectInfo.vue get_cavityName.vue !!!! : " + this.cavityNameListItems)   
        });

       url = this.APIURL + '/api/getCommCodeName/' + 'B001';
       this.$http.get(url , null, /*, config */)
        .then ( ret => {
          this.camNameListItems = ret.data; 
            // eslint-disable-next-line
          console.log("6. ProjectInfo.vue get_camName.vue !!!! : " + this.camNameListItems)   
        });

        url = this.APIURL + '/api/getCommCodeName/' + 'B002';
        this.$http.get(url , null, /*, config */)
                 .then ( ret => {
                   this.cadNameListItems = ret.data; 
                     // eslint-disable-next-line
                   console.log("7. ProjectInfo.vue get_cadName.vue !!!! : " + this.cadNameListItems)   
        });

        url = this.APIURL + '/api/getCommCodeName/' + 'B003';
        this.$http.get(url , null, /*, config */)
                  .then ( ret => {
                    this.materialNameListItems = ret.data; 
                      // eslint-disable-next-line
                    console.log("8. ProjectInfo.vue get_materialName.vue !!!! : " + this.materialNameListItems)   
        });
    },
    
 mounted(){
   
 },
methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      toggle_projectInfoReg () {
        this.pop_projectInfoReg = !this.pop_projectInfoReg
        this.$store.commit('projectInfo/TOGGLEPROJECTINFOREG', this.pop_projectInfoReg)
      },
      checkDate() {

      },
      // 상세보기 정보 전달
      popProjectInfoDetailMethod(key) {
        // eslint-disable-next-line
        console.log("popProjectInfoDetail.vue >>>>>")
        // eslint-disable-next-line
        let url = this.APIURL + '/api/getProjectInfo/'+ key;
          // eslint-disable-next-line
          console.log("3. popProjectInfoDetail.vue /api/getProjectInfoByCd >>>> " + url )
          this.$http.get(url , null,  /* config */)
              .then ( ret => {
                this.projectCdItem = ret.data; 
                  // eslint-disable-next-line
                console.log("4. popProjectInfoDetail.vue /api/getProjectInfo/projectCd !!!! : " + this.projectCdItem)  
                
                this.$store.commit('projectInfo/SETITEMS', this.projectCdItem)  //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
                this.pop_projectInfoDetail = !this.pop_projectInfoDetail
                this.$store.commit('projectInfo/TOGGLEPROJECTINFODETAIL', this.pop_projectInfoDetail)
                 /* eslint-disable */ 
                console.log("popProjectInfoDetailMethod : " + key)
          });       
      }
    }
}
</script>
