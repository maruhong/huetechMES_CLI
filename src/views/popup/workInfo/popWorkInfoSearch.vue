<template>
  <section>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn  icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>작업 상세 정보 선택 목록</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="close()">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    <!--  <v-data-table
        v-model="getMaterialInfo"
        :headers="headers"
        :items="materialInfos"
        :search="search"
        :v-on:show-log="setMaterialInfo"
        :single-select="singleSelect"
        item-key="NO"
        show-select
        class="elevation-1"
      > -->
       <v-data-table
        v-model="getWorkInfo"
        :headers="headers"
        :items="workInfos"
        :search="search"
       
        :single-select="singleSelect"
        item-key="NO"
        show-select
        class="elevation-1"
      >
      </v-data-table>
      
    </v-card>
  </section>
</template>
    
<script>
// import {mapState} from 'vuex'  
 
  export default {  
    components: {
    },

    computed:{
      
    },
    beforeCreate() {
           let url = this.APIURL + '/api/getWorkInfoSearch';
        // eslint-disable-next-line
        console.log("3. popWorkInfoSearch.vue /api/getWorkInfoSearch >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.workInfos = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass popWorkInfoSearch.vue !!!! : " + this.workInfos)   
          })
 
   },
   data () {
      return {
        //dialog: true,
        search:'',
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        getWorkInfo:[],
        singleSelect:true,
        headers: [
          {
            text: 'NO',
            align: 'start',
            filterable: false,
            value: 'NO',
          },
          { text: '작업명 코드', value: 'WORK_CD'},
          { text: '작업명', value: 'WORK_NM'},
          { text: '속성', value: 'IO_ATTRIBUTE'}
        ],
        workInfos : [],
      }
    },
    methods : {
      close () {
         
        let result = this.workInfos.find((workInfo) => {
        return workInfo
        })
         // eslint-disable-next-line
        console.log("popWorkInfoSearch.vue. close() : result"  + result)
        this.getWorkInfo.push(result)
         // eslint-disable-next-line
        console.log("popWorkInfoSearch.vue. close() : getWorkInfo"  + this.getWorkInfo[0].work_nm)
        this.$store.commit('workInfo/SETITEMS', this.getWorkInfo)
        this.$store.commit('workInfo/TOGGLEWORKINFOSEARCH', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
      },
    }
  }
</script>