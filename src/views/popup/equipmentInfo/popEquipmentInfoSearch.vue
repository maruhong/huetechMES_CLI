<template>
  <section>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn  icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>장비명 상세 정보 선택 목록</v-toolbar-title>
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
        v-model="getEquipmentInfo"
        :headers="headers"
        :items="equipmentInfos"
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
           let url = this.APIURL + '/api/getEquipmentInfoSearch';
        // eslint-disable-next-line
        console.log("3. popEquipmentInfoSearch.vue /api/getEquipmentInfoSearch >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.equipmentInfos = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass popEquipmentInfoSearch.vue !!!! : " + this.equipmentInfos)   
          })
 
   },
   data () {
      return {
        //dialog: true,
        search:'',
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        getEquipmentInfo:[],
        singleSelect:true,
        headers: [
          {
            text: 'NO',
            align: 'start',
            filterable: false,
            value: 'NO',
          },
          { text: '장비코드', value: 'EQUIPMENT_CD'},
          { text: '장비명', value: 'EQUIPMENT_NM'},
          { text: '모델번호 ', value: 'MODEL_NO'},
          { text: '관리자', value: 'MGR_EMP_NO'},
          { text: '규격', value: 'EQUIPMENT_SPEC'},
          { text: '단위', value: 'UNIT'},
          { text: '구매업체코드', value: 'PURCHASE_NO'},
          { text: '속성', value: 'ATTRIBUTE'},
        ],
        equipmentInfos : [],
      }
    
    },
    methods : {
      close () {
         
        let result = this.equipmentInfos.find((equipmentInfo) => {
        return equipmentInfo
        })
         // eslint-disable-next-line
        console.log("popEquipmentInfoSearch.vue. close() : result"  + result)
        this.getEquipmentInfo.push(result)
         // eslint-disable-next-line
        console.log("popEquipmentInfoSearch.vue. close() : getEquipmentInfo"  + this.getEquipmentInfo[0].EQUIPMENT_NM)
        this.$store.commit('equipmentInfo/SETITEMS', this.getEquipmentInfo)
        this.$store.commit('equipmentInfo/TOGGLEEQUIPMENTINFOSEARCH', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
      },
    }
  }
</script>