<template>
  <section>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn  icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>CAM 담당자 상세 정보 선택 목록</v-toolbar-title>
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
        v-model="getCamInfo"
        :headers="headers"
        :items="camInfos"
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
           let url = this.APIURL + '/api/getCamInfoSearch';
        // eslint-disable-next-line
        console.log("3. popCamInfoSearch.vue /api/getCamInfoSearch >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.camInfos = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass popCamInfoSearch.vue !!!! : " + this.camInfos)   
          })
 
   },
   data () {
      return {
        //dialog: true,
        search:'',
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        getCamInfo:[],
        singleSelect:true,
        headers: [
          {
            text: 'NO',
            align: 'start',
            filterable: false,
            value: 'NO',
          },
          { text: 'CAM 담당자코드', value: 'CAM_MGR_CD'},
          { text: 'CAM 담당자명', value: 'CAM_MGR_NM'},
          { text: '속성', value: 'IO_ATTRIBUTE'}
        ],
        camInfos : [],
      }
    
    },
    methods : {
      close () {
         
        let result = this.camInfos.find((camInfo) => {
        return camInfo;
        })
         // eslint-disable-next-line
        console.log("popCamInfoSearch.vue. close() : result"  + result)
        this.getCamInfo.push(result)
         // eslint-disable-next-line
        console.log("popCamInfoSearch.vue. close() : getCamInfo"  + this.getCamInfo[0].CAM_MGR_NM)
        this.$store.commit('camInfo/SETITEMS', this.getCamInfo)
        this.$store.commit('camInfo/TOGGLECAMINFOSEARCH', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
      },
    }
  }
</script>