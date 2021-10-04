<template>
  <section>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn  icon dark @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>도면 정보 선택 목록</v-toolbar-title>
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
        v-model="getProjectInfo"
        :headers="headers"
        :items="projectInfos"
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
           let url = this.APIURL + '/api/getProjectInfo';
        // eslint-disable-next-line
        console.log("3. popProjectInfoSearch.vue /api/getProjectInfo >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.projectInfos = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass getProjectInfo.vue !!!! : " + this.projectInfos)   
          })
 
   },
   data () {
      return {
        //dialog: true,
        search:'',
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        getProjectInfo:[],
        singleSelect:true,
        headers: [
          {
            text: 'NO',
            align: 'start',
            filterable: false,
            value: 'NO',
          },
          { text: '재료코드', value: 'PROJECT_CD'},
          { text: '재료명', value: 'PROJECT_NM'},
          { text: '모델번호 ', value: 'MODEL_NM'},
          { text: '속성', value: 'ATTRIBUTE'},
          { text: '등록일', value: 'CRT_DTM'},
        ],
        projectInfos : [],
      }
    },
    methods : {
      close () {
         
        let result = this.projectInfos.find((projectInfo) => {
        return projectInfo
        })
         // eslint-disable-next-line
        console.log("popProjectInfoSearch.vue. close() : result"  + result)
        this.getProjectInfo.push(result)
         // eslint-disable-next-line
        console.log("popProjectInfoSearch.vue. close() : getProejctInfo"  + this.getProjectInfo[0].PROJECT_CD)
        this.$store.commit('projectInfo/SETPROJECTITEMS', this.getProjectInfo)
        this.$store.commit('projectInfo/TOGGLEPROJECTINFOSEARCH', false) //store.js 의 Mutations 의 methods 를 수행하기 위해 call 하는 방법.
      },
    }
  }
</script>