<template>
<section>
    <v-container fluid grid-list-sm >    
      <template  v-if="$vuetify.breakpoint.mdAndUp">
        <v-card
        dark
        dense
        max-height=65
        class="mb-3"
        color="grey darken-3 dark"
        gradient="to left, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
        <v-row class="mx-3">
          <v-select  outlined 
              dense cleable class="mx-3 mt-3" v-model="projectCdList.project_cd"  :items="projectCdList" item-text="project_cd"  label="도면번호 선택"  ></v-select> 
          <v-menu xs2 dense v-model="orderStartDateMenu"  
                  :close-on-content-click="true" 
                  :return-value.sync="orderStartDateMenu"
                  cleable 
                  class="mt-3 mx-3"
                  offset-y >
            <template v-slot:activator="{ on }">
              <v-text-field outlined dense
                v-model="s_orderStartDate"
                label="시작일"
                readonly
                class="mt-3 mx-3"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="s_orderStartDate" @input="orderStartDateMenu = false" no-title  scrollable></v-date-picker>
          </v-menu>
          <v-menu  xs2 dense 
                  v-model="orderEndDateMenu"  
                  :close-on-content-click="true"  
                  :return-value.sync="orderEndDateMenu"
                  cleable 
                  class="mt-3 mx-3"
                  offset-y >
            <template v-slot:activator="{ on }">
              <v-text-field outlined dense
                v-model="s_orderEndDate"
                label="종료일"
                readonly
                class="mt-3 mx-3"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="s_orderEndDate" @input="orderEndDateMenu = false"  scrollable></v-date-picker>
          </v-menu>
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
            @click="pop_projectInfoRegistered=true"
           >
            신규 등록
           <v-icon  class="mx-1" @click="pop_projectInfoRegistered=true">mdi-expand-all-outline</v-icon>
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
            :key="item.project_cd"
            cols="3"
            md4
            lg3
            xl2
          >
            <v-card 
              max-width="344"
              class="mx-auto">
              <v-img
              :src="item.project_img"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="140px"
              >         
              <v-card-title class="font-weight-regular">{{ item.project_cd }}</v-card-title>
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
                <v-icon @click="pop_projectInfoDescription=true">mdi-table-large</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon @click="pop_projectInfoEdited=true">mdi-pencil-box-multiple</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
                <v-card-text v-show="show">
                  <span class="d-inline-block caption grey--text text-left">
                    {{ item.cavity }} | {{item.cad}} | {{item.cam}} <br/> {{item.attribute}}
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
  <v-dialog v-model="pop_projectInfoDescription"  scrollable max-width="800px"> 
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
export default {
  name: 'projectInfo',  
  components: {  
   // setDialog   //팝업창 호출 연동
    // eslint-disable-next-line
  //  CommSelectBox  
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
      url = this.APIURL + '/api/getProjectCdList/';
       this.$http.get(url , null, /*, config */)
        .then ( ret => {
          this.projectCdList = ret.data; 
            // eslint-disable-next-line
          console.log("6. ProjectInfo.vue get_projectCodeList !!!! : " + this.projectCdList)   
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
    
data () {
      return {
        itemsPerPageArray: [4,8,12,16,20],
        pop_projectInfoRegistered:false,
        pop_projectInfoDescription:false,
        pop_projectInfoEdited:false,
        show: false,
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        s_orderEndDate:'',
        s_orderStartDate:'',
        orderStartDateMenu:false,
        orderEndDateMenu:false,
        projectIdItems:[],
        s_projectId:'',
        projectCdList: [], 
        sortBy: 'project_cd',
        keys: [
          'project_nm',
          'model_nm',
          'project_emp_no',
          'project_customer_id'
        ],
        items: [                 
        ],
      }
    },
 mounted(){
   
 },
computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `projectNo`)
      },
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
    },
 //methods : {
  /* modOpen(mode,set) {
     console.log('다이알로그 열림')
     this.setDialog.dialog = true
     this.setDialog.dialogMode = mode
   },
   closeDialog() {
     console.log("팝업화면 닫음")
     this.setDialog.dialog=false
   }*/
 //}
}
</script>
