<template> 
 <v-dialog v-model="pop_projectIdRegistered" scrollable max-width="300px">
  <v-card class="mx-auto" color="#D9E5FF"   >
    <v-container>
      <v-row justify="right">      
        <div class="btn-group" role="group" aria-label="Basic example" >
          <!--<v-btn  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-trash-alt fa-lm pr-3"
              aria-hidden="true"></i>삭제</v-btn> -->
          <v-btn  class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-plus-square fa-lm pr-3"
              aria-hidden="true"></i>등록</v-btn>
          <!--<v-btn class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-check-square fa-lm pr-3"
              aria-hidden="true"></i>수정</v-btn> -->
          <v-btn type="button" class="btn btn-outline-deep-purple btn-rounded waves-effect"><i class="fas fa-window-close fa-lm pr-3"
              aria-hidden="true"></i>취소</v-btn>
        </div>
      </v-row>
    </v-container>
  </v-card>
<v-container >
    <v-row >
      <v-col cols="4" md="20" >       
        <v-select  v-model="customerNameList"  :items="customerListItems"   item-text="customerName"  label="발주업체 선택"  multi-line ></v-select>
        <v-text-field v-model="text" :counter="20" :rules="nameRules" label="도면번호 자동생성" ></v-text-field>
        <v-text-field v-model="text" label="모델명 입력" required></v-text-field>
        <v-text-field v-model="text" label="제품명 입력" required></v-text-field>
        <v-select v-model="cavityNameList"  :items="cavityNameListItems" item-text="cavityName" label="캐비티 선택" multi-line ></v-select> 
        <v-select v-model="materialNameList"  :items="materialNameListItems" item-text="materialName"  label="성형재료 선택" multi-line ></v-select> 
        <v-text-field v-model="text" label="수축율 입력" required></v-text-field> 
        </v-col>
   
      <v-col cols="4" md="20">
        <v-select v-model="camNameList"  :items="camNameListItems" item-text="camName"  label="CAM 선택" multi-line ></v-select> 
        <v-select v-model="cadNameList"  :items="cadNameListItems" item-text="cadName"  label="CAD 선택" multi-line ></v-select>
        <v-combobox v-model="select" :items="manager" label="관리담당자 선택"></v-combobox>              
        <v-file-input multiple label="도면 이미지 파일첨부"></v-file-input>        
        <v-text label="미리보기" required></v-text>
        <v-img
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        ></v-img>
      </v-col>
        <v-col cols="4" md="20">
        <v-col cols="12" md="20" style="height:70px;padding-top:0px">
        <v-menu ref="orderDateMenu" v-model="orderDateMenu" :close-on-content-click="false" :return-value.sync="orderDate"
          transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              label="주문일"
              v-model="orderDate" 
              prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
              readonly
              v-on="on"
              style="width:250px;padding-top:-10px"
            ></v-text-field>               
          </template>
          <v-date-picker v-model="orderDate" no-title scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="orderDateMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.orderDateMenu.save(orderDate)">OK</v-btn>
          </v-date-picker> 
        </v-menu>  
         </v-col> 

         <v-col cols="12" md="20" style="height:70px;padding-top:0px">   
         <v-menu ref="dueDateMenu" v-model="dueDateMenu" :close-on-content-click="false" :return-value.sync="dueDate"
          transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              label="납기일"
              v-model="dueDate" 
              prepend-icon="<i class='fa fa-calendar-alt prefix'/>"
              readonly
              v-on="on"
              style="width:250px;padding-top:-10px"
            ></v-text-field>               
          </template>
          <v-date-picker v-model="dueDate" no-title scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="dueDateMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dueDateMenu.save(dueDate)">OK</v-btn>
          </v-date-picker> 
        </v-menu> 
        </v-col>   
        <v-file-input multiple label="CAM 파일 첨부"></v-file-input>
        <v-file-input multiple label="CAD 파일 첨부"></v-file-input>
        <v-file-input multiple label="발주서 첨부"></v-file-input>
        <v-file-input multiple label="견적서 첨부"></v-file-input>
        </v-col>
      </v-row>
</v-container>
</v-dialog>
</template>


<script>
//import CommSelectBox from '../components/ComSelectBox.vue';
export default {
  name: 'ProjectInfoReg',  
  components: {    
    // eslint-disable-next-line
  //  CommSelectBox  
  },
created() {
  alert("진입성공")
},

beforeCreate() {
      let url = this.APIURL + '/api/get_customer_masterName';
      // eslint-disable-next-line
      console.log("3. ProjectInfoReg.vue /api/get_customer_masterName >>>> " + url )
      this.$http.get(url , null, /*, config */)
                .then ( ret => {
                  this.customerListItems = ret.data; 
                    // eslint-disable-next-line
                  console.log("4. pass get_customer_masterName.vue !!!! : " + this.customerListItems)   
        });

      url = this.APIURL + '/api/getCommCodeName/' + 'B004';
      this.$http.get(url , null, /*, config */)
                .then ( ret => {
                  this.cavityNameListItems = ret.data; 
                    // eslint-disable-next-line
                  console.log("4. pass get_cavityName.vue !!!! : " + this.cavityNameListItems)   
        });

       url = this.APIURL + '/api/getCommCodeName/' + 'B001';
       this.$http.get(url , null, /*, config */)
        .then ( ret => {
          this.camNameListItems = ret.data; 
            // eslint-disable-next-line
          console.log("4. pass get_camName.vue !!!! : " + this.camNameListItems)   
        });

        url = this.APIURL + '/api/getCommCodeName/' + 'B002';
        this.$http.get(url , null, /*, config */)
                 .then ( ret => {
                   this.cadNameListItems = ret.data; 
                     // eslint-disable-next-line
                   console.log("4. pass get_cadName.vue !!!! : " + this.cadNameListItems)   
        });

        url = this.APIURL + '/api/getCommCodeName/' + 'B003';
        this.$http.get(url , null, /*, config */)
                  .then ( ret => {
                    this.materialNameListItems = ret.data; 
                      // eslint-disable-next-line
                    console.log("4. pass get_materialName.vue !!!! : " + this.materialNameListItems)   
        });
    },
data(){
   return {
    select: 'Programming',
    dueDate: '',
    orderDate:'',
    orderDateMenu:false,
    dueDateMenu:false,
    cavityNameListItems:["ANCD","1000"],
    materialNameListItems:["철주조물","철단조물"],
    camNameListItems:["김정호","이순신"],
    cadNameListItems:["김영랑","윤동주"],
    customerListItems:["어묵공장","김치공장"],
    manager:[],
    items: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify',
    ],
    valid: true,
    text: '',
    name:'',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 25) || 'Name must be less than 25 characters',
    ],
     emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
    
   }
 },

 mounted(){
   
 },

 methods : {
   
 }
}
</script>
