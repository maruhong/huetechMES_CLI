<template>
  <section>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn  icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>부품 상세 정보 선택 목록</v-toolbar-title>
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
        v-model="getPartInfo"
        :headers="headers"
        :items="partInfos"
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
           let url = this.APIURL + '/api/getPartInfoSearch';
        // eslint-disable-next-line
        console.log("3. popPartInfoSearch.vue /api/getPartInfoSearch >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.partInfos = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass popPartInfoSearch.vue !!!! : " + this.partInfos)   
          })
 
   },
   data () {
      return {
        //dialog: true,
        search:'',
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        getPartInfo:[],
        singleSelect:true,
        headers: [
          {
            text: 'NO',
            align: 'start',
            filterable: false,
            value: 'NO',
          },
          { text: '재료코드', value: 'PART_CD'},
          { text: '재료명', value: 'PART_NM'},
          { text: '모델번호 ', value: 'MODEL_NO'},
          { text: '관리자', value: 'MGR_EMP_NO'},
          { text: '규격', value: 'PART_SPEC'},
          { text: '단위', value: 'UNIT'},
          { text: '구매업체코드', value: 'PURCHASE_NO'},
          { text: '속성', value: 'ATTRIBUTE'},
        ],
        partInfos : [],
      }
    },
    methods : {
      close () {
         
        let result = this.partInfos.find((partInfo) => {
        return partInfo
        })
         // eslint-disable-next-line
        console.log("popPartInfoSearch.vue. close() : result"  + result)
        this.getPartInfo.push(result)
         // eslint-disable-next-line
        console.log("popPartInfoSearch.vue. close() : getPartInfo"  + this.getPartInfo[0].PART_NM)
        this.$store.commit('partInfo/SETITEMS', this.getPartInfo)
        this.$store.commit('partInfo/TOGGLEPARTINFOSEARCH', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
      },
    }
  }
</script>