<template>
   <div>
  
   <v-data-table
      :headers="headers"
      :items="projectInfo"
      sort-by="NO"
      class="elevation-1"
    > 
    <template v-slot:top>
      <v-list-item flat color="info">
        <v-list-title class="headline" style="max-width:120px;min-width:120px">도면 정보 관리</v-list-title>
            <v-container style="max-width:98%">
                <v-row >  
                  <v-col style="height:38px">
                    <v-list-item-subtitle style="max-width:70px">등록일</v-list-item-subtitle>
                  </v-col>
                  <v-col style="height:38px;padding-top:0px">                      
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="true"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="40px"
                    >
                    <template v-slot:activator="{ on }">
                      <v-text-field  v-model="s_date"  readonly v-on="on" style="width:85px;padding-top:0px"></v-text-field>
                    </template>                    
                      <v-date-picker v-model="s_date"  prepend-icon="<i class='fa fa-calendar-alt prefix'/>" no-title scrollable>
                        <div class="flex-grow-1" dense></div>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col style="padding:20px 0px 0px 0px;max-width:10px">
                    ~
                  </v-col>
                  <v-col style="height:38px;padding-top:0px">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="true"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="40px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="edate" 
                          readonly
                          v-on="on"
                          style="width:85px;padding-top:0px"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="s_date"  prepend-icon="<i class='fa fa-calendar-alt prefix'/>" no-title scrollable>
                        <div class="flex-grow-1" dense></div>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>       
        <v-col>
          <v-text-field v-model="search" append-icon="<i class='fa fa-search prefix'/>"  label="search" single-line  hide-details />
        </v-col>
       
        </v-row>

        <v-dialog v-model="dialog" max-width="1200px">
      <!--   <template v-slot:activator="{ on }">
          
        </template> -->
       
          <template v-slot:activator="{ on }">
            <v-btn color="success" dark class="mb-2" v-on="on">신규프로젝트 추가</v-btn>
          </template>
          <v-card>
            <v-card-title >
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text >
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.PROJECT_CD" label="프로젝트코드"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.PROJECT_NM" label="프로젝트명"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.MODEL_NM" label="모델명"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.ATTRIBUTE" label="속성"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.PROJECT_EMP_NO" label="관리자사번"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.PROJECT_CUSTOMER_ID" label="고객사"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.CAVITY" label="CAVITY"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.CAD" label="CAD(담당자)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.CAM" label="CAM(담당자)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.PROJECT_MATERIAL" label="프로젝트재료"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.ETC123" label="기타여러가지 추가 예정"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-item >
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-auto-fix
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete-forever
      </v-icon> 
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
   </v-data-table>
   </div>
</template>


 <script>
  export default {
    data: () => ({
      dialog: false,
      search: '',
      projectInfo: [] , 
      headers: [
        { text: '번호',  align: 'left',   sortable: false, value: 'NO' },
        { text: '프로젝트코드', align: 'left',   sortable: false, value: 'PROJECT_CD' },
      //   { text: '프로젝트명', value: 'PROJECT_NM' },
        { text: '모델명', value: 'MODEL_NM' },
      //  { text: '속성', value: 'ATTRIBUTE' },
      //  { text: '정렬', value: 'SORT_ORDER' },          
        { text: '프로젝트관리자', value: 'PROJECT_EMP_NO' },
        { text: '고객사', value: 'PROJECT_CUSTOMER_ID' },
        { text: 'CAVITY', value: 'CAVITY' },
        { text: 'CAD', value: 'CAD' },
        { text: 'CAM', value: 'CAM' },
        { text: '프로젝트재료', value: 'PROJECT_MATERIAL' },
      //  { text: '생성자', value: 'CRT_BY' },
        { text: '생성일', value: 'CRT_DTM' },
        // { text: '수정자', value: 'MOD_BY' },
      //  { text: '수정일', value: 'MOD_DTM' },
      { text: 'Actions', value: 'action', sortable: false },
      ] ,
      editedIndex: -1,
      editedItem: {
        PROJECT_CD: '',
        PROJECT_NM: '',
        MODEL_NM: '',
        ATTRIBUTE: '',
        PROJECT_EMP_NO: '',
        PROJECT_CUSTOMER_ID: '',
        CAVITY: '',
        CAD: '',
        CAM: '',
        PROJECT_MATERIAL: '',
        ETC123: '',
      },
      defaultItem: {
        PROJECT_CD: '',
        PROJECT_NM: '',
        MODEL_NM: '',
        ATTRIBUTE: '',
        PROJECT_EMP_NO: '',
        PROJECT_CUSTOMER_ID: '',
        CAVITY: '',
        CAD: '',
        CAM: '',
        PROJECT_MATERIAL: '',
        ETC123: '',
      },
    }),
    beforeCreate() {
        let url = this.APIURL + '/api/getProjectInfo';
        // eslint-disable-next-line
        console.log("3. getProjectInfo.vue /api/getProjectInfo >>>> " + url )
        this.$http.get(url , null, /*, config */)
          .then ( ret => {
            this.projectInfo = ret.data; 
              // eslint-disable-next-line
            console.log("4. pass getProjectInfo.vue !!!! : " + this.projectInfo)   
          });
      },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '신규 도면 번호(프로젝트) 추가' : '도면번호(프로젝트) 변경'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.projectInfo = []
      },

      editItem (item) {
        this.editedIndex = this.projectInfo.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.projectInfo.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.projectInfo.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.projectInfo[this.editedIndex], this.editedItem)
        } else {
          this.projectInfo.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>