<template>
  <section>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn  icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>CAD 담당자 상세 정보 선택 목록</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="close()">선택완료</v-btn>
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
       <v-data-table
        v-model="getCadInfo"
        :headers="headers"
        :items="cadInfos"
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
           let url = this.APIURL + '/api/getCadInfoSearch';
        // eslint-disable-next-line
        console.log("3. popCadInfoSearch.vue /api/getCadInfoSearch >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.cadInfos = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass popCadInfoSearch.vue !!!! : " + this.cadInfos)   
          })
 
   },
   data () {
      return {
        //dialog: true,
        search:'',
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        getCadInfo:[],
        singleSelect:true,
        headers: [
          {
            text: 'NO',
            align: 'start',
            filterable: false,
            value: 'NO',
          },
          { text: 'CAD 담당자코드', value: 'CAD_MGR_CD'},
          { text: 'CAD 담당자명', value: 'CAD_MGR_NM'},
          { text: '속성', value: 'IO_ATTRIBUTE'}
        ],
        cadInfos : [],
      }
    
    },
    methods : {
      close () {
        let result = this.cadInfos.find((cadInfo) => {
        return cadInfo
        })
         // eslint-disable-next-line
        console.log("popCadInfoSearch.vue. close() : result"  + result)
        this.getCadInfo.push(result)
         // eslint-disable-next-line
        console.log("popCadInfoSearch.vue. close() : getCadInfo"  + this.getCadInfo[0].CAD_MGR_NM)
        this.$store.commit('cadInfo/SETITEMS', this.getCadInfo)
        this.$store.commit('cadInfo/TOGGLECADINFOSEARCH', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
      },
    }
  }
</script>