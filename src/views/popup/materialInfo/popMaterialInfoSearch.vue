<template>
  <section>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn  icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>공정 재료 상세 정보 선택 목록</v-toolbar-title>
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
        v-model="getMaterialInfo"
        :headers="headers"
        :items="materialInfos"
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
      //store.js 의 project_cd 의 조회 결과값을 projectInfo Pop화면에 items 의 넣어주는 정보 전달 방법
     // ...mapState({
      //  materialInfo : state => state.materialInfo.popItems, 
     // }),
    },
    beforeCreate() {
           let url = this.APIURL + '/api/getMaterialInfoSearch';
        // eslint-disable-next-line
        console.log("3. popMaterialInfoSearch.vue /api/getMaterialInfoSearch >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.materialInfos = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass popMaterialInfoSearch.vue !!!! : " + this.materialInfos)   
          })
 
   },
   data () {
      return {
        //dialog: true,
        search:'',
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        getMaterialInfo:[],
        singleSelect:true,
        headers: [
          {
            text: 'NO',
            align: 'start',
            filterable: false,
            value: 'NO',
          },
          { text: '재료코드', value: 'MATERIAL_CD'},
          { text: '재료명', value: 'MATERIAL_NM'},
          { text: '모델번호 ', value: 'MODEL_NO'},
          { text: '관리자', value: 'MGR_EMP_NO'},
          { text: '규격', value: 'MATERIAL_SPEC'},
          { text: '단위', value: 'UNIT'},
          { text: '구매업체코드', value: 'PURCHASE_NO'},
          { text: '속성', value: 'ATTRIBUTE'},
        ],
        materialInfos : [],
      }
    },
    methods : {
      close () {
         
        let result = this.materialInfos.find((materialInfo) => {
        return materialInfo
        })
         // eslint-disable-next-line
        console.log("popMaterialInfoSearch.vue. close() : result"  + result)
        this.getMaterialInfo.push(result)
         // eslint-disable-next-line
        console.log("popMaterialInfoSearch.vue. close() : getMaterialInfo"  + this.getMaterialInfo[0].MATERIAL_NM)
        this.$store.commit('materialInfo/SETITEMS', this.getMaterialInfo)
        this.$store.commit('materialInfo/TOGGLEMATERIALINFOSEARCH', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
      },
    }
  }
</script>