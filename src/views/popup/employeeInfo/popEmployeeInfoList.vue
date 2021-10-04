<template>
    <section > 
      <v-card v-model="popEmployeeList">
         <v-toolbar dark color="grey">
          <v-toolbar-title>구성원 정보 조회</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="close()">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar> 
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
            </v-toolbar>
          </template>

          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.EMP_NO"              
                cols="6"
                sm6
                md4
                lg3
                xl2
              >
                <v-card 
                  max-width="344"
                  class="mx-auto">
                <!--  <v-img
                  :src="item.emp_img"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="140px"
                  >        
                 <v-card-title  class="font-weight-regular">{{ item.EMP_NO }}</v-card-title>  -->
              <!-- </v-img> -->
                  <v-list>
                    <v-list-item
                      v-for="(key, index) in filteredKeys"
                      :key="index"
                      dense
                    >
                    <!--  <div v-if="key != 'project_img'"> -->
                      <!-- <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}</v-list-item-content> -->
                        <v-list-item-content :class="{'blue--text': sortBy === key }" ><span class="d-inline-block text-truncate subtitle-3 text-left">{{ item.EMP_NO }} {{ item[key.toUpperCase()]}}</span></v-list-item-content>
                       <v-btn  label="select"  @click="checkEmpNo(item.EMP_NO,item.NAME)"> SELECT
                  </v-btn>       
                      <!--</div>-->
                    </v-list-item>
                  </v-list>
                  <v-divider light></v-divider>
                  <v-card-actions>              
                  <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn> 
                  <v-spacer></v-spacer>  
                 <!-- <v-btn  label="select"  @click="checkEmpNo(item.EMP_NO,item.NAME)"> SELECT
                  </v-btn> -->      
                  
                </v-card-actions>
                <v-slide-y-transition>
                  <v-card-text v-show="show">
                    <span class="d-inline-block caption grey--text text-left">
                      {{ item.JUMIN_NO }} | {{item.JOIN_DATE}} | {{item.EMAIL_ADDR}}
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
         <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
        </v-card-actions>   
      </v-card>
  </section>
  <!-- Search form -->
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex'

export default {
  // el: "#employeeInfoEditVue",
  name: 'employeeInfo',
  components: {
  },
  computed:{
      //store.js 의 project_cd 의 조회 결과값을 projectInfo Pop화면에 items 의 넣어주는 정보 전달 방법
      ...mapState({
        items : state => state.empInfo.checkEmpList,
        displayInfo : state => state.empInfo.popDisplay
      }),
      numberOfPages() {
        return Math.ceil(this.items.length/this.itemsPerPage)      
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `EMP_NO`)
      },
      

    },
  beforeCreated() {
   // if(!this.EventBus.isAdmin) {
   //   this.$router.replace('/employeeInfo')
  //}/
  },
  created() {
    //this.$watch('adminKey', this._.debounce(this.checkAdminKey, 800)) ;
    //this.$watch('empNo', this._.debounce(this.searchEmpNo, 1000)) ;
    //this.$router.push('/employeeInfoEdit');
 },
 data(){
   return {     
     popEmployeeList : false,
     show: false,
      //  filter: {},
     itemsPerPageArray: [4,8,12,16,20],
     page: 1,
     empInfoList : null,
     itemsPerPage: 4,
     search: '',
     sortDesc: false,
     sortBy: 'EMP_NO',
     keys: [
        'NAME',
      ],
   }
 },
 methods : {
   
   nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
   },
   formerPage () {
     if (this.page - 1 >= 1) this.page -= 1
   },
   updateItemsPerPage (number) {
     this.itemsPerPage = number
   },
   checkEmpNo(empNo,name) { 
     this.empInfoList = name + "(" + empNo +")"
     if (this.displayInfo === "camEmpInfo")  {
          // eslint-disable-next-line      
        console.log("checkedItems ::::::" + this.empInfoList)
          // eslint-disable-next-line
        console.log("checkedDisplayInfo::::::" + this.displayInfo) 
        this.$store.commit('empInfo/SETCAMEMPNO', this.empInfoList) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
        this.$store.commit('empInfo/TOGGLECAMEMPINFOLIST', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
     } 
     else if(this.displayInfo === "cadEmpInfo") {
          // eslint-disable-next-line  
        console.log("checkedItems ::::::" + this.empInfoList)
          // eslint-disable-next-line
        console.log("checkedDisplayInfo::::::" + this.displayInfo)
        this.$store.commit('empInfo/SETCADEMPNO', this.empInfoList) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.  
        this.$store.commit('empInfo/TOGGLECADEMPINFOLIST', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.

     }
     else if(this.displayInfo === "mgrEmpInfo") {
          // eslint-disable-next-line  
        console.log("checkedItems ::::::" + this.empInfoList)
          // eslint-disable-next-line
        console.log("checkedDisplayInfo::::::" + this.displayInfo)
        this.$store.commit('empInfo/SETMGREMPNO', this.empInfoList) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.  
        this.$store.commit('empInfo/TOGGLEMGREMPINFOLIST', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
     }
   },
  close () {
     if (this.displayInfo === "camEmpInfo") 
        this.$store.commit('empInfo/TOGGLECAMEMPINFOLIST', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
     else if(this.displayInfo === "cadEmpInfo") 
        this.$store.commit('empInfo/TOGGLECADEMPINFOLIST', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
     else if(this.displayInfo === "mgrEmpInfo")  
        this.$store.commit('empInfo/TOGGLEMGREMPINFOLIST', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
  },

 }
}
</script>